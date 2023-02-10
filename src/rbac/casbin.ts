import  { newEnforcer } from 'casbin';
import { PrismaAdapter } from 'casbin-prisma-adapter';
import { join } from "path";

export async function getEnforcer() {
  const adapter = await PrismaAdapter.newAdapter();
  const modelFilePath = join(__dirname, "./rbac.conf");
  // console.log(modelFilePath);
  // console.log(adapter, newEnforcer, 'enforcer');
  const enforcer = await newEnforcer(modelFilePath, adapter);
  return enforcer;
}

