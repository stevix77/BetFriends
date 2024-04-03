<template>
    <div>
        <search-component @searched="update"></search-component>
        
        <ul v-if="vm.ShowFriends">
                <li v-for="friend in vm.Friends" :key="friend.Id">
                    {{ friend.Name }} 
                </li>
            </ul>
        <ul v-if="vm.ShowFriends === false">
                <li v-for="member in vm.Members" :key="member.Id">
                    {{ member.Name }} <add-friend-component :member="member"></add-friend-component>
                </li>
            </ul>
    </div>
</template>

<script lang="ts">
import { getCurrentInstance, inject, ref } from 'vue'
import SearchComponent from './SearchComponent.vue'
import AddFriendComponent from './AddFriendComponent.vue'
import { FriendsController } from '../../../../adapters/controllers/FriendsController'
import type { FriendsPresenter } from '../presenters/FriendsPresenter'
import { FriendsViewModel } from '../viewmodels/FriendsViewModel';
export default {
  components: { SearchComponent, AddFriendComponent },
    setup() {
        const controller = inject<FriendsController>('friendsController')
        const friendsPresenter = inject<FriendsPresenter>('friendspresenter')
        const viewModel: any = ref(friendsPresenter!.vm);
        const vm = new FriendsViewModel(friendsPresenter);
        const current = getCurrentInstance()
        return {
            viewModel,
            controller,
            current,
            vm
        }
    },
    async mounted(): Promise<void> {
        await this.controller!.GetFriends()
        this.current?.proxy?.$forceUpdate();
    },
    methods: {
        update() {
            this.current?.proxy?.$forceUpdate();
        }
    }
}

</script>