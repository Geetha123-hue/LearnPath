# LearnPath Deployment Guide

## Architecture

- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Express.js)
- **Database**: SQLite on Render's persistent disk

## Prerequisites

1. GitHub account with your repository
2. Render account (https://render.com)
3. Vercel account (https://vercel.com)
4. Git installed locally

---

## Step-by-Step Deployment

### 1. Test Locally First ✅

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev
# Should show: 🚀 LearnPath REST API running on http://localhost:5000

# Terminal 2 - Frontend  
cd frontend
npm install
npm run dev
# Should open http://localhost:5173
```

**Test these workflows:**
- ✅ Register a new account
- ✅ Login with your account
- ✅ View learning paths on dashboard
- ✅ Create a new learning path
- ✅ Track progress on a path

### 2. Push to GitHub

```bash
git add .
git commit -m "Configure deployment for Vercel and Render"
git push origin main
```

**Files that were modified:**
- `frontend/vite.config.js` - Added VITE_API_URL environment variable
- `frontend/src/services/api.js` - Updated to use environment variable
- `frontend/.env.development` - Dev environment config
- `frontend/.env.production` - Prod environment config (template)
- `backend/server.js` - Added configurable CORS
- `backend/.env` - Development environment variables
- `backend/.env.example` - Production environment template
- `vercel.json` - Frontend-only deployment config
- `render.yaml` - Backend infrastructure config

---

### 3. Deploy Backend to Render

#### 3a. Create Web Service on Render

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Select your GitHub repository
4. Configure:
   - **Name**: `learnpath-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid if you need better uptime)

#### 3b. Add Persistent Disk

1. In the Render dashboard, go to your service
2. Click **"Disks"** tab
3. Click **"Add Disk"**
   - **Name**: `sqlite_data`
   - **Mount Path**: `/var/data`
   - **Size**: 1 GB (free tier)
4. Click **"Create"**

#### 3c. Set Environment Variables

In Render dashboard, go to **Environment** tab and add:

```
PORT=5000
NODE_ENV=production
DB_PATH=/var/data/learnpath.sqlite
JWT_SECRET=[Generate a strong random string, e.g., openssl rand -base64 32]
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://[YOUR-VERCEL-URL].vercel.app
```

For `JWT_SECRET`, generate a strong key:
- On Mac/Linux: `openssl rand -base64 32`
- On Windows PowerShell: `[Convert]::ToBase64String((1..32 | ForEach-Object {[byte](Get-Random -Maximum 256)}))`

**Wait for Render to deploy** (this usually takes 2-3 minutes).

#### 3d. Get your Backend URL

After deployment, Render will show you a URL like:
```
https://learnpath-backend-abc123.onrender.com
```

**Save this URL** — you'll need it for the Vercel deployment.

---

### 4. Deploy Frontend to Vercel

#### 4a. Connect Repository

1. Go to https://vercel.com/dashboard
2. Click **"Add New"** → **"Project"**
3. Select your GitHub repository
4. Vercel will auto-detect it's a Vite project

#### 4b. Configure Build Settings

- **Framework**: `Vite`
- **Build Command**: `npm run build` (should auto-detect)
- **Output Directory**: `dist` (should auto-detect)
- **Install Command**: `npm install`

#### 4c. Add Environment Variable

In the **Environment Variables** section, add:

```
VITE_API_URL=https://[YOUR-RENDER-BACKEND-URL]/api
```

Example:
```
VITE_API_URL=https://learnpath-backend-abc123.onrender.com/api
```

#### 4d. Deploy

Click **"Deploy"** and wait for it to complete (usually 1-2 minutes).

Vercel will give you a URL like:
```
https://learnpath-ab12cd34.vercel.app
```

---

### 5. Update Backend CORS (if needed)

If you get CORS errors when testing the deployed frontend:

1. Go back to Render dashboard
2. Go to your backend service's **Environment** variables
3. Update `CORS_ORIGIN`:
   ```
   CORS_ORIGIN=https://[YOUR-VERCEL-URL].vercel.app
   ```
4. Click **"Save Changes"** (service will redeploy)

---

### 6. Test Your Live Application

1. Open your Vercel URL: `https://learnpath-ab12cd34.vercel.app`
2. Test:
   - ✅ Register a new account
   - ✅ Login
   - ✅ Create learning path
   - ✅ Track progress
   - ✅ Check browser Console for any errors (F12)

**Troubleshooting:**
- **CORS errors**: Check `CORS_ORIGIN` in Render environment variables
- **404 errors**: Verify `VITE_API_URL` in Vercel environment variables
- **Database issues**: Check Render persistent disk is mounted at `/var/data`

---

## Important Notes

### Database Persistence

- SQLite file is stored on Render's persistent disk at `/var/data/learnpath.sqlite`
- **This persists even when the service redeploys** ✅
- If you delete the disk, you'll lose all data

### Security Considerations

1. **Change JWT_SECRET in production** ✅
2. **Set CORS_ORIGIN to your exact Vercel URL** (not `*`)
3. **Keep `.env` files out of GitHub** (they're already in `.gitignore`)
4. **Use strong passwords** for your Render and Vercel accounts

### Monitoring

- **Render**: View logs in dashboard → your service → "Logs" tab
- **Vercel**: View logs in dashboard → your project → "Deployments" tab

### Redeployment

To redeploy after making changes:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

- **Vercel** automatically redeploys on push
- **Render** (free tier) might need manual redeploy if auto-deploy isn't enabled

---

## Environment Variable Reference

### Frontend (Vercel)

```
VITE_API_URL=https://your-render-backend.onrender.com/api
```

### Backend (Render)

```
PORT=5000
NODE_ENV=production
DB_PATH=/var/data/learnpath.sqlite
JWT_SECRET=your_strong_random_secret
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

---

## Rollback if Needed

If something goes wrong:

**Vercel**:
1. Go to Deployments
2. Find the last known good deployment
3. Click **"Promote to Production"**

**Render**:
1. Go to your service
2. Click **"Deploy"** manually with a previous commit

---

## Support

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **SQLite**: Data persists on Render disk, encrypted at rest

Good luck! 🚀
