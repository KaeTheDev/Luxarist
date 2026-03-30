import { Response } from "express";
import { AuthRequest } from "../types/auth";
import { SiteContent } from "../models/SiteContent";
 
/**
 * @desc    Fetch current site content (public — used by frontend)
 * @route   GET /api/site-content
 * @access  Public
 */
export async function getSiteContent(req: AuthRequest, res: Response) {
  try {
    // findOneAndUpdate with upsert ensures the document is created with
    // defaults if it doesn't exist yet — no manual seeding needed.
    const content = await SiteContent.findOneAndUpdate(
      { key: "main" },
      { $setOnInsert: { key: "main" } },
      { upsert: true, new: true }
    ).populate("signature.productId", "name slug primaryImageUrl");
 
    return res.status(200).json(content);
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to fetch site content.", error: error.message });
  }
}
 
/**
 * @desc    Update site content (admin only)
 * @route   PUT /api/site-content
 * @access  Private (Admin)
 */
export async function updateSiteContent(req: AuthRequest, res: Response) {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Admin access required." });
    }
 
    const { hero, signature } = req.body;
 
    const content = await SiteContent.findOneAndUpdate(
      { key: "main" },
      { $set: { hero, signature } },
      { upsert: true, new: true, runValidators: true }
    ).populate("signature.productId", "name slug primaryImageUrl");
 
    return res.status(200).json(content);
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to update site content.", error: error.message });
  }
}