const express = require('express'),
      app = express(),
      bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const gameRouter = require('./routes/gameRoutes');
const sellerCategoryRouter = require('./routes/sellerCategoryRoutes');
const userRouter = require('./routes/userRoutes');

app.use('/api/games', gameRouter());
app.use('/api/sellercategories', sellerCategoryRouter());
app.use('/api/users', userRouter());

const port = 3000;
app.listen(port);
console.log(`Server running on: ${port}`);
