const routeBuilder = (routeVersion: string, routeName: string): string => {
  return `/${routeVersion}/${routeName}`;
};

export { routeBuilder };
