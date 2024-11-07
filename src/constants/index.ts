export const getBaseUrl = (environment: string) => {
    return environment === "development" ? "http://localhost:8001" : "https://swimato.onrender.com"
};
export const methods = {
    GET: "GET",
    POST: "POST"
}