import { prisma } from "../modules/db";
import { comparePasswords, createToken, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const hash = await hashPassword(req.body.password);

  const user = await prisma.user.create({
    data: {
      profile_name: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: hash,
    },
  });

  const token = createToken(user);
  res.json({ token });
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.body.username },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.send("Invalid username or password");
    return;
  }

  const token = createToken(user);
  res.json({ token });
};

