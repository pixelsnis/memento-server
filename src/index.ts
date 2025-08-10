import { validateAuth } from "./utils/auth";

type Env = {
  NEO4J_USER: string;
  NEO4J_PASSWORD: string;
};

export default {
  async fetch(request: Request, env: Env, _: any): Promise<Response> {
    const auth = await validateAuth(request);
    if (!auth) {
      return new Response("Unauthorized", { status: 401 });
    }

    return new Response("Hello World!");
  },
};
