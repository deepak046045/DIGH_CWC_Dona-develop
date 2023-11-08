const env = {
  appBaseUrl: process.env.APP_BASE_URL,
  awsNodeEnv: process.env.AWS_NODE_ENV,
  nextAuthSecret: process.env.NEXTAUTH_SECRET,
  nextAuthURL: process.env.NEXTAUTH_URL,
  openidClientId: process.env.OPENID_CLIENT_ID,
};

export type EnvironmentVariables = keyof typeof env;

export const Environment = {
  get: (key: EnvironmentVariables) => env[key] || '',
};
