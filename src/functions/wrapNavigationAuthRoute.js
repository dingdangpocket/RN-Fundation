const wrapNavigationAuthRoute = (InfoScreen, routerPermissions, navigation) => {
  routerPermissions?.find(x => x === InfoScreen)
    ? navigation.navigate('Error')
    : navigation.navigate(InfoScreen);
};
export default wrapNavigationAuthRoute;
