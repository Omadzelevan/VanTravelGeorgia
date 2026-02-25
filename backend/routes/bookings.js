import express from 'express';
import { rateLimit, validateBooking } from '../middleware/validation.js';
import {
  sendBookingConfirmation,
  sendBookingRequestEmail
} from '../utils/email.js';
import { requireAdminApiKey } from '../middleware/auth.js';
import { getTourById } from '../utils/toursCatalog.js';
import { logger } from '../utils/logger.js';

const router = express.Router();
const bookingStore = [];

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

    const booking = {
      _id: cryptoRandomId(),
      reference: bookingReference,
      tourId: tour.id,
      tourTitle: tour.title,
      date,
      guests: normalizedGuests,
      totalPrice,
      status: 'pending',
      name: normalizedName,
      email: normalizedEmail,
      phone: normalizedPhone,
      message: (message || '').trim(),
      createdAt: new Date().toISOString()
    };

    bookingStore.unshift(booking);

    await Promise.race([
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
        message: booking.message
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Admin email send timed out')), 15_000)
      )
    ]);

    let customerMailDelivered = true;
    try {
      await Promise.race([
        sendBookingConfirmation({
          email: normalizedEmail,
          name: normalizedName,
          tourTitle: tour.title,
          date,
          guests: normalizedGuests,
          totalPrice,
          reference: bookingReference
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Customer email send timed out')), 15_000)
        )
      ]);
    } catch (customerEmailError) {
      customerMailDelivered = false;
      logger.warn('booking_customer_email_failed', {
        reference: bookingReference,
        error: customerEmailError?.message
      });
    }

    res.status(201).json({
      success: true,
      message: customerMailDelivered
        ? 'Booking confirmed and email notification sent'
        : 'Booking confirmed. Confirmation email delivery is delayed.',
      reference: bookingReference,
      customerMailDelivered
    });
  } catch (error) {
    logger.error('booking_send_error', { error: error?.message, stack: error?.stack });
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

router.get('/', requireAdminApiKey, (req, res) => {
  const status = String(req.query.status || '').trim().toLowerCase();
  const page = Math.max(1, Number.parseInt(req.query.page || '1', 10));
  const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit || '20', 10)));
  const filtered = status ? bookingStore.filter((b) => b.status === status) : bookingStore;
  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const bookings = filtered.slice(start, start + limit);

  res.json({
    success: true,
    bookings,
    pagination: { page, pages, total, limit }
  });
});

router.get('/stats/summary', requireAdminApiKey, (req, res) => {
  const total = bookingStore.length;
  const totalRevenue = bookingStore.reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0);
  const byStatusMap = bookingStore.reduce((acc, booking) => {
    const key = booking.status || 'pending';
    if (!acc[key]) acc[key] = { _id: key, count: 0, totalRevenue: 0 };
    acc[key].count += 1;
    acc[key].totalRevenue += Number(booking.totalPrice) || 0;
    return acc;
  }, {});

  res.json({
    success: true,
    stats: {
      total,
      totalRevenue,
      byStatus: Object.values(byStatusMap)
    }
  });
});

router.patch('/:id/status', requireAdminApiKey, (req, res) => {
  const nextStatus = String(req.body?.status || '').trim().toLowerCase();
  const allowed = new Set(['pending', 'confirmed', 'cancelled', 'completed']);
  if (!allowed.has(nextStatus)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status'
    });
  }

  const booking = bookingStore.find((item) => item._id === req.params.id);
  if (!booking) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found'
    });
  }

  booking.status = nextStatus;
  res.json({ success: true, booking });
});

export default router;

function cryptoRandomId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}
