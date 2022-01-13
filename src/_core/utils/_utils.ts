const isJwtExpired = (exp: number): boolean => {
  return Date.now() >= exp * 1000 ? false : true;
};

export { isJwtExpired };
