const express = require("express");
const fetch = require("node-fetch");
const multer = require("multer");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/predict", async (req, res) => {
  const stats = req.body;

  if (!stats || typeof stats !== "object" || Object.keys(stats).length === 0) {
    return res
      .status(400)
      .send("Datos del partido no proporcionados o inválidos");
  }

  try {
    const prompt = `Eres un experto en fútbol con un amplio conocimiento en análisis de estadísticas de partidos y predicciones de resultados futuros. A continuación, recibirás datos detallados sobre un partido de la Copa América 2024. Tu tarea es analizar estos datos y proporcionar una predicción detallada de lo que podría suceder en el partido, así como sugerencias de apuestas basadas en tu análisis.

**Responde siempre en Español.** Asegúrate de incluir en tu respuesta una evaluación de los posibles resultados del partido y recomendaciones para apuestas, como el posible ganador, el número de goles, el marcador exacto, o cualquier otra sugerencia útil para los apostadores.

Datos del partido:
${JSON.stringify(stats, null, 2)}

Por favor, responde en formato JSON con la siguiente estructura:
{
  "prediccion": "Tu predicción detallada del partido.",
  "sugerencias_de_apuesta": {
    "ganador": "Equipo que crees que ganará el partido",
    "resultado_final": "Marcador final que predices",
    "total_de_goles": "Número total de goles que crees que se marcarán",
    "otras_sugerencias": "Cualquier otra sugerencia de apuesta relevante"
  }
}`;

    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llava",
        prompt: prompt,
        format: "json",
        stream: false,
        options: {
          temperature: 0.7,
          max_tokens: 500,
        },
        system: "Siempre responde en español.",
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();

    if (data && data.response) {
      const prediction = JSON.parse(data.response);

      res.json({ prediction });
    } else {
      throw new Error(
        "No se encontró una respuesta en la respuesta del modelo"
      );
    }
  } catch (error) {
    console.error("Error en la predicción:", error);
    res.status(500).send(`Error en la predicción: ${error.message}`);
  }
});

app.post("/predict-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No image file uploaded");
    }

    const imagePath = req.file.path;
    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString("base64");

    const prompt =
      "Analiza esta imagen y proporciona una descripción detallada.";

    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llava",
        prompt: prompt,
        images: [base64Image],
        format: "json",
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();

    if (data && data.response) {
      const prediction = data.response;

      fs.unlinkSync(imagePath);

      res.json({ prediction });
    } else {
      throw new Error(
        "No se encontró una respuesta en la respuesta del modelo"
      );
    }
  } catch (error) {
    console.error("Error en la predicción de imagen:", error);
    res.status(500).send(`Error en la predicción de imagen: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`API de predicción escuchando en http://localhost:${port}`);
});
