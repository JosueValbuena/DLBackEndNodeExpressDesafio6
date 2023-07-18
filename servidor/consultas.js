const pool = require("./server.js");
const bcrypt = require("bcryptjs");

const getUsers = async () => {
    const query = "SELECT * FROM usuarios";
    const { rows: user } = await pool.query(query);
    return user;
}

const createUser = async (email, password, rol, lenguage) => {
    const passwordEcripted = bcrypt.hashSync(password);
    password = passwordEcripted;
    const query = "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4)";
    const value = [email, passwordEcripted, rol, lenguage];
    const { rows: userCreted } = await pool.query(query, value);
    return userCreted;
}

const verifyUser = async (email, password) => {
    const values = [email];
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const { rows: [usuario], rowCount } = await pool.query(query, values);
    const { password: passwordEcripted } = usuario;
    const passwordValided = bcrypt.compareSync(password, passwordEcripted);
    if (!passwordValided || !rowCount)
        throw { code: 401, message: "email o contrasenha incorrecta" };
}

module.exports = {
    getUsers,
    createUser,
    verifyUser
}