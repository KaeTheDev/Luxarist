/**
 * File: controllers/productController.ts
 * Purpose:
 *   Handle product-related API logic for the Luxarist store.
 *   This controller fetches all active products for public viewing.
 *
 * Responsibilities:
 *   - Query the database for products with status 'active'
 *   - Optionally filter or paginate results (extendable)
 *   - Return products as JSON
 *   - Handle errors gracefully
 */

import { Request, Response } from "express";
import { Types } from "mongoose";
import { Product } from "../models/Product";
import { Category } from "../models/Category";

// GET /products
export const getActiveProducts = async (req: Request, res: Response) => {
  try {
    // Step 1: Extract Inputs
    const { category, limit, skip, isNewArrival } = req.query;

    // Step 2: Validate Inputs (optional)
    if(category && typeof category !== "string") {
      return res.status(400).json({ message: "Invalid category parameter" });
    }

    // Step 3: Build Base Query
    const query: any = { status: "active" };

    // Step 4: If Category Provided -> Findd Category by Slug
    if(category){
      const foundCategory = await Category.findOne({ slug: category });

      if(!foundCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      query.category = foundCategory._id;
    }

    // Step 5: New Arrivals Filter
    if(isNewArrival === "true") {
      query.isNewArrival = true;
    }

    // Step 6: Fetch Products
    const products = await Product.find(query)
    .populate("category", "name slug")
    .limit(limit ? Number(limit) : 0)
    .skip(skip ? Number(skip) : 0)
    .sort({ createdAt: -1});

    // Step 7: Authorize
    // Not required for public products

    // Step 8: Perform Action
    // Already done: fetching and filtering products

    // Step 9: Respond
    res.status(200).json(products);
  } catch (error: any) {
    // Step 10: Catch & Fail Safely
    console.error(error);
    res.status(500).json({ message: "Server error fetching products" });
  }
};

// GET /products/:id
export const getActiveProduct = async (req: Request, res: Response) => {
  try {
    // Step 1: Extract Inputs
    const { id } = req.params;

    // Ensure it's a string
    if (typeof id !== "string") {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Step 2: Validate ObjectId
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Step 3: Fetch resource
    const product = await Product.findOne({ _id: id, status: "active" })
      .populate("category", "name slug");

    // Step 4: Authorize
    // Not required for public products

    // Step 5: Perform Action
    // Already done: fetching products and applying optional filters

    // Step 6: Respond
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error: any) {
    // Step 7: Catch & Fail Safely
    console.error(error);
    res.status(500).json({ message: "Server error fetching product" });
  }
};

// GET /products/slug/:slug
export const getProductBySlug = async(req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    if(!slug || typeof slug !== "string"){
      return res.status(400).json({ message: "A valid product slug is required" });
    }

    // Fetch the product by slug and populate category details
   const product = await Product.findOne({ slug: slug, status: "active" })
  .populate("category", "name slug");

    if(!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch(error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching product by slug" });
  }
};

// GET /products/category/:category 
export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    // Step 1: Extract Inputs
    const { category } = req.params;
    const { minPrice, maxPrice, sort = "newest", page="1", limit = "12" } = req.query;

    // Step 2: Validate category param
    if(typeof category !== "string") {
      return res.status(400).json({ message: "Invalid category parameter" });
    }

    // Step 3: Fetch Primary Resource (Finda Category by slug)
    const foundCategory = await Category.findOne({ slug: category });

    if(!foundCategory) {
      return res.status(404).json({ message: "Category not found"});
    }

    // Step 4: Build base product query
    const query: any = {
      status: "active",
      category: foundCategory._id,
    };

    // Step 5: Price Filtering
    const parsedMin = minPrice ? Number(minPrice) : undefined;
    const parsedMax = maxPrice ? Number(maxPrice) : undefined;

    // Validate parsed price values
    if((parsedMin !== undefined && isNaN(parsedMin)) || (parsedMax !== undefined && isNaN(parsedMax))) {
      return res.status(400).json({ message: "Invalid price filter values" });
    }

    // Apply price filter to query if valid
    if(parsedMin !== undefined || parsedMax !== undefined) {
      query.price = {};
      if(parsedMin !== undefined) query.price.$gte = parsedMin;
      if(parsedMax !== undefined) query.price.$lte = parsedMax;
    }

    // Step 6: Sorting Logic
    let sortOption: any = { createdAt: -1 }; // default: newest first
    if(sort === "price_asc") sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };
    if (sort === "name_asc") sortOption = { name: 1 };
    if (sort === "name_desc") sortOption = { name: -1 };

    // Step 7: Safe Pagination
    const pageNumber = Math.max(1, Number(page) || 1); // default to 1 if invalid
    const limitNumber = Math.min(50, Math.max(1, Number(limit) || 12)); // max 50 per page
    const skip = (pageNumber - 1) * limitNumber;

    // Step 8: Execute queries in parallel (fetch products and count)
    const [products, total] = await Promise.all([
      Product.find(query)
        .populate("category", "name slug")
        .sort(sortOption)
        .skip(skip)
        .limit(limitNumber),
      Product.countDocuments(query),
    ]);

    // Step 9: Respond with structured data
    res.status(200).json({
      products,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        pages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error: any) {
    // Step 10: Catch & Fail Safely
    console.error(error);
    res.status(500).json({ message: "Server error fetching products" });
  }
};

/**
 * --- ADMIN CONTROLLERS (The Equivalence Bridge) ---
 */

// GET /admin/products (Admin Only)
export const getAllProductsAdmin = async (req: Request, res: Response) => {
  try {
    // No status filter here - Admin needs to see 'inactive' items to toggle them
    const products = await Product.find({})
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Admin fetch failed" });
  }
};

// POST /admin/products (Create New Piece)
export const createProduct = async (req: Request, res: Response) => {
  try {
    // This is where the Admin Dashboard 'Save' button lands
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE an existing piece (e.g., toggling status or updating price)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a piece
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};