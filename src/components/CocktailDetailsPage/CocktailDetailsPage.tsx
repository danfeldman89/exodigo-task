import { useParams, useNavigate } from 'react-router-dom';
import styles from './CocktailDetailsPage.module.less';
import useCocktailById from "../../hooks/useCocktailById.ts";

const CocktailDisplay: React.FC = () => {
  const { cocktailId } = useParams<{ cocktailId: string }>();
  const navigate = useNavigate();
  const cocktail = useCocktailById(Number(cocktailId));

  console.log(cocktail);
  if (!cocktail) {
    return <p className={styles["no-cocktail"]}>Cocktail not found</p>;
  }

  return (
    <div className={styles.root}>
      <div className={styles["image-container"]}>
        {cocktail.imageUrl ? (
          <img src={cocktail.imageUrl} alt={cocktail.name} className={styles.image} />
        ) : (
           <div className={styles["placeholder-image"]}>No Image Available</div>
         )}
      </div>

      <div className={styles["details-container"]}>
        <h2 className={styles.name}>{cocktail.name}</h2>
        <p className={styles.category}>
          <strong>Category:</strong> {cocktail.category}
        </p>
        <p className={styles.isAlcoholic}>
          <strong>Type:</strong> {cocktail.isAlcoholic}
        </p>
        <p className={styles.glass}>
          <strong>Glass:</strong> {cocktail.glass}
        </p>
        <p className={styles.instructions}>
          <strong>Instructions:</strong> {cocktail.instructions}
        </p>

        <div className={styles.ingredients}>
          <strong>Ingredients:</strong>
          <ul>
            {cocktail.ingredients.map((ing, index) => (
              <li key={index}>
                {ing.measure ? `${ing.measure} ` : ''}{ing.ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button className={styles.backButton} onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default CocktailDisplay;
