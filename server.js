const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// ruta base
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

app.get("/sat", async (req, res) => {
  const { rfc, idcif } = req.query;

  if (!rfc || !idcif) {
    return res.json({ error: "Faltan datos" });
  }

  try {
    console.log("RFC:", rfc);
    console.log("IDCIF:", idcif);

    const url = `https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?D1=10&D2=1&D3=${idcif}_${rfc}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "text/html",
        "Accept-Language": "es-MX,es;q=0.9",
      }
    });

    const text = await response.text();

    res.send(text);
  } catch (error) {
    console.error(error);
    res.json({ error: "Error consultando SAT" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});