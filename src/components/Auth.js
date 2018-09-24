import queryString from "query-string";

export default class Auth {
  constructor(history) {
    this.history = history;
  }

  // parses the result after authentication from URL hash
  handleAuthentication = () => {
    const queryParams = queryString.parse(this.history.location.search);
    setTimeout(() => {
      if (queryParams && queryParams.access_token && queryParams.expires_in) {
        this.setSession(queryParams);
        this.history.replace("/");
      }
    }, 0);
  };

  // Sets user details in localStorage
  setSession = authResult => {
    // Set the time that the access token will expire at
    let expiresIn = JSON.stringify(
      authResult.expires_in * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.access_token);
    localStorage.setItem("expires_in", expiresIn);
    // navigate to the home route
    this.history.replace("/");
  };

  // checks if the user is authenticated
  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresIn = JSON.parse(localStorage.getItem("expires_in"));
    return new Date().getTime() < expiresIn;
  };
}
