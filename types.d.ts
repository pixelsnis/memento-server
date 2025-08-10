export {};

declare global {
  interface AuthInfo {
    id: string;
    name?: string;
    email?: string;
  }

  interface Request {
    user?: AuthInfo;
  }
}
