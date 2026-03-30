import { Router } from "express";
import { getSiteContent, updateSiteContent } from "../../controllers/siteContentController";
import { authMiddleware } from "../../middleware/auth";
 
const router = Router();
 
// GET /api/site-content — public, used by frontend on every page load
router.get("/", getSiteContent);
 
// PUT /api/site-content — admin only
router.put("/", authMiddleware, updateSiteContent);
 
export default router;