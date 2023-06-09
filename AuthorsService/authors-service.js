const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let authors = [
    {id: 1, name: "Auteur 1"},
    {id: 2, name: "Auteur 2"},
    {id: 3, name: "Auteur 3"},
    {id: 4, name: "Auteur 4"},
    {id: 5, name: "Auteur 5"},
];

app.get('/authors', async (req, res) => {
    res.json(authors);
});

app.get('/authors/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const author = authors.find(author => author.id === id);

    if (author) {
        res.json(author);
    } else {
        res.status(404).json({error : "not found"});
    }
})

app.delete('/authors/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const index = authors.findIndex((author) => author.id === id);
    if (index !== -1) {
        authors.splice(index, 1);
        const response = await axios.get(`http://books:3000/books`)
        const books = response.data
        console.log(books)
        books.forEach(async (book) => {
            if (book.authorsId == id) {
                console.log("toto")
                await axios.put(`http://books:3000/books/${book.id}`, {
                    id: book.id,
                    title: book.title,
                    authorsId: null,
                    categoryId: book.categoryId
                })
            }
        });
        res.json({ status: "succes" })
    } else {
        res.status(404).json({ error: "not found" })
    }
})

app.post('/authors', (req, res) => {
    console.log(req.body)
    const newAuthors = {
        id: req.body.id,
        name: req.body.name,

    }
    authors.push(newAuthors)
    res.json(authors)
})

app.put('/authors/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const index = authors.findIndex(author => author.id === id)
    const author = authors.find(author => author.id === id)
    if (author) {
        try {
            const newAuthors = {
                id: req.body.id,
                name: req.body.name,
            }

            authors[index] = newAuthors

            res.json(authors)

        } catch (error) {
            res.status(500).json({ error: "aze" })
        }
    } else {
        res.status(500).json({ error: "aeze" })
    }
})

app.listen(4000, () => {
    console.log("Microservice de gestion des auteurs démarré sur le port 4000");
})