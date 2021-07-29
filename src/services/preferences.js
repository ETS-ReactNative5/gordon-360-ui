/**
 * Preferences
 *
 * @description todo
 *
 * @module todo
 */

// import React, { createContext, useReducer } from 'react';
import theme, { darkTheme } from './../theme';

// let SET_THEME;

// export const themeContext = createContext();

// export const themeReducer = (state, action) => {
//   switch (action.type) {
//     case SET_THEME:
//       return {
//         ...state,
//         theme: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const ThemeState = (props) => {
//   const initialState = {
//     preferredTheme: theme.light,
//   }
//   const [state, dispatch] = useReducer(themeReducer, initialState);

//   const setTheme = async bool => {
//     dispatch({
//       type: SET_THEME,
//       payload: bool,
//     });
//   }

//   return (
//     <themeContext.Provider
//       value={{
//         theme: state.theme,
//         setTheme
//       }}
//     >
//       {props.children}
//     </themeContext.Provider>
//   )
// };

export const themes = {
  light: theme,
  dark: darkTheme,
};

export const themeNames = {
  light: 'light',
  dark: 'dark',
};

export let preferredTheme = themeNames.light;

export const getPreferredTheme = () => {
  return localStorage.getItem('preferredTheme');
};

export const setPreferredTheme = (themeSelection) => {
  localStorage.setItem('preferredTheme', themeSelection);
  preferredTheme = themeSelection;
  //   console.log('Preferred theme:', themeSelection);
};
