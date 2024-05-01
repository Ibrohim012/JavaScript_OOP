
import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

app.get('/todos', (req, res) => {
    fs.readFile('todos.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server xatosi');
            return;
        }
        res.json(JSON.parse(data));
    });
});
app.post('/todos', (req, res) => {
    const todo = req.body;
    fs.readFile('todos.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server xatosi');
            return;
        }
        const todos = JSON.parse(data);
        todos.push(todo);
        fs.writeFile('todos.json', JSON.stringify(todos), err => {
            if (err) {
                res.status(500).send('Server xatosi');
                return;
            }
            res.status(201).send('Vazifa yaratildi');
        });
    });
});
app.put('/todos/:id', (req, res) => {
    const todoId = req.params.id;
    const updatedTodo = req.body;
    fs.readFile('todos.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server xatosi');
            return;
        }
        const todos = JSON.parse(data);
        const updatedTodos = todos.map(item => {
            if (item.id === todoId) {
                return { ...item, ...updatedTodo };
            }
            return item;
        });
        fs.writeFile('todos.json', JSON.stringify(updatedTodos), err => {
            if (err) {
                res.status(500).send('Server xatosi');
                return;
            }
            res.send('Vazifa yangilandi');
        });
    });
});
app.delete('/todos/:id', (req, res) => {
    const todoId = req.params.id;
    fs.readFile('todos.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server xatosi');
            return;
        }
        const todos = JSON.parse(data);
        const updatedTodos = todos.filter(item => item.id !== todoId);
        fs.writeFile('todos.json', JSON.stringify(updatedTodos), err => {
            if (err) {
                res.status(500).send('Server xatosi');
                return;
            }
            res.send('Vazifa o\'chirildi');
        });
    });
});
app.listen(3000, () => {
    console.log('Server http://localhost:3000/ da ishlashni boshladi');
});