# ARS Toys Inventory Manager — Cloud Edition
**Deploy to Vercel + GitHub + MongoDB Atlas**

---

## 📁 Project Structure

```
ars-toys-inventory/
├── api/
│   ├── db.js          ← MongoDB models (Mongoose)
│   └── data.js        ← Vercel serverless API endpoint
├── public/
│   ├── index.html     ← PWA frontend (cloud-synced)
│   ├── manifest.json  ← PWA manifest
│   ├── sw.js          ← Service worker
│   └── icons/         ← App icons
├── .env.example       ← Environment variable template
├── .gitignore
├── package.json
└── vercel.json        ← Vercel routing config
```

---

## 🚀 STEP 1 — MongoDB Atlas Setup

1. Go to **https://mongodb.com/atlas** → Sign up (free)
2. Create a **Free M0 Cluster** (any region)
3. **Database Access** → Add user:
   - Username: `ars-toys-user`
   - Password: (generate a strong one — save it!)
   - Role: `readWriteAnyDatabase`
4. **Network Access** → Add IP: `0.0.0.0/0` (allows Vercel)
5. **Connect** → "Connect your application" → Copy the connection string:
   ```
   mongodb+srv://ars-toys-user:<password>@cluster0.xxxxx.mongodb.net/ars-toys?retryWrites=true&w=majority
   ```
   Replace `<password>` with your actual password.

---

## 🐙 STEP 2 — GitHub Setup

```bash
# 1. Create a new repo on github.com named: ars-toys-inventory
# 2. In your project folder, run:

git init
git add .
git commit -m "Initial commit — ARS Toys Cloud Edition"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ars-toys-inventory.git
git push -u origin main
```

---

## ▲ STEP 3 — Vercel Deployment

1. Go to **https://vercel.com** → Sign in with GitHub
2. Click **"Add New Project"** → Import `ars-toys-inventory`
3. **Framework Preset**: Other
4. **Root Directory**: `.` (default)
5. **Environment Variables** → Add:
   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | `mongodb+srv://ars-toys-user:PASSWORD@cluster0.xxxxx.mongodb.net/ars-toys?retryWrites=true&w=majority` |
6. Click **Deploy** 🚀

Your app will be live at: `https://ars-toys-inventory.vercel.app`

---

## 🔄 STEP 4 — Custom Domain (Optional)

In Vercel → Project Settings → Domains:
- Add `inventory.arstoys.in`
- In Hostinger DNS, add a CNAME record:
  - Name: `inventory`
  - Value: `cname.vercel-dns.com`

---

## ✅ How It Works

| Feature | How |
|---------|-----|
| Data storage | MongoDB Atlas (cloud) |
| API | Vercel Serverless Functions (`/api/data.js`) |
| Frontend | Static HTML PWA served from `/public` |
| Offline fallback | localStorage cache when internet is down |
| Auto-deploy | Every `git push` to `main` triggers Vercel re-deploy |

---

## 🧪 Local Testing

```bash
npm install
npx vercel dev
```
Then open `http://localhost:3000`

> Make sure `.env.local` has `MONGODB_URI` set.

---

## 📞 Support
WhatsApp: +91 98949 95660 | Email: arstoys6@gmail.com
