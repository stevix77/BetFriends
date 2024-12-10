<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarComponent from './components/SidebarComponent.vue';
import { inject, ref } from 'vue';
import { AuthService } from './services/authService';
import { Route, type IRouter } from '../../../adapters/IRouter';
const authService = ref(inject<AuthService>('authservice'))
const router = ref(inject<IRouter>('router'))
let isConnected = ref(authService.value?.IsLoggedIn());
authService.value!.isAuthenticated$.subscribe(
      (status) => {
        isConnected.value = status
        if(!status) {
          router.value!.Navigate(Route.Signin)
        }
      }
    );
</script>

<template>
  <div class="wrapper">
      <!-- Sidebar -->
      <SidebarComponent v-if="isConnected" />
      <!-- End Sidebar -->

      <div class="main-panel">
        <div class="main-header">
          <div class="main-header-logo">
            <!-- Logo Header -->
            <div class="logo-header" data-background-color="dark">
              <a href="index.html" class="logo">
              </a>
              <div class="nav-toggle">
                <button class="btn btn-toggle toggle-sidebar">
                  <i class="gg-menu-right"></i>
                </button>
                <button class="btn btn-toggle sidenav-toggler">
                  <i class="gg-menu-left"></i>
                </button>
              </div>
              <button class="topbar-toggler more">
                <i class="gg-more-vertical-alt"></i>
              </button>
            </div>
            <!-- End Logo Header -->
          </div>
          <!-- End Navbar -->
        </div>
        <div class="container">
          <div class="page-inner">
            <RouterView />
          </div>
        </div>
      </div>
      <!-- End Custom template -->
    </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
