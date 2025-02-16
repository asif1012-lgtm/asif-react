interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  adminEmails: string[];
}

export const formOneConfig: EmailConfig = {
  host: process.env.FORM_ONE_SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.FORM_ONE_SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.FORM_ONE_SMTP_USER || '',
    pass: process.env.FORM_ONE_SMTP_PASS || ''
  },
  adminEmails: [
    process.env.FORM_ONE_ADMIN_EMAIL || '',
    process.env.FORM_ONE_ADMIN_EMAIL_2 || '',
    process.env.FORM_ONE_ADMIN_EMAIL_3 || ''
  ].filter(Boolean)
};

export const formTwoConfig: EmailConfig = {
  host: process.env.FORM_TWO_SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.FORM_TWO_SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.FORM_TWO_SMTP_USER || '',
    pass: process.env.FORM_TWO_SMTP_PASS || ''
  },
  adminEmails: [
    process.env.FORM_TWO_ADMIN_EMAIL || '',
    process.env.FORM_TWO_ADMIN_EMAIL_2 || '',
    process.env.FORM_TWO_ADMIN_EMAIL_3 || ''
  ].filter(Boolean)
};