import UserModel from "../user/user.model.js";
import ApplicationError from "../../error-handler/applicationError.js";
export default class ProductModel {
  constructor(name, desc, price, imageUrl, categories, sizes, id) {
    this._id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.categories = categories;
    this.sizes = sizes;
  }
//   //   static getAll() {
//   //     return products;
//   //   }
//   //   static add(product) {
//   //     const newProduct = {
//   //       id: products.length + 1, // Assign id first
//   //       ...product, // Merge with the existing product object
//   //     };
//   //     products.push(newProduct);
//   //     // console.log(products);
//   //     return products;
//   //   }
//   //   static get(id) {
//   //     const product = products.find((i) => {
//   //       return i.id == id;
//   //     });
//   //     return product;
//   //   }
//   // static filter(minPrice, maxPrice, category) {
//   //   const result = products.filter((product) => {
//   //     return (
//   //       (!minPrice || product.price >= minPrice) &&
//   //       (!maxPrice || product.price < +maxPrice) &&
//   //       (!category || product.category == category)
//   //     );
//   //   });

//   //   return result;
//   // }
//   static rateProduct(userId, productId, rating) {
//     //validate user and product
//     const user = UserModel.getAll().find((u) => u.id == userId);
//     if (!user) {
//       throw new ApplicationError("user not found ", 400);
//     }
//     //validate product
//     const product = products.find((p) => p.id == productId);
//     if (!product) {
//       throw new ApplicationError("product not found", 400);
//     }
//     //check if there are any ratings, if not then add ratings arr.
//     if (!product.ratings) {
//       product.ratings = [];
//       product.ratings.push({ userId, rating });
//     } else {
//       //check if user has already rated the product
//       const existingRatingIndex = product.ratings.findIndex(
//         (r) => r.userId == userId,
//       );
//       if (existingRatingIndex >= 0) {
//         product.ratings[existingRatingIndex].rating = { userId, rating };
//       } else {
//         //if no exisiting rating, add new rating
//         product.ratings.push({ userId, rating });
//       }
//     }
//   }

// // let products = [];
}
