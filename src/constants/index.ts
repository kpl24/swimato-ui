export const getBaseUrl = (environment: string) => {
    return environment === "development" ? "http://localhost:8000" : "https://food-delivery-server-s65z.onrender.com"
};
export const methods = {
    GET: "GET",
    POST: "POST"
}