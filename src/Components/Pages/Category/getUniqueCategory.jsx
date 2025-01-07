export const UniqueCategory = (products) => {
  return Array.isArray(products)
    ? Array.from(new Set(products.map((item) => item?.Category)))
    : [];
};
