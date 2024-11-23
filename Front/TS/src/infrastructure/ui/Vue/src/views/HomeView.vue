<template>
  <main>
    <div class="page-header">
        <h3 class="fw-bold mb-3">Mes Paris</h3>
    </div>
<div class="row">
    <h5 style="text-align: right;" v-if="vm?.Error">{{ vm?.Error }}</h5>
  <div class="card" v-for="bet in vm?.Bets" v-bind:key="bet.Id">
        <div class="card-header">
            <h4 class="card-title">Fin: {{ bet.EndDate }} <span style="float:right">Jetons: {{ bet.Coins }}</span></h4>
        </div>
        <div class="card-body">
            <div class="tab-content mt-2 mb-3">
                <p>{{ bet.Description }}</p>
            </div>
        </div>
        <div class="card-footer">
            <div class="row">
                <div class="col-sm">Participant(s) : {{ bet.AcceptedCount }} / {{ bet.InvitedCount }}</div>
                <div class="col-sm" v-if="bet.Answer != undefined">
                    {{ bet.Answer === true ? "Accepté" : "Refusé" }}
                </div>
                <div class="col-sm" v-if="bet.IsSuccess != undefined">
                    {{ bet.Result }}
                </div>
                <div class="col-sm" style="text-align:right" v-if="bet.CanAnswer">
                    <button class="btn btn-success" type="button" @click="Answer(true, bet.Id)">
                        Accepter
                    </button>
                    <button class="btn btn-danger" type="button" @click="Answer(false, bet.Id)">
                        Refuser
                    </button>
                </div>
                <div class="col-sm" style="text-align:right" v-if="bet.CanClose">
                    <button class="btn btn-success" type="button" @click="Complete(bet.Id)">
                        Terminer
                    </button>
                </div>
                <div class="col-sm" style="text-align:right" v-if="bet.IsSuccess === true">
                    <button class="btn btn-info" type="button" @click="getProof(bet.Id)">
                        Voir la preuve
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<dialog ref="dialog">
    <div>
      <img :src="proof" width="350" height="500"  />
    </div>
    <div>
      <button @click="dialog?.close()">OK</button>
    </div>
  </dialog>
  </main>
</template>


<script lang="ts">
import { getCurrentInstance, inject, ref } from 'vue'
import { BetsViewModel } from '../viewmodels/BetsViewModel';

    export default {
        setup() {
            const vm = ref(inject<BetsViewModel>('betsviewmodel')!)
            const current = getCurrentInstance()
            const proof = ref("")
            const dialog = ref<HTMLDialogElement>();
            return {
                vm,
                current,
                proof,
                dialog
            }
        },
        async mounted(): Promise<void> {
            await this.vm.LoadBetsAsync();
            this.current?.proxy?.$forceUpdate();
        },
        methods: {
          async Answer(answer: boolean, betId: string) {
            if(answer === true) {
                await this.vm.Accept(betId);
                this.current?.proxy?.$forceUpdate();
                return;
            }

            await this.vm.Decline(betId);
            this.current?.proxy?.$forceUpdate();
          },
          async Complete(betId: string) {
            await this.vm.Complete(betId);  
          },
          async getProof(betId: string) {
            this.proof = await this.vm.GetProof(betId);
            this.dialog!.showModal();
          }
          
        },
    }
</script>