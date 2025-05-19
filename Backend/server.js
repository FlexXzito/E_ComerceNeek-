import app from './app.js';
const PORT = process.env.PORT || 5000;

// Forzar host 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} (listening on 0.0.0.0)`);
});
