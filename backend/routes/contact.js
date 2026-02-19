import express from 'express';
import { validateContact, rateLimit } from '../middleware/validation.js';
import { sendContactEmail } from '../utils/email.js';

const router = express.Router();

router.post('/', rateLimit(5, 60_000), validateContact, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    await sendContactEmail({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
});

export default router;
