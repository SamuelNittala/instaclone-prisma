import type { Enforcer } from 'casbin';

interface IRbac {
  enforcer: Enforcer;
  add_role: (userId: string, reqBody: any) => Promise<{
    status: boolean;
    data: any;
  }>;
}

export default class Rbac implements IRbac {
  enforcer: Enforcer;

  constructor(enforcer: Enforcer) {
    this.enforcer = enforcer;
  }

  async add_role(userId: string, role: string) {
    try {
      await this.enforcer.addRoleForUser(userId, role);
      return { status: true, data: [userId, role] };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async add_permission(roleOrUser: string, permission: string) {
    try {
      await this.enforcer.addPermissionForUser(roleOrUser, permission);
      return {
        status: "Permission added",
        data: [roleOrUser, permission]
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async check_permission(roleOrUser: string, permission: string) {
    try {
      const allowed = await this.enforcer.hasPermissionForUser(roleOrUser, permission);
      return {
        status: allowed ? "Allowed" : "Denied",
        data: [roleOrUser, permission]
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
