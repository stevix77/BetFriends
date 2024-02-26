<template>
    <div>
        <search-component @searchMembers="Search"></search-component>
        
        <ul v-if="friendsViewModel.ShowFriends === true">
                <li v-for="friend in friendsViewModel.Friends" :key="friend.Id">
                    {{ friend.Name }} 
                </li>
            </ul>
        <ul v-if="friendsViewModel.ShowFriends === false">
                <li v-for="member in friendsViewModel.Members" :key="member.Id">
                    {{ member.Name }} <add-friend-component :member="member"></add-friend-component>
                </li>
            </ul>
    </div>
</template>

<script lang="ts">
import { inject, ref } from 'vue'
import { FriendsViewModel } from '../../../../../adapters/viewmodels/FriendsViewModel'
import SearchComponent from './SearchComponent.vue'
import AddFriendComponent from './AddFriendComponent.vue'
export default {
  components: { SearchComponent, AddFriendComponent },
    setup() {
        const friendsViewModel = ref(inject<FriendsViewModel>('friendsViewModel'))
        return {
            friendsViewModel
        }
    },
    async mounted(): Promise<void> {
        await this.friendsViewModel.LoadFriendsAsync()
    },
    methods: {
        async Search(data: string) : Promise<void>{
            await this.friendsViewModel.Search(data);
        }
    }
}
</script>

<style>

</style>