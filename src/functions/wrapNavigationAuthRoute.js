const wrapNavigationAuthRoute = (screenName, routerPermissions, navigation) => {
  routerPermissions.find(x => x === screenName)
    ? navigation.navigate('Error')
    : navigation.navigate(screenName);
};
export default wrapNavigationAuthRoute;
