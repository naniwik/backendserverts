import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_ID);
export const googleverify = async (token:string)=> {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_ID,
  });
  const payload = ticket.getPayload();
  //console.log(payload);

    const {name, email, picture} = payload;
    console.log(name, email, picture);
    return  {name, email, picture};
}