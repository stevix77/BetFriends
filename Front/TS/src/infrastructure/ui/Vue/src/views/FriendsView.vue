<template>
    <friends-component ></friends-component>
  </template>
   
  <style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>
  <script setup lang="ts">
    import FriendsComponent from "../components/friends/FriendsComponent.vue";  
    // import { FriendsViewModel } from "../viewmodels/FriendsViewModel";
    // const vm = new FriendsViewModel();
  </script>