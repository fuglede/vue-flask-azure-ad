import * as Msal from 'msal';

export default class AuthService {
  constructor() {
    this.applicationConfig = {
      auth: {
        clientId: '{Application (client) ID for frontend app registration}',
        authority: "https://login.microsoftonline.com/{Directory (tenant) ID}"
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
      }
    };
    this.requestObj = {
      scopes: ['api://{Application (client) ID for backend app registration}/Read.All']
    }
    this.app = new Msal.UserAgentApplication(this.applicationConfig);
  }
  login() {
    return this.app.loginPopup(this.requestObj).then(
      idToken => {
        console.log("ID token received:");
        console.log(idToken);
        return this.app.getAccount();
      },
      error => {
        console.log(error);
        return null;
      }
    )
  }
  logout() {
    this.app.logout();
  }
  getAccount() {
    return this.app.getAccount();
  }
  getToken() {
    return this.app.acquireTokenSilent(this.requestObj).then(
      accessToken => {
        return accessToken;
      },
      error => {
        console.log(error);
        return this.app
          .acquireTokenPopup(this.requestObj)
          .then(
            accessToken => {
              return accessToken;
            },
            err => {
              console.error(err);
            }
          );
      }
    );
  }
}
