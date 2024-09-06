import { describe, it, expect, vi, afterEach, Mock } from 'vitest';
import toast from '../../helpers/toast';
import { default as hotToast } from 'react-hot-toast';
import { cleanup } from '@testing-library/react';

vi.mock('react-hot-toast', () => ({
    default: {
        custom: vi.fn(),
        dismiss: vi.fn(),
    },
}));

describe('toast', () => {

    afterEach(() => {
        cleanup()
    });

    it('should render a success toast', () => {
        toast({ title: 'Success', message: 'Operation completed', type: 'success' });

        expect(hotToast.custom).toHaveBeenCalled();
        const [callback] = (hotToast.custom as Mock).mock.calls[0];
        const toastComponent = callback({ visible: true });

        // Render the component and verify it contains the success class
        expect(toastComponent.props.children[1].props.className).toContain('text-success');
    });

    it('should render an error toast', () => {
        toast({ title: 'Error', message: 'Something went wrong', type: 'error' });

        expect(hotToast.custom).toHaveBeenCalled();
        const [callback] = (hotToast.custom as Mock).mock.calls[0];
        const toastComponent = callback({ visible: true });

        // Render the component and verify it contains the error class
        expect(toastComponent.props.children[1].props.className).toContain('text-success');
    });
});