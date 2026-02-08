import { Request, Response } from 'express';
import { Product } from '../models/Product';

/**
 * TEST ONLY
 * Verifies database connectivity and product retrieval.
 */
export const printProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();

    res.json({
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch products',
      error,
    });
  }
};