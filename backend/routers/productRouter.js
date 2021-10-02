import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import data from '../data.js'
import { isAdmin, isAuth } from '../utils.js'

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(
    async (req, res) => {
        const productList = await Product.find({});
        return res.send(productList);
    }
))

productRouter.get('/seed', expressAsyncHandler(
    async (req, res) => {
        const createdProducts = await Product.insertMany(data.products);
        res.send(createdProducts);
    }
))

productRouter.get('/:id', expressAsyncHandler(
    async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            return res.send(product);
        } else {
            return res.status(404).send({ message: 'Product Not Found' });
        }
    }
))

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: `Sample Products ${Date.now()}`,
        price: 0,
        image: '/images/p1.jpg',
        category: 'sample category',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description'
    })
    const createdProduct = await product.save();
    res.send({ message: 'Product created', product: createdProduct });
}))

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = req.body.name;
        product.image = req.body.image;
        product.price = req.body.price;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.description = req.body.description;
        product.countInStock = req.body.countInStock;

        const updatedProduct = await product.save();
        res.send({ message: 'Product updated', product: updatedProduct });
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
}))

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = Product.findById(req.params.id);
    if (product) {
        const removedProduct = await product.remove();
        res.send({ message: 'Product deleted', product: removedProduct });
    } else {
        res.status(4040).send({ message: 'Product not found'});
    }
}))

export default productRouter;