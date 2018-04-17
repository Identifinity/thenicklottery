let express = require('express');

let app = express();

//view engine
app.set('view engine', 'ejs');

//middleware
app.use('/cssfiles', express.static('cssfiles'));
app.use('/imgs', express.static('imgs'));

//routing
app.get('/', (req, res) => {
  console.log("Main");
  res.render('index');
});

app.use((req, res, next) => {
  res.status(404).render('index');
});

app.listen(3000);
