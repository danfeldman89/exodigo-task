import styles from './Toolbar.module.css';
import { useDebounce } from "../../hooks/useDebounce.ts";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCocktails } from "../../store/cocktailsSlice.ts";
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
  }, [debouncedSearch]);

  return (
    <div className={styles.root}>
      <button>Button</button>
      <input value={query}
             onChange={(e) => setQuery(e.target.value)}
             placeholder="Search..." />
    </div>
  );
}

export default Toolbar;
