import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.86f8cbe802584dbaa673ff6260153a34',
  appName: 'krishok-sathi-flutter',
  webDir: 'dist',
  server: {
    url: 'https://86f8cbe8-0258-4dba-a673-ff6260153a34.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;