export type UserJwtPayload = {
  family_name: string;
  given_name: string;
  name: string;
  preferred_username: string;
  email: string;
  [key: string]: unknown;
};
