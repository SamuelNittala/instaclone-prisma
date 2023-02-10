import { Router } from 'express';
import { add_role, check_permission, get_role } from '../modules/rbac';
import { getEnforcer } from './casbin';

const router = Router();

router.post('/add/:id', async (req, res) => {
  console.log(req.body, req.params);
  try {
    res.send(await add_role(req.params.id, req.body)).status(200);
  } catch (err) {
    res.send({ message: 'error' }).status(400);
  }
});

router.get('/get/:id', async (req, res) => {
  try {
    res.send(await get_role(req.params.id)).status(200);
  } catch (err) {
    res.send({ message: 'error' }).status(400);
  }
});

router.get('/check/:id/:permission', async (req, res) => {
  try {
    res.send(await check_permission(req.params.id, req.params.permission));
  } catch (err) {
    res.send({ message: 'error' }).status(400);
  }
});

export default router;
