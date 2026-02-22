import { Router } from 'express';
import { printProducts } from '../../controllers/productTestController';

const router = Router();

/**
 * TEST ROUTE
 * Use only for development verification.
 */
router.get('/products', printProducts);

export default router;