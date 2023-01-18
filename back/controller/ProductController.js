import {Product} from "../models/ProductModel.js"

export const getProduct = async (req, res) => {
	res.json(await Product.findAll())
}


export const getProductById = (req, res) => {
}
export const saveProduct = (req, res) => {
}
export const updateProduct = (req, res) => {

}
export const deleteProduct = (req, res) => {
}