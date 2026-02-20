import express from 'express';
import { validateContact, rateLimit } from '../middleware/validation.js';
import { sendContactEmail } from '../utils/email.js';

const router = express.Router();

router.post('/', rateLimit(5, 60_000), validateContact, async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    await Promise.race([
      sendContactEmail({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: (phone || '').trim(),
        subject: subject.trim(),
        message: message.trim()
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Email send timed out')), 15_000)
      )
    ]);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Contact send error:', error);
    if (String(error?.message || '').toLowerCase().includes('timed out')) {
      return res.status(202).json({
        success: true,
        message: 'Message received. Delivery may be delayed.'
      });
    }
    res.status(500).json({
      success: false,
      message: error?.message || 'Failed to send message'
    });
  }
});

export default router;
