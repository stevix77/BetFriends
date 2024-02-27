<template>
    <button v-if="!member?.IsFriend" @click="AddFriend(member.Id)">Add</button>
</template>

<script lang="ts">
    import { inject, ref, getCurrentInstance, type PropType } from 'vue'
    import { FriendsController } from '../../../../../adapters/controllers/FriendsController'
    import { AddFriendPresenter } from '../../presenters/AddFriendPresenter'
    import { type MemberDto } from '../../../../../../domain/members/IMemberRepository' 
    
    export default {
        props: {
            member: Object as PropType<MemberDto>
        },
        setup(props) {
            const controller = inject<FriendsController>('friendsController');
            const addFriendPresenter = inject<AddFriendPresenter>('addFriendPresenter')
            addFriendPresenter?.Subscribe(controller!)
            const instance = getCurrentInstance();
            const member = props.member
            return {
                controller,
                instance,
                member
            }
        },
        methods: {
            async AddFriend(id: string) : Promise<void> {
                await this.controller?.AddFriend(id);
                this.member!.IsFriend = true;
                this.instance?.proxy?.$forceUpdate()
            }
        }
    }
</script>