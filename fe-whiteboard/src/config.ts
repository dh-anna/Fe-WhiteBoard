type Config = {
  backendUrl: string;
};

export const config: Config = {
  backendUrl: process.env.REACT_APP_BACKEND_URL || "http://localhost:3000",
};
