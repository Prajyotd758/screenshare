export {};

declare global {
  interface Window {
    electronAPI: {
      getPath: () => string;
      getScreenSources: () => Promise<any>; // Adjust type based on your use case
    };
  }
}