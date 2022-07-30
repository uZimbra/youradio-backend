const routeBuilder = (routeName: string): string => {
  return `/v1/${routeName}`;
};

export { routeBuilder };
