import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

const app = new express();

const port = process.env.PORT || 3001;

app.use(express.static('./src/static/'))

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve())+'/index.html')
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(path.resolve())+'/home.html')
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(path.resolve())+'/cadastro.html')
})

app.get('/denunciar', (req, res) => {
    res.sendFile(path.join(path.resolve())+'/create-complaint.html')
})

app.get('/editar-perfil', (req, res) => {
    res.sendFile(path.join(path.resolve())+'/edit-data.html')
})

app.listen(port);

app.use(function(req, res) {
    res.status(404).sendFile(path.join(path.resolve())+'/notFound.html')
});