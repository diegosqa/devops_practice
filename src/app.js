const express = require('express');
const client = require('prom-client');  // Importar prom-client para métricas

const app = express();

// Iniciar la recolección de métricas por defecto (CPU, memoria, etc.)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Endpoint de ejemplo que devuelve 'Hello, World!'
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Endpoint que simula una operación intensiva en CPU (lento)
app.get('/slow', (req, res) => {
  const start = Date.now();
  // Simular una tarea pesada en CPU que toma 5 segundos
  while (Date.now() - start < 5000) {
    Math.sqrt(Math.random());  // Operación pesada en CPU
  }
  res.send('Task completed after heavy computation!');
});

// Endpoint para exponer métricas de Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Configurar el puerto de la aplicación (usar el puerto 3000 por defecto)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;

