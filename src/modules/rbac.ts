import { getEnforcer } from '../rbac/casbin';

export const add_role = async (userId: string, reqBody: any) => {
  const { role } = reqBody;
  try {
    const newEnforcer = await getEnforcer();
    // console.log(newEnforcer);
    newEnforcer.addRoleForUser(userId, role);
    return { status: true, data: [userId, reqBody.role] };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const get_role = async (userId: string) => {
  try {
    const newEnforcer = await getEnforcer();
    const res = await newEnforcer.getRolesForUser(userId);
    return { status: true, data: [res] };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const add_permission = async (role: string, permission: string) => {
  try {
    const newEnforcer = await getEnforcer();
    const res = await newEnforcer.addPermissionForUser(role, permission);
    return { status: true, data: [res] };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const check_permission = async (userId: string, permission: string) => {
  try {
    const newEnforcer = await getEnforcer();
    return {
      status: await newEnforcer.hasRoleForUser(userId, permission)
        ? 'allowed'
        : 'not-allowed',
    };
  } catch (err) {
    throw err;
  }
};
