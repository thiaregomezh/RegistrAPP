import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'RegistrarApp',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    Camera: {
      // Esto es opcional, pero asegúrate de que no está en conflicto
      // con tus configuraciones globales.
      resultType: 'uri',
      source: 'camera'
    }
  }
};

export default config;

