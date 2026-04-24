const express = require("express");
const cors = require("cors");

// 🔥 fetch seguro (para Railway)
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());

// ruta base
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

// endpoint principal
app.get("/sat", async (req, res) => {
  const { rfc, idcif } = req.query;

  if (!rfc || !idcif) {
    return res.send("<h2>Faltan datos</h2>");
  }

  try {
    const url = `https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?D1=10&D2=1&D3=${idcif}_${rfc}`;

    const response = await fetch(url);
    const rawHtml = await response.text();

    const html = limpiarHTML(rawHtml);

    const pagina = `
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Constancia SAT</title>

      <style>
        body {
          font-family: Arial, sans-serif;
          background: #e9ecef;
          padding: 20px;
        }

        .container {
          max-width: 800px;
          margin: auto;
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 0 15px rgba(0,0,0,0.1);
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
        }

        .btn {
          display: block;
          margin: 20px auto;
          padding: 12px 20px;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        hr {
          margin: 20px 0;
        }

        @media print {
          .btn { display: none; }
          body { background: white; }
          .container { box-shadow: none; }
        }
      </style>
    </head>

    <body>
      <div class="container">
        <h1>📄 Constancia de Situación Fiscal</h1>

        <button class="btn" onclick="window.print()">
          Descargar / Imprimir
        </button>

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
    res.send("<pre>" + error.toString() + "</pre>");
  }
});

// puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});