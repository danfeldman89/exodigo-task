import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CocktailList from "./components/CocktailList/CocktailList.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import CocktailDetailsPage from "./components/CocktailDetailsPage/CocktailDetailsPage.tsx";

function App() {
  return (
    <Provider store={store}>
      <Router basename="/exodigo-task">
        <Routes>
          <Route path="/" element={<CocktailList />} />
          <Route path="/product/:productId" element={<CocktailDetailsPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
