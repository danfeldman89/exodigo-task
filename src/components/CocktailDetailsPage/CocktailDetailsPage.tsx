import { useParams } from 'react-router-dom';
import styles from './CocktailDetailsPage.module.less';
import useCocktailById from "../../hooks/useCocktailById.ts";

interface CocktailDetailsPageProps {

}

function CocktailDetailsPage({}: CocktailDetailsPageProps) {
  const { cocktailId } = useParams<{ cocktailId: string }>();
  const cocktail = useCocktailById(Number(cocktailId));

  return (
    <div className={styles.root}>
      {cocktail ? (
        <div className={styles["cocktail-container"]}>
          {cocktail.imageUrl && <img src={cocktail.imageUrl} alt={cocktail.name} className={styles["cocktail-image"]} />}
          <div className={styles["cocktail-details"]}>
            <h1 className={styles["cocktail-name"]}>{cocktail.name}</h1>
          </div>
        </div>
      ) : (
         <p className={styles["no-cocktail"]}>Cocktail not found</p>
       )}
    </div>
  );
}

export default CocktailDetailsPage;

