import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cocktail } from "../types/cocktail";

interface InitialState {
  cocktailsCollection: Cocktail[];
  localCocktails: Cocktail[];
}

const initialState: InitialState = {
  cocktailsCollection: [],
  localCocktails: JSON.parse(localStorage.getItem("cocktails") || "[]")
};

const cocktailsSlice = createSlice({
                                     name: "cocktails",
                                     initialState,
                                     reducers: {
                                       updateCocktails: (state, action: PayloadAction<Cocktail[]>) => {
                                         const apiCocktails = action.payload;

                                         state.cocktailsCollection = [...state.localCocktails, ...apiCocktails];
                                       },

                                       addCocktail: (state, action: PayloadAction<Cocktail>) => {
                                         state.localCocktails.push(action.payload);
                                         localStorage.setItem("cocktails", JSON.stringify(state.localCocktails));

                                         state.cocktailsCollection = [...state.localCocktails];
                                       },

                                       deleteCocktail: (state, action: PayloadAction<number>) => {
                                         state.localCocktails = state.localCocktails.filter(
                                           (cocktail) => cocktail.id !== action.payload
                                         );

                                         localStorage.setItem("cocktails", JSON.stringify(state.localCocktails));

                                         state.cocktailsCollection = [...state.localCocktails];
                                       }
                                     }
                                   });

export const { updateCocktails, addCocktail, deleteCocktail } =
  cocktailsSlice.actions;
export default cocktailsSlice.reducer;
