import express from 'express';
const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.static('public'));

app.get('*', (_, res) => {
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
