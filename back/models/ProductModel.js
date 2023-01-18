import {Sequelize} from "sequelize";
import {db} from "../config/Database.js";

const {DataTypes} = Sequelize

export const Product = db.define('Product', {
	nama: DataTypes.STRING,
	image: DataTypes.STRING,
	url: DataTypes.STRING
}, {
	freezeTableName: true
});

// export default Product; // harus di kasih titik koma ;

(async () => {
	await db.sync();
})();