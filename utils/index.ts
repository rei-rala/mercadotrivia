export const clx = (...classes: (string | boolean)[]): string => {
  return classes.map(cls => !!cls).join(' ');
};

export const shortenString = (str: string, maxLength: number = 100): string => {
  return str.length > maxLength ? str.substr(0, maxLength - 3) + '...' : str;
}

export const priceFormat = (price: number): string => {
  return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
