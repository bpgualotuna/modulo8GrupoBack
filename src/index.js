require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const generoRoutes = require("./routes/generoRoutes");
const contenidoRoutes = require("./routes/contenidoRoutes");

const {apiReference} = require('@scalar/express-api-reference');

const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API KrakeStream - Módulo de Catálogo Funcionando");
});

// Registrar rutas
console.log("Registrando rutas /api...");
app.use("/api/auth", authRoutes);
app.use("/api", generoRoutes);
app.use("/api", contenidoRoutes);


app.use('/reference', apiReference({
    theme: 'dark',
    layout: 'modern',
    spec: {
        url: '/openapi.yaml',
    },
    configuration: {
        showSidebar: true,
        hideDownloadButton: false,
        hideTryItPanel: false,
        authentication: {
            preferredSecurityScheme: 'bearerAuth',
            apiKey: {
                token: 'token',
            }
        }
    },
}));

app.get('/openapi.yaml', (req, res) => {
    res.setHeader('Content-Type', 'application/x-yaml');
    res.sendFile(path.join(__dirname, '..', 'docs', 'openapi.yaml'));
});




console.log("Rutas registradas correctamente");

app.listen(port, () => {
    console.log(`Server escuchando en el puerto: ${port}`);
    console.log(`Documentación disponible en: http://localhost:${port}/reference`);
});
