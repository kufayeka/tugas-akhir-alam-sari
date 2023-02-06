import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.yekaa.alamsari",
  appName: "Alam Sari",
  webDir: "dist",
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.43.198:5173",
    cleartext: true,
  },
};

export default config;
