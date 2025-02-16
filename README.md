# React Contact Form Application

## Deployment Instructions for Vercel

### Prerequisites
- A Vercel account
- The Vercel CLI installed (optional)

### Environment Variables
Make sure to set up the following environment variables in your Vercel project settings:

```env
# Email Configuration Form One
FORM_ONE_SMTP_HOST=smtp.gmail.com
FORM_ONE_SMTP_PORT=587
FORM_ONE_SMTP_USER=your-email@gmail.com
FORM_ONE_SMTP_PASS=your-app-specific-password
FORM_ONE_ADMIN_EMAIL=admin1@example.com
FORM_ONE_ADMIN_EMAIL_2=admin2@example.com
FORM_ONE_ADMIN_EMAIL_3=admin3@example.com

# Email Configuration Form Two
FORM_TWO_SMTP_HOST=smtp.gmail.com
FORM_TWO_SMTP_PORT=587
FORM_TWO_SMTP_USER=your-email@gmail.com
FORM_TWO_SMTP_PASS=your-app-specific-password
FORM_TWO_ADMIN_EMAIL=admin1@example.com
FORM_TWO_ADMIN_EMAIL_2=admin2@example.com
FORM_TWO_ADMIN_EMAIL_3=admin3@example.com

# Server Configuration
NODE_ENV=production
VITE_API_URL=https://your-vercel-app-url.vercel.app
```

### Deployment Steps

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your project to Vercel:
   - Go to https://vercel.com/new
   - Select your repository
   - Vercel will automatically detect the project type

3. Configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

4. Set up environment variables:
   - Go to your project settings in Vercel
   - Navigate to the Environment Variables section
   - Add all the required environment variables listed above

5. Deploy:
   - Click "Deploy" and Vercel will build and deploy your application
   - Once deployed, your application will be available at your Vercel URL

### Development

To run the project locally:

```bash
npm install
npm run dev
```

The application will be available at http://localhost:5000

### Notes
- Make sure all API routes are properly configured in vercel.json
- The application uses Node.js version 20.x
- Ensure all environment variables are set before deployment
