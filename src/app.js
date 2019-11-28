import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import error from './util/error';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json());

/**
 * Catch 404
 */
app.use((req, res, next) => {
  next(error(404, 'Not Found'));
});

export default app;
