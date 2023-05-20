import asyncHandler from 'express-async-handler';
import { ProductModel } from '../models/productModel';

export const getProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.find();
  res.status(200).json(products);
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await ProductModel.find({ slug: req.params.slug });
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});
