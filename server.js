require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./src/db/config');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
dbConnection();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Connected to the project");
});

app.use("/api/users", require('./src/routes/users.routes'));
app.use("/api/realState", require('./src/routes/realState.routes'));
app.use("/api/properties", require('./src/routes/properties.routes'));

app.listen(port, () => {
    console.log('Server running on port: ' + port);
});

module.exports = app;
