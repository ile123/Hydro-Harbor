import mongoose from "mongoose";
import Product from "../models/Product";
import { faker } from "@faker-js/faker";
import Manufacturer from "../models/Manufacturer";

/**
 * This is an array of fake products from which the other 100+ products will be created.
 */

const divingProducts = [
  {
    name: "Diving Mask",
    description: "High-quality silicone diving mask with a wide field of view.",
    imageUrl:
      "https://www.scubadiving.com/sites/default/files/styles/655_1x_/public/scuba/images/2022/03/edgemaxvisionulta.scubadivingmag.march2022.jpg?itok=P5qac5g7",
  },
  {
    name: "Snorkel",
    description:
      "Durable snorkel designed for comfort and minimal water entry.",
    imageUrl: "https://m.media-amazon.com/images/I/71QCyrP4RwL._AC_SL1500_.jpg",
  },
  {
    name: "Wetsuit",
    description: "Full-body wetsuit for protection and warmth in cold water.",
    imageUrl:
      "https://raceskin.co.uk/wp-content/uploads/2022/09/Mens-magna-wetsuit-red-F.jpg",
  },
  {
    name: "Fins",
    description:
      "Efficient fins for powerful swimming in various diving conditions.",
    imageUrl:
      "https://www.cressithai.com/cdn/shop/products/13_prolightblue_z_360x.jpg?v=1655956117",
  },
  {
    name: "Diving Regulator",
    description:
      "Breathing regulator for underwater use with adjustable airflow.",
    imageUrl:
      "https://www.mantusmarine.com/wp-content/uploads/2023/07/Regulator-Thumbnail-500-x-500-1.png",
  },
  {
    name: "Scuba Tank",
    description: "Steel scuba tank for diving with large air capacity.",
    imageUrl:
      "https://www.mantusmarine.com/wp-content/uploads/2023/07/Scuba-Tank-Thumnail-500-x-500-1.png",
  },
  {
    name: "Dive Watch",
    description: "Waterproof dive watch with depth and time tracking.",
    imageUrl:
      "https://www.scubadiving.com/sites/default/files/styles/655_1x_/public/scuba/images/2021/03/gear-guide-watches-citizen-promaster-bn7020_scd0321.jpg?itok=aeDQ0SAu",
  },
  {
    name: "Underwater Camera",
    description: "Compact camera for capturing high-quality underwater photos.",
    imageUrl:
      "https://www.shutthefrontdoor.co.nz/cdn/shop/files/Background-colour--F0F0F0--10_160746fa-a40c-49ca-9c5a-999d49bd9956.png?v=1727362903&width=1800",
  },
  {
    name: "Diving Boots",
    description:
      "Comfortable boots for walking on rocky shores before and after diving.",
    imageUrl:
      "https://www.di-nautika.hr/images/thumbs/0000204_cizme-mares-flexa-5mm.jpeg",
  },
  {
    name: "Dive Gloves",
    description:
      "Flexible gloves that protect hands from sharp corals and cold water.",
    imageUrl:
      "https://www.ndiver.com/storage/uploads/products/3616/optimum-gloves-3mm-qnBT.jpg",
  },
  {
    name: "Dive Light",
    description:
      "Powerful LED light designed for night diving or dark environments.",
    imageUrl:
      "https://divensurf.com/cdn/shop/products/81K_2B4ewp8OL._SL1500_4b425ea0-6419-4ba0-b826-97248186f559_2048x.jpg?v=1569235931",
  },
  {
    name: "Dive Knife",
    description:
      "Compact, rust-resistant knife designed for underwater safety.",
    imageUrl:
      "https://scubapro.johnsonoutdoors.com/sites/default/files/2022-08/scp_blog_choosingknife_tk15-side_0.jpg",
  },
];

/**
 * This function generates a random product by using random values.
 */

const generateDivingProduct = async () => {
  const randomProduct =
    divingProducts[Math.floor(Math.random() * divingProducts.length)];

  const randomManufacturer = await Manufacturer.aggregate([
    {
      $sample: { size: 1 },
    },
  ]);

  const manufacturerId = randomManufacturer[0]
    ? randomManufacturer[0]._id
    : null;

  return {
    name: `${randomProduct.name} ${Math.floor(
      Math.random() * divingProducts.length
    )}`,
    price: parseFloat(faker.commerce.price({ min: 50, max: 500, dec: 2 })),
    description: randomProduct.description,
    manufacturer: manufacturerId,
    imageUrl: randomProduct.imageUrl,
  };
};

/**
 * This function creates the products and seeds the db with them.
 */

const seedProducts = async () => {
  const collectionSize = await Product.countDocuments();
  if (collectionSize > 0) return;
  const products = [];
  for (let i = 0; i < 120; i++) {
    const product = await generateDivingProduct();
    products.push(product);
  }

  try {
    await Product.insertMany(products);
    console.log("120 diving products seeded successfully!");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error seeding products:", err.message);
    } else {
      console.error("An unknown error occurred:", err);
    }
  } finally {
    mongoose.connection.close();
  }
};

/**
 * This function creates random manufacturures and seeds the db with them.
 */

const seedManufactuers = async () => {
  const collectionSize = await Manufacturer.countDocuments();
  if (collectionSize === 0) {
    const manufactuers = [];
    for (let i = 0; i < 10; i++) {
      manufactuers.push({ name: `Manufactuer_${i}` });
    }
    console.log("10 diving products seeded successfully!");
    await Manufacturer.insertMany(manufactuers);
  }
};

/**
 * This function connects to the db.
 */

export const connectToDatabase = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to the database");
  } catch (error) {
    console.error(error);
  }
};

/**
 * This is a helper function that initializes the db by connecting to it at seeding it if it is empty.
 */

export const startDb = async (uri: string) => {
  await connectToDatabase(uri);
  await seedManufactuers();
  await seedProducts();
};
