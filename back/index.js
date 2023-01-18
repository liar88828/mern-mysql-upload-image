import express from 'express'
import expressUpload from 'express-fileupload'
import cors from 'cors'

const port = 5000
const app = express()

app.use(cors())
app.use(express.json())
app.use(expressUpload())


app.listen(port, () => console.log('port running in ' + port))