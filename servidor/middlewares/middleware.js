const checkCredentiaslMiddleware = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401).send({ message: "Credenciales incompletas" })
    }
    next();
}

const reportMiddleware = (req, res, next) => {
    console.log("El cliente ha realizado una consulta al servidor");
    next();
}

module.exports = {
    checkCredentiaslMiddleware,
    reportMiddleware};