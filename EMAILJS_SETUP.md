# EmailJS Setup Guide

## Step 1: Create an Email Service
1. Go to https://dashboard.emailjs.com/admin/integration
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions
5. **Copy your Service ID** (you'll need this)

## Step 2: Create an Email Template
1. Go to https://dashboard.emailjs.com/admin/template
2. Click "Create New Template"
3. Set up your template like this:

**Subject:** Contact Form Message from {{from_name}}

**Content:**
```
You have received a new message from your portfolio contact form.

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio website.
```

4. **Copy your Template ID** (you'll need this)

## Step 3: Get Your Public Key
1. Go to https://dashboard.emailjs.com/admin/integration
2. Find "Public Key" section
3. **Copy your Public Key** (you'll need this)

## Step 4: Create .env file
Create a `.env` file in the project root with:
```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Replace the placeholder values with your actual values from EmailJS.

