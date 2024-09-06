import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Input from "../../../components/form/input";

describe('Form Input', () => {
    it('should render the input correctly', () => {
        const {getByText} = render(<Input label="Test" />);
        expect(getByText("Test")).toBeDefined();
    })
});