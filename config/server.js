const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3030;

app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("../startup/prod")(app);

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}!`);
});

module.exports = { app };
