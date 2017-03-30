const app = require('express')();
const mongoose = require('mongoose'),
{connection, Schema} = mongoose,
{json} = require('body-parser');

//db config
mongoose.Promise=global.Promise
mongoose.connect("mongodb://localhost/sandbox")
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', ()=> console.log(`connected to mongodb://localhost/sandbox!`))

app.use(json());


const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
});
const User = mongoose.model('User', userSchema);

const lotSchema = new Schema({
  address: String,
  description: String,
  zip: Number,
});
const Lot = mongoose.model('Lot', lotSchema);


const newUser = ({body}, res) =>
new User(body)
.save()
.then(newUser => res.json(newUser));

app.post('/users', newUser)
const getAllUsers = (req, res) =>
  User.find()
  .then(getAllUsers => res.json(allUsers));

app.get('/users', getAllUsers);

const newLot = ({body}, res) =>
new Lot(body)
.save()
.then(newLot => res.json(newLot));


app.post('/lots', newLot)
const getAllLots = (req, res) =>
  Lot.find()
  .then(allLots => res.json(allLots));

app.get('/lots', getAllLots);

app.get('/search',
({query:{q}}, res) => res.json(q)
);



var cursor = db.collection(<collection_name>).find({ $text: { $search: <your string> } });






app.listen(3080, console.log('on port 3080'));
