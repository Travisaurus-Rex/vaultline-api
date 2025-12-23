export const configuration = () => ({
  env: process.env.NODE_ENV,
  server: {
    port: Number(process.env.PORT) || 3000,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  auth: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  },
});
