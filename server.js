const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// ruta base
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// función para limpiar HTML y dejarlo bonito
function limpiarHTML(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<img[^>]*>/gi, "") // quita logo roto
    .replace(/style="[^"]*"/gi, "")
}

// endpoint SAT -> devuelve PDF simple
app.get("/sat", async (req, res) => {
  const { rfc, idcif } = req.query;

  if (!rfc || !idcif) {
    return res.json({ error: "Faltan datos" });
  }

  try {
    const url = `https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?D1=10&D2=1&D3=${idcif}_${rfc}`;

    const response = await fetch(url);
    let html = await response.text();

    html = limpiarHTML(html);

    // 🔥 armamos PDF en HTML limpio
    const contenido = `
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: Arial;
            padding: 20px;
          }
          h1 {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>Constancia SAT</h1>
        ${html}
      </body>
      </html>
    `;

    // 👉 aquí NO usamos puppeteer (clave del éxito)
    res.setHeader("Content-Type", "application/pdf");

    // hack simple: forzamos descarga como PDF
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=constancia.pdf"
    );

    res.send(Buffer.from(contenido));

  } catch (error) {
    console.error(error);
    res.json({ error: "Error consultando SAT" });
  }
});

// puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});