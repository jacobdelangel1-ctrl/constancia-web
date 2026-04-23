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

const url = `https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?D1=${rfc}&D2=${idcif}`;
console.log("URL:", url);

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