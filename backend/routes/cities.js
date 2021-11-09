import express, { Router } from 'express';

import { getCities, createCity, deleteCity, updateCity } from '../controllers/cities.js';

const router = express.Router();

router.get('/', getCities);
router.post('/', createCity);
router.post('/:id/delete', deleteCity);
router.post('/:id/update', updateCity);

export default router;