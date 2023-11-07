<template>
  <div class="page-holder align-items-center py-4 vh-100 bg-grad vh-100">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 px-lg-4 mb-4" v-if="userlogin">
          <div class="card">
            <div class="card-header px-lg-5">
              <div class="card-heading text-dark p-2 "><h1>Login</h1></div>
            </div>
            <div class="card-body p-lg-5">
              <h3 class="mb-4">Hi, welcome back! 👋👋</h3>
              <p class="text-muted text-sm mb-3">
                This is the <b>minimal viable prototype</b> for Saltine Communication web application system in collaboration with SMU. <br />
                Log in to get started!
              </p>
              <form id="loginForm" action="index.html">
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    id="floatingInput"
                    type="email"
                    v-model="email"
                    placeholder="name@example.com"
                    required
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-2">
                  <input
                    class="form-control"
                    id="floatingPassword"
                    type="password"
                    v-model="password"
                    placeholder="Password"
                    required
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <div class="text-sm text-end">
                  <a @click="user_forgotpassword()">Forgot password?</a>
                </div>
                <button
                  class="btn btn-primary"
                  type="button"
                  @click="login"
                  :disabled="!email || !password"
                >
                  Submit
                </button>
              </form>
            </div>
            <div class="card-footer px-lg-5 py-lg-4">
              <div class="text-sm text-muted ">
                Don't have an account? <a @click="user_register()">Register</a>.
              </div>
            </div>
          </div>
        </div>
        <!-- register -->
        <div class="col-lg-6 px-lg-4" v-if="userregister">
          <div class="card">
            <div class="card-header px-lg-5">
              <div class="card-heading text-dark"><h1>Register</h1></div>
            </div>
            <div class="card-body p-lg-5">
              <h3 class="mb-4">No account? Simply sign up now!</h3>
              <p class="text-muted text-sm mb-5">
                To register, you must be whitelisted by the administrator! Please contact the admin if you require the necessary permission
              </p>
              <form action="index.html">
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    id="floatingInput"
                    type="email"
                    v-model="email"
                    placeholder="name@example.com"
                    required
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    id="floatingPassword"
                    type="password"
                    v-model="password"
                    placeholder="Password"
                    required
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <div class="form-check mb-3">
                  <input
                    v-model="termsAndCondition"
                    class="form-check-input"
                    type="checkbox"
                    name="agree"
                    id="agree"
                  />
                  <label class="form-check-label d-flex ms-1" for="agree" 
                    >I agree with the
                    <a
                      target="_blank"
                      href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
                      class="ms-1"
                      >Terms & Conditions</a
                    >.</label
                  >
                </div>
                <div class="form-group">
                  <button
                    v-if="!isRegisterButtonClicked"
                    class="btn btn-primary"
                    id="register"
                    type="button"
                    name="registerSubmit"
                    @click="register()"
                    :disabled="!termsAndCondition || !email || !password"
                  >
                    Register
                  </button>
                  <button v-else class="btn btn-primary" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                  </button>
                </div>
              </form>
            </div>
            <div class="card-footer px-lg-5 py-lg-4">
              <div class="text-sm text-muted">
                Already have an account? <a @click="user_login()">Login</a>.
              </div>
            </div>
          </div>
        </div>
        <!-- forgot password-->
        <div class="col-lg-6 px-lg-4" v-if="userforgotpassword">
          <div class="card">
            <div class="card-header px-lg-5">
              <div class="card-heading text-dark"><h2>Reset Password</h2></div>
            </div>
            <div class="card-body p-lg-5">
              <h3 class="mb-4">Lost your password? Don't panic!</h3>
              <p class="text-muted text-sm mb-5">
                It's happens to the best of us.. Just enter your email below and
                we'll send you an email to reset your password! Remember to
                check your spam if you don't receive it after a few minutes~
              </p>
              <form v-if="!isResetButtonEmailClicked" id="loginForm" action="index.html">
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    id="floatingInput"
                    v-model="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-group">
                  <button
                    class="btn btn-primary"
                    id="reset"
                    type="button"
                    name="resetSubmit"
                    @click="reset_password()"
                    :disabled="
                      email &&
                      (!email.includes('@') || !email.includes('.'))
                    "
                  >
                    Reset
                  </button>
                </div>
              </form>
              <div v-else>
                <div class="alert alert-warning border border-warning border-4" role="alert">
                  Check your inbox (<b>{{email}}</b>) for the next steps! If you don't receive an email, and it's not in your spam folder, then you might have signed up with a different address.
                </div>
                <p class="text-muted text-sm mb-5">
                  Still can't login? Feel free to email us at <a href="mailto:sport.singapore.helpdesk@gmail.com">sport.singapore.helpdesk@gmail.com</a> if you require additional assistance!
                </p>
              </div>

            </div>
            <div class="card-footer px-lg-5 py-lg-4">
              <div class="text-sm text-muted">
                Already have an account? <a @click="user_login()">Login</a>.
              </div>
              <div class="text-sm text-muted">
                Don't have an account? <a @click="user_register()">Register</a>.
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-lg-6 col-xl-5 ms-xl-auto px-lg-4 text-center text-primary"
        >
          <img src="../assets/logo.png" alt="">
          <h1 class="mb-4 text-dark">Saltine Communications <br>Web Application System</h1>
          <p class="lead text-dark"><i>Get your business the PUBLICITY it deserves.</i></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      email: "tes",
      password: "test",
      contactNumber: "",
      userlogin: true,
      userregister: false,
      userforgotpassword: false,
      termsAndCondition: false,
      isResetButtonEmailClicked: false,
      toastrResponse: "",
      isRegisterButtonClicked: false,
    };
  },
  methods: {
    ...mapActions(['logIn']),
    async login() {
      this.$router.push('/dashboard');
      localStorage.setItem("name", this.email);
    },
    user_register() {
      this.userlogin = false;
      this.userregister = true;
      this.userforgotpassword = false;
    },
    user_login() {
      this.userlogin = true;
      this.userregister = false;
      this.userforgotpassword = false;
      this.isResetButtonEmailClicked = false;
      this.isRegisterButtonClicked = false;
    },
    user_forgotpassword() {
      this.userlogin = false;
      this.userforgotpassword = true;
    },
    async reset_password() {
      this.isResetButtonEmailClicked = true;
    },
    async register(){
      console.log("??")
    }
  },

};
</script>

<style scoped>

.bg-grad {
  background-image: linear-gradient(to right, #70D6A6, #57C5F2) !important;
}

.card-header:first-child {
  border-radius: calc(1rem - 1px) calc(1rem - 1px) 0 0;
}
.card-header {
  position: relative;
  padding: 2rem 2rem;
  border-bottom: none;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
  z-index: 2;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: none;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  border-radius: 1rem;
}
.bg-gray-100 {
  background-color: #f8f9fa !important;
}
body {
  font-family: "Poppins" !important;
  
}
.text-primary {
  color: #4650dd !important;
}
h1,
.h1,
h2,
.h2,
h3,
.h3,
h4,
.h4,
h5,
.h5,
h6,
.h6 {
  font-weight: 700;
  line-height: 1.2;
}
.text-muted {
  color: #6c757d !important;
}
.lead {
  font-size: 1.125rem;
  font-weight: 300;
}
.text-sm {
  font-size: 0.7875rem !important;
}
h3,
.h3 {
  font-size: 1.575rem;
}
.page-holder {
  display: flex;
  overflow-x: hidden;
  width: 100%;
  min-height: calc(100vh - 72px);

  flex-wrap: wrap;
}
a {
  cursor: pointer;
  text-decoration: underline !important;
}
</style>