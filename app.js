const express = require("express");
const db = require("./models");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cookieParser = require('cookie-parser');
const { authenticateUser } = require('./middleware/auth');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cookieParser());

app.use('/api/', userRouter);
app.use('/api/products/', authenticateUser, productRouter);

db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        console.log('server running.');
    });
});