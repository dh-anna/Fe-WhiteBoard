type Config = {
  backendUrl: string;
  socketUrl: string;
};

export const config: Config = {
  backendUrl: process.env.REACT_APP_BACKEND_URL || "http://localhost:5000",
  socketUrl: process.env.REACT_APP_SOCKET_URL || "ws://127.0.0.1:5000",
};
