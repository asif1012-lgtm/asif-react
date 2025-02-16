# Email Configuration Form One
FORM_ONE_SMTP_HOST=smtp.gmail.com
FORM_ONE_SMTP_PORT=587
FORM_ONE_SMTP_USER=your-email@gmail.com
FORM_ONE_SMTP_PASS=your-app-specific-password
FORM_ONE_ADMIN_EMAIL=admin1@example.com

# Email Configuration Form Two
FORM_TWO_SMTP_HOST=smtp.gmail.com
FORM_TWO_SMTP_PORT=587
FORM_TWO_SMTP_USER=your-email@gmail.com
FORM_TWO_SMTP_PASS=your-app-specific-password
FORM_TWO_ADMIN_EMAIL=admin1@example.com

# Server Configuration
NODE_ENV=production
VITE_API_URL=https://your-vercel-app-url.vercel.app
```

### Deployment Steps

1. Connect your GitHub repository with Vercel:
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will automatically detect the project settings

2. Configure Environment Variables:
   - Go to your project settings in Vercel
   - Navigate to the Environment Variables section
   - Add all the required environment variables listed above

3. Deploy:
   - Vercel will automatically deploy your application
   - Each push to the main branch will trigger a new deployment

### Development

To run the project locally:

```bash
npm install
npm run dev