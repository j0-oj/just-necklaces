import express from 'express';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import users from './routes/userRoutes.js';
import cors from 'cors';
import db from './dbConnection.js';
const port = process.env.PORT || 4000;

const app = express();
app.use(cors());

app.listen(port, () => {
	console.log(`Server started on PORT ${port}`);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.json());

//routes
app.use('/api/users', users);
