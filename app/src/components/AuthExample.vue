<template>
  <div id="app">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <button @click="login" type="button" v-if="!user">Login</button>
    <button @click="callAPI" type="button" v-if="user">
      Call Flask API
    </button>
    <button @click="logout" type="button" v-if="user">
      Logout
    </button>
    <h3 v-if="user">Hello {{ user.name }}</h3>
    <div v-if="resultUnprotected">
      <p>Result of calling unprotected endpoint:</p>
      <pre>{{ JSON.stringify(resultUnprotected, null, 4) }}</pre>
    </div>
    <div v-if="resultProtected">
      <p>Result of calling protected endpoint:</p>
      <pre>{{ JSON.stringify(resultProtected, null, 4) }}</pre>
    </div>
    <div v-if="resultProtectedWithRole">
      <p>Result of calling endpoint protected with role:</p>
      <pre>{{ JSON.stringify(resultProtectedWithRole, null, 4) }}</pre>
    </div>
    <p v-if="loginFailed">Login unsuccessful</p>
    <p v-if="apiCallFailed">API call unsuccessful</p>
    <p v-if="apiCallFailedUnprotected">Call to unprotected endpoint unsuccessful</p>
    <p v-if="apiCallFailedProtected">Call to protected endpoint unsuccessful</p>
    <p v-if="apiCallFailedProtectedWithRole">Call to endpoint protected with role unsuccessful</p>
  </div>
</template>

<script>
import AuthService from '../services/auth.service';
import FlaskService from '../services/flask.service';

export default {
  name: 'authexample',
  data() {
    return {
      msg: 'Vue.js + MSAL.js + Flask + Azure AD auth example',
      user: null,
      resultUnprotected: null,
      resultProtected: null,
      resultProtectedWithRole: null,
      apiCallFailed: false,
      apiCallFailedUnprotected: false,
      apiCallFailedProtected: false,
      apiCallFailedProtectedWithRole: false,
      loginFailed: false
    }
  },
  created() {
    this.authService = new AuthService();
    this.flaskService = new FlaskService();
  },
  mounted() {
    let account = this.authService.getAccount();
    if (account) {
      this.user = account;
    }
  },
  methods: {
    callAPI() {
      this.apiCallFailed = false;
      this.authService.getToken().then(
        token => {
          this.flaskService.getUnprotected(token).then(
            data => {
              this.resultUnprotected = data;
            },
            error => {
              console.error(error);
              this.apiCallFailedUnprotected = true;
            }
          );
          this.flaskService.getProtected(token).then(
            data => {
              this.resultProtected = data;
            },
            error => {
              console.error(error);
              this.apiCallFailedProtected = true;
            }
          );
          this.flaskService.getProtectedWithRole(token).then(
            data => {
              this.resultProtectedWithRole = data;
            },
            error => {
              console.error(error);
              this.apiCallFailedProtectedWithRole = true;
            }
          );
        },
        error => {
          console.error(error);
          this.apiCallFailed = true;
        }
      );
    },

    logout() {
      this.authService.logout();
    },

    login() {
      this.loginFailed = false;
      this.authService.login().then(
        user => {
          if (user) {
            this.user = user;
          } else {
            this.loginFailed = true;
          }
        },
        () => {
          this.loginFailed = true;
        }
      );
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

button {
  margin: 15px;
}
</style>
