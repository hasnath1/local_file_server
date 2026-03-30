import express from "express";
import path from "path";
import fs from "fs";
import os from "os";

const app = express();
const PORT = 80;
const pub = path.join(process.cwd(), "public");

app.use(express.static(path.join(process.cwd(), "public")));

console.log(
    `Serving files from: ${pub} | So Place your files in here that you want to share .`,
);

const getLocalIp = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Skip internal (127.0.0.1) and non-IPv4 addresses
            if (iface.family === "IPv4" && !iface.internal) {
                return iface.address;
            }
        }
    }
    return "127.0.0.1";
};

console.log(`Your local network IP is: ${getLocalIp()}`);

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
