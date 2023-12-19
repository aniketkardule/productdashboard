import mongoose from "mongoose";

const productModel = mongoose.Schema({
    _id:Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: String,
    soldMonth: String
})

const product = mongoose.model('Product', productModel);
export default product;