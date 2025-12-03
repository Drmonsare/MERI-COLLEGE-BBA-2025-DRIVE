# 🚀 Deploy MERI Student Directory to Vercel

## Quick Deployment Guide

### Prerequisites
✅ Vercel account (free tier works perfectly)
✅ Git installed on your computer
✅ GitHub/GitLab/Bitbucket account

---

## 📋 **Deployment Steps**

### **Option 1: Deploy via Vercel CLI (Fastest)**

#### Step 1: Install Vercel CLI
```powershell
npm install -g vercel
```

#### Step 2: Login to Vercel
```powershell
vercel login
```
- Follow the browser authentication

#### Step 3: Navigate to Project
```powershell
cd "C:\Users\Administrator\Downloads\Enroll Web\meri-student-directory"
```

#### Step 4: Deploy
```powershell
vercel
```
- Press Enter to accept defaults
- Choose your Vercel account
- Confirm project settings

#### Step 5: Deploy to Production
```powershell
vercel --prod
```

**🎉 Done! Your site is live!**

---

### **Option 2: Deploy via GitHub + Vercel Dashboard (Recommended)**

#### Step 1: Initialize Git Repository
```powershell
cd "C:\Users\Administrator\Downloads\Enroll Web\meri-student-directory"
git init
git add .
git commit -m "Initial commit - MERI Student Directory (BBA 2025)"
```

#### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Name: `meri-student-directory`
3. Keep it **Private** (recommended for student data)
4. Click **Create repository**

#### Step 3: Push to GitHub
```powershell
git remote add origin https://github.com/YOUR_USERNAME/meri-student-directory.git
git branch -M main
git push -u origin main
```

#### Step 4: Connect to Vercel
1. Go to https://vercel.com/
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your `meri-student-directory` repo
5. Click **"Import"**

#### Step 5: Configure Project
- **Framework Preset**: Vite
- **Root Directory**: `./` (leave as is)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Step 6: Deploy
- Click **"Deploy"**
- Wait 2-3 minutes for build to complete
- **🎉 Your site is live!**

---

## 🔧 **Important Configuration**

### Environment Variables (if needed)
If you need to add environment variables:
1. Go to Project Settings → Environment Variables
2. Add:
   - `NODE_ENV` = `production`

### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

---

## 📁 **Files Added for Vercel Deployment**

✅ `vercel.json` - Vercel configuration
- Routes API calls to backend
- Serves frontend from /dist
- Production environment settings

✅ `.vercelignore` - Files to exclude from deployment
- Excludes source files (only deploys built files)
- Reduces deployment size

✅ `package.json` - Updated scripts
- Added `vercel-build` script
- Added `start` script for production

---

## 🌐 **Your Deployed URLs**

After deployment, you'll get:
- **Production URL**: `https://meri-student-directory-xxx.vercel.app`
- **Preview URLs**: Created automatically for each git push

---

## 🔄 **Auto-Deploy on Git Push**

Once connected to GitHub:
- Every `git push` to `main` branch = **Production deploy**
- Every `git push` to other branches = **Preview deploy**

---

## 📊 **What Gets Deployed**

✅ **Frontend**: React + TypeScript + Tailwind (built to /dist)
✅ **Backend API**: Express server at `/api/*` routes
✅ **Student Data**: 241 students (both shifts)
✅ **All Features**: Search, filters, pagination, export, print

---

## 🐛 **Troubleshooting**

### Build Fails?
```powershell
# Test build locally first
npm run build
```

### API Not Working?
- Check `vercel.json` routes are correct
- Verify backend is using ES modules (we already fixed this)

### Port Issues?
- Vercel auto-assigns ports (no need to configure)

---

## 📱 **After Deployment**

Your live site will have:
- ✅ Fast CDN delivery worldwide
- ✅ HTTPS by default (secure)
- ✅ Automatic builds on git push
- ✅ 99.99% uptime
- ✅ Free SSL certificate
- ✅ Global edge network

---

## 🎯 **Next Steps After Deployment**

1. **Test the live site** thoroughly
2. **Share the URL** with your team
3. **Set up custom domain** (optional)
4. **Enable analytics** in Vercel dashboard
5. **Monitor performance** metrics

---

## 💡 **Tips**

- **Free Tier**: Perfect for this project (100GB bandwidth/month)
- **Private Repo**: Keep student data secure
- **Environment Variables**: Store sensitive data there
- **Preview Deployments**: Test changes before going live

---

## 📞 **Need Help?**

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

---

**Last Updated**: December 3, 2025
**Status**: Ready for Deployment ✅
