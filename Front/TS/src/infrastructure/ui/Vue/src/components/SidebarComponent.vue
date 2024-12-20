<template>
    <div class="sidebar" data-background-color="dark">
    <div class="sidebar-logo">
      <!-- Logo Header -->
      <div class="logo-header" data-background-color="dark">
        BetFriends
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
    <div class="sidebar-wrapper scrollbar scrollbar-inner">
      <div class="sidebar-content">
        <ul class="nav nav-secondary">
          <li class="nav-item">
            <RouterLink to="/">
              <i class="fas fa-home"></i>
              <p>Accueil</p>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/friends">
              <i class="fas fa-layer-group"></i>
              <p>Amis</p>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/bets/new">
              <i class="fas fa-layer-group"></i>
              <p>Nouveau pari</p>
            </RouterLink>
          </li>
          <li class="nav-item">
            <a @click="LogOut($event)" href="/">
              <i class="fas fa-layer-group"></i>
              <p>Déconnexion</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { inject, ref } from 'vue';
import { AuthService } from '../services/authService';

    export default {
        setup() {
            const authService = ref(inject<AuthService>('authservice'))
            return {
                authService
            }
        },
        methods: {
          LogOut(event) {
            event.preventDefault();
            this.authService?.LogOut()
          }
        }
    }
</script>