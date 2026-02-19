// backend/middleware/validation.js
export const validateBooking = (req, res, next) => {
  const {
    tourId,
    name,
    email,
    phone,
    date,
    guests
  } = req.body;

  const errors = [];
  const normalizedTourId = Number(tourId);
  const normalizedGuests = Number(guests);

  // Required fields
  if (!Number.isInteger(normalizedTourId) || normalizedTourId < 1) {
    errors.push('Valid tour ID is required');
  }
  if (!name || name.trim().length < 2) errors.push('Valid name is required');
  if (!email || !isValidEmail(email)) errors.push('Valid email is required');
  if (!phone || phone.trim().length < 8) errors.push('Valid phone number is required');
  if (!date) errors.push('Date is required');
  if (!Number.isInteger(normalizedGuests) || normalizedGuests < 1 || normalizedGuests > 20) {
    errors.push('Guests must be between 1 and 20');
  }

  // Date validation
  const bookingDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (Number.isNaN(bookingDate.getTime())) {
    errors.push('Valid booking date is required');
  } else if (bookingDate < today) {
    errors.push('Booking date cannot be in the past');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

export const validateContact = (req, res, next) => {
  const { name, email, subject, message } = req.body;

  const errors = [];

  if (!name || name.trim().length < 2) errors.push('Valid name is required');
  if (!email || !isValidEmail(email)) errors.push('Valid email is required');
  if (!subject || subject.trim().length < 3) errors.push('Subject is required');
  if (!message || message.trim().length < 10) errors.push('Message must be at least 10 characters');

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

// Helper function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const rateLimit = (maxRequests = 5, windowMs = 60000) => {
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean up old entries
    if (requests.has(ip)) {
      const userRequests = requests.get(ip).filter(time => time > windowStart);
      requests.set(ip, userRequests);
    }

    const userRequests = requests.get(ip) || [];

    if (userRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests, please try again later'
      });
    }

    userRequests.push(now);
    requests.set(ip, userRequests);

    next();
  };
};

export const validatePagination = (req, res, next) => {
  const page = Number.parseInt(req.query.page ?? '1', 10);
  const limit = Number.parseInt(req.query.limit ?? '20', 10);

  if (!Number.isInteger(page) || page < 1) {
    return res.status(400).json({
      success: false,
      message: 'Invalid page value'
    });
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    return res.status(400).json({
      success: false,
      message: 'Invalid limit value. Allowed range is 1-100'
    });
  }

  req.pagination = { page, limit };
  next();
};
