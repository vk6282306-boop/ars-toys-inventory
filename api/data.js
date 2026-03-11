import { connectDB, Product, Category, Restock, Sale } from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectDB();
    const { resource, id } = req.query;

    const models = { products: Product, categories: Category, restocks: Restock, sales: Sale };
    const Model = models[resource];
    if (!Model) return res.status(400).json({ error: 'Unknown resource' });

    if (req.method === 'GET') {
      const docs = await Model.find({}).sort({ createdAt: -1 }).lean();
      // Return using _uid as id for frontend compatibility
      return res.json(docs.map(d => ({ ...d, id: d._uid })));
    }

    if (req.method === 'POST') {
      const doc = new Model({ ...req.body, _uid: req.body.id || req.body._uid });
      await doc.save();
      return res.status(201).json({ ...doc.toObject(), id: doc._uid });
    }

    if (req.method === 'PUT') {
      if (!id) return res.status(400).json({ error: 'id required' });
      const doc = await Model.findOneAndUpdate({ _uid: id }, req.body, { new: true });
      if (!doc) return res.status(404).json({ error: 'Not found' });
      return res.json({ ...doc.toObject(), id: doc._uid });
    }

    if (req.method === 'DELETE') {
      if (!id) return res.status(400).json({ error: 'id required' });
      await Model.findOneAndDelete({ _uid: id });
      return res.json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
