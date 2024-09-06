import { describe, expect, it } from 'vitest';
import { useWindowWidth } from '../../helpers/useWindowDimentions';
import { act, renderHook } from '@testing-library/react';

// Mock window.innerWidth for different screen sizes
const mockWindowWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
  window.dispatchEvent(new Event('resize'));
};

describe('useWindowWidth', () => {
  it('should return true if window width is less than 900', () => {
    mockWindowWidth(800);

    const { result } = renderHook(() => useWindowWidth());

    expect(result.current.isMobile).toBe(true);
  });

  it('should return false if window width is greater than or equal to 900', () => {
    mockWindowWidth(1000);

    const { result } = renderHook(() => useWindowWidth());

    expect(result.current.isMobile).toBe(false);
  });

  it('should update isMobile state when window is resized', () => {
    const { result } = renderHook(() => useWindowWidth());

    act(() => {
      mockWindowWidth(800);
    });

    expect(result.current.isMobile).toBe(true);

    act(() => {
      mockWindowWidth(1000);
    });

    expect(result.current.isMobile).toBe(false);
  });
});
