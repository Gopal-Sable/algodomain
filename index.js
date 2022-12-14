const connectToMongo = require("./db");
const express = require('express');
var cors = require('cors');
connectToMongo();
const app = express()
const port = process.env.PORT || 5000;
app.use(cors());

app.use(express.json())

app.use('/api/products', require("./routes/products"))
app.listen(port, () => {
    console.log(`i-Notebook app listening at http://localhost:${port}`)
})