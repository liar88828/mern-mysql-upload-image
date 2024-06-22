import { Product } from "../models/ProductModel.js";
import path from 'path';
import fs from 'fs';

export const getProduct = async (req, res) => {
	try {
		res.json(await Product.findAll());
	} catch (error) {
		console.log(error.message);
	}
};

export const getProductById = async (req, res) => {
	try {
		res.json(await Product.findOne(
			{
				where: {
					id: req.params.id
				}
			}));
	} catch (e) {
		console.log(e.message);
	}
};

export const saveProduct = (req, res) => {
	// console.log(res)
	if (req.files === null) return res.status(400).json({ img: 'No File Upload' });
	const name = req.body.title; //  req.body.title pada bagian frontEnd
	const file = req.files.file;
	const fileSize = file.data.length;
	const ext = path.extname(file.name);
	const fileName = file.md5 + ext;

	const url =
		`${req.protocol}://${req.get('host')}/images/${fileName}`;
	const allowedType = ['.png', '.jpg', '.jpeg'];

	if (!allowedType.includes(
		ext.toLowerCase())) return res.status(422).json(
			{ msg: 'invalid image' });

	if (fileSize > 5000000) return res.status(422).json(
		{ msg: 'images must less 5Mb' });

	file.mv(`./public/images/${fileName}`, async (err) => {
		if (err) return res.statusCode(500)
			.json({ msg: err.message });

		try {
			await Product.create(
				{ nama: name, image: fileName, url });
			//pada object {dari database:dari backend}
			res.status(201).json({ msg: 'Product Create Success' });
		} catch (e) {
			console.log(err.message);
		}
	});
};
// if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
// const name = req.body.title;
// const file = req.files.file;
// const fileSize = file.data.length;
// const ext = path.extname(file.name);
// const fileName = file.md5 + ext;
// const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
// const allowedType = ['.png', '.jpg', '.jpeg'];
// if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
// if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });
// file.mv(`./public/images/${fileName}`, async (err) => {
// 	if (err) return res.status(500).json({ msg: err.message });
// 	try {
// 		await Product.create({ name: name, image: fileName, url: url });
// 		res.status(201).json({ msg: "Product Created Successfuly" });
// 	} catch (error) {
// 		console.log(error.message);
// 	}
// });
// };

// export const updateProduct = async (req, res) => {
// 	const product = await Product.findOne({ where: { id: req.params.id } });
// 	if (!Product) return res.status(404).json({ msg: 'No Data Found' });

// 	let fileName = '';
// 	if (req.files === null) { fileName = Product.image; }
// 	else {
// 		const file = req.files.file;
// 		const fileSize = file.data.length;
// 		const ext = path.extname(file.name);
// 		fileName = file.md5 + ext;
// 		const allowedType = ['.png', '.jpg', '.jpeg'];
// 		const filepath = `./public/images/${product.image}`;

// 		if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });

// 		if (fileSize > 5000000) return res
// 			.status(422)
// 			.json({ msg: "Image must be less than 5 MB" });


// 		fs.unlinkSync(filepath);
// 		file.mv(`./public/images/${fileName}`, (err) => {
// 			if (err) return res.status(500).json({ msg: err.message });
// 		});
// 	}

// 	const name = req.body.title;
// 	const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

// 	try {
// 		await Product.update(
// 			{ nama: name, image: fileName, url },
// 			{ where: { id: req.params.id } });

// 		res.status(200).json({ msg: "Product Updated Successfuly" });
// 	} catch (error) {
// 		console.log(error.message);
// 	}

// };



export const updateProduct = async (req, res) => {



	const product = await Product.findOne({
		where: {
			id: req.params.id
		}
	});
	if (!product) return res.status(404).json({ msg: "No Data Found" });

	let fileName = "";
	if (req.files === null) {
		fileName = product.image;
	} else {
		const file = req.files.file;
		const fileSize = file.data.length;
		const ext = path.extname(file.name);
		fileName = file.md5 + ext;
		const allowedType = ['.png', '.jpg', '.jpeg'];

		if (!allowedType.includes(ext.toLowerCase())) return res
			.status(422)
			.json({ msg: "Invalid Images" });

		if (fileSize > 5000000) return res
			.status(422)
			.json({ msg: "Image must be less than 5 MB" });

		const filepath = `./public/images/${product.image}`;
		fs.unlinkSync(filepath);

		file.mv(`./public/images/${fileName}`, (err) => {
			if (err) return res
				.status(500)
				.json({ msg: err.message });
		});
	}
	const name = req.body.title;
	const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

	try {
		await Product.update(
			{ nama: name, image: fileName, url },
			{ where: { id: req.params.id } });
		res.status(200).json({ msg: "Product Updated Successfuly" });
		
	} catch (error) {
		console.log(error.message);
	}

};


export const deleteProduct = async (req, res) => {
	const product = await Product.findOne({
		where: {
			id: req.params.id
		}
	});
	if (!product) return res.status(404).json({ msg: 'No data found' });


	try {
		await Product.destroy({ where: { id: req.params.id } });
		res.status(200).json({ msg: 'Product Delete Success' });

		// harus di kasih bawah agar image di esekusi bila tidak ada
		const filepath = `./public/images/${product.image}`;
		fs.unlinkSync(filepath);


	} catch (error) {
		res.status(error.message);
	}


	// try {
	// 	const filepath = `./public/images/${product.image}`;
	// 	fs.unlinkSync(filepath);
	// 	await Product.destroy({
	// 		where: {
	// 			id: req.params.id
	// 		}
	// 	});
	// 	res.status(200).json({ msg: "Product Deleted Successfuly" });
	// } catch (error) {
	// 	console.log(error.message);
	// }




};