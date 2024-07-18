const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.static('public'));

app.use(bodyParser.json());

// Lista de empregos
let jobList = [
    { id: 1, title: "Engenheiro de Software", company: "Google", location: "Nova York" },
    { id: 2, title: "Cientista de Dados", company: "Amazon", location: "Seattle" },
    { id: 3, title: "Desenvolvedor Full Stack", company: "Microsoft", location: "Redmond" }
];

// Lista de empresas
const companiesList = [
    { company: "Google", description: "Pioneira no desenvolvimento de software", location: "Nova York" },
    { company: "Amazon", description: "Líder no mercado de varejo", location: "Seattle" },
    { company: "Microsoft", description: "Desenvolvimento de software", location: "Redmond" }
];

app.get('/', (req, res) => {
    res.sendFile(__dirname+ '/index.html') 
})

// Rota para obter a lista de empregos
app.get('/jobs', (req, res) => {
    res.json(jobList);
});

// Rota para obter a lista de empresas
app.get('/companies', (req, res) => {
    res.json(companiesList);
});

// Rota para processar o formulário de inscrição
app.post('/apply', (req, res) => {
    setTimeout(() => {
        const status = Math.random() < 0.5 ? 'success' : 'error';
        res.json({ status });
    }, Math.random() * 5000); // Simula um processamento aleatório de até 5 segundos
});

// Rota para buscar vagas
app.get('/search', (req, res) => {
    const searchTerm = req.query.q.toLowerCase(); // Obter o parâmetro 'q' da query string em minúsculas
    const results = jobList.filter(job =>
        job.title.toLowerCase().includes(searchTerm)
    );
    res.json(results);
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
