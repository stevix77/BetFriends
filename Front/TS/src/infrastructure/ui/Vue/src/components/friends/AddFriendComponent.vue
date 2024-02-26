<template>
    <button v-if="!member.IsFriend" @click="AddFriend(member.Id)">Add</button>
</template>

<script lang="ts">
    import { inject, ref, getCurrentInstance } from 'vue'
    import { FriendsViewModel } from '../../../../../adapters/viewmodels/FriendsViewModel'
    
    export default {
        props: ['member'],
        setup() {
            const friendsViewModel = ref(inject<FriendsViewModel>('friendsViewModel'))
            const instance = getCurrentInstance();
            return {
                friendsViewModel,
                instance
            }
        },
        methods: {
            async AddFriend(id: string) : Promise<void> {
                await this.friendsViewModel.AddFriend(id);
                this.instance?.proxy?.$forceUpdate()
            }
        }
    }
</script>