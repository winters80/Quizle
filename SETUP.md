# Quiz Night — Setup Guide

## Step 1: Create a Firebase Project

1. Go to **https://console.firebase.google.com**
2. Click **"Add project"**
3. Name it (e.g., `quiz-night`) → Continue through the prompts → Create project

## Step 2: Add a Web App

1. In your project dashboard, click the **`</>`** (Web) icon
2. Register your app with a nickname (e.g., `quiz-night`)
3. You'll see a config block like this — copy the values:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

4. Open `js/config.js` and paste your values into the matching fields

## Step 3: Enable Firestore Database

1. In the Firebase console left sidebar, click **Firestore Database**
2. Click **Create database**
3. Select **Start in production mode** → Choose a region (e.g., `us-central`) → Enable
4. Go to the **Rules** tab and paste the contents of `firestore.rules`, then click **Publish**

## Step 4: Restrict Your API Key (Important!)

Since this is a public GitHub repo, restrict the API key to your domain:

1. Go to **Google Cloud Console → APIs & Services → Credentials**
2. Click on your API key
3. Under **Application restrictions**, select **HTTP referrers**
4. Add your GitHub Pages URL: `https://YOUR_USERNAME.github.io/*`
5. Save

## Step 5: Deploy to GitHub Pages

1. Push this entire folder to a **public** GitHub repository
2. Go to **Settings → Pages**
3. Under **Source**, select **Deploy from a branch** → Branch: `main` → Folder: `/ (root)`
4. Save — your site will be live at `https://YOUR_USERNAME.github.io/REPO_NAME/`

## Step 6: First-Time App Setup

1. Visit your site
2. Go to `/admin.html`
3. The first time you visit, it will prompt you to **set an admin password** — this is your permanent admin password
4. Once set, click **"Import Default Questions"** to load all 200 questions into Firestore
5. You're ready to play!

## Step 7: Ongoing Admin

- New users register from the home page → they appear in your admin panel as **Pending**
- You approve or reject them from `/admin.html`
- You can add/edit/delete questions from the admin panel
- Weekly winner is displayed automatically every Friday; monthly winner on the 1st of each month

## Notes

- **No email needed** — admin panel only, you approve users manually
- **Passwords** are hashed with SHA-256 before storing in Firestore — never stored in plain text
- **Questions** are stored in Firestore — you can add unlimited custom questions via the admin panel
- **Game codes** are 6-character alphanumeric codes shared between players to join a session
