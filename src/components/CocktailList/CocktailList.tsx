import styles from './CocktailList.module.less';
import { useSelector } from "react-redux";
import { CocktailDisplay } from "../CocktailDisplay/CocktailDisplay.tsx";
import { RootState } from "../../store/store.ts";
import { usePagination } from "../../hooks/usePagination.ts";
import Toolbar from "../Toolbar/Toolbar.tsx";
import { useEffect, useState } from "react";

const cocktailsPerPage = 6;

function CocktailList() {
  const cocktails = useSelector((state: RootState) => state.cocktails.cocktailsCollection);
  const [filteredCocktails, setFilteredCocktails] = useState(cocktails);
  const [page, setPage] = usePagination(filteredCocktails, cocktailsPerPage);
  const textFilter = useSelector((state: RootState) => state.cocktails.filter);

  useEffect(() => {
    if (textFilter.trim() === "") {
      setFilteredCocktails([]);
    } else {
      setFilteredCocktails(
        cocktails.filter(cocktail =>
                           cocktail.name.toLowerCase().includes(textFilter.toLowerCase())
        )
      );
    }
  }, [cocktails, textFilter]);

  return (
    <>
      <Toolbar />
      <div className={styles.root}>
        <div className={styles["cocktail-list-container"]}>
          <div className={styles.list}>
            {filteredCocktails.slice((page - 1) * cocktailsPerPage, page * cocktailsPerPage)
                              .map((cocktail) => (<CocktailDisplay key={cocktail.id} cocktail={cocktail} />))}

          </div>
        </div>

        <div className={styles.pagination}>
          <button onClick={() => setPage(page - 1)}>Previous</button>
          <div>{page}</div>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </>);
}

export default CocktailList;
