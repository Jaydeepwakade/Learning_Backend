const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const generateDirectoryListing = (dirPath, relativePath = '') => {
    let html = '<ul>';
    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
        const fullPath = path.join(dirPath, item);
        const itemStats = fs.statSync(fullPath);
        const icon = itemStats.isDirectory() ? '<i class="fas fa-folder"></i>' : '<i class="fas fa-file"></i>';

        html += `<li>${icon} <a href="${path.join(relativePath, item)}">${item}</a>`;
        
        if (itemStats.isDirectory()) {
            html += generateDirectoryListing(fullPath, path.join(relativePath, item));
        }
        
        html += '</li>';
    });

    html += '</ul>';
    return html;
};

const server = http.createServer((req, res) => {
    const reqPath = decodeURIComponent(req.url);
    const filePath = path.join(__dirname, reqPath);

    fs.stat(filePath, (err, stats) => {
        if (err) {
            res.statusCode = 404;
            res.end('404 Not Found');
            return;
        }

        if (stats.isDirectory()) {
            res.setHeader('Content-Type', 'text/html');
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
                    <title>File Server</title>
                </head>
                <body>
            `);

            const directoryListing = generateDirectoryListing(filePath, reqPath);
            res.write(directoryListing);

            res.end(`
                </body>
                </html>
            `);
        } else {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('500 Internal Server Error');
                    return;
                }

                const extname = path.extname(filePath);
                const mimeTypes = {
                    '.html': 'text/html',
                    '.js': 'text/javascript',
                    '.css': 'text/css',
                    '.json': 'application/json',
                    '.png': 'image/png',
                    '.jpg': 'image/jpg',
                    '.wav': 'audio/wav',
                };
                const contentType = mimeTypes[extname] || 'application/octet-stream';

                res.setHeader('Content-Type', contentType);
                res.end(data);
            });
        }
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
