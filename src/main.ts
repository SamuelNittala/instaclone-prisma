import express from 'express';
import router from './rbac/router';
import * as dotenv from 'dotenv';
import cors from 'cors';
// import { PrismaClient } from '@prisma/client';

// import { protect } from './modules/auth';

dotenv.config();

const app = express();
// const prisma = new PrismaClient({});
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/role', router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
