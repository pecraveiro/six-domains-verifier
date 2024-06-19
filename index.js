const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Para analisar JSON no corpo das requisições

// Array com domínios oficiais
const validDomains = [
    "https://memorimax.com",
    "https://memorimax.com.br",
    "https://omemorimax.com",
    "https://memorimaxoficial.fun",
    "https://memorimax.shop",
    "http://localhost:5173"
];

// Função para normalizar domínio
const normalizeDomain = (domain) => {
    return domain.replace(/(^\w+:|^)\/\//, '').replace('www.', '');
};

// Rota para verificar múltiplos domínios
app.post('/api/verify-domains', (req, res) => {
    const domains = req.body.domains;
    if (!domains || !Array.isArray(domains)) {
        return res.status(400).json({ error: "Please provide an array of domains." });
    }

    const results = domains.map(domain => {
        const normalizedDomain = normalizeDomain(domain);
        return {
            domain,
            isValid: validDomains.includes(normalizedDomain)
        };
    });

    res.json(results);
});

app.listen(port, () => {
    console.log(`Domain verifier API listening at http://localhost:${port}`);
});
