const express = require("express");
const router = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { getUsers, createUser, verifyUser } = require("../consultas.js");
require("dotenv").config();
const { checkCredentiaslMiddleware, reportMiddleware } = require("../middlewares/middleware.js")



router.use(express.json());
router.use(cors())
router.use(reportMiddleware)

router.get("/usuarios", async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users)
    } catch (error) {
        res.send(error)
    }
})

router.post("/usuarios", checkCredentiaslMiddleware, async (req, res) => {
    try {
        const user = req.body;
        const { email, password, rol, lenguage } = user;
        await createUser(email, password, rol, lenguage);
        res.send("usuario agregado correctamente");
    } catch (error) {
        res.send(error);
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = req.body;
        const { email, password } = user;
        await verifyUser(email, password);
        const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.send(token);
        console.log("usuario logeado correctamente");
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).send({ error });
    }
})

module.exports = router;