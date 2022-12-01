const routeBuilder = (routeVersion: string, routeName: string): string => {
  return `/api/${routeVersion}/${routeName}`;
};

export { routeBuilder };
