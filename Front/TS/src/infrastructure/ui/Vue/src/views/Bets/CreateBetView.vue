<template>
    <form @submit="validateForm" method="POST" :action="'/'">
        <h3 style="color: red">{{ vm.Error }}</h3>
        <div id="form">
            <div>
                <p>
                    
                </p>
                <p>
                    <label for="description">Description</label><br />
                    <textarea type="text" id="description" v-model="vm.Description"></textarea>
                </p>
                <p>
                    <label for="chips">Jetons</label><br />
                    <input type="range" id="chips" name="chips" min="0" :max="vm.MaxChips" v-model="vm.Chips"> {{ vm.Chips }}
                </p>
                <p>
                    <label for="endDate">Date de fin</label><br />
                    <input type="date" v-model="vm.EndDate" :min="vm.MinDate" />
                </p>
                <p>
                    <label for="friends">Amis</label><br />
                    <ul>
                        <li v-for="friend in vm.Friends" :key="friend.Id">
                            <input type="checkbox" v-model="vm.FriendsSelected" :value="friend.Id" /> {{ friend.Name }} 
                        </li>
                    </ul>
                </p>
            </div>
            <div>
                
            </div>
        </div>
        <p>
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
import { CreateBetPresenter } from '../../presenters/CreateBetPresenter';
import { FriendsController } from '../../../../../adapters/controllers/FriendsController';
import { FriendsPresenter } from '../../presenters/FriendsPresenter';
import { CreateBetViewModel } from '../../viewmodels/CreateBetViewModel';
import { BetsController } from '../../../../../adapters/controllers/BetsController';

    export default {
        setup() {
            const createBetPresenter = inject<CreateBetPresenter>('createBetPresenter')
            const friendsController = inject<FriendsController>('friendsController')
            const betsController = inject<BetsController>('betsController')
            const friendsPresenter = inject<FriendsPresenter>('friendspresenter')
            const vm = ref(new CreateBetViewModel(friendsPresenter, createBetPresenter));
            const current = getCurrentInstance()
            return {
                createBetPresenter,
                vm,
                friendsController,
                current,
                betsController
            }
        },
        async mounted(): Promise<void> {
            await this.friendsController!.GetFriends()
            this.current?.proxy?.$forceUpdate();
        },
        methods: {
            async validateForm(form) {
                form.preventDefault();
                await this.betsController!.Create({
                    Description: this.vm.Description,
                    EndDate: this.vm.EndDate,
                    Chips: this.vm.Chips,
                    Friends: this.vm.FriendsSelected
                })
                this.current?.proxy?.$forceUpdate();
            }
        },
    }
</script>