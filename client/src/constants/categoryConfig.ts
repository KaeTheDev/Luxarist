export interface CategoryConfig {
    skuPrefix: string;
    sizes: string[];
    materials: string[];
    gemstoneTypes: string[];
    styles: string[];
    weights: string[];
    careInstructions: string;
    defaultMaterial: string;
    defaultGemstoneType: string;
    defaultWeightPreset: string;
    defaultStyle: string;
    defaultCareTemplateKey: string;
  }
  
  // Category-specific dropdown options + defaults
  export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
    ring: {
      skuPrefix: "RING",
      sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"],
      materials: [
        "18K Yellow Gold", 
        "18K White Gold", 
        "18K Rose Gold", 
        "Platinum 950", 
        "14K Yellow Gold"
      ],
      gemstoneTypes: ["Diamond", "Sapphire", "Emerald", "Ruby", "None"],
      styles: ["Solitaire", "Pavo", "Halo", "Three-Stone", "Bezel"],
      weights: ["3g", "4g", "5g", "6g", "7g", "other"],
      careInstructions: `• Remove ring before washing hands, swimming, or exercising
  • Clean with a soft cloth and mild soap solution
  • Store separately in a fabric-lined jewelry box
  • Have prongs checked annually by a professional jeweler
  • Avoid contact with harsh chemicals and cosmetics`,
      defaultMaterial: "18K Yellow Gold",
      defaultGemstoneType: "Diamond", 
      defaultWeightPreset: "5g",
      defaultStyle: "Solitaire",
      defaultCareTemplateKey: "ring-basic",
    },
    
    bracelet: {
      skuPrefix: "BRAC",
      sizes: ["6.5 inches", "7 inches", "7.5 inches", "8 inches", "adjustable"],
      materials: ["18K Yellow Gold", "18K White Gold", "Platinum 950", "Sterling Silver"],
      gemstoneTypes: ["Diamond", "Sapphire", "Emerald", "Ruby", "None"],
      styles: ["Tennis", "Link", "Bangle", "Cuff", "Chain"],
      weights: ["8g", "10g", "12g", "15g", "20g", "Other"],
      careInstructions: `• Remove before bathing, swimming, or physical activities
  • Clean regularly with a jewelry polishing cloth
  • Store flat in a soft pouch to prevent tangling
  • Avoid exposure to perfumes and lotions
  • Check clasp regularly to ensure security`,
      defaultMaterial: "18K Yellow Gold",
      defaultGemstoneType: "Diamond",
      defaultWeightPreset: "10g",
      defaultStyle: "Tennis",
      defaultCareTemplateKey: "bracelet-basic",
    },
    
    watch: {
      skuPrefix: "WATCH",
      sizes: ["One Size (adjustable)"],
      materials: [
        "18K Yellow Gold", 
        "18K Rose Gold", 
        "Stainless Steel", 
        "Titanium", 
        "Platinum"
      ],
      gemstoneTypes: ["Diamond Bezel", "Diamond Markers", "None"],
      styles: ["Automatic", "Quartz", "Manual Wind"],
      weights: ["50g", "75g", "100g", "150g", "200g", "Other"],
      careInstructions: `• Avoid magnetic fields and extreme temperatures
  • Service movement every 3-5 years
  • Clean case and bracelet with a soft damp cloth
  • Do not operate crown or pushers underwater
  • Store in a watch box when not in use`,
      defaultMaterial: "Stainless Steel",
      defaultGemstoneType: "None",
      defaultWeightPreset: "100g",
      defaultStyle: "Automatic",
      defaultCareTemplateKey: "watch-basic",
    },
    
    necklace: {
      skuPrefix: "NECK",
      sizes: ["16 inches", "18 inches", "20 inches", "22 inches", "24 inches"],
      materials: ["18K Yellow Gold", "18K White Gold", "Platinum 950", "Sterling Silver"],
      gemstoneTypes: ["Diamond", "Pearl", "Emerald", "Sapphire", "None"],
      styles: ["Pendant", "Choker", "Chain", "Statement", "Lariat"],
      weights: ["5g", "8g", "10g", "12g", "15g", "Other"],
      careInstructions: `• Store necklace flat or hanging to prevent kinks
  • Put on necklace after applying makeup and perfume
  • Clean with a soft jewelry cloth regularly
  • Check clasp and links periodically for wear
  • Avoid pulling or tugging on delicate chains`,
      defaultMaterial: "18K Yellow Gold",
      defaultGemstoneType: "Diamond",
      defaultWeightPreset: "10g",
      defaultStyle: "Pendant",
      defaultCareTemplateKey: "necklace-basic",
    },
    
    earrings: {
      skuPrefix: "EARR",
      sizes: ["One Size"],
      materials: ["18K Yellow Gold", "18K White Gold", "Platinum 950", "14K Gold"],
      gemstoneTypes: ["Diamond", "Pearl", "Sapphire", "Emerald", "Ruby"],
      styles: ["Stud", "Drop", "Hoop", "Chandelier", "Huggie"],
      weights: ["2g", "3g", "4g", "5g", "6g", "other"],
      careInstructions: `• Clean posts and backs regularly with rubbing alcohol
  • Remove before sleeping or strenuous activities
  • Store in separate compartments to prevent scratching
  • Check settings periodically to ensure stones are secure
  • Avoid contact with hairspray and perfumes`,
      defaultMaterial: "18K Yellow Gold",
      defaultGemstoneType: "Diamond",
      defaultWeightPreset: "3g",
      defaultStyle: "Stud",
      defaultCareTemplateKey: "earrings-basic",
    }
  } as const;
  
  // Generate SKU like RING-DIA-001
  export const buildSku = (
    category: keyof typeof CATEGORY_CONFIG, 
    gemstoneType: string
  ): string => {
    const config = CATEGORY_CONFIG[category];
    const gemPart = (gemstoneType || "GEN").slice(0, 3).toUpperCase();
    const num = Math.floor(Math.random() * 999).toString().padStart(3, '0');
    
    return `${config.skuPrefix}-${gemPart}-${num}`;
  };
  
  // Get defaults for a category
  export const getCategoryDefaults = (category: keyof typeof CATEGORY_CONFIG) => {
    const config = CATEGORY_CONFIG[category];
    return {
      material: config.defaultMaterial,
      gemstoneType: config.defaultGemstoneType,
      weightPreset: config.defaultWeightPreset,
      style: config.defaultStyle,
      careTemplateKey: config.defaultCareTemplateKey,
      sizes: config.sizes.slice(0, 3), // First 3 as default selection
      specsFromAttributes: true,
    };
  };
  
  // Get dropdown options for fields
  export const getDropdownOptions = (
    category: keyof typeof CATEGORY_CONFIG,
    field: 'sizes' | 'materials' | 'gemstoneTypes' | 'styles' | 'weights'
  ): string[] => {
    return CATEGORY_CONFIG[category][field];
  };  