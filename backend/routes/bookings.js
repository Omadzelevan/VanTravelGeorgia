// backend/routes/bookings.js
import express from 'express';
import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import { sendAdminNotification, sendBookingConfirmation } from '../utils/email.js';
import { rateLimit, validateBooking, validatePagination } from '../middleware/validation.js';
import { requireAdminApiKey } from '../middleware/auth.js';
import { getTourById } from '../utils/toursCatalog.js';

const router = express.Router();
const adminOnly = [requireAdminApiKey];

// Create new booking
router.post('/', rateLimit(8, 60_000), validateBooking, async (req, res) => {
  try {
    const {
      tourId,
      name,
      email,
      phone,
      date,
      guests,
      message
    } = req.body;

    const tour = getTourById(tourId);
    if (!tour) {
      return res.status(400).json({
        success: false,
        message: 'Selected tour does not exist'
      });
    }

    const normalizedGuests = Number(guests);
    const pricePerPerson = tour.price;
    const totalPrice = Number((pricePerPerson * normalizedGuests).toFixed(2));

    // Create booking
    const booking = new Booking({
      tourId: tour.id,
      tourTitle: tour.title,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      date,
      guests: normalizedGuests,
      message: message?.trim() || '',
      pricePerPerson,
      totalPrice,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    await booking.save();

    // Generate booking reference
    const reference = booking.generateReference();

    // Send confirmation email
    try {
      await sendBookingConfirmation({
        email: booking.email,
        name: booking.name,
        tourTitle: booking.tourTitle,
        date,
        guests: normalizedGuests,
        totalPrice,
        reference
      });
    } catch (emailError) {
      console.error('Email send error:', emailError);
      // Don't fail the booking if email fails
    }

    try {
      await sendAdminNotification(booking);
    } catch (notifyError) {
      console.error('Admin notification error:', notifyError);
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: {
        id: booking._id,
        reference,
        tourTitle: booking.tourTitle,
        date: booking.formattedDate,
        guests: booking.guests,
        totalPrice: booking.totalPrice,
        status: booking.status
      }
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking'
    });
  }
});

// Get all bookings (Admin)
router.get('/', ...adminOnly, validatePagination, async (req, res) => {
  try {
    const { status } = req.query;
    const { page, limit } = req.pagination;

    const query = status ? { status } : {};
    const skip = (page - 1) * limit;

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
});

// Get booking by ID
router.get('/:id', ...adminOnly, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking id'
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      booking: {
        ...booking.toObject(),
        reference: booking.generateReference()
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking'
    });
  }
});

// Update booking status (Admin)
router.patch('/:id/status', ...adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking id'
      });
    }
    
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking status updated',
      booking
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update booking'
    });
  }
});

// Cancel booking
router.delete('/:id', ...adminOnly, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking id'
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking'
    });
  }
});

// Customer lookup by email + booking reference
router.get('/customer/:email', async (req, res) => {
  try {
    const reference = String(req.query.reference || '').trim().toUpperCase();
    if (!reference) {
      return res.status(400).json({
        success: false,
        message: 'Booking reference is required'
      });
    }

    const booking = await Booking.findOne({
      email: req.params.email.toLowerCase(),
      reference
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      booking: {
        ...booking.toObject(),
        reference: booking.generateReference()
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
});

// Get booking statistics (Admin)
router.get('/stats/summary', ...adminOnly, async (req, res) => {
  try {
    const stats = await Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' }
        }
      }
    ]);

    const totalBookings = await Booking.countDocuments();
    const totalRevenue = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    res.json({
      success: true,
      stats: {
        total: totalBookings,
        totalRevenue: totalRevenue[0]?.total || 0,
        byStatus: stats
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

export default router;
