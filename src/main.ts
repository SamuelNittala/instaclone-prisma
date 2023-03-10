import express from 'express';
import rbacRouter from './rbac/router';
import * as dotenv from 'dotenv';
import cors from 'cors';
// import { protect } from './middleware/auth';
import { rbac } from './middleware/rbac';
import { createNewUser, signin } from './handlers/user';
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
app.use('/rbac', rbac, rbacRouter);
app.post('/signin', signin);
app.post('/user', createNewUser);
// app.use('/api', protect, apiRouter)

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
