require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./src/db/config');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const selfsigned = require('selfsigned');

const app = express();
const port = process.env.PORT || 443;
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

// Genera certificados autofirmados
const attrs = [{ name: 'commonName', value: 'localhost' }];
const pems = selfsigned.generate(attrs, { days: 365 });

// Escribe los certificados en archivos
fs.writeFileSync('key.pem', pems.private);
fs.writeFileSync('cert.pem', pems.cert);

// Lee los certificados SSL
const privateKey = fs.readFileSync('key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Crea un servidor HTTPS con los certificados
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
    console.log('Servidor seguro activo en el puerto:', port);
});

module.exports = app;
