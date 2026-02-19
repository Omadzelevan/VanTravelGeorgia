// backend/models/Booking.js
import mongoose from 'mongoose';

function buildBookingReference(objectId) {
  const timestamp = objectId.getTimestamp();
  const year = timestamp.getFullYear();
  const month = String(timestamp.getMonth() + 1).padStart(2, '0');
  const idPart = objectId.toString().slice(-6).toUpperCase();
  return `VTG${year}${month}${idPart}`;
}

const bookingSchema = new mongoose.Schema({
  // Tour Information
  tourId: {
    type: Number,
    required: true
  },
  tourTitle: {
    type: String,
    required: true
  },
  
  // Customer Information
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  
  // Booking Details
  date: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    required: true,
    min: 1,
    max: 20
  },
  message: {
    type: String,
    default: ''
  },
  
  // Pricing
  pricePerPerson: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },

  reference: {
    type: String,
    unique: true,
    index: true
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  
  // Payment
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'deposit', 'paid', 'refunded'],
    default: 'unpaid'
  },
  
  // Metadata
  language: {
    type: String,
    default: 'en'
  },
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true
});

// Indexes for faster queries
bookingSchema.index({ email: 1 });
bookingSchema.index({ date: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ createdAt: -1 });
bookingSchema.index({ email: 1, reference: 1 });

bookingSchema.pre('validate', function(next) {
  if (!this.reference && this._id) {
    this.reference = buildBookingReference(this._id);
  }
  next();
});

// Virtual for formatted date
bookingSchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Method to generate booking reference
bookingSchema.methods.generateReference = function() {
  return this.reference || buildBookingReference(this._id);
};

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
