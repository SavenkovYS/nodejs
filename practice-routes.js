function reqHandler(req, res) {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html lang="en">');
        res.write('<head><title>nodejs</title></head>');
        res.write('<body><h1>hello from "/"</h1><form action="/create-user" method="POST"><input name="username" type="text"></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/users') {
        res.write('<html lang="en">');
        res.write('<head><title>nodejs</title></head>');
        res.write('<ul><li>User 1</li></ul>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedData = Buffer.concat(body).toString();
            res.writeHead(302, { Location: '/users' });
            return res.end();
        });

    }
}

module.exports = reqHandler;