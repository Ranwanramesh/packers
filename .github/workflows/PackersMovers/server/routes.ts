import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

// Configure nodemailer (using environment variables)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "your-email@gmail.com",
    pass: process.env.SMTP_PASS || "your-app-password",
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Inquiry form submission
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      
      // Send email notification
      const emailHtml = `
        <h2>New Moving Inquiry from Swastik Packers and Movers Website</h2>
        <p><strong>Name:</strong> ${inquiry.name}</p>
        <p><strong>Email:</strong> ${inquiry.email}</p>
        <p><strong>Contact:</strong> ${inquiry.contact}</p>
        <p><strong>Moving Date:</strong> ${inquiry.movingDate}</p>
        <p><strong>Moving From:</strong> ${inquiry.movingFrom}</p>
        <p><strong>Moving To:</strong> ${inquiry.movingTo}</p>
        <p><strong>Property Type:</strong> ${inquiry.propertyType}</p>
        <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
      `;

      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER || "noreply@swastikpackersandmovers.com",
          to: "testus@mymail",
          subject: `New Moving Inquiry - ${inquiry.name}`,
          html: emailHtml,
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Continue with success response even if email fails
      }

      res.json({ success: true, message: "Inquiry submitted successfully!", inquiry });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to submit inquiry" });
      }
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      // Send email notification
      const emailHtml = `
        <h2>New Contact Message from Swastik Packers and Movers Website</h2>
        <p><strong>Name:</strong> ${message.name}</p>
        <p><strong>Email:</strong> ${message.email}</p>
        <p><strong>Phone:</strong> ${message.phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${message.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.message}</p>
        <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
      `;

      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER || "noreply@swastikpackersandmovers.com",
          to: "testus@mymail",
          subject: `Contact Form - ${message.subject}`,
          html: emailHtml,
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Continue with success response even if email fails
      }

      res.json({ success: true, message: "Message sent successfully!", contactMessage: message });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to send message" });
      }
    }
  });

  // Get inquiries (for admin purposes)
  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json({ success: true, inquiries });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch inquiries" });
    }
  });

  // Get contact messages (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json({ success: true, messages });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
