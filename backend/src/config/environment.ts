export const environment = {
  JWT: {
    SECRET: process.env.JWT_SECRET || 'default_secret_key',
    TTL: process.env.JWT_TTL || '3600',
  },
};
