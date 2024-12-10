<template>
<div class="content">
    <div class="container">
      <div class="row">
        <div class="col-lg-5 col-md-6 offset-lg-0 offset-md-3">
          <div class="square square-7" id="square7"></div>
          <div class="square square-8" id="square8"></div>
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Connexion</h4>
            </div>
            <form class="form" @submit="submit" method="POST">
                <div class="card-body">
              <span v-if="vm.error">{{vm.error}}</span>
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
                    <span v-if="vm.errorEmail">{{ vm.errorEmail }}</span>
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
                    <span v-if="vm.errorPassword">{{ vm.errorPassword }}</span>
                    </div>
                    <div>
                      <RouterLink to="/register">Créer un compte</RouterLink>
                    </div>
                </div>
                <div class="card-footer">
                    <input type="submit" value="Connexion" />
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, inject, ref, type FormHTMLAttributes } from 'vue';
import { SignInViewModel } from "../../../../adapters/viewmodels/SignInViewModel"

    export default {
        setup() {
            const vm = ref(inject<SignInViewModel>('signinviewmodel')!)
            const current = getCurrentInstance()
            return {
                vm,
                current
            }
        },
        methods: {
            async submit(form) {
                form.preventDefault()
                await this.vm.Signin();
                this.current?.proxy?.$forceUpdate();
            }
        }
    }
</script>