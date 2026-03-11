const mongoose = require('mongoose');

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const productSchema = new mongoose.Schema({
  _uid:    { type: String, required: true, unique: true },
  name:    String, catId: String, sku: String,
  price:   Number, cost: Number, stock: Number,
  min:     Number, note: String, addedAt: String,
}, { timestamps: true });

const categorySchema = new mongoose.Schema({
  _uid: { type: String, required: true, unique: true },
  name: String, icon: String,
}, { timestamps: true });

const restockSchema = new mongoose.Schema({
  _uid: { type: String, required: true, unique: true },
  pid: String, qty: Number, cost: Number,
  note: String, date: String, time: String,
}, { timestamps: true });

const saleSchema = new mongoose.Schema({
  _uid:  { type: String, required: true, unique: true },
  pid: String, qty: Number, price: Number,
  total: Number, note: String, date: String, time: String,
}, { timestamps: true });

const Product  = mongoose.models.Product  || mongoose.model('Product',  productSchema);
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
const Restock  = mongoose.models.Restock  || mongoose.model('Restock',  restockSchema);
const Sale     = mongoose.models.Sale     || mongoose.model('Sale',     saleSchema);

module.exports = { connectDB, Product, Category, Restock, Sale };
