# Deployment Guide

## Setting up GitHub Secrets

Since `.env` files aren't deployed to GitHub Pages, you need to add your EmailJS credentials as GitHub Secrets:

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these three secrets:

   - **Name:** `VITE_EMAILJS_SERVICE_ID`
     **Value:** Your EmailJS Service ID (from your .env file)

   - **Name:** `VITE_EMAILJS_TEMPLATE_ID`
     **Value:** Your EmailJS Template ID (from your .env file)

   - **Name:** `VITE_EMAILJS_PUBLIC_KEY`
     **Value:** Your EmailJS Public Key (from your .env file)

## Enabling GitHub Pages

1. Go to your repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
3. Save the settings

## Deploying

### Option 1: Automatic Deployment (Recommended)
- Push to the `main` branch
- GitHub Actions will automatically build and deploy your site

### Option 2: Manual Deployment
- Go to **Actions** tab in your repository
- Select "Deploy to GitHub Pages" workflow
- Click **Run workflow** → **Run workflow**

## Local Development

For local development, use your `.env` file. The GitHub Actions workflow will use GitHub Secrets for production builds.

## Notes

- The workflow builds your site with the environment variables from GitHub Secrets
- Your `.env` file stays local and won't be committed (it's in `.gitignore`)
- After deployment, your contact form will work on the live site!

