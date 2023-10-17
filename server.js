require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./src/db/config');
const cors = require('cors');

const app = express();
app.use(cors());
dbConnection();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Connected to the project");
});

// app.use("/api/contactos", require('./src/routes/contactos.routes'));
// app.use("/api/usuarios", require('./src/routes/usuarios.routes'));

app.listen(process.env.PORT, () => {
    console.log('Server running on port: ' + process.env.PORT);
});

module.exports = app;
