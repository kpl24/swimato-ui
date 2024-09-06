import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Switch from "../../../components/form/switch";

describe('Form Switch', () => {
    it('should render the switch button correctly', () => {
        const { getByText } = render(<Switch label="Switch" />);
        expect(getByText("Switch")).toBeDefined();
    })

    it('should render the disabled switch button correctly', () => {
        const { getByText } = render(<Switch disabled label="Switch" />);
        expect(getByText("Switch")).toBeDefined();
    })
});