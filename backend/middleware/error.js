import { logger } from '../utils/logger.js';

export const notFoundHandler = (req, res) => {
  logger.warn('route_not_found', {
    method: req.method,
    path: req.originalUrl
  });
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
};

export const errorHandler = (err, req, res, _next) => {
  logger.error('unhandled_error', {
    method: req.method,
    path: req.originalUrl,
    error: err?.message,
    stack: err?.stack
  });

  const statusCode = err.statusCode || 500;
  const isProd = process.env.NODE_ENV === 'production';

  res.status(statusCode).json({
    success: false,
    message: isProd ? 'Internal server error' : err.message
  });
};
