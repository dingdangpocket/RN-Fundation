import React, {createContext, useReducer} from 'react';
export const ContentContext = createContext({});
const reducer = (state, action) => {
  switch (action.type) {
    case 'userRouterPermissions':
      return {
        ...state,
        routerPermissions: action.payload,
      };
    case 'userRouterConfig':
      return {
        ...state,
        routerConfig: action.payload,
      };
    case 'communityTab':
      return {
        ...state,
        communityTabBarBadge: action.payload,
      };
    case 'eventTab':
      return {
        ...state,
        eventTabBarBadge: action.payload,
      };
    case 'safeAreaViewStatusAc':
      return {
        ...state,
        safeAreaViewStatus: action.payload,
      };
    default:
      return state;
  }
};
export const ContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, {
    colorValue: '',
    routerPermissions: '',
    communityTabBarBadge: null,
    eventTabBarBadge: null,
    safeAreaViewStatus: false,
  });
  return (
    <ContentContext.Provider value={{state, dispatch}}>
      {children}
    </ContentContext.Provider>
  );
};
