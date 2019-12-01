import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import Router from 'express-promise-router';
import error from './util/error';
import v1 from './v1';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json());

const router = Router();

router.use('/v1', v1);

/**
 * Use router
 */
app.use(router);

/**
 * Catch 404
 */
app.use((req, res, next) => {
  next(error(404, 'Not Found'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500);

  res.json({
    error: {
      message: err.message,
      error: err,
    },
  });
});


export default app;
