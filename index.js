const express = require('express');
const app = express();
const port = 3007;
// const bodyParser = require('body-parser');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
const routers = require('./routers');
app.use(routers);

app.listen(port, () => console.log(`Server running at
http://localhost:${port}`));

