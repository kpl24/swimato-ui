import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        coverage: {
            provider: 'istanbul', // or 'v8'
            thresholds: {
                lines: 30,
                functions: 30,
                branches: 30,
                statements: 30
            }
        },
        environment: 'jsdom',
        globals: false,
        setupFiles: './src/__tests__/setup.tsx',
    },
})