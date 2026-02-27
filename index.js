import express from "express";
import notesRouter from './routes/notes.js';
import mongoose from "mongoose";
import { Post } from "./models/index.js";
import cors from "cors";

const app = express()
const uri = "mongodb+srv://parikesitwidodo_db_user:M8JPD5g8aJrN6EVv@cluster0.eatljww.mongodb.net/appdb?retryWrites=true&w=majority";
// const uri = "mongodb://parikesitwidodo_db_user:M8JPD5g8aJrN6EVv@ac-llcotdp-shard-00-00.eatljww.mongodb.net:27017,ac-llcotdp-shard-00-01.eatljww.mongodb.net:27017,ac-llcotdp-shard-00-02.eatljww.mongodb.net:27017/appdb?ssl=true&replicaSet=atlas-69uhmh-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    family: 4,
    tls: true,
})
    .then(() => console.log('✅ Berhasil Konek!'))
    .catch(err => console.error('❌ Masih Error:', err));

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/notes', notesRouter);


app.use((req, res, next) => {
    if (!true) {
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

app.get('/hoho/:params', (req, res) => {
    const { params } = req.params;
    res.send('hoho ' + params);
})

app.get('/hehe', (req, res) => {
    res.send('HEHEHEHEHEHEHEHEHE');
})

app.get('/admin', (req, res) => {
    res.status(401).send("Dilarang Masuk");
})

app.post('/test', (req, res) => {
    const body = req.body.name;
    res.json(body);
})


app.listen(3000);