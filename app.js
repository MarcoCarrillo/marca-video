import express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import multer from 'multer';
import { Worker, isMainThread, workerData } from 'worker_threads';

require('dotenv').config();

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({dest: 'uploads', storage: storage});

const app = new express();
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index')
});

