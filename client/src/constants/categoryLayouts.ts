export const CATEGORY_LAYOUTS: Record<string, string> = {
    Bracelet:  "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1",
    Earrings:   "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1 lg:col-start-3 lg:row-start-1",
    Ring:      "col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1 lg:col-start-3 lg:row-start-2",
    Necklace:  "col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-1 lg:col-start-4 lg:row-start-2",
    Watch:    "col-span-1 sm:col-span-2 lg:col-span-4 lg:row-span-1 lg:col-start-1 lg:row-start-3",
  };
  
  export const CATEGORY_ORDER: Record<string, number> = {
    Bracelet: 0,
    Earrings: 1,
    Ring: 2,
    Necklace: 3,
    Watche: 4,
  };