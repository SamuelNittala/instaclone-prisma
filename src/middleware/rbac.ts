import Rbac from "../modules/rbac_class";
import { getEnforcer } from "../rbac/casbin";


export async function rbac(req, res, next) {
  try {
    const rbacClass = new Rbac(await getEnforcer());
    res.locals.rbac = rbacClass;
    next();
  } catch (err) {
    next(err);
  }
}
