import styles from './CocktailList.module.less';
import { CocktailDisplay } from "../CocktailDisplay/CocktailDisplay.tsx";
import { usePagination } from "../../hooks/usePagination.ts";
import Toolbar from "../Toolbar/Toolbar.tsx";
import { useFilteredCocktails } from "../../hooks/useFilteredCocktails.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { useEffect } from "react";

const cocktailsPerPage = window.innerWidth < 768 ? 3 : 6;

function CocktailList() {
  const cocktails = useFilteredCocktails();
  const [page, setPage] = usePagination(cocktails, cocktailsPerPage);
  const apiCocktails = useSelector((state: RootState) => state.cocktails.cocktailsCollection);

  useEffect(() => {
    setPage(1)
  }, [apiCocktails]);

  return (
    <>
      <Toolbar />
      <div className={styles.root}>
        <div className={styles["cocktail-list-container"]}>
          <div className={styles.list}>
            {cocktails.slice((page - 1) * cocktailsPerPage, page * cocktailsPerPage)
                      .map((cocktail) => (<CocktailDisplay key={cocktail.id} cocktail={cocktail} />))}

          </div>
        </div>

        <div className={styles.pagination}>
          <button onClick={() => {
            setPage(page - 1);
            window.scrollTo({ top: 0, behavior: "instant" });
          }}>Previous</button>
          <div>{page}</div>
          <button onClick={() => {
            setPage(page + 1);
            window.scrollTo({ top: 0, behavior: "instant" });
          }}>Next</button>
        </div>
      </div>
    </>);
}

export default CocktailList;
