import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        coverage: {
            provider: 'istanbul', // or 'v8'
            thresholds: {
                lines: 70,
                functions: 70,
                branches: 70,
                statements: 70
            }
        },
        environment: 'jsdom',
        globals: false,
        setupFiles: './src/__tests__/setup.tsx',
    },
})