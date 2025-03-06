import express from 'express';
// import mysql from 'mysql';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import users from './routes/userRoutes.js';
import cors from 'cors';
const port = process.env.PORT || 4000;

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//routes
app.use('/api/users', users);

app.listen(port, () => {
	console.log(`Server started on PORT ${port}`);
});
