export const UniqueCategory = (productsCategory) => {
  return Array.isArray(productsCategory)
    ? Array.from(new Set(productsCategory.map((item) => item?.Category)))
    : [];
};
