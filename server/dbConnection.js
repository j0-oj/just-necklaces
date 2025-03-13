import mysql from 'mysql';
import express from 'express';

const app = express();

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'justnecklaces',
});

db.connect((err) => {
	if (err) {
		console.error('Error connecting to MySQL');
		throw err;
	}
	console.log('MySQL Connected...');
});

app.get('/createdb', (req, res) => {
	let sql = 'CREATE DATABASE justnecklaces';
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Database created...');
	});
});

app.get('/createnecklaces', (req, res) => {
	let sql1 = `CREATE TABLE necklaces(
			id VARCHAR(10) NOT NULL,
			name VARCHAR(100) NOT NULL,
			material VARCHAR(100), 
			measurements VARCHAR(100),
			PRIMARY KEY(id)
		)`;
	db.query(sql1, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Posts table created...');
	});
});

app.get('/createcolour', (req, res) => {
	let sql2 = `CREATE TABLE colours(
		id INT AUTO_INCREMENT,
		name VARCHAR(100),
		hex VARCHAR(7),
		PRIMARY KEY(id)
	)`;
	db.query(sql2, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Posts table created...');
	});
});

app.get('/create-necklace-colour', (req, res) => {
	let sql3 = `CREATE TABLE necklace_colour(
		necklace_id VARCHAR(10) NOT NULL,
		colour_id INT NOT NULL,
		PRIMARY KEY(necklace_id, colour_id),
		FOREIGN KEY (necklace_id) REFERENCES necklaces(id),
		FOREIGN KEY (colour_id) REFERENCES colours(id)
	)`;
	db.query(sql3, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Posts table created...');
	});
});

app.get('/create-pictures-table', (req, res) => {
	let sql4 = `CREATE TABLE necklace_pictures(
		id INT AUTO_INCREMENT,
		necklace_id VARCHAR(10) NOT NULL,
		image_url VARCHAR(255),
		alt_text VARCHAR(255),
		PRIMARY KEY(id),
		FOREIGN KEY (necklace_id) REFERENCES necklaces(id)
	)`;
	db.query(sql4, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Posts table created...');
	});
});

export default db;
