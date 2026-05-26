const http = require('http');

const server = http.createServer((req, res) => {
    
    console.log(`New request received! URL: ${req.url} | Method: ${req.method}`);


    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    res.write('<h1>Backend أهلا وسهلا بكم في ملعبي البرمجي الجديد</h1>');
    res.write('<p>This server now runs locally and is completely independent within my own folder.</p>');
    
    res.end();
});

const PORT = 3000;
server.listen(PORT, 'localhost', () => {
    
    console.log(`🚀 Server is running perfectly under Nodemon control!`);
    console.log(`👉 Open your browser at: http://localhost:${PORT}`);
});