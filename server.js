const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/ia', (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Falta el prompt' });

  const texto = prompt.trim().toLowerCase();

  if (texto === "hola") {
    return res.json({ respuesta: "¡Hola! ¿En qué puedo ayudarte?" });
  }

  if (texto === "help" || texto === "ayuda") {
    return res.json({
      respuesta: `
Estas son las preguntas que puedes hacerme:
- "Hola": Te saludo.
- "help" o "ayuda": Muestra este menú de ayuda.
- (Cualquier otra cosa): Recibirás una respuesta genérica.
`
    });
  }

  // Respuesta genérica
  return res.json({ respuesta: "No entiendo tu pregunta. Escribe 'help' o 'ayuda' para ver lo que puedo responder." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor bot básico en el puerto', PORT));
