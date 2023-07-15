const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const router = require("./router/routers.js");
const cors = require("cors");

app.use(express.json());
app.use(cors())


app.get("/", (req, res) => {
    res.send("Hola desde Express");
})

app.use("/", router);

app.listen(port, console.log(`Servidor iniciado en el puerto ${port}`))