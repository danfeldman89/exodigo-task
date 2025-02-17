interface UnifiedIngredient {
  ingredient: string;
  measure: string | null;
}

export class Cocktail {
  id: number;
  name: string;
  category: string;
  isAlcoholic: string;
  glass: string;
  instructions: string;
  thumbnail: string;
  imageUrl: string | null;
  ingredients: UnifiedIngredient[];
  isLocal?: boolean;

  static currentId: number = 100000;

  constructor(
    name: string = '',
    category: string = '',
    isAlcoholic: string = '',
    glass: string = '',
    instructions: string = '',
    thumbnail: string = '',
    imageUrl: string | null = null,
    ingredients: UnifiedIngredient[] = [],
    isLocal: boolean = false
  ) {
    Cocktail.currentId--;
    this.id = Cocktail.currentId;
    this.isLocal = isLocal;
    this.name = name;
    this.category = category;
    this.isAlcoholic = isAlcoholic;
    this.glass = glass;
    this.instructions = instructions;
    this.thumbnail = thumbnail;
    this.imageUrl = imageUrl;
    this.ingredients = ingredients;
  }
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
