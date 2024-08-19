import { describe, expect, it } from "vitest";
import { getTags } from "../../helpers";

describe('Helpers', () => {
    it('should return proper tags after calling getTags function', () => {
        expect(getTags(['Chinese', 'North Indian'])).toStrictEqual(['Chinese, ', 'North Indian.'])
    })
});