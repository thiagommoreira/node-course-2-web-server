const express = require('express');
const hbs = require('hbs'); //handlebars
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {

	var now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log+'', (err) => {
		if(err) {
			console.log("Erro no server.log");
		}
	});

	next();

});

// app.use((req, res, next) => {

// 	res.render('maintenance.hbs');

// });


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/bad', (req, res) => {

	res.send({
		errorMessage: 'Erro no request'
	});

});

app.get('/about', (req, res) => {

	res.render('about.hbs', {
		pageTitle: 'About Page'
	});

});

app.get('/portfolio', (req, res) => {

	res.render('portfolio.hbs', {
		pageTitle: 'Pagina portfolio'
	});

});

app.get('/', (req, res) => {
	res.render('index.hbs', {
		pageTitle: 'Home Page',
		welcomeText: "Bem vindo seu lindo"
	});
});



app.listen(port, () => {
	console.log('server up');
});