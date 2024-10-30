<template>
  <main>
    <div class="page-header">
    <h3 class="fw-bold mb-3">Mes Paris</h3>
</div>
<div class="row">
  <RouterLink :to="{name: 'betdetail', params: {id: bet.Id}}" v-for="bet in vm?.Bets" :key="bet">
    <div class="card">
        <div class="card-header">
            <h4 class="card-title">Fin: {{ bet.EndDate }} <br /> Jetons: {{ bet.Chips }}</h4>
        </div>
        <div class="card-header">
            <div class="tab-content mt-2 mb-3">
                <p>{{ bet.Description }}</p>
            </div>
        </div>
    </div>
  </RouterLink>
</div>
  </main>
</template>


<script lang="ts">
import { getCurrentInstance, inject, ref } from 'vue'
import { BetsViewModel } from '../viewmodels/BetsViewModel';

    export default {
        setup() {
            const vm = ref(inject<BetsViewModel>('betsviewmodel'))
            const current = getCurrentInstance()
            return {
                vm,
                current
            }
        },
        async mounted(): Promise<void> {
            await this.vm!.LoadBetsAsync();
            this.current?.proxy?.$forceUpdate();
        },
        methods: {
          
        },
    }
</script>