import { ServerResquest } from "../types/serverTypes";

export async function authenticate(request: ServerResquest) {
  await request.jwtVerify();
}
