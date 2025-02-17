import { useEffect, useState } from 'react';
import styles from './AddNewCocktailPage.module.less';
import { Cocktail } from "../../types/cocktail.ts";
import { useDispatch } from "react-redux";
import { addCocktail } from "../../store/cocktailsSlice.ts";
import { useNavigate } from "react-router-dom";

interface AddNewCocktailPageProps {}

const initialIngredient = { ingredient: '', measure: '' };

function AddNewCocktailPage({}: AddNewCocktailPageProps) {
  const [cocktail, setCocktail] = useState<Cocktail>(new Cocktail(
    '',
    '',
    'Non-Alcoholic',
    '',
    '',
    '',
    "https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg",
    [initialIngredient],
    true));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ingredientError, setIngredientError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      const timeoutId = setTimeout(() => {
        navigate(-1); // Navigate back
      }, 1000);

      return () => clearTimeout(timeoutId); // Clean up the timeout on component unmount
    }
  }, [isSubmitted]);

  const handleChange = (key: keyof Cocktail, value: string) => {
    setCocktail({ ...cocktail, [key]: value });
  };

  const handleIngredientChange = (index: number, key: keyof typeof initialIngredient, value: string) => {
    const updatedIngredients = [...cocktail.ingredients];
    updatedIngredients[index] = { ...updatedIngredients[index], [key]: value };
    setCocktail({ ...cocktail, ingredients: updatedIngredients });
  };

  const addIngredient = () => {
    setCocktail({ ...cocktail, ingredients: [...cocktail.ingredients, initialIngredient] });
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = cocktail.ingredients.filter((_, i) => i !== index);
    setCocktail({ ...cocktail, ingredients: updatedIngredients });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const hasValidIngredient = cocktail.ingredients.some(
      (ingredient) => ingredient.ingredient.trim() !== ''
    );

    if (!hasValidIngredient) {
      setIngredientError(true);
      return;
    }

    setIngredientError(false);
    dispatch(addCocktail(cocktail));
    setIsSubmitted(true);
  };

  return (
    <div className={styles.root}>
      <h1>Add a New Cocktail</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={cocktail.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={cocktail.category}
            onChange={(e) => handleChange('category', e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="isAlcoholic">Is Alcoholic:</label>
          <select
            id="isAlcoholic"
            value={cocktail.isAlcoholic}
            onChange={(e) => handleChange('isAlcoholic', e.target.value)}
          >
            <option value="Alcoholic">Alcoholic</option>
            <option value="Non-Alcoholic">Non-Alcoholic</option>
            <option value="Optional Alcohol">Optional Alcohol</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="glass">Glass:</label>
          <input
            type="text"
            id="glass"
            value={cocktail.glass}
            onChange={(e) => handleChange('glass', e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            value={cocktail.instructions}
            onChange={(e) => handleChange('instructions', e.target.value)}
          ></textarea>
        </div>

        <div className={styles.ingredients}>
          <h3>Ingredients:</h3>
          {cocktail.ingredients.map((ingredient, index) => (
            <div key={index} className={styles.ingredientRow}>
              <input
                type="text"
                placeholder="Ingredient"
                value={ingredient.ingredient}
                onChange={(e) => handleIngredientChange(index, 'ingredient', e.target.value)}
              />
              <input
                type="text"
                placeholder="Measure"
                value={ingredient.measure ?? ''}
                onChange={(e) => handleIngredientChange(index, 'measure', e.target.value)}
              />
              {cocktail.ingredients.length > 1 ? (
                <button type="button" onClick={() => removeIngredient(index)} className={styles.removeIngredientButton}>
                  Remove
                </button>
              ) : (
                 <div className={styles.removePlaceholder}></div>
               )}
              {index === cocktail.ingredients.length - 1 ? (
                <button type="button" onClick={addIngredient} className={styles.addIngredientButton}>
                  +
                </button>
              ) : (
                 <div className={styles.addPlaceholder}></div>
               )}
            </div>
          ))}
          {ingredientError && (
            <p className={styles.errorMessage}>
              Please add at least one valid ingredient.
            </p>
          )}

        </div>

        <button type="submit" className={`${styles.submitButton}
        ${isSubmitted ? styles.isSubmitted : ''}`}>
          {isSubmitted ? "Submitted!" : "Submit cocktail"}
        </button>


        <button type="button" onClick={() => window.history.back()} className={styles.backButton}>
          Back
        </button>
      </form>
    </div>
  );
}

export default AddNewCocktailPage;
