import faker from "faker";
faker.locale = "es";

function createNFakeProducts(n) {
  const products = [];
  for (let i = 1; i <= n; i++) {
    const productCreated = createFakeProduct(i);
    products.push(productCreated);
  }
  return products;
}

function createFakeProduct(id) {
  const product = {
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    thumbnail: `${faker.image.imageUrl()}?${id}`
  };
  if(id) product.id = id;
  return product;
}

export { createFakeProduct, createNFakeProducts };
