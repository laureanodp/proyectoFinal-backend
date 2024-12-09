// server.js
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("./config/db");
const cors = require("cors");

dotenv.config();
mongoose();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/boards", require("./routes/boardRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
