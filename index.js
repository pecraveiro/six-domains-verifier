const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Array com domínios oficiais
const validDomains = [
    "https://memorimax.com",
    "https://memorimax.com.br",
    "https://omemorimax.com",
    "https://memorimaxoficial.fun",
    "https://memorimax.shop",
    "http://localhost:5173/"
];

// Rota para verificar o domínio
app.get('/api/verify-domain', (req, res) => {
    const domain = req.query.domain;
    const normalizedDomain = domain.replace('www.', '');
    if (validDomains.includes(normalizedDomain)) {
        res.json({ isValid: true });
    } else {
        res.json({ isValid: false });
    }
});

app.listen(port, () => {
    console.log(`Domain verifier API listening at http://localhost:${port}`);
});
