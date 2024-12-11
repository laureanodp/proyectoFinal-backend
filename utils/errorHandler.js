const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500; // Usar un código de estado válido
  res.status(statusCode).json({
    message: err.message, // Devolver mensaje de error
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // Mostrar stack solo en desarrollo
  });
};

module.exports = errorHandler; // Corrección: exportar como función
