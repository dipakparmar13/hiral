 
export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_MICROSOFT_APP_ID,
    client_secret: process.env.REACT_APP_MICROSOFT_SECRET_ID,
    authority: process.env.REACT_APP_MICROSOFT_AUTHORITY_LINK,
    redirectUri: process.env.REACT_APP_REDIRECT_URL,
  },
};