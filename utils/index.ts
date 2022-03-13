export const clx = (...classes: (string | boolean)[]): string => {
  return classes.map(cls => !!cls).join(' ');
}; 