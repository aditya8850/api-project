import ApplicationError from "../../error-handler/applicationError.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getAllProducts(req, res) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong");
    }
  }

  async addProduct(req, res) {
    try {
      const { name, desc, price, categories, sizes } = req.body;
      const newProduct = new ProductModel(
        name,
        desc,
        parseFloat(price),
        req?.file?.filename,
        categories,
        sizes?.split(",")
      );
      const createdRecord = await this.productRepository.add(newProduct);
      res.status(201).send(createdRecord);
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong");
    }
  }

  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const products = await this.productRepository.get(id);
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong");
    }
  }
  // http://localhost:3000/api/products/filter?minPrice=10&maxPrice=200&category=Category2
  async filterProducts(req, res) {
    try {
      const minPrice = req.query.minPrice;
      const categories = req.query.category;
      const result = await this.productRepository.filter(
        minPrice,
        categories
      );
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something wrong with db", 500);
    }
  }

  async rateProduct(req, res) {
    const userId = req.userId;
    const productId = req.body.productId;
    const rating = req.body.rating;
    try {
      const product = await this.productRepository.rate(userId, productId, rating);
      res.status(200).send("Rating added successfully");
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something wrong ", 400);
    }
  }
  async averagePrice(req, res, next) {
    try {
      const result = await this.productRepository.averageProductPricePerCategory()
      return res.status(200).send(result)
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something wrong ", 400);

    }
  }
}
