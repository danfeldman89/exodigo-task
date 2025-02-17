import styles from './Toolbar.module.less';
import { useDebounce } from "../../hooks/useDebounce.ts";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCocktails, updateFilter } from "../../store/cocktailsSlice.ts";
import { useDispatch } from "react-redux";
import { fetchDBCocktails } from "../../store/dataRequest.ts";
import { Cocktail } from "../../types/cocktail.ts";

function Toolbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const initialQuery = new URLSearchParams(location.search).get("search") || "";

  const [query, setQuery] = useState(initialQuery);
  const debouncedSearch = useDebounce(query, 200);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const searchParam = params.get("search");
    if (searchParam) {
      setQuery(searchParam);
    } else {
      setQuery("");
    }
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (debouncedSearch !== "") {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    navigate(`?${params.toString()}`, { replace: true });
    fetchDBCocktails(debouncedSearch, (cocktails: Cocktail[]) => dispatch(updateCocktails(cocktails)));
    dispatch(updateFilter(debouncedSearch))
  }, [debouncedSearch]);

  return (
    <div className={styles.root}>
      <button onClick={() => navigate("/new-cocktail")}>Add</button>
      <input value={query}
             onChange={(e) => setQuery(e.target.value)}
             placeholder="Search..." />
    </div>
  );
}

export default Toolbar;
