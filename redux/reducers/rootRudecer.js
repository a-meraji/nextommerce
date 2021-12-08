import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  cartReducer,
  themeReducer,
});

export default rootReducer;
