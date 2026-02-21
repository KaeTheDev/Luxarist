import { Request, Response } from 'express';
import { Product } from '../models/Product';
import '../models/Category';

/**
 * TEST ONLY
 * Verifies database connectivity and product retrieval.
 */

export const printProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find().populate('category', 'name slug featuredImage',);

    res.json({
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch products',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};