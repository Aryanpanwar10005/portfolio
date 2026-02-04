# Quick Deployment Guide for aryanpanwar.in

## 🚀 Fastest Way to Deploy (GitHub Pages)

### Step 1: Create GitHub Repository

```bash
cd c:\Projects\aryanpanwar-portfolio
git init
git add .
git commit -m "Initial commit: Portfolio website"
```

### Step 2: Push to GitHub

```bash
# Create a new repository on GitHub named "aryanpanwar.in" or any name
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Step 4: Configure Custom Domain (aryanpanwar.in)

#### A. In GitHub:

1. Go to **Settings** → **Pages**
2. Under "Custom domain", enter: `aryanpanwar.in`
3. Click **Save**
4. Check "Enforce HTTPS" (wait a few minutes for SSL certificate)

#### B. In Your Domain Registrar (where you bought aryanpanwar.in):

**Add these DNS records:**

| Type  | Name/Host | Value/Points To         | TTL  |
| ----- | --------- | ----------------------- | ---- |
| A     | @         | 185.199.108.153         | 3600 |
| A     | @         | 185.199.109.153         | 3600 |
| A     | @         | 185.199.110.153         | 3600 |
| A     | @         | 185.199.111.153         | 3600 |
| CNAME | www       | YOUR_USERNAME.github.io | 3600 |

**Example for popular registrars:**

**GoDaddy:**

1. Log in → My Products → DNS
2. Add the A records and CNAME as shown above

**Namecheap:**

1. Dashboard → Domain List → Manage → Advanced DNS
2. Add the A records and CNAME as shown above

**Cloudflare:**

1. DNS → Add records as shown above
2. Make sure proxy status is "DNS only" (gray cloud) initially

### Step 5: Wait for DNS Propagation

- DNS changes can take 24-48 hours to propagate globally
- Usually works within 1-2 hours
- Check status: https://www.whatsmydns.net/

### Step 6: Verify

1. Visit `https://aryanpanwar.in` (may take time for DNS)
2. Visit `https://www.aryanpanwar.in` (should also work)
3. Both should show your portfolio with HTTPS 🎉

---

## 🔧 Alternative: Vercel (Even Faster!)

### One-Command Deploy:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd c:\Projects\aryanpanwar-portfolio
vercel --prod
```

### Configure Domain:

1. Vercel will ask about your domain
2. Enter `aryanpanwar.in`
3. Follow the DNS instructions Vercel provides
4. Done! ✨

---

## 📝 Post-Deployment Checklist

- [ ] Test on mobile devices
- [ ] Test all links (GitHub, LinkedIn, Email)
- [ ] Verify HTTPS is working
- [ ] Check Google Search Console (submit sitemap)
- [ ] Test page speed: https://pagespeed.web.dev/
- [ ] Share your portfolio! 🎊

---

## 🆘 Troubleshooting

**"Site not loading after 24 hours"**

- Check DNS records are correct
- Use `nslookup aryanpanwar.in` to verify DNS
- Clear browser cache

**"HTTPS not working"**

- Wait 24 hours after DNS propagation
- Re-check "Enforce HTTPS" in GitHub Pages settings

**"www subdomain not working"**

- Verify CNAME record for `www` is correct
- Some registrars need `www.aryanpanwar.in` as the name

---

## 📧 Need Help?

Contact: aryanpanwar10005@gmail.com

**Happy Deploying! 🚀**
