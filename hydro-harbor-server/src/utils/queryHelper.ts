import Manufacturer from "../models/Manufacturer";

/**
 * This function takes all of the request queries, and from them creates objects that will be used during Product document querying(sorting and filtering).
 * @param {Request} req - Request object that contains all of the needed query parameters,
 * @returns {Object} A object that contains objects that will be used for sorting and filtering.
 */

export const parseProductQueryParameters = async (query: any) => {
  const {
    sortBy,
    sortDirection = "asc",
    manufacturer,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
  } = query;

  const sortOptions: { [key: string]: 1 | -1 } = {};
  if (sortBy === "name") {
    sortOptions.name = sortDirection === "asc" ? 1 : -1;
  } else if (sortBy === "price") {
    sortOptions.price = sortDirection === "asc" ? 1 : -1;
  } else if (sortBy === "manufacturer") {
    sortOptions.manufacturer = sortDirection === "asc" ? 1 : -1;
  }

  const filterOptions: { [key: string]: any } = {};
  if (manufacturer) {
    const manufacturerDoc = await Manufacturer.findOne({ name: manufacturer });
    if (manufacturerDoc) {
      filterOptions.manufacturer = manufacturerDoc._id;
    } else {
      filterOptions.manufacturer = null;
    }
  }
  if (minPrice || maxPrice) {
    filterOptions.price = {};
    if (minPrice) {
      filterOptions.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      filterOptions.price.$lte = Number(maxPrice);
    }
  }

  const pageNumber = parseInt(page as string) || 1;
  const pageLimit = parseInt(limit as string) || 10;
  const skip = (pageNumber - 1) * pageLimit;

  return { sortOptions, filterOptions, pageNumber, pageLimit, skip };
};