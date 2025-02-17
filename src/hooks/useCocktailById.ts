import { useSelector } from "react-redux";
import { Cocktail } from "../types/cocktail.ts";
import { RootState } from "../store/store.ts";

export default function useCocktailById(id: number): Cocktail | undefined {
  const cocktail = useSelector((state: RootState) =>
                                state.cocktails.cocktailsCollection.find((cocktail) => cocktail.id === id)
  );
  return cocktail;
}
