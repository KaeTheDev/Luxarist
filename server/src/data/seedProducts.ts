import mongoose from "mongoose";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import dotenv from "dotenv";
dotenv.config();

const products = [
  // =====================
  // Earrings (6)
  // =====================
  {
    name: "Diamond Stud Gold Earrings",
    category: "earrings",
    price: 400,
    isNewArrival: true,
    status: "active",
    image: "earring-001-main.jpg",
    slug: "diamond-stud-gold-earrings",
    sku: "EAR001",
    careTemplateKey: "standard-care",
    description: "Classic diamond stud earrings perfect for everyday wear. Set in 14K yellow gold for a timeless glow.",
    style: "stud",
    weightPreset: "light",
    gemstoneType: "diamond",
    material: "14K Yellow Gold",
    sizes: ["One Size"],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/earrings/earring-001-main.png?updatedAt=1770533119723",
    subtitle: "14K Yellow Gold Diamond Studs",
    diamondSpecs: { carat: "0.25 ct total", cut: "Round Brilliant", color: "G-H", clarity: "VS2" },
    metalSpecs: { type: "14K Yellow Gold", weight: "1.1 grams", finish: "High Polish", setting: "Push-Back" }
  },
  {
    name: "Diamond Stud Earrings",
    category: "earrings",
    price: 550,
    status: "active",
    image: "earring-002-main.jpg",
    slug: "diamond-stud-earrings",
    sku: "EAR002",
    careTemplateKey: "standard-care",
    description: "Timeless diamond stud earrings featuring high-clarity stones in a white gold setting.",
    style: "stud",
    weightPreset: "light",
    gemstoneType: "diamond",
    material: "14K White Gold",
    sizes: ["One Size"],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/earrings/earring-002-main.png?updatedAt=1770533119662",
    subtitle: "14K White Gold Diamond Studs",
    diamondSpecs: { carat: "0.50 ct total", cut: "Round Brilliant", color: "F-G", clarity: "SI1" },
    metalSpecs: { type: "14K White Gold", weight: "1.3 grams", finish: "High Polish", setting: "Screw-Back" }
  },
  {
    name: "Diamond Ruby Drop Earrings",
    category: "earrings",
    price: 850,
    isNewArrival: true,
    status: "active",
    image: "earring-003-main.jpg",
    slug: "diamond-ruby-drop-earrings",
    sku: "EAR003",
    careTemplateKey: "standard-care",
    description: "Drop earrings featuring vibrant ruby accents framed by white gold and diamonds.",
    style: "drop",
    weightPreset: "medium",
    gemstoneType: "ruby",
    material: "18K White Gold",
    sizes: ["One Size"],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/earrings/earring-003-main.png?updatedAt=1770533119689",
    subtitle: "18K White Gold Ruby & Diamond Drops",
    diamondSpecs: { carat: "0.15 ct total", cut: "Round", color: "H", clarity: "SI2", stones: "2 Rubies (0.60 ct)" },
    metalSpecs: { type: "18K White Gold", weight: "2.5 grams", finish: "High Polish", setting: "Leaver-Back" }
  },
  {
    name: "Diamond Gold Ruby Drop Earrings",
    category: "earrings",
    price: 750,
    status: "active",
    image: "earring-004-main.jpg",
    slug: "diamond-gold-ruby-drop-earrings",
    sku: "EAR004",
    careTemplateKey: "standard-care",
    description: "Rich 18K gold drop earrings with exquisite pear-cut rubies.",
    style: "drop",
    weightPreset: "medium",
    gemstoneType: "ruby",
    material: "18K Yellow Gold",
    sizes: ["One Size"],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/earrings/earring-004-main.png?updatedAt=1770533119721",
    subtitle: "18K Yellow Gold Ruby Drops",
    diamondSpecs: { carat: "0.10 ct total", cut: "Round", color: "G", clarity: "SI1", stones: "Pear-Cut Rubies" },
    metalSpecs: { type: "18K Yellow Gold", weight: "2.2 grams", finish: "High Polish", setting: "Hook" }
  },
  {
    name: "Diamond Bar Earrings",
    category: "earrings",
    price: 480,
    isNewArrival: true,
    status: "active",
    image: "earring-005-main.jpg",
    slug: "diamond-bar-earrings",
    sku: "EAR005",
    careTemplateKey: "standard-care",
    description: "Modern bar earrings featuring a vertical pave of brilliant diamonds.",
    style: "bar",
    weightPreset: "light",
    gemstoneType: "diamond",
    material: "14K White Gold",
    sizes: ["One Size"],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/earrings/earring-005-main.png?updatedAt=1770533119690",
    subtitle: "14K White Gold Diamond Bars",
    diamondSpecs: { carat: "0.20 ct total", cut: "Round", color: "F-G", clarity: "VS2" },
    metalSpecs: { type: "14K White Gold", weight: "1.5 grams", finish: "High Polish", length: "15mm" }
  },
  {
    name: "Everyday Stud Earrings",
    category: "earrings",
    price: 150,
    status: "active",
    image: "earring-006-main.jpg",
    slug: "everyday-stud-earrings",
    sku: "EAR006",
    careTemplateKey: "standard-care",
    description: "Simple and versatile solid gold stud earrings for everyday wear.",
    style: "stud",
    weightPreset: "light",
    gemstoneType: "diamond",
    material: "14K White Gold",
    sizes: ["One Size"],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/earrings/earring-006-main.jpeg?updatedAt=1770533119660",
    subtitle: "14K White Gold Daily Studs",
    metalSpecs: { type: "14K White Gold", weight: "0.8 grams", finish: "High Polish", setting: "Push-Back" }
  },

  // =====================
  // Necklaces (6)
  // =====================
  {
    name: "Classic Chain Necklace",
    category: "necklace",
    price: 85,
    status: "active",
    image: "necklace-001-main.jpg",
    slug: "classic-chain-necklace",
    sku: "NEC001",
    careTemplateKey: "standard-care",
    description: "Elegant classic chain necklace for any outfit.",
    style: "classic",
    weightPreset: "medium",
    gemstoneType: "diamond",
    material: "14K Gold Filled",
    sizes: ["16\"", "18\"", "20\"", "24\""],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-001-main.png?updatedAt=1770533143748",
    subtitle: "14K White Gold Filled Cable Chain",
    metalSpecs: { type: "14K White Gold Filled", weight: "5.5 grams", width: "1.5 mm", clasp: "Lobster Claw" }
  },
  {
    name: "White Gold Ruby Pendant Necklace",
    category: "necklace",
    price: 390,
    status: "active",
    image: "necklace-002-main.jpg",
    slug: "white-gold-ruby-pendant-necklace",
    sku: "NEC002",
    careTemplateKey: "standard-care",
    description: "Simple solid gold pendant necklace for a modern look.",
    style: "pendant",
    weightPreset: "light",
    gemstoneType: "ruby",
    material: "14K White Gold",
    sizes: ["16\"", "18\"", "20\"", "24\""],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-002-main.png?updatedAt=1770533144005",
    subtitle: "14K White Gold Minimal Pendant",
    metalSpecs: { type: "14K Yellow Gold", weight: "3.2 grams", width: "1.0 mm", clasp: "Spring Ring" }
  },
  {
    name: "Yellow Gold Ruby Pendant Necklace",
    category: "necklace",
    price: 195,
    status: "active",
    image: "necklace-003-main.jpg",
    slug: "yellow-gold-ruby-pendant-necklace",
    sku: "NEC003",
    careTemplateKey: "standard-care",
    description: "Stylish layered chain necklace for trendy outfits.",
    style: "layered",
    weightPreset: "medium",
    gemstoneType: "ruby",
    material: "14K Yellow Gold Filled",
    sizes: ["16\"", "18\"", "20\"", "24\""],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-003-main.png?updatedAt=1770533143999",
    subtitle: "Gold Filled Layered Chain",
    metalSpecs: { type: "14K Yellow Gold Filled", weight: "7.8 grams", width: "Multiple", clasp: "Lobster Claw" }
  },
  {
    name: "Slim White Gold Necklace",
    category: "necklace",
    price: 320,
    isNewArrival: true,
    status: "active",
    image: "necklace-004-main.jpg",
    slug: "slim-white-gold-necklace",
    sku: "NEC004",
    careTemplateKey: "standard-care",
    description: "Minimalist slim solid gold necklace.",
    style: "slim",
    weightPreset: "light",
    gemstoneType: "diamond",
    material: "14K White Gold",
    sizes: ["16\"", "18\"", "20\"", "24\""],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-004-main.png?updatedAt=1770533143399",
    subtitle: "14K White Gold Slim Link",
    metalSpecs: { type: "14K White Gold", weight: "2.1 grams", width: "0.8 mm", clasp: "Spring Ring" }
  },
  {
    name: "Delicate Charm Necklace",
    category: "necklace",
    price: 380,
    isNewArrival: true,
    status: "active",
    image: "necklace-005-main.jpg",
    slug: "delicate-charm-necklace",
    sku: "NEC005",
    careTemplateKey: "standard-care",
    description: "Charming delicate necklace with a subtle gold pendant.",
    style: "charm",
    weightPreset: "light",
    gemstoneType: "diamond",
    material: "14K Yellow Gold",
    sizes: ["16\"", "18\"", "20\"", "24\""],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-005-main.png?updatedAt=1770533143947",
    subtitle: "14K Gold Charm Necklace",
    metalSpecs: { type: "14K Yellow Gold", weight: "2.8 grams", width: "1.0 mm", clasp: "Lobster Claw" }
  },
  {
    name: "Triangular Bezel Diamond Necklace",
    category: "necklace",
    price: 1250,
    isNewArrival: true,
    status: "active",
    image: "necklace-007-main.jpg",
    slug: "triangular-bezel-diamond-necklace",
    sku: "NEC007",
    careTemplateKey: "fine-jewelry-care",
    description: "A sophisticated 18K yellow gold minimalist cable chain featuring a stunning single triangular-cut diamond.",
    style: "luxury",
    weightPreset: "light",
    gemstoneType: "diamond",
    material: "18K Yellow Gold",
    sizes: ["16\"", "18\"", "20\"", "24\""],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-007-main.png?updatedAt=1770533142737",
    galleryImageUrls: [
      "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-007-side.png",
      "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-007-macro.png",
      "https://ik.imagekit.io/gwbd4eva2026/products/necklaces/necklace-007-lifestyle.png"
    ],
    subtitle: "18K Gold Trillion Diamond Necklace",
    diamondSpecs: { carat: "0.75 ct", cut: "Trillion", color: "E-F", clarity: "VVS2" },
    metalSpecs: { type: "18K Yellow Gold", weight: "3.5 grams", width: "1.1 mm", setting: "Bezel" }
  },

  // =====================
  // Bracelets (7)
  // =====================
  {
    name: "Classic Chain Bracelet",
    category: "bracelet",
    price: 60,
    isNewArrival: true,
    status: "active",
    image: "bracelet-001-main.jpg",
    slug: "classic-chain-bracelet",
    sku: "BRC001",
    careTemplateKey: "standard-care",
    description: "Classic chain bracelet for daily wear.",
    style: "classic",
    weightPreset: "medium",
    gemstoneType: "diamond",
    material: "14K White Gold Filled",
    sizes: ["6.5\"", "7.0\"", "7.5\"", "8.0\""],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/bracelets/bracelet-001-main.png?updatedAt=1770533198344",
    subtitle: "14K White Gold Filled Bracelet",
    metalSpecs: { type: "14K White Gold Filled", weight: "3.2 grams", width: "2.5 mm", clasp: "Lobster Claw" }
  },
  {
    name: "Minimal Cuff Bracelet",
    category: "bracelet",
    price: 470,
    isNewArrival: true,
    status: "active",
    image: "bracelet-002-main.jpg",
    slug: "minimal-cuff-bracelet",
    sku: "BRC002",
    careTemplateKey: "standard-care",
    description: "Solid 14K white gold minimalist cuff bracelet.",
    style: "cuff",
    weightPreset: "light",
    gemstoneType: "diamond",
    material: "14K White Gold",
    sizes: ["6.5\"", "7.0\"", "7.5\"", "8.0\""],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/bracelets/bracelet-002-main.png?updatedAt=1770533199018",
    subtitle: "14K White Gold Minimal Cuff",
    metalSpecs: { type: "14K White Gold", weight: "4.5 grams", width: "3.0 mm", finish: "Polished" }
  },
  {
    name: "Slim Gold Bracelet",
    category: "bracelet",
    price: 255,
    status: "active",
    image: "bracelet-003-main.jpg",
    slug: "slim-gold-bracelet",
    sku: "BRC003",
    careTemplateKey: "standard-care",
    description: "Thin and sleek solid gold link bracelet.",
    style: "slim",
    weightPreset: "light",
    gemstoneType: "ruby",
    material: "14K White Gold",
    sizes: ["6.5\"", "7.0\"", "7.5\"", "8.0\""],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/bracelets/bracelet-003-main.png?updatedAt=1770533199096",
    subtitle: "14K White Gold Slim Link",
    metalSpecs: { type: "14K White Gold", weight: "1.8 grams", width: "1.0 mm", clasp: "Spring Ring" }
  },
  {
    name: "Textured Bangle Bracelet",
    category: "bracelet",
    price: 575,
    status: "active",
    image: "bracelet-004-main.jpg",
    slug: "textured-bangle-bracelet",
    sku: "BRC004",
    careTemplateKey: "standard-care",
    description: "Textured 14K yellow gold bangle with a brushed finish.",
    style: "bangle",
    weightPreset: "medium",
    gemstoneType: "diamond",
    material: "14K Yellow Gold",
    sizes: ["6.5\"", "7.0\"", "7.5\"", "8.0\""],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/bracelets/bracelet-004-main.png?updatedAt=1770533198801",
    subtitle: "14K Brushed Gold Bangle",
    metalSpecs: { type: "14K Yellow Gold", weight: "6.2 grams", width: "4.0 mm", finish: "Brushed" }
  },
  {
    name: "Everyday Chain Bracelet",
    category: "bracelet",
    price: 165,
    isNewArrival: true,
    status: "active",
    image: "bracelet-005-main.jpg",
    slug: "everyday-chain-bracelet",
    sku: "BRC005",
    careTemplateKey: "standard-care",
    description: "Classic gold chain bracelet suitable for everyday wear.",
    style: "classic",
    weightPreset: "light",
    gemstoneType: "diamond",
    material: "14K Gold Filled",
    sizes: ["6.5\"", "7.0\"", "7.5\"", "8.0\""],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/bracelets/bracelet-005-main.png?updatedAt=1770533198983",
    subtitle: "Everyday Gold Filled Chain",
    metalSpecs: { type: "14K Gold Filled", weight: "2.9 grams", width: "2.0 mm", clasp: "Lobster Claw" }
  },
  {
    name: "Open Cuff Bracelet",
    category: "bracelet",
    price: 472,
    status: "active",
    image: "bracelet-006-main.jpg",
    slug: "open-cuff-bracelet",
    sku: "BRC006",
    careTemplateKey: "standard-care",
    description: "Hand-hammered open cuff bracelet in 14K gold.",
    style: "cuff",
    weightPreset: "light",
    gemstoneType: "diamond",
    material: "14K Yellow Gold",
    sizes: ["6.5\"", "7.0\"", "7.5\"", "8.0\""],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/bracelets/bracelet-006-main.png?updatedAt=1770533198873",
    subtitle: "14K Hammered Gold Cuff",
    metalSpecs: { type: "14K Yellow Gold", weight: "4.1 grams", width: "2.5 mm", finish: "Hammered" }
  },
  {
    name: "Modern Link Bracelet",
    category: "bracelet",
    price: 180,
    status: "active",
    image: "bracelet-007-main.jpg",
    slug: "modern-link-bracelet",
    sku: "BRC007",
    careTemplateKey: "standard-care",
    description: "Bold link bracelet with a modern toggle clasp.",
    style: "link",
    weightPreset: "medium",
    gemstoneType: "none",
    material: "14K Gold Filled",
    sizes: ["6.5\"", "7.0\"", "7.5\"", "8.0\""],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/bracelets/bracelet-007-main.png?updatedAt=1770533198915",
    subtitle: "Modern Toggle Link Bracelet",
    metalSpecs: { type: "14K Gold Filled", weight: "8.5 grams", width: "5.0 mm", clasp: "Toggle" }
  },

  // =====================
  // Watches (5)
  // =====================
  {
    name: "Classic Silver Watch",
    category: "watch",
    price: 180,
    isNewArrival: true,
    status: "active",
    image: "watch-001-main.jpg",
    slug: "classic-gold-watch",
    sku: "WAT001",
    careTemplateKey: "standard-care",
    description: "Classic silver watch with a premium link band.",
    style: "classic",
    weightPreset: "medium",
    gemstoneType: "none",
    material: "Silver PVD Stainless Steel",
    sizes: ["38mm", "40mm", "42mm"],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/watches/watch-001-main.png?updatedAt=1770533267493",
    subtitle: "Gold PVD / Japanese Quartz",
    metalSpecs: { type: "Stainless Steel / Silver PVD", weight: "120 grams", movement: "Japanese Quartz", waterResistance: "3ATM" }
  },
  {
    name: "Minimal Face Watch",
    category: "watch",
    price: 165,
    isNewArrival: true,
    status: "active",
    image: "watch-002-main.jpg",
    slug: "minimal-face-watch",
    sku: "WAT002",
    careTemplateKey: "standard-care",
    description: "Watch with a clean minimalist face and mesh band.",
    style: "minimal",
    weightPreset: "light",
    gemstoneType: "none",
    material: "Gold PVD Stainless Steel",
    sizes: ["38mm", "40mm", "42mm"],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/watches/watch-002-main.png?updatedAt=1770533267092",
    subtitle: "Minimal Gold Mesh Watch",
    metalSpecs: { type: "Stainless Steel / Gold PVD", weight: "110 grams", movement: "Quartz", waterResistance: "3ATM" }
  },
  {
    name: "Slim Band Watch",
    category: "watch",
    price: 170,
    status: "active",
    image: "watch-003-main.jpg",
    slug: "slim-band-watch",
    sku: "WAT003",
    careTemplateKey: "standard-care",
    description: "Slim band stainless steel watch for everyday use.",
    style: "slim",
    weightPreset: "light",
    gemstoneType: "none",
    material: "Brushed Gold Stainless Steel",
    sizes: ["38mm", "40mm", "42mm"],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/watches/watch-003-main.png?updatedAt=1770533267390",
    subtitle: "Gold Brushed Stainless Steel",
    metalSpecs: { type: "Gold Stainless Steel", weight: "95 grams", movement: "Quartz", strap: "Slim Link" }
  },
  {
    name: "Modern Dial Watch",
    category: "watch",
    price: 190,
    status: "active",
    image: "watch-004-main.jpg",
    slug: "modern-dial-watch",
    sku: "WAT004",
    careTemplateKey: "standard-care",
    description: "Modern watch with a silver sunray dial and leather strap.",
    style: "modern",
    weightPreset: "medium",
    gemstoneType: "none",
    material: "Stainless Steel / Leather",
    sizes: ["40mm"],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/watches/watch-004-main.png?updatedAt=1770533266982",
    subtitle: "Silver Dial with Black Leather",
    metalSpecs: { type: "Stainless Steel", weight: "125 grams", movement: "Automatic", glass: "Mineral Crystal", strap: "Genuine Leather" }
  },
  {
    name: "Everyday Classic Watch",
    category: "watch",
    price: 160,
    isNewArrival: true,
    status: "active",
    image: "watch-005-main.jpg",
    slug: "everyday-classic-watch",
    sku: "WAT005",
    careTemplateKey: "standard-care",
    description: "Versatile gold watch designed for rugged daily wear.",
    style: "classic",
    weightPreset: "medium",
    gemstoneType: "none",
    material: "Gold PVD Stainless Steel",
    sizes: ["38mm", "40mm", "42mm"],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/watches/watch-005-main.png?updatedAt=1770533268075",
    subtitle: "Classic Gold Daily Wear",
    metalSpecs: { type: "Zinc Alloy / Gold PVD", weight: "105 grams", movement: "Quartz", battery: "SR626SW" }
  },

  // =====================
  // Rings (5)
  // =====================
  {
    name: "Classic Band Ring",
    category: "ring",
    price: 295,
    status: "active",
    image: "ring-001-main.jpg",
    slug: "classic-band-ring",
    sku: "RIN001",
    careTemplateKey: "standard-care",
    description: "Timeless classic band ring in 14K solid yellow gold.",
    style: "classic",
    weightPreset: "medium",
    gemstoneType: "diamond",
    material: "14K White Gold",
    sizes: ["5", "6", "7", "8", "9"],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/rings/ring-001-main.png?updatedAt=1770533319348",
    subtitle: "14K White Gold Classic Band",
    metalSpecs: { type: "14K White Gold", weight: "3.5 grams", width: "4.0 mm", finish: "High Polish" }
  },
  {
    name: "Slim White Gold Ring",
    category: "ring",
    price: 190,
    status: "active",
    image: "ring-002-main.jpg",
    slug: "slim-white-gold-ring",
    sku: "RIN002",
    careTemplateKey: "standard-care",
    description: "Minimalist slim white gold ring for subtle elegance.",
    style: "slim",
    weightPreset: "light",
    gemstoneType: "diamond",
    material: "14K White Gold",
    sizes: ["5", "6", "7", "8", "9"],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/rings/ring-002-main.png?updatedAt=1770533319125",
    subtitle: "14K White Gold Slim Stackable",
    metalSpecs: { type: "14K White Gold", weight: "1.2 grams", width: "1.0 mm", finish: "Polished" }
  },
  {
    name: "Minimal Stackable Ring",
    category: "ring",
    price: 185,
    isNewArrival: true,
    status: "active",
    image: "ring-003-main.jpg",
    slug: "minimal-stackable-ring",
    sku: "RIN003",
    careTemplateKey: "standard-care",
    description: "14K white gold stackable ring for layered looks.",
    style: "stackable",
    weightPreset: "light",
    gemstoneType: "diamond",
    material: "14K White Gold",
    sizes: ["5", "6", "7", "8", "9"],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/rings/ring-003-main.png?updatedAt=1770533319279",
    subtitle: "14K White Gold Layering Ring",
    metalSpecs: { type: "14K White Gold", weight: "1.5 grams", width: "1.5 mm", finish: "Polished" }
  },
  {
    name: "Textured Band Ring",
    category: "ring",
    price: 320,
    status: "active",
    image: "ring-004-main.jpg",
    slug: "textured-band-ring",
    sku: "RIN004",
    careTemplateKey: "standard-care",
    description: "Textured band ring with a modern hand-hammered finish.",
    style: "textured",
    weightPreset: "medium",
    gemstoneType: "diamond",
    material: "14K Yellow Gold",
    sizes: ["5", "6", "7", "8", "9"],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/rings/ring-004-main.png?updatedAt=1770533319134",
    subtitle: "14K Hammered Gold Band",
    metalSpecs: { type: "14K Yellow Gold", weight: "3.8 grams", width: "3.0 mm", finish: "Hammered" }
  },
  {
    name: "Everyday Gold Ring",
    category: "ring",
    price: 260,
    isNewArrival: true,
    status: "active",
    image: "ring-005-main.jpg",
    slug: "everyday-gold-ring",
    sku: "RIN005",
    careTemplateKey: "standard-care",
    description: "Comfort-fit solid gold ring suitable for daily wear.",
    style: "classic",
    weightPreset: "light",
    gemstoneType: "diamond",
    material: "14K Yellow Gold",
    sizes: ["5", "6", "7", "8", "9"],
    primaryImageUrl: "https://ik.imagekit.io/gwbd4eva2026/products/rings/ring-005-main.png?updatedAt=1770533319151",
    subtitle: "14K Gold Everyday Ring",
    metalSpecs: { type: "14K Yellow Gold", weight: "2.1 grams", width: "2.0 mm", finish: "High Polish" }
  }
];

  export async function seedProducts() {
    try {
  
      // fetch categories from DB
      const categories = await Category.find();
      const categoryMap = categories.reduce((acc, category) => {
        acc[category.slug] = category._id; // map slug -> ObjectId
        return acc;
      }, {} as Record<string, mongoose.Types.ObjectId>);
  
      // replace string category with ObjectId
      const formattedProducts = products.map(product => {
        const catId = categoryMap[product.category];
        if (!catId) throw new Error(`Category not found: ${product.category}`);
        return { ...product, category: catId };
    });
  
      await Product.deleteMany();
      await Product.insertMany(formattedProducts);
  
      console.log("✅ Products successfully seeded");
    } catch (error) {
      console.error("❌ Seeding failed:", error);
    }
  }

export async function syncCategoryCounts() {
  const categories = await Category.find();

  for(const category of categories) {
    const count = await Product.countDocuments({
      category: category._id,
      status: "active"
    });

    category.productCount = count;
    await category.save();
  }
  console.log("🔢 Category product counts synced");
}