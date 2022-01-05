export const config = {
    clientId: "fc2e272f-56b5-4466-ad0b-206119970ad5",
    redirectUri:  window?.location?.href?.includes("localhost")
    ? "http://localhost:3000"
    : "siemenshealthneer-leadx.com",
    postLogoutRedirectUri : 'https://localhost:3000',
};