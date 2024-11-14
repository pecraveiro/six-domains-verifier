const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Para analisar JSON no corpo das requisições

// Array com domínios oficiais
const validDomains = [
    "eternavitaoriginal.com",
    "oeternavita.fun",
    "oeternavita.com",
    "queroeternavita.fun",
    "eternavita.com.br",
    "eternavita.com",
    "eternvita.com",
    "oeternavita.com.br",
    "omemorimax.com",
    "memorimaxoficial.fun",
    "memorimax.shop",
    "memorimax.com.br",
    "memorimax.com",
    "omemoricoffee.com",
    "oinsulitrol.com",
    "insulitrol.com",
    "ofloraxil.com",
    "floraaxil.com",
    "floraxim.com",
    "floraxilbrasil.com",
    "floraxil.com",
    "floraxill.com",
    "flloraxil.com",
    "floraxim.com.br",
    "floraxi.com",
    "floraxjl.com",
    "floraxim.site",
    "ofloraxil.com.br",
    "floraslimofficial.com",
    "endopowerpro.com",
    "theendopower.com",
    "ogummyslim.com",
    "erefortoriginal.com",
    "oeregummy.com.br",
    "lipocofee.com.br",
    "theprimalburn.com",
    "localhost:5173"
];

// Função para normalizar domínio
const normalizeDomain = (domain) => {
    let domainBase = domain.replace('www.', '').replace('http://', '').replace('https://', '');
    let domainParts = domainBase.split('/');
    return domainParts[0]; // Retorna apenas o domínio base, ignorando qualquer caminho após o domínio
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
