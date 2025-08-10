import { Router } from "itty-router";
import { validateAuth } from "./utils/auth";

type Env = {
  NEO4J_USER: string;
  NEO4J_PASSWORD: string;
};

const router = Router();

router.all("*", async (request: Request) => {
  const auth = await validateAuth(request);
  if (!auth) {
    return new Response("Unauthorized", { status: 401 });
  }
});

export default {
  fetch: router.handle,
};
