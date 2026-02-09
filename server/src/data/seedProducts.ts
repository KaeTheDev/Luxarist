import mongoose from "mongoose";
import { Product } from "../models/Product";
import dotenv from "dotenv";
import { is } from "zod/v4/locales";
dotenv.config();

const products = [
  // =====================
  // Earrings (6)
  // =====================
  {
    name: "Diamond Stud Gold Earrings",
    category: "earrings",
    price: 40,
    isNew: true,
    image: "earring-001-main.jpg",
    slug: "diamond-stud-gold-earrings",
    sku: "EAR001",
    careTemplateKey: "standard-care",
    description: "Classic diamond stud earrings perfect for everyday wear.",
    style: "stud",
    weightPreset: "light",
    gemstoneType: "diamond",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/earrings/earring-001-main.png?updatedAt=1770533119723",
    subtitle: "Elegant gold diamond studs"
  },
  {
    name: "Diamond Stud Earrings",
    category: "earrings",
    price: 50,
    image: "earring-002-main.jpg",
    slug: "diamond-stud-earrings",
    sku: "EAR002",
    careTemplateKey: "standard-care",
    description: "Timeless diamond stud earrings for any occasion.",
    style: "stud",
    weightPreset: "light",
    gemstoneType: "diamond",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/earrings/earring-002-main.png?updatedAt=1770533119662",
    subtitle: "Classic diamond studs"
  },
  {
    name: "Diamond Ruby Drop Earrings",
    category: "earrings",
    price: 55,
    image: "earring-003-main.jpg",
    slug: "diamond-ruby-drop-earrings",
    sku: "EAR003",
    careTemplateKey: "standard-care",
    description: "Drop earrings featuring diamond and ruby accents.",
    style: "drop",
    weightPreset: "medium",
    gemstoneType: "diamond,ruby",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/earrings/earring-003-main.png?updatedAt=1770533119689",
    subtitle: "Sparkling diamond and ruby drops"
  },
  {
    name: "Diamond Gold Ruby Drop Earrings",
    category: "earrings",
    price: 45,
    image: "earring-004-main.jpg",
    slug: "diamond-gold-ruby-drop-earrings",
    sku: "EAR004",
    careTemplateKey: "standard-care",
    description: "Gold drop earrings with diamond and ruby detailing.",
    style: "drop",
    weightPreset: "medium",
    gemstoneType: "diamond,ruby",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/earrings/earring-004-main.png?updatedAt=1770533119721",
    subtitle: "Gold diamond ruby drops"
  },
  {
    name: "Diamond Bar Earrings",
    category: "earrings",
    price: 48,
    image: "earring-005-main.jpg",
    slug: "diamond-bar-earrings",
    sku: "EAR005",
    careTemplateKey: "standard-care",
    description: "Modern bar earrings with sparkling diamonds.",
    style: "bar",
    weightPreset: "light",
    gemstoneType: "diamond",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/earrings/earring-005-main.png?updatedAt=1770533119690",
    subtitle: "Modern diamond bars"
  },
  {
    name: "Everyday Stud Earrings",
    category: "earrings",
    price: 35,
    image: "earring-006-main.jpg",
    slug: "everyday-stud-earrings",
    sku: "EAR006",
    careTemplateKey: "standard-care",
    description: "Simple and versatile stud earrings for everyday wear.",
    style: "stud",
    weightPreset: "light",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/earrings/earring-006-main.jpeg?updatedAt=1770533119660",
    subtitle: "Daily wear studs"
  },

  // =====================
  // Necklaces (6)
  // =====================
  {
    name: "Classic Chain Necklace",
    category: "necklace",
    price: 85,
    image: "necklace-001-main.jpg",
    slug: "classic-chain-necklace",
    sku: "NEC001",
    careTemplateKey: "standard-care",
    description: "Elegant classic chain necklace for any outfit.",
    style: "classic",
    weightPreset: "medium",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-001-main.png?updatedAt=1770533143748",
    subtitle: "Timeless chain necklace"
  },
  {
    name: "Minimal Pendant Necklace",
    category: "necklace",
    price: 90,
    image: "necklace-002-main.jpg",
    slug: "minimal-pendant-necklace",
    sku: "NEC002",
    careTemplateKey: "standard-care",
    description: "Simple pendant necklace for a modern look.",
    style: "pendant",
    weightPreset: "light",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-002-main.png?updatedAt=1770533144005",
    subtitle: "Minimal pendant necklace"
  },
  {
    name: "Layered Chain Necklace",
    category: "necklace",
    price: 95,
    image: "necklace-003-main.jpg",
    slug: "layered-chain-necklace",
    sku: "NEC003",
    careTemplateKey: "standard-care",
    description: "Stylish layered chain necklace for trendy outfits.",
    style: "layered",
    weightPreset: "medium",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-003-main.png?updatedAt=1770533143999",
    subtitle: "Trendy layered necklace"
  },
  {
    name: "Slim Gold Necklace",
    category: "necklace",
    price: 80,
    image: "necklace-004-main.jpg",
    slug: "slim-gold-necklace",
    sku: "NEC004",
    careTemplateKey: "standard-care",
    description: "Minimalist slim gold necklace.",
    style: "slim",
    weightPreset: "light",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-004-main.png?updatedAt=1770533143399",
    subtitle: "Slim gold necklace"
  },
  {
    name: "Delicate Charm Necklace",
    category: "necklace",
    price: 88,
    image: "necklace-005-main.jpg",
    slug: "delicate-charm-necklace",
    sku: "NEC005",
    careTemplateKey: "standard-care",
    description: "Charming delicate necklace with a subtle pendant.",
    style: "charm",
    weightPreset: "light",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-005-main.png?updatedAt=1770533143947",
    subtitle: "Delicate charm necklace"
  },
  {
    name: "Everyday Chain Necklace",
    category: "necklace",
    price: 75,
    image: "necklace-006-main.jpg",
    slug: "everyday-chain-necklace",
    sku: "NEC006",
    careTemplateKey: "standard-care",
    description: "Simple chain necklace for everyday wear.",
    style: "classic",
    weightPreset: "light",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-006-main.png?updatedAt=1770533142737",
    subtitle: "Everyday chain necklace"
  },

  // =====================
  // Bracelets (7)
  // =====================
  {
    name: "Classic Chain Bracelet",
    category: "bracelet",
    price: 60,
    image: "bracelet-001-main.jpg",
    slug: "classic-chain-bracelet",
    sku: "BRC001",
    careTemplateKey: "standard-care",
    description: "Classic chain bracelet for daily wear.",
    style: "classic",
    weightPreset: "medium",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/bracelets/bracelet-001-main.png?updatedAt=1770533198344",
    subtitle: "Classic chain bracelet"
  },
  {
    name: "Minimal Cuff Bracelet",
    category: "bracelet",
    price: 70,
    image: "bracelet-002-main.jpg",
    slug: "minimal-cuff-bracelet",
    sku: "BRC002",
    careTemplateKey: "standard-care",
    description: "Minimalist cuff bracelet for everyday style.",
    style: "cuff",
    weightPreset: "light",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/bracelets/bracelet-002-main.png?updatedAt=1770533199018",
    subtitle: "Minimal cuff bracelet"
  },
  {
    name: "Slim Gold Bracelet",
    category: "bracelet",
    price: 55,
    image: "bracelet-003-main.jpg",
    slug: "slim-gold-bracelet",
    sku: "BRC003",
    careTemplateKey: "standard-care",
    description: "Thin and sleek gold bracelet.",
    style: "slim",
    weightPreset: "light",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/bracelets/bracelet-003-main.png?updatedAt=1770533199096",
    subtitle: "Slim gold bracelet"
  },
  {
    name: "Textured Bangle Bracelet",
    category: "bracelet",
    price: 75,
    image: "bracelet-004-main.jpg",
    slug: "textured-bangle-bracelet",
    sku: "BRC004",
    careTemplateKey: "standard-care",
    description: "Textured bangle bracelet for a modern look.",
    style: "bangle",
    weightPreset: "medium",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/bracelets/bracelet-004-main.png?updatedAt=1770533198801",
    subtitle: "Textured bangle bracelet"
  },
  {
    name: "Everyday Chain Bracelet",
    category: "bracelet",
    price: 65,
    image: "bracelet-005-main.jpg",
    slug: "everyday-chain-bracelet",
    sku: "BRC005",
    careTemplateKey: "standard-care",
    description: "Chain bracelet suitable for everyday wear.",
    style: "classic",
    weightPreset: "light",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/bracelets/bracelet-005-main.png?updatedAt=1770533198983",
    subtitle: "Everyday chain bracelet"
  },
  {
    name: "Open Cuff Bracelet",
    category: "bracelet",
    price: 72,
    image: "bracelet-006-main.jpg",
    slug: "open-cuff-bracelet",
    sku: "BRC006",
    careTemplateKey: "standard-care",
    description: "Open cuff bracelet for versatile styling.",
    style: "cuff",
    weightPreset: "light",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/bracelets/bracelet-006-main.png?updatedAt=1770533198873",
    subtitle: "Open cuff bracelet"
  },
  {
    name: "Modern Link Bracelet",
    category: "bracelet",
    price: 80,
    image: "bracelet-007-main.jpg",
    slug: "modern-link-bracelet",
    sku: "BRC007",
    careTemplateKey: "standard-care",
    description: "Modern link bracelet for stylish looks.",
    style: "link",
    weightPreset: "medium",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/bracelets/bracelet-007-main.png?updatedAt=1770533198915",
    subtitle: "Modern link bracelet"
  },

  // =====================
  // Watches (5)
  // =====================
  {
    name: "Classic Gold Watch",
    category: "watch",
    price: 180,
    image: "watch-001-main.jpg",
    slug: "classic-gold-watch",
    sku: "WAT001",
    careTemplateKey: "standard-care",
    description: "Classic gold watch for a timeless look.",
    style: "classic",
    weightPreset: "medium",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/watches/watch-001-main.png?updatedAt=1770533267493",
    subtitle: "Timeless gold watch"
  },
  {
    name: "Minimal Face Watch",
    category: "watch",
    price: 165,
    image: "watch-002-main.jpg",
    slug: "minimal-face-watch",
    sku: "WAT002",
    careTemplateKey: "standard-care",
    description: "Watch with a clean minimalist face.",
    style: "minimal",
    weightPreset: "light",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/watches/watch-002-main.png?updatedAt=1770533267092",
    subtitle: "Minimal face watch"
  },
  {
    name: "Slim Band Watch",
    category: "watch",
    price: 170,
    image: "watch-003-main.jpg",
    slug: "slim-band-watch",
    sku: "WAT003",
    careTemplateKey: "standard-care",
    description: "Slim band watch for everyday use.",
    style: "slim",
    weightPreset: "light",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/watches/watch-003-main.png?updatedAt=1770533267390",
    subtitle: "Slim band watch"
  },
  {
    name: "Modern Dial Watch",
    category: "watch",
    price: 190,
    image: "watch-004-main.jpg",
    slug: "modern-dial-watch",
    sku: "WAT004",
    careTemplateKey: "standard-care",
    description: "Modern watch with stylish dial.",
    style: "modern",
    weightPreset: "medium",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/watches/watch-004-main.png?updatedAt=1770533266982",
    subtitle: "Modern dial watch"
  },
  {
    name: "Everyday Classic Watch",
    category: "watch",
    price: 160,
    image: "watch-005-main.jpg",
    slug: "everyday-classic-watch",
    sku: "WAT005",
    careTemplateKey: "standard-care",
    description: "Versatile watch for daily wear.",
    style: "classic",
    weightPreset: "medium",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/watches/watch-005-main.png?updatedAt=1770533268075",
    subtitle: "Everyday classic watch"
  },

  // =====================
  // Rings (5)
  // =====================
  {
    name: "Classic Band Ring",
    category: "ring",
    price: 95,
    image: "ring-001-main.jpg",
    slug: "classic-band-ring",
    sku: "RIN001",
    careTemplateKey: "standard-care",
    description: "Timeless classic band ring.",
    style: "classic",
    weightPreset: "medium",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/rings/ring-001-main.png?updatedAt=1770533319348",
    subtitle: "Classic band ring"
  },
  {
    name: "Slim Gold Ring",
    category: "ring",
    price: 90,
    image: "ring-002-main.jpg",
    slug: "slim-gold-ring",
    sku: "RIN002",
    careTemplateKey: "standard-care",
    description: "Minimalist slim gold ring.",
    style: "slim",
    weightPreset: "light",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/rings/ring-002-main.png?updatedAt=1770533319125",
    subtitle: "Slim gold ring"
  },
  {
    name: "Minimal Stackable Ring",
    category: "ring",
    price: 85,
    image: "ring-003-main.jpg",
    slug: "minimal-stackable-ring",
    sku: "RIN003",
    careTemplateKey: "standard-care",
    description: "Stackable rings for layering.",
    style: "stackable",
    weightPreset: "light",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/rings/ring-003-main.png?updatedAt=1770533319279",
    subtitle: "Stackable ring set"
  },
  {
    name: "Textured Band Ring",
    category: "ring",
    price: 100,
    image: "ring-004-main.jpg",
    slug: "textured-band-ring",
    sku: "RIN004",
    careTemplateKey: "standard-care",
    description: "Textured band ring with modern appeal.",
    style: "textured",
    weightPreset: "medium",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/rings/ring-004-main.png?updatedAt=1770533319134",
    subtitle: "Textured gold band"
  },
  {
    name: "Everyday Gold Ring",
    category: "ring",
    price: 92,
    image: "ring-005-main.jpg",
    slug: "everyday-gold-ring",
    sku: "RIN005",
    careTemplateKey: "standard-care",
    description: "Gold ring suitable for daily wear.",
    style: "classic",
    weightPreset: "light",
    gemstoneType: "none",
    material: "gold",
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/rings/ring-005-main.png?updatedAt=1770533319151",
    subtitle: "Everyday gold ring"
  }
  ];
  
  async function seedProducts() {
    try {
      await mongoose.connect(process.env.MONGO_URI!);
  
      await Product.deleteMany();
      await Product.insertMany(products);
  
      console.log("✅ Products successfully seeded");
      process.exit();
    } catch (error) {
      console.error("❌ Seeding failed:", error);
      process.exit(1);
    }
  }
  
  seedProducts();  