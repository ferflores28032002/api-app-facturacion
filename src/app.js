const express = require("express");
const sequelize = require("./models/connection");
const { categoriesRouter, invoicesRouter, productsRouter, syncModel } = require('./routes/')

const app = express();
app.use(express.json());

app.use("/api/v1/products", productsRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/invoices", invoicesRouter);

const PORT = 3000;

app.get('/', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.send(`---- App runnin in port ${PORT} and connected to data base----`);
    } catch (error) {
        res.send(`Error ${error}`);
    }

})

syncModel();

app.listen(PORT, () => {
    console.log(`---- App runnin in port ${PORT} ----`);
})