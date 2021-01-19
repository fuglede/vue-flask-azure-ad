export default class FlaskService {
  constructor() {
    this.unprotectedUrl = 'http://localhost:5000/unprotected';
    this.protectedUrl = 'http://localhost:5000/protected';
    this.protectedWithRoleUrl = 'http://localhost:5000/protected-with-role';
  }

  async callAPI(token, url) {
    const headers = new Headers({ Authorization: `Bearer ${token.accessToken}` });
    const options = {
      headers
    };
    try {
      const response = await fetch(url, options);
      return await response.json();
    } catch (error) {
      throw new Error(error.text);
    }
  }

  getUnprotected(token) {
    return this.callAPI(token, this.unprotectedUrl);
  }

  getProtected(token) {
    return this.callAPI(token, this.protectedUrl);
  }

  getProtectedWithRole(token) {
    return this.callAPI(token, this.protectedWithRoleUrl);
  }
} 