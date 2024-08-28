import { describe, expect, it, Mock, vi } from "vitest";
import { api } from "../../helpers/axios";
import getCityRestaurantsResponse from "../data/getCityRestaurantsResponse";

vi.mock('../../helpers/axios');

describe('Axios', () => {
    it('should return proper response after calling external url', async() => {
        (api as Mock).mockResolvedValueOnce(getCityRestaurantsResponse);
        const data = await api({
            method: "get",
            url: "someurl",
        });
        expect(data).toEqual(getCityRestaurantsResponse);
    })
});