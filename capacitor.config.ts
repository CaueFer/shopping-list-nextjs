import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'shopping-list',
  webDir: 'out',
  plugins: {
    'CustomPlugin': {
      'API_URL': process.env.NEXT_PUBLIC_API_URL,
    },
  },
};

export default config;
