import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        coverage: {
            provider: 'istanbul', // or 'v8'
            thresholds: {
                lines: 80,
                functions: 80,
                branches: 80,
                statements: 80
            }
        },
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/__tests__/setup.tsx',
    },
})