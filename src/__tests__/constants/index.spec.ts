import { describe, it, expect } from 'vitest';
import { getBaseUrl } from '../../constants';

describe('baseUrl', () => {
    it('should return the localhost URL in development mode', () => {
        const mode = 'development';
        const url = getBaseUrl(mode);
        expect(url).toBe('http://localhost:8000');
      });
    
      it('should return the production URL in production mode', () => {
        const mode = 'production';
        const url = getBaseUrl(mode);
        expect(url).toBe('https://food-delivery-server-s65z.onrender.com');
      });
});