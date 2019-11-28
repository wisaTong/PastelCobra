import app from './src/app';

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on port ${server.address().port}`);
});

export default server;
