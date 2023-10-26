<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-1.5 px-sm-4 px-0 sidebar-body">
        <div class="d-flex flex-column align-items-center align-items-sm-start pt-2 text-white min-vh-100 sticky-top">
          <div class="d-flex justify-content-center mx-auto">
            <img class="img-fluid logo" src="../assets/logo.jpg" alt=""/>
          </div>
          <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start sidebar" id="menu">
            <li class="nav-item w-100">
              <router-link to="/dashboard" class="nav-link link-dark px-0 text-decoration-none text-start px-4">
                <i class="fs-4 bi bi-graph-up text-white"></i>
                <span class="ms-1 d-none d-sm-inline ms-3 sidebar-text">Dashboard</span>
              </router-link>
            </li>
            <li class="nav-item w-100">
              <router-link to="/self-serve"  class="nav-link link-dark px-0 text-decoration-none text-start px-4">
                  <i class="fs-4 bi bi-bag-check sidebar-text"></i>
                  <span class="ms-1 d-none d-sm-inline ms-3 sidebar-text">Self-Serve</span>
                </router-link>
            </li>
            <li class="nav-item w-100">
              <router-link to="/projects"  class="nav-link link-dark px-0 text-decoration-none text-start px-4">
                <i class="fs-4 bi bi-list-task text-white"></i>
                <span class="ms-1 d-none d-sm-inline ms-3 sidebar-text">Projects</span>
              </router-link>
            </li>
            <li class="nav-item w-100">
                <router-link to="/records"  class="nav-link link-dark px-0 text-decoration-none text-start px-4">
                  <i class="fs-4 bi bi-book sidebar-text"></i>
                  <span class="ms-1 d-none d-sm-inline ms-3 sidebar-text">Records</span>
                </router-link>
            </li>
            <li class="nav-item w-100">
              <router-link to="/collaboration"  class="nav-link link-dark px-0 text-decoration-none text-start px-4">
                  <i class="fs-4 bi bi-people sidebar-text"></i>
                  <span class="ms-1 d-none d-sm-inline ms-3 sidebar-text">Collaboration</span>
                </router-link>
            </li>
            <li class="nav-item w-100">
              <router-link to="/generate"  class="nav-link link-dark px-0 text-decoration-none text-start px-4">
                  <i class="fs-4 bi bi-plus-circle sidebar-text"></i>
                  <span class="ms-1 d-none d-sm-inline ms-3 sidebar-text">Generate</span>
                </router-link>
            </li>
          </ul>
          <hr />
          <div class="dropdown pb-4">
            <a
              href="#"
              class=" d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="../assets/260.png" alt="hugenerd" width="50" height="50" class="rounded-circle"/>
              <span class="d-none d-sm-inline mx-1">{{ getUser }}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-light text-small shadow">
              <li @click="logout()">
                <a class="dropdown-item text-decoration-none text-dark" href="#">
                  <router-link to="/login" class="text-decoration-none text-dark">
                    <i class="bi bi-box-arrow-right me-2"></i>Sign out
                  </router-link>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col">
          <router-view />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "SideBar",
  data() {
    return {
      user: "",
      role: "",
      dashboardMenuItems: [
        {
          route: '/dashboard',
          iconClass: 'fs-5 bi bi-bar-chart sidebar-text ms-4',
          label: 'Charts',
        },
        {
          route: '/dashboard-clinical-designation',
          iconClass: 'fs-5 bi bi-file-earmark-medical sidebar-text ms-4',
          label: 'Clinical Designation',
        },
        {
          route: '/dashboard-appointment-title',
          iconClass: 'fs-5 bi bi-hospital sidebar-text ms-4',
          label: 'Appointment Title',
        },
      ],
      recordsMenuItems: [
        {
          route: '/records',
          iconClass: 'fs-5 bi bi-people sidebar-text ms-4',
          label: 'Faculty Appointment',
        },
        {
          route: '/facultyrecords',
          iconClass: 'fs-5 bi bi-people sidebar-text ms-4',
          label: 'Faculty List',
        },
      ],
    };
  },
  computed: {
    getUser() {
      return localStorage.getItem("name")
    }
  },
  mounted(){
    let navItems = document.getElementsByClassName('nav-item');

    navItems.forEach((item) => {
      item.classList.remove('active');
      if (this.$route.path.slice(1) == item.textContent.toLowerCase()) item.querySelector('a').classList.add('active1');
    });
  },
  methods: {
    logout() {
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
.router-link-active{
  background-color:cornflowerblue;
}

a {
  cursor: pointer;
}
.sidebar-body {
  background-color: #57C5F2;
}

.sidebar-text {
  color: aliceblue;
  font-weight: 500;
}

.col {
  padding: 0 !important;
}

/* .nav-item:hover{
  transform: scale(1.1);
} */

@media screen and (max-width: 575px) {
  .logo {
    display: none;
  }
}
</style>
