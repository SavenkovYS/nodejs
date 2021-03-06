const fs = require('fs');

function requestHandler(req, res) {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html lang="en">');
        res.write('<head><title>nodejs</title></head>');
        res.write('<body><form method="POST" action="/message"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log('chunk ' + chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, () => {
                res.writeHead(302, { Location: '/' });
                return res.end();
            });
        });
    }
    res.write('<html lang="en">');
    res.write('<head><title>nodejs</title></head>');
    res.write('<body><h1>Hello from node js server</h1></body>');
    res.write('</html>');
    res.end();
}

module.exports = requestHandler;

