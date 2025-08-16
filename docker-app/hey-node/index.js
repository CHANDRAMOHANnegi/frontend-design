const express = require('express');

// write hello world on "/" path
const app = express();
app.get('/', (req, res) => {
    res.json({ "hey": 'Hello World!' });
});

// start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
