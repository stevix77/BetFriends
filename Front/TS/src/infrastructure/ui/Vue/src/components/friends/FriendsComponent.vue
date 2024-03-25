<template>
    <div>
        <search-component @searched="update" :viewmodel="viewModel"></search-component>
        
        <ul v-if="viewModel.ShowFriends === true">
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
import { FriendsViewModel } from '../../viewmodels/FriendsViewModel';
import { Subject } from 'rxjs'
import { FriendDto } from '../../../../../../domain/features/retrieveFriends/RetrieveFriendsHandler';
export default {
  components: { SearchComponent, AddFriendComponent },
    setup() {
        const controller = inject<FriendsController>('friendsController')
        const retrieveFriendsPresenter = inject<RetrieveFriendsPresenter>('retrieveFriendsPresenter')
        const viewModel = ref(new FriendsViewModel())
        const friendsSubject = new Subject<FriendDto[]>()
        friendsSubject.subscribe((friends: FriendDto[]) => viewModel.value.Friends = friends);
        retrieveFriendsPresenter?.Subscribe(friendsSubject)
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