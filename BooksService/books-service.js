const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let books = [
    { id: 1, title: "Livre 1", authorsId: 1, categoryId: 1},
    { id: 2, title: "Livre 2", authorsId: 2, categoryId: 2},
    { id: 3, title: "Livre 3", authorsId: 3, categoryId: 3},
    { id: 4, title: "Livre 4", authorsId: 4, categoryId: 4},
    { id: 5, title: "Livre 5", authorsId: 5, categoryId: 5},
];

app.get('/books', async (req, res) => {
    res.json(books)
});

app.get('/books/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);

    if(book) {
        try {
            const authorResponse = await axios.get(`http://authors:4000/authors/${book.authorsId}`);
            const categoryResponse = await axios.get(`http://categories:5000/categories/${book.categoryId}`);
            const author = authorResponse.data;
            const category = categoryResponse.data;

            const bookDetails = {
                id: book.id,
                title: book.title,
                author: author.name,
                category: category.name
            };

            res.json(bookDetails);

        } catch (error) {
            res.status(500).json({error})
        }
    } else {
        res.status(404).json({error: 'Livre non trouvé'});
    }
    
});

app.post('/books', (req, res) => {
    console.log(req.body)
    const newBook = {
        id: req.body.id,
        tittle: req.body.tittle,
        authorId: req.body.authorId,
        categoryId: req.body.categoryId

    }
    books.push(newBook)
    res.json(books)
})

app.put('/books/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const index = books.findIndex(book => book.id === id)
    const book = books.find(book => book.id === id)
    if (book) {
        try {
            const newBook = {
                id: req.body.id,
                tittle: req.body.tittle,
                authorId: req.body.authorId,
                categoryId: req.body.categoryId

            }

            books[index] = newBook

            res.json(books)

        } catch (error) {
            res.status(500).json({ error: "dsfsd" })
        }
    } else {
        res.status(500).json({ error: "dsfffffsd" })
    }
})

app.listen(3000, () => {
    console.log("Microservices de gestion des livres démarré sur le port 3000")
})