import { Router } from 'express';


const rbacRouter = Router();

rbacRouter.post('/role/add/:id/:role', async (req, res) => {
  const { id , role } = req.params;
  const { rbac } = res.locals;
  try {
    res.send(await rbac.add_role(id, role)).status(200);
  } catch (err) {
    res.send({ message: 'error' }).status(400);
  }
});

rbacRouter.post('/permission/add/:roleOrUser/:permission', async (req, res) => {
  const { roleOrUser, permission } = req.params;
  const { rbac } = res.locals;
  try {
    res.send(await rbac.add_permission(roleOrUser, permission));
  } catch (err) {
    res.send( { message: 'error'}).status(400);
  }
})

rbacRouter.get('/permission/check/:roleOrUser/:permission', async (req, res) => {
  const { roleOrUser, permission } = req.params;
  const { rbac } = res.locals;
  try {
    res.send(await rbac.check_permission(roleOrUser, permission));
  } catch (err) {
    res.send( { message: 'error'}).status(400);
  }
})

export default rbacRouter;
