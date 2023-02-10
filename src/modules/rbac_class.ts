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

  async add_role(userId: string, reqBody: any) {
    const { role } = reqBody;
    try {
      this.enforcer.addRoleForUser(userId, role);
      return { status: true, data: [userId, reqBody.role] };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
