import express from 'express';
import { rateLimit, validateBooking } from '../middleware/validation.js';
import { sendBookingRequestEmail } from '../utils/email.js';
import { getTourById } from '../utils/toursCatalog.js';

const router = express.Router();

router.post('/', rateLimit(8, 60_000), validateBooking, async (req, res) => {
  try {
    const { tourId, name, email, phone, date, guests, message } = req.body;
    const tour = getTourById(tourId);
    if (!tour) {
      return res.status(400).json({
        success: false,
        message: 'Selected tour does not exist'
      });
    }

    await Promise.race([
      sendBookingRequestEmail({
        tourId: tour.id,
        tourTitle: tour.title,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        date,
        guests: Number(guests),
        message: (message || '').trim()
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
    console.error('Booking send error:', error);
    if (String(error?.message || '').toLowerCase().includes('timed out')) {
      return res.status(202).json({
        success: true,
        message: 'Message received. Delivery may be delayed.'
      });
    }

    res.status(500).json({
      success: false,
      message: error?.message || 'Failed to send booking request'
    });
  }
});

export default router;
