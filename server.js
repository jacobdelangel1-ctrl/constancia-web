const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// inicio
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// limpiar HTML feo del SAT
function limpiarHTML(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<img[^>]*>/gi, "")
    .replace(/style="[^"]*"/gi, "");
}

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
          font-family: Arial, sans-serif;
          background: #f4f6f8;
          padding: 20px;
        }
        .container {
          max-width: 800px;
          margin: auto;
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
          text-align: center;
          color: #2c3e50;
        }
        .btn {
          display: block;
          margin: 20px auto;
          padding: 12px 20px;
          background: #27ae60;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        .btn:hover {
          background: #219150;
        }
        hr {
          margin: 20px 0;
        }
      </style>
    </head>
    <body>

      <div class="container">
        <h1>📄 Constancia de Situación Fiscal</h1>

        <button class="btn" onclick="window.print()">⬇️ Descargar / Imprimir PDF</button>

        <hr>

        ${html}

      </div>

    </body>
    </html>
    `;

    res.setHeader("Content-Type", "text/html");
    res.send(pagina);

  } catch (error) {
    console.error(error);
    res.send("<h2>Error consultando SAT</h2>");
  }
});

// puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});