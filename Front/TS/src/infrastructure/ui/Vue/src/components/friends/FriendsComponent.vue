<template>
    <div>
        <search-component @searched="update"></search-component>
        
        <ul v-if="viewModel.ShowFriends">
                <li v-for="friend in viewModel.Friends" :key="friend.Id">
                    {{ friend.Name }} 
                </li>
            </ul>
        <ul v-if="viewModel.ShowFriends === false">
                <li v-for="member in viewModel.Members" :key="member.Id">
                    {{ member.Name }} <add-friend-component :member="member"></add-friend-component>
                </li>
            </ul>
    </div>
</template>

<script lang="ts">
import { getCurrentInstance, inject, ref } from 'vue'
import SearchComponent from './SearchComponent.vue'
import AddFriendComponent from './AddFriendComponent.vue'
import { FriendsController } from '../../../../../adapters/controllers/FriendsController'
import type { RetrieveFriendsPresenter } from '../../presenters/RetrieveFriendsPresenter'
export default {
  components: { SearchComponent, AddFriendComponent },
    setup() {
        const controller = inject<FriendsController>('friendsController')
        const retrieveFriendsPresenter = inject<RetrieveFriendsPresenter>('retrieveFriendsPresenter')
        retrieveFriendsPresenter?.Subscribe(controller!)
        const viewModel: any = ref(controller!.vm);
        const current = getCurrentInstance()
        return {
            viewModel,
            controller,
            current
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