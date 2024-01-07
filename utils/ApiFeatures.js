import mongoose from "mongoose";
import User from './models/user.js';
import Tag from './models/tag.js';
import Category from './models/category.js';

const filterProducts = async (queryString, query) => {
  query = await query.find({
    $or: [
      {
        title: {
          $in: new RegExp(queryString.filter, "i"),
        },
      },
      {
        summery: {
          $in: new RegExp(queryString.filter, "i"),
        },
      },
      {
        content: {
          $in: new RegExp(queryString.filter, "i"),
        },
      },
      {
        author: {
          $in: await User.find({
            name: {
              $in: new RegExp(queryString.filter, "i"),
            },
          }),
        },
      },
      {
        tags: {
          $in: await Tag.find({
            title: {
              $in: new RegExp(queryString.filter, "i"),
            },
          }),
        },
      },
      {
        category: {
          $in: await Category.find({
            title: {
              $in: new RegExp(queryString.filter, "i"),
            },
          }),
        },
      },
    ],
  });
  if (queryString.type) {
    query = query.filter((product) => product.type == queryString.type);
  }
  return query;
};

class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 1000000;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-updatedAt");
    }
    return this;
  }
  filter() {
    if (this.queryString.filter) {
      this.query = filterProducts(this.queryString, this.query);
      return this;
    }
    return this;
  }
}
module.exports = ApiFeatures;
