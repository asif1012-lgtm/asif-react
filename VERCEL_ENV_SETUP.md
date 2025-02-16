# Vercel Environment Variables Setup Guide

## Required Environment Variables

### API Configuration
```env
VITE_API_URL=https://your-vercel-app-url.vercel.app
NODE_ENV=production
```

### Form One Email Configuration
```env
FORM_ONE_SMTP_HOST=smtp.gmail.com
FORM_ONE_SMTP_PORT=587
FORM_ONE_SMTP_USER=your-email@gmail.com
FORM_ONE_SMTP_PASS=your-app-specific-password
FORM_ONE_ADMIN_EMAIL=admin1@example.com
FORM_ONE_ADMIN_EMAIL_2=admin2@example.com  # Optional
FORM_ONE_ADMIN_EMAIL_3=admin3@example.com  # Optional
```

### Form Two Email Configuration
```env
FORM_TWO_SMTP_HOST=smtp.gmail.com
FORM_TWO_SMTP_PORT=587
FORM_TWO_SMTP_USER=your-email@gmail.com
FORM_TWO_SMTP_PASS=your-app-specific-password
FORM_TWO_ADMIN_EMAIL=admin1@example.com
FORM_TWO_ADMIN_EMAIL_2=admin2@example.com  # Optional
FORM_TWO_ADMIN_EMAIL_3=admin3@example.com  # Optional
```

## Setup Instructions

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add each variable individually:
   - Click "Add New"
   - Enter the variable name (e.g., FORM_ONE_SMTP_HOST)
   - Enter the corresponding value
   - Select all environments (Production, Preview, Development)
   - Click "Save"

## Important Notes

- The `VITE_API_URL` should match your Vercel deployment URL
- For local development, these variables should be in your `.env` file
- Never commit actual credentials to version control
- Use app-specific passwords for Gmail SMTP
- Test the email functionality after deployment by submitting test forms

## Verifying Configuration

After deploying:
1. Submit a test form to verify email delivery
2. Check server logs in Vercel dashboard for any configuration issues
3. Verify that both forms are working correctly with their respective SMTP configurations
