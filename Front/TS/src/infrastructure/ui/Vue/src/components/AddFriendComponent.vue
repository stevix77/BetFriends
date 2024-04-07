<template>
    <button v-if="!member?.IsFriend" @click="AddFriend(member.Id)">Add</button>
</template>

<script lang="ts">
    import { inject, getCurrentInstance, type PropType } from 'vue'
    import { type MemberDto } from '../../../../../domain/members/IMemberRepository' 
import type { FriendsViewModel } from '../viewmodels/FriendsViewModel';
    
    export default {
        props: {
            member: Object as PropType<MemberDto>
        },
        setup(props) {
            const vm = inject<FriendsViewModel>('friendsviewmodel');
            const instance = getCurrentInstance();
            const member = props.member
            return {
                vm,
                instance,
                member
            }
        },
        methods: {
            async AddFriend(id: string) : Promise<void> {
                await this.vm?.AddFriend(id);
                this.member!.IsFriend = true;
                this.instance?.proxy?.$forceUpdate()
            }
        }
    }
</script>