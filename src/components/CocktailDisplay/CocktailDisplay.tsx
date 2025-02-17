import styles from './CocktailDisplay.module.less';
import { Cocktail } from "../../types/cocktail";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCocktail } from "../../store/cocktailsSlice";

interface CocktailDisplayProps {
  cocktail: Cocktail;
}

export function CocktailDisplay({ cocktail }: CocktailDisplayProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClick() {
    navigate(`/cocktail/${cocktail.id}`);
  }

  function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    dispatch(deleteCocktail(cocktail.id));
  }

  return (
    <div className={styles.root} onClick={handleClick}>
      {cocktail.imageUrl && (
        <img
          src={cocktail.imageUrl}
          alt={`Image of ${cocktail.name}`}
          className={styles.image}
        />
      )}
      <div className={styles.details}>
        <p className={styles.name}>{cocktail.name}</p>
        <div className={styles.metadata}>
          <p className={styles.category}>
            <strong>Category:</strong> {cocktail.category}
          </p>
          <p className={styles.isAlcoholic}>
            <strong>Type:</strong> {cocktail.isAlcoholic}
          </p>
          <p>
            <strong>Glass:</strong> {cocktail.glass}
          </p>
        </div>
        <div className={styles.ingredients}>
          <p><strong>Ingredients:</strong></p>
          <ul>
            {cocktail.ingredients?.map((ing, index) => (
              <li key={index}>
                {ing.measure ? `${ing.measure} ` : ''}{ing.ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {cocktail.isLocal && <button
          className={styles.deleteButton}
          onClick={handleDelete}>
          Delete
      </button>}
    </div>
  );
}
