import express from "express";

const app = express()

app.use((req, res, next) => {
    if(true){
        next(new Error('Not Authorized'));
        return;
    }
    next();
});

app.use((err, req, res, next) => {
    console.error(err); // biar keliatan di terminal
    res.status(401).send(err.message);
})

app.get('/', (req, res) => {
    res.send('Hello Kesit!');
});

app.get('/say/:greeting', (req, res) => {
    const { greeting } = req.params;
    res.send(greeting);
})


app.listen(3000);