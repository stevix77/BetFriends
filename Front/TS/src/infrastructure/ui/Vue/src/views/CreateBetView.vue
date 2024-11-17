<template>
    <form @submit="validateForm" method="POST" :action="'/'">
        <h3 style="color: red">{{ vm.Error }}</h3>
        <div id="form">
            <div style="float:left">
                <p>
                    
                </p>
                <p>
                    <label for="description">Description</label><br />
                    <textarea type="text" id="description" v-model="vm.Description"></textarea>
                </p>
                <p>
                    <label for="Coins">Jetons</label><br />
                    <input type="range" id="Coins" name="Coins" min="0" :max="vm.MaxCoins" v-model="vm.Coins"> {{ vm.Coins }}
                </p>
                <p>
                    <label for="endDate">Date de fin</label><br />
                    <input type="date" v-model="vm.EndDate" :min="vm.MinDate" />
                </p>
            </div>
            <div style="float:right">
                <p>
                    <label for="friends">Amis</label><br />
                    <ul>
                        <li v-for="friend in vm.Friends" :key="friend.Id">
                            <input type="checkbox" v-model="vm.FriendsSelected" :value="friend.Id" /> {{ friend.Name }} 
                        </li>
                    </ul>
                </p>
            </div>
        </div>
        <br />
        <p style="text-align: center;">
            <input type="submit" value="Valider" />
        </p>
    </form>
</template>
<style scoped>
    #form {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
</style>
<script lang="ts">
import { getCurrentInstance, inject, ref } from 'vue'
import { CreateBetViewModel } from '../viewmodels/CreateBetViewModel';

    export default {
        setup() {
            const vm = ref(inject<CreateBetViewModel>('createbetviewmodel'))
            const current = getCurrentInstance()
            return {
                vm,
                current
            }
        },
        async mounted(): Promise<void> {
            await this.vm!.GetFriends()
            this.current?.proxy?.$forceUpdate();
        },
        methods: {
            async validateForm(form) {
                form.preventDefault();
                await this.vm!.CreateBet()
                this.current?.proxy?.$forceUpdate();
                this.vm!.Reset();
            }
        },
    }
</script>