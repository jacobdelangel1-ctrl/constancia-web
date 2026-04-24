const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// inicio
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// limpiar HTML del SAT
function limpiarHTML(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<img[^>]*>/gi, "")
    .replace(/style="[^"]*"/gi, "");
}

// endpoint
app.get("/sat", async (req, res) => {
  const { rfc, idcif } = req.query;

  if (!rfc || !idcif) {
    return res.send("<h2>Faltan datos</h2>");
  }

  try {
    const url = `https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?D1=10&D2=1&D3=${idcif}_${rfc}`;

    const response = await fetch(url);
    let html = await response.text();

    html = limpiarHTML(html);

    const pagina = `
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Constancia SAT</title>
      <style>
        body {
          font-family: Arial;
          background: #e9ecef;
          padding: 20px;
        }
        .container {
          max-width: 800px;
          margin: auto;
          background: white;
          padding: 40px;
          border-radius: 8px;
          box