import jwt from "jsonwebtoken";

export const validaJWT = (req: any, res: any, next: any) => {
  //leer token
  const token = req.header("x-token");
  console.log(token);
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "no token",
    });
  }

  try {
    console.log("verify");
    const uid = jwt.verify(token, process.env.JWT_SECRET);
    console.log("uid", uid);
    if (uid) {
      req.uid = uid;
      next();
    } else {
      return res.status(401).json({
        ok: false,
        msg: "token no valido",
      });
    }
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "token no valido",
    });
  }
};
