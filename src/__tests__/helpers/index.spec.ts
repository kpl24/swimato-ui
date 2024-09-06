import { describe, expect, it, vi } from "vitest";
import { debounce, getTags } from "../../helpers";

vi.useFakeTimers();

describe('Helpers', () => {
    it('should return proper tags after calling getTags function', () => {
        expect(getTags(['Chinese', 'North Indian'])).toStrictEqual(['Chinese, ', 'North Indian.'])
    })

    it('should call the function after the wait time', () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 200);

        // Call the debounced function
        debouncedFn('test');

        // Ensure it's not called immediately
        expect(mockFn).not.toHaveBeenCalled();

        // Advance timers to simulate the delay
        vi.advanceTimersByTime(200);

        // Now it should have been called
        expect(mockFn).toHaveBeenCalledWith('test');
    });

    it('should debounce multiple rapid calls', () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 200);

        // Call debounced function multiple times
        debouncedFn('test1');
        debouncedFn('test2');
        debouncedFn('test3');

        // Advance time, but not enough to trigger the call
        vi.advanceTimersByTime(100);

        // It shouldn't be called yet
        expect(mockFn).not.toHaveBeenCalled();

        // Advance the remaining time
        vi.advanceTimersByTime(100);

        // It should have been called only once with the last value
        expect(mockFn).toHaveBeenCalledOnce();
        expect(mockFn).toHaveBeenCalledWith('test3');
    });

});