const { fake } = require('faker');
const faker = require('faker');
const fs = require('fs');

// Set language
faker.locale = 'vi';

//random data

const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const categoryList = [];
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];
  const productList = [];
  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        thumbnailUrl: faker.image.imageUrl(400, 400),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      productList.push(product);
    });
  }

  return productList;
};

(() => {
  //random data
  const categoryList = randomCategoryList(2);
  const productList = randomProductList(categoryList, 20);

  //combine data
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: 'SonHip',
    },
  };

  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('write data successfully!');
  });
})();
