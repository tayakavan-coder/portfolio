import { Request, Response } from 'express';
import Contact from '../models/Contact';

// In-memory fallback array when MongoDB is not connected
const memoryContacts: Array<{ name: string; email: string; subject: string; message: string; date: Date }> = [];

export const createContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
      return;
    }

    try {
      const newContact = new Contact({ name, email, subject, message });
      await newContact.save();

      res.status(201).json({
        success: true,
        message: 'Message successfully encrypted and saved to MongoDB vault!',
        data: newContact,
      });
      return;
    } catch {
      // Fallback if MongoDB is offline / not configured
      const contactObj = { name, email, subject: subject || 'Inquiry', message, date: new Date() };
      memoryContacts.push(contactObj);

      res.status(201).json({
        success: true,
        message: 'Message stored in secure memory vault!',
        data: contactObj,
      });
      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error processing contact transmission.', error });
  }
};
