import { useState, useEffect } from "react";

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('luxarist_favorites');
        if(saved) setFavorites(JSON.parse(saved));
    }, []);

    const toggleFavorite = (productId: string) => {
        // 1. Get current favorites (or an empty array if none exist)
        const savedFavorites = localStorage.getItem("luxarist_favorites");
        const currentFavorites: string[] = savedFavorites ? JSON.parse(savedFavorites) : [];
      
        let updatedFavorites: string[];
      
        if (currentFavorites.includes(productId)) {
          // 2a. If it's already there, REMOVE it (Filter)
          updatedFavorites = currentFavorites.filter(id => id !== productId);
        } else {
          // 2b. If it's not there, ADD it (Spread)
          updatedFavorites = [...currentFavorites, productId];
        }
      
        // 3. Save the new full list back to storage
        localStorage.setItem("luxarist_favorites", JSON.stringify(updatedFavorites));
        
        // 4. Update the state so the UI turns gold immediately
        setFavorites(updatedFavorites); 
      };
      

    return { favorites, toggleFavorite };
}