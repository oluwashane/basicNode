const http = require('http');
const qs = require('queryString');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h3>Please enter a message below</h3><form action="/message" method="post"><input type="text" name="message"><br /><input type="submit" value="submit"></form>');
    
    if (req.method == 'POST') {
        let body = '';
        req.on('data', (data) => {
            body += data;

        })
        req.on('end', () => {
            const data = qs.parse(body);
            fs.writeFile('message.txt', data.message, (err) => {
                if (err) throw err;
                console.log('File created...')
            })
        })
    }
    res.end();
})

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
