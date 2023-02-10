import { Router } from 'express';


const rbacRouter = Router();

rbacRouter.post('/add/:id', async (req, res) => {
  console.log(req.body, req.params);
  try {
    console.log(res.locals)
    res.send(await res.locals.rbac.add_role(req.params.id, req.body)).status(200);
  } catch (err) {
    res.send({ message: 'error' }).status(400);
  }
});

export default rbacRouter;
