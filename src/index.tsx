import { useReducer, useEffect } from 'react';

interface SnipcartStore {
  cart: {
    items: [];
    count: number;
  };
}

const initialState: SnipcartStore = {
  cart: {
    items: [],
    count: 0,
  },
};

type Actions = { type: 'SET'; payload: SnipcartStore };

const reducer = (state: SnipcartStore, action: Actions) => {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        ...action.payload,
      };
    default:
      throw new Error(`No such action ${action.type}`);
  }
};

const useSnipcart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Snipcart !== 'undefined') {
      const unsubscribe = window.Snipcart.store.subscribe(() => {
        const store = window.Snipcart.store.getState();

        dispatch({ type: 'SET', payload: store });
      });

      return unsubscribe;
    }
  }, []);

  return state;
};

export default useSnipcart;
