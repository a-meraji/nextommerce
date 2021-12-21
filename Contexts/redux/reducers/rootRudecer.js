import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import catReducer from "./catReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  cartReducer,
  themeReducer,
  catReducer,
});

export default rootReducer;
