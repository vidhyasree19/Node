
const app = require('./server')

const port =3002;
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/CRUD_JS",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
app.listen(port, () => {
    console.log(`server is running at ${port}`)
})

export { app };
