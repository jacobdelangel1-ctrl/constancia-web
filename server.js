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
    const url = `https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?D1=10&D2=1&D3=${rfc}_${idcif}`;

    const response = await fetch(url);
    const text = await response.text();

    res.send(text);
  } catch (error) {
    res.json({ error: "Error consultando SAT" });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo");
});