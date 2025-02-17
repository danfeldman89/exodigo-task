import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cocktail } from "../types/cocktail";

interface InitialState {
  cocktailsCollection: Cocktail[];
  localCocktails: Cocktail[];
  filter: string
}

const initialState: InitialState = {
  cocktailsCollection: [],
  localCocktails: JSON.parse(localStorage.getItem("cocktails") || "[]"),
  filter: ""
};

const cocktailsSlice = createSlice({
                                     name: "cocktails",
                                     initialState,
                                     reducers: {
                                       updateCocktails: (state, action: PayloadAction<Cocktail[]>) => {
                                         const apiCocktails = action.payload;

                                         state.cocktailsCollection = apiCocktails;
                                       },

                                       addCocktail: (state, action: PayloadAction<Cocktail>) => {
                                         state.localCocktails.push(action.payload);
                                         localStorage.setItem("cocktails", JSON.stringify(state.localCocktails));
                                       },

                                       deleteCocktail: (state, action: PayloadAction<number>) => {
                                         state.localCocktails = state.localCocktails.filter(
                                           (cocktail) => cocktail.id !== action.payload
                                         );
                                       },
                                       updateFilter: (state, action: PayloadAction<string>) => {
                                         state.filter = action.payload;
                                       }
                                     }
                                   });

export const { updateCocktails, addCocktail, deleteCocktail, updateFilter } =
  cocktailsSlice.actions;
export default cocktailsSlice.reducer;
