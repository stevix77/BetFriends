<template>
    <div class="content">
        <div class="container">
          <div class="row">
            <div class="col-lg-5 col-md-6 offset-lg-0 offset-md-3">
              <div class="square square-7" id="square7"></div>
              <div class="square square-8" id="square8"></div>
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">Inscription</h4>
                </div>
                <form class="form" @submit="submit" method="POST">
                    <div class="card-body">
                  <span v-if="vm.error" style="color: red">{{vm.error}}</span>
                  <div
                        class="input-group"
                        >
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                            <i class="tim-icons icon-email-85"> </i>
                            </div>
                        </div>
                        <input
                            class="form-control"
                            placeholder="Username"
                            type="text"
                            name="username"
                            v-model="vm.username"
                        />
                        </div>
                        <div
                        class="input-group"
                        >
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                            <i class="tim-icons icon-email-85"> </i>
                            </div>
                        </div>
                        <input
                            class="form-control"
                            placeholder="Email"
                            type="email"
                            name="email"
                            v-model="vm.email"
                        />
                        </div>
                        <div
                        class="input-group"
                        >
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                            <i class="tim-icons icon-lock-circle"> </i>
                            </div>
                        </div>
                        <input
                            class="form-control"
                            placeholder="Password"
                            type="password"
                            name="password"
                            v-model="vm.password"
                        />
                        </div>
                        <div
                        class="input-group"
                        >
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                            <i class="tim-icons icon-lock-circle"> </i>
                            </div>
                        </div>
                        <input
                            class="form-control"
                            placeholder="Password"
                            type="password"
                            name="confirmPassword"
                            v-model="vm.confirmPassword"
                        />
                        </div>
                        <div>
                          <RouterLink to="/signin" @click="$router.go(-1)">Se connecter</RouterLink>
                        </div>
                    </div>
                    <div class="card-footer">
                        <input type="submit" value="Valider" />
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

<script lang="ts" setup>
import { RegisterViewModel } from '../../../../adapters/viewmodels/RegisterViewModel';
import { useRouter } from "vue-router";
import { ref, inject, getCurrentInstance } from 'vue';

const vm = ref(inject<RegisterViewModel>('registerviewmodel')!)
const current = getCurrentInstance()
async function submit(form) {
    form.preventDefault()
    await vm.value.Register();
    current!.proxy?.$forceUpdate();
}

</script>