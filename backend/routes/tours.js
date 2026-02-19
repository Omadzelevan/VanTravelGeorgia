import express from 'express';
import { getTourById, toursCatalog } from '../utils/toursCatalog.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    tours: toursCatalog
  });
});

router.get('/:id', (req, res) => {
  const tour = getTourById(req.params.id);

  if (!tour) {
    return res.status(404).json({
      success: false,
      message: 'Tour not found'
    });
  }

  res.json({
    success: true,
    tour
  });
});

export default router;
