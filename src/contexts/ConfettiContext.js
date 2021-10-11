import { createContext, useEffect, useReducer } from 'react';
import GordonConfetti from 'components/GordonConfetti';

export const ConfettiContext = createContext();

export const ConfettiActionsContext = createContext();

const ConfettiActions = Object.freeze({
  popConfetti: 'popConfetti',
});

const initialState = {
  confetti: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ConfettiActions.popConfetti:
      return { ...state, confetti: true };
    default:
      return state;
  }
};

const ConfettiContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const popConfetti = async (username, password) => {
    this.setState({ confetti: true });
    setTimeout(() => {
      this.setState({ confetti: false });
    }, 3000);

    dispatch({ type: ConfettiActions.popConfetti, payload: {} });
  };

  return (
    <ConfettiActionsContext.Provider value={{ popConfetti }}>
      <ConfettiContext.Provider value={state.confetti}>
        <GordonConfetti active={state.confetti}>{children}</GordonConfetti>
      </ConfettiContext.Provider>
    </ConfettiActionsContext.Provider>
  );
};

export default ConfettiContextProvider;
