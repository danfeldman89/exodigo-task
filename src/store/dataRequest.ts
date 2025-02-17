import { Cocktail, transformCocktailData } from "../types/cocktail.ts";

export function fetchDBCocktails(
  query: string,
  onSuccess: (cocktails: Cocktail[]) => void,
  searchById: boolean = false,
  onError?: (error: Error) => void
) {
  const url = searchById
              ? `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${query}`
              : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch cocktails.");

      return response.json();
    })
    .then(data => {
      if (data.drinks !== "no data found") {
        const cocktails = data.drinks.map(transformCocktailData);
        onSuccess(cocktails);
      } else {
        onSuccess([]);
      }
    })
    .catch(error => {
      if (onError) {
        onError(error);
      } else {
        console.error("Error fetching cocktails:", error);
      }
    });
}
