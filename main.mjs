import express from "express";
import path from "path";
import fs from "fs";
import os from "os";
import colors from "colors";
colors.enable();

const app = express();
const PORT = 80;
const pub = path.join(process.cwd(), "public");
const logger = (req, res, next) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`Received request for: ${req.url} | ${timestamp}`.cyan);
    next();
};

app.use(logger);
app.use(express.static(pub));

console.log(
    `Serving files from: ${pub} \nSo Place your files in here that you want to share .`
        .yellow.bold,
);

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// This is the main route that serves the HTML page with links to the files in the public directory.
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
app.get("/", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>

    <h1>Welcome to the Local File Server</h1>
    <p>Here are the files available in the public directory:</p>

    <br>

      <ul>
        ${fs
            .readdirSync(pub)
            .map((file) => `<li><a href="${file}">${file}</a></li>`)
            .join("<br>")}
      </ul>
   </body>
</html>
        `);
});

app.get("/public", (req, res) => {
    const text = `Dumb Ass!!! What is the name of the file?????\n <br>
    use this syntax : \n<br><br><br>
public/[PUT YOUR FILENAME HERE]
    `;
    res.send(text);
});

const printLocalIPAddresses = () => {
    const interfaces = os.networkInterfaces();
    console.log(
        "\n\n[LOCAL IP ADDRESS] (Likely addresses where server is accessible):"
            .green.bold,
    );
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === "IPv4" && !iface.internal) {
                console.log(`${iface.address} | ${name}`);
            }
        }
    }
};

app.listen(PORT, "0.0.0.0", () => {
    printLocalIPAddresses();
    console.log(`Server is running on http://[IP ADDRESS]:${PORT}`.blue.bold);
});
