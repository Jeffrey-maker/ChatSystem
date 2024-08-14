const http = require('http');
const app = require('./app'); 

// Set the port
const port = process.env.PORT || 8000; 

// Create the HTTP server
const server = http.createServer(app);

// Listen on the specified port
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
