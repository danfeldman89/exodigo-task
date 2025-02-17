import { useSelector } from "react-redux";
import { Cocktail } from "../types/cocktail.ts";
import { RootState } from "../store/store.ts";
import { fetchDBCocktails } from "../store/dataRequest.ts";
import { useEffect, useState } from "react";

export default function useCocktailById(id: number) {
  const [result, setResult] = useState<Cocktail | undefined>(undefined);

  const cachedCocktail = useSelector((state: RootState) =>
                                       state.cocktails.cocktailsCollection.find((cocktail) => cocktail.id === id)
  );

  useEffect(() => {
    if (cachedCocktail) {
      setResult((prevResult) => {
        if (prevResult?.id !== cachedCocktail.id) {
          return cachedCocktail;
        }
        return prevResult;
      });
    } else {
      fetchDBCocktails(id.toString(), (cocktails: Cocktail[]) => {
        setResult((prevResult) => {
          const cocktail = cocktails[0];
          if (prevResult?.id !== cocktail.id) {
            return cocktail;
          }
          return prevResult;
        });
      }, true);
    }
  }, [id, cachedCocktail]);

  return result;
}
