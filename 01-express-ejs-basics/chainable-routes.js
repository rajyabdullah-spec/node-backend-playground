const express = require('express');
const app = express();
const PORT = 3000;

// Best Practice: Chaining multiple HTTP verbs on a single path location
app.route('/home')
  .get((request, response, nextHandler) => {
      response.type('text/html');
      response.write('<!DOCTYPE html>');
      nextHandler();
  })
  .get((request, response, nextHandler) => {
      response.end(`
        <html lang="en">
         <head>
          <meta charset="utf-8">
          <title>WebApp by ExpressJS</title>
         </head>
         <body>
           <h2>Press send!</h2>
           <form method="post" action="/home">
             <input type="text" name="userData" />
             <button type="submit">Send</button>
           </form>
         </body>
        </html>
     `);
  })
  .post((request, response, nextHandler) => {
      response.send('Got it!');
  });

app.listen(PORT, () => {
    console.log(`🚀 Chainable Routes Server running on port ${PORT}`);
});