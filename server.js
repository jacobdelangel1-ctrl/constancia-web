const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/sat", async (req, res) => {
  const { rfc, idcif } = req.query;

  if (!rfc || !idcif) {
    return res.json({ error: "Faltan datos" });
  }

  try {
    console.log("RFC:", rfc);
    console.log("IDCIF:", idcif);

    // 🔥 FORMATO CORRECTO DEL SAT
    const url = `https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?D1=10&D2=1&D3=${idcif}_${rfc}`;
    console.log("URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "es-MX,es;q=0.9",
        "Connection": "keep-alive"
      }
    });

    const text = await response.text();

    res.send(text);

  } catch (error) {
    console.error("ERROR REAL:", error.message);
    res.json({ error: error.message });
  }
});

// 🔥 IMPORTANTE PARA RAILWAY
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});