const express = require('express');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
});
