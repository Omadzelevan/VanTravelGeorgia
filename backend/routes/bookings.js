import express from 'express';
import { rateLimit, validateBooking } from '../middleware/validation.js';
import {
  sendBookingConfirmation,
  sendBookingRequestEmail
} from '../utils/email.js';
import { getTourById } from '../utils/toursCatalog.js';

const router = express.Router();

router.post('/', rateLimit(8, 60_000), validateBooking, async (req, res) => {
  try {
    const { tourId, name, email, phone, date, guests, message } = req.body;
    const tour = getTourById(tourId);
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim();
    const normalizedGuests = Number(guests);
    const totalPrice = tour ? tour.price * normalizedGuests : 0;
    const bookingReference = `VTG-${Date.now().toString().slice(-8)}`;

    if (!tour) {
      return res.status(400).json({
        success: false,
        message: 'Selected tour does not exist'
      });
    }

    await Promise.race([
      Promise.all([
        sendBookingRequestEmail({
          tourId: tour.id,
          tourTitle: tour.title,
          pricePerPerson: tour.price,
          totalPrice,
          name: normalizedName,
          email: normalizedEmail,
          phone: normalizedPhone,
          date,
          guests: normalizedGuests,
          message: (message || '').trim()
        }),
        sendBookingConfirmation({
          email: normalizedEmail,
          name: normalizedName,
          tourTitle: tour.title,
          date,
          guests: normalizedGuests,
          totalPrice,
          reference: bookingReference
        })
      ]),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Email send timed out')), 15_000)
      )
    ]);

    res.status(201).json({
      success: true,
      message: 'Booking confirmed and email notification sent',
      reference: bookingReference
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
