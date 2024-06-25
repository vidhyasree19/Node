const express = require('express');
const app = express();
const port = 1000;
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

const secretVal = "asfvuttdnf78i99i";
const token = jwt.sign({ id: '123456' }, secretVal, { expiresIn: 3 });
console.log("token :: ", token);

jwt.verify(token, secretVal, (err, decoded) => {
    if (err) {
        console.log("Error verifying token:", err);
    } else {
        console.log("decoded::", decoded);
    }
});


app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});