import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";
import { useEffect, useState } from "react";
import { Cocktail } from "../types/cocktail.ts";

export function useFilteredCocktails() {
  const apiCocktails = useSelector((state: RootState) => state.cocktails.cocktailsCollection);
  const localCocktails = useSelector((state: RootState) => state.cocktails.localCocktails);
  const textFilter = useSelector((state: RootState) => state.cocktails.filter);
  const [filteredCocktails, setFilteredCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    if (textFilter.trim() === "") {
      setFilteredCocktails([]);
    } else {

      const allCocktails = [...apiCocktails, ...localCocktails];
      setFilteredCocktails(allCocktails.filter(cocktail => cocktail.name.toLowerCase().includes(textFilter.toLowerCase())));
    }

  }, [apiCocktails, localCocktails, textFilter]);

  return filteredCocktails;
}
