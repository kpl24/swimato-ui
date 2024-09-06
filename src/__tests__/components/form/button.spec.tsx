import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Button from "../../../components/form/button";

describe('Form Button', () => {
    it('should render the button correctly', () => {
        const {getByText} = render(<Button ><div>Text</div></Button>);
        expect(getByText("Text")).toBeDefined();
    })
});