import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  // Debug: Log the environment variable
  console.log("VITE_BACKEND_URL:", process.env.VITE_BACKEND_URL);

  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        "/api": {
          target:
            "https://vercel.com/pavans-projects-2a1fb2c9/real-estate-backend/9Hdq57aUZCURjjGvgfVtd7WL9qwQ",
          secure: false,
          changeOrigin: true,
          configure: (proxy, _options) => {
            proxy.on("error", (err, _req, _res) => {
              console.log("proxy error", err);
            });
            proxy.on("proxyReq", (proxyReq, req, _res) => {
              console.log(
                "Sending Request to the Target:",
                req.method,
                req.url
              );
            });
            proxy.on("proxyRes", (proxyRes, req, _res) => {
              console.log(
                "Received Response from the Target:",
                proxyRes.statusCode,
                req.url
              );
            });
          },
        },
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(
      Boolean
    ),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
