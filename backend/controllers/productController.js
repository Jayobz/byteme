import asyncHandler from "../middlewares/asyncHandler.js";
import Product from '../models/productModel.js';

const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields
        
        //validate
        switch (true) {
            case !name:
                return res.json({error: 'Name required'})
            case !description:
                return res.json({error: 'Description required'})
            case !price:
                return res.json({error: 'Price required'})
            case !category:
                return res.json({error: 'Category required'})
            case !quantity:
                return res.json({error: 'Quantity required'})
            case !brand:
                return res.json({error: 'Brand required'})
        }

        const product = new Product({...req.fields})
        await product.save()
        res.json(product)
    }
    catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
})



const updateProductInfo = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields
        
        //validate
        switch (true) {
            case !name:
                return res.json({error: 'Name required'})
            case !description:
                return res.json({error: 'Description required'})
            case !price:
                return res.json({error: 'Price required'})
            case !category:
                return res.json({error: 'Category required'})
            case !quantity:
                return res.json({error: 'Quantity required'})
            case !brand:
                return res.json({error: 'Brand required'})
        }

        const product = await Product.findByIdAndUpdate(req.params.id, {...req.fields}, {new: true});

        await product.save();
        res.json(product)
    }
    catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
})



const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        res.json(product)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({error: "Error"})
    }
})



const getProduct = asyncHandler(async (req, res) => {
    try {
        const pageSize = 6
        const keyword = req.query.keyword ? {name: {$regex: req.query.keyword, $options: 'i'}, } : {}

        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize)

        res.json({products, pages: Math.ceil(count / pageSize), hasMore: false})
    }
    catch (error) {
        console.error(error)
        res.status(500).json({error: "Error"})
    }
})



const getProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            return res.json(product)
        }
        else {
            res.status(404)
            throw new Error("Product not found")
        }
    }
    catch (error) {
        console.error(error)
        res.status(404).json({error: "No entity found"})
    }
})



const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).populate('category').limit(12).sort({createdAt: -1})
        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Error"})
    }
})



const addProductReview = asyncHandler(async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id)

        if (product) {
            const reviewed = product.reviews.find(r => r.user.toString() == req.user._id.toString())

            if (reviewed) {
                res.status(400)
                throw new Error("Product has already been reviewed")
            }

            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id
            }


            product.reviews.push(review)
            product.numReviews = product.reviews.length

            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

            await product.save()
            res.status(201).json({message: "Review added"})
        }
        else {
            res.status(404)
            throw new Error("Entity not found")
        }
    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
})



const getTopProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({rating: -1}).limit(4)
        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
})



const getNewProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({_id: -1}).limit(5)
        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
})




const filterProducts = asyncHandler(async (req, res) => {
    try {
        const {checked, radio} = req.body

        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.ength) args.price = {$gte: radio[0], $lte: radio[1]} 

        const products = await Product.find(args)
        res.json(products)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Error"})
    }
})

export { addProduct, updateProductInfo, deleteProduct, getProduct, getProductById, getAllProducts, addProductReview, getTopProducts, getNewProducts, filterProducts };