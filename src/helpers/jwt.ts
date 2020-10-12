import jwt from "jsonwebtoken";

export const genJWT = (uid: string) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    const options: jwt.SignOptions = {
      expiresIn: "12h",
    };

    jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
          resolve(token);
      }
    });
  });
};
