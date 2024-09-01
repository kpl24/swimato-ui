export const getBaseUrl = (environment: string) => {
    return environment === "development" ? "http://localhost:8001" : "https://server.klickraft.com/swimato"
};
export const methods = {
    GET: "GET",
    POST: "POST"
}