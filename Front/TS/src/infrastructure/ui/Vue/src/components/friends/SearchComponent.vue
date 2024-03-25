<template>
    <input type="text" placeholder="Rechercher" @input="$event => Search($event.target)" />
</template>

<script lang="ts">
import { inject, getCurrentInstance, PropType, ref } from 'vue'
import { FriendsController } from '../../../../../adapters/controllers/FriendsController'
import type { RetrieveMembersPresenter } from '../../presenters/RetrieveMembersPresenter';
import { FriendsViewModel } from '../../viewmodels/FriendsViewModel';
import { Subject } from 'rxjs';
import { type MemberDto } from '../../../../../../domain/members/IMemberRepository';
    export default {
        props: {
            viewmodel: Object as PropType<FriendsViewModel>
        },
        setup(props) {
            const viewmodel = ref(props.viewmodel)
            const subject = new Subject<MemberDto[]>();
            subject.subscribe((members: MemberDto[]) => {
                console.log(viewmodel);
                viewmodel!.value.Members = members
                viewmodel!.value.ShowFriends = false;
            })
            const controller = inject<FriendsController>('friendsController');
            const presenter = inject<RetrieveMembersPresenter>('retrieveMembersPresenter')
            presenter!.Subscribe(subject)
            const current = getCurrentInstance()
            return {
                controller,
                current
            }
        },
        methods: {
            async Search(event: any): Promise<void> {
                console.log(event.value);
                await this.controller!.SearchMembers(event.value)
                this.current?.emit('searched')
            }
        }
    }
    
</script>