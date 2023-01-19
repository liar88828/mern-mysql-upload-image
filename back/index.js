import express from 'express'
import expressUpload from 'express-fileupload'
import cors from 'cors'
import ProductRoute from "./routes/ProductRoute.js";
import {db} from "./config/Database.js";

const port = 5000
const app = express()


// set the view engine to ejs
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('index'))
app.use(express.static('public')) // untuk melihat image


app.use(cors())
app.use(express.json())
app.use(expressUpload())

app.use(ProductRoute)

db.sync().then(() => {
	app.listen(port, () => {
		console.log('port running in ' + port)
	})
})
