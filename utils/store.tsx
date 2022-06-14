import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Store = createContext({});
const initialState = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo")!)
    : null,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };
    case "DARK_MODE_OFF":
      return { ...state, darkMode: false };
    case "USER_LOGIN":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
}

export function StoreProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
