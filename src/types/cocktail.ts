interface UnifiedIngredient {
  ingredient: string;
  measure: string | null;
}

export interface Cocktail {
  id: number;
  name: string;
  category: string;
  isAlcoholic: string;
  glass: string;
  instructions: string;
  thumbnail: string;
  imageUrl?: string | null; // Image source, optional because it may be null
  ingredients: UnifiedIngredient[];
}

export function transformCocktailData(rawCocktail: { [key: string]: string | null }): Cocktail {
  // Extract and unify ingredients and their measures
  const ingredients: UnifiedIngredient[] = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = rawCocktail[`strIngredient${i}`];
    const measure = rawCocktail[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({ ingredient, measure: measure || null });
    }
  }

  // Return the transformed Cocktail object
  return {
    id: Number(rawCocktail.idDrink),
    name: rawCocktail.strDrink || '',
    category: rawCocktail.strCategory || '',
    isAlcoholic: rawCocktail.strAlcoholic || '',
    glass: rawCocktail.strGlass || '',
    instructions: rawCocktail.strInstructions || '',
    thumbnail: rawCocktail.strDrinkThumb  || '',
    imageUrl: rawCocktail.strDrinkThumb || null,
    ingredients
  };
}
