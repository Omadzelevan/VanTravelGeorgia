import crypto from 'crypto';

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));

  if (left.length !== right.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, right);
}

export const requireAdminApiKey = (req, res, next) => {
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey) {
    return res.status(500).json({
      success: false,
      message: 'Server admin key is not configured'
    });
  }

  const providedKey = req.get('x-admin-api-key');
  if (!providedKey || !safeEqual(providedKey, expectedKey)) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    });
  }

  next();
};
