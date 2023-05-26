const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let categories = [
    {id: 1, name: "Category 1"},
    {id: 2, name: "Category 2"},
    {id: 3, name: "Category 3"},
    {id: 4, name: "Category 4"},
    {id: 5, name: "Category 5"},
];

app.get('/categories', async (req, res) => {
    res.json(categories);
});

app.get('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const category = categories.find(category => category.id === id);

    if (category) {
        res.json(category);
    } else {
        res.status(404).json({error: 'Category non trouvé'});
    }
})

app.post('/categories', (req, res) => {
    console.log(req.body)
    const newCategories = {
        id: req.body.id,
        name: req.body.name,

    }
    categories.push(newCategories)
    res.json(categories)
})

app.put('/categories/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const index = categories.findIndex(category => category.id === id)
    const category = categories.find(category => category.id === id)
    if (category) {
        try {
            const newCategories = {
                id: req.body.id,
                name: req.body.name,
            }

            categories[index] = newCategories

            res.json(categories)

        } catch (error) {
            res.status(500).json({ error: "aze" })
        }
    } else {
        res.status(500).json({ error: "aeze" })
    }
})

app.listen(5000, () => {
    console.log("Microservice de gestion des categories démarré sur le port 5000");
})