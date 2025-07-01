const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Respuestas aleatorias para ciertas preguntas
const saludos = [
  "¡Hola! ¿En qué puedo ayudarte?",
  "¡Buenas! ¿Qué necesitas?",
  "¡Hey! ¿Cómo puedo asistirte hoy?",
  "¡Hola, humano! ¿Qué quieres saber?"
];

const despedidas = [
  "¡Adiós! Que tengas un buen día.",
  "¡Hasta luego! Vuelve cuando quieras.",
  "¡Cuídate! Nos vemos pronto.",
  "¡Saluditos! Espero verte de nuevo."
];

const estado = [
  "¡Estoy bien! ¿Y tú?",
  "Funciono perfecto, gracias por preguntar.",
  "¡Todo en orden! ¿Cómo te sientes tú?",
  "Me siento genial, listo para ayudarte."
];

const chistes = [
  "¿Por qué los programadores confunden Halloween y Navidad? Porque OCT 31 == DEC 25.",
  "¿Cómo se llama un pez que hace código? ¡Un pez-coder!",
  "¿Sabes cuál es el animal más antiguo? La cebra, porque está en blanco y negro.",
  "¿Por qué la computadora fue al médico? Porque tenía un virus."
"¿Qué hace una abeja en el gimnasio? ¡Zum-ba!"
"¿Qué le dice un semáforo a otro? No me mires, que me pongo verde."
"¿Cuál es el colmo de un electricista? No tener corriente con su mujer."
"¿Qué hace una vaca en un tejado? ¡NADA! Es una vaca 'des-techada'."
"¿Qué le dice un pez a otro pez? Nada."
"¿Cuál es el último mono? El monarca."
"¿Por qué los pájaros no usan Facebook? ¡Porque ya tienen Twitter!"
"¿Qué le dice un plátano a otro plátano? Estoy plátano de ti."
"¿Qué hace una taza en el gimnasio? ¡Ejercita los músculos del asa!"
"¿Qué hace una impresora para relajarse? ¡Imprime yoga!"
"¿Cuál es el animal más antiguo? La cebra, porque está en blanco y negro."
"¿Qué le dice un jardinero a otro jardinero? Nos vemos cuando podamos."
"¿Qué hace un perro con un taladro? ¡Taladrando huesitos!"
"¿Qué le dice un gusano a otro gusano? Voy a dar una vuelta a la manzana."
"¿Cuál es el café más peligroso? El ex-preso."
"¿Qué hace un ladrillo en un árbol? ¡Esperando a que la gravedad haga su trabajo!"
"¿Qué hace un pollo cuando llueve? ¡'Kikiricaja' de cartón!"
"¿Qué le dice una escoba a otra escoba? ¡Estoy barrida de risa!"
"¿Qué le dice un cero a un ocho? ¡Qué cinturón más apretado llevas!"
"¿Cuál es el deporte más silencioso? El paracaidismo, porque solo se escucha el viento."
];

const ayuda = `
Estas son las preguntas que puedes hacerme:
- "Hola", "Buenas", "Hey": Te saludo de distintas formas.
- "Adiós", "Chao", "Nos vemos", "Bye": Me despido de ti.
- "¿Cómo estás?", "¿Cómo te va?": Te cuento cómo me siento.
- "¿Qué puedes hacer?", "¿Para qué sirves?", "help", "ayuda": Muestra este menú de ayuda.
- "Cuéntame un chiste", "¿Sabes un chiste?": Te cuento un chiste al azar.
- "¿Qué día es hoy?", "¿Qué hora es?": Te digo la fecha y la hora actual.
- "¿Quién te creó?", "¿Quién hizo este bot?": Te cuento de mis orígenes.
- "¿Cuál es tu color favorito?": Respuesta divertida.
- "¿Cuál es el sentido de la vida?": Te doy una respuesta filosófica (o graciosa).
- Y muchas más preguntas simples o aleatorias.
`;

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

app.post('/api/ia', (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Falta el prompt' });

  const texto = prompt.trim().toLowerCase();

  // Saludos
  if (["hola", "buenas", "hey", "saludos"].includes(texto)) {
    return res.json({ respuesta: random(saludos) });
  }

  // Despedidas
  if (["adiós", "chao", "nos vemos", "bye", "hasta luego"].includes(texto)) {
    return res.json({ respuesta: random(despedidas) });
  }

  // Estado
  if (
    texto.includes("cómo estás") ||
    texto.includes("como estas") ||
    texto.includes("cómo te va") ||
    texto.includes("como te va") ||
    texto.includes("qué tal") ||
    texto.includes("que tal")
  ) {
    return res.json({ respuesta: random(estado) });
  }

  // Ayuda
  if (
    texto === "help" ||
    texto === "ayuda" ||
    texto.includes("qué puedes hacer") ||
    texto.includes("que puedes hacer") ||
    texto.includes("para qué sirves") ||
    texto.includes("para que sirves")
  ) {
    return res.json({ respuesta: ayuda });
  }

  // Chistes
  if (
    texto.includes("chiste") ||
    texto.includes("cuéntame un chiste") ||
    texto.includes("cuentame un chiste") ||
    texto.includes("sabes un chiste")
  ) {
    return res.json({ respuesta: random(chistes) });
  }

  // Fecha y hora
  if (
    texto.includes("día es hoy") ||
    texto.includes("fecha") ||
    texto.includes("hora")
  ) {
    const ahora = new Date();
    return res.json({
      respuesta: `Hoy es ${ahora.toLocaleDateString()} y la hora es ${ahora.toLocaleTimeString()}.`
    });
  }

  // Origen del bot
  if (
    texto.includes("quién te creó") ||
    texto.includes("quien te creo") ||
    texto.includes("quién hizo este bot") ||
    texto.includes("quien hizo este bot") ||
    texto.includes("quién te programó") ||
    texto.includes("quien te programo")
  ) {
    return res.json({
      respuesta: "Fui creado por elpk-oss como un bot de ejemplo. ¡Pero sigo aprendiendo!"
    });
  }

  // Color favorito
  if (
    texto.includes("color favorito")
  ) {
    const colores = [
      "¡Me gusta el azul digital, como la pantalla!",
      "Creo que el verde terminal es genial.",
      "Diría que el morado AI es mi favorito.",
      "¡Me gustan todos los colores del código!"
    ];
    return res.json({ respuesta: random(colores) });
  }

  // Sentido de la vida
  if (
    texto.includes("sentido de la vida") ||
    texto.includes("significado de la vida")
  ) {
    const sentidos = [
      "42.",
      "¡Aprender y compartir conocimiento!",
      "Buscar respuestas... ¡o programar bots!",
      "Quizás tomar un café y escribir código.",
      "No lo sé... ¿tú lo sabes?"
    ];
    return res.json({ respuesta: random(sentidos) });
  }

  // Preguntas sí/no
  if (
    texto.startsWith("¿eres real") ||
    texto.startsWith("eres real") ||
    texto.startsWith("eres una ia") ||
    texto.startsWith("¿eres una ia") ||
    texto.startsWith("¿eres humano") ||
    texto.startsWith("eres humano")
  ) {
    const siNo = [
      "Soy un bot, pero trato de ser simpático.",
      "No soy humano, pero puedo conversar.",
      "¡Solo soy código y respuestas!",
      "En el fondo, soy solo unos y ceros."
    ];
    return res.json({ respuesta: random(siNo) });
  }

  // Respuesta genérica
  return res.json({
    respuesta: "No entiendo tu pregunta. Escribe 'help' o 'ayuda' para ver lo que puedo responder."
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor bot básico en el puerto', PORT));
