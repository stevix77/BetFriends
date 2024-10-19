<template>
    <input type="text" placeholder="Rechercher" @input="$event => Search($event.target)" />
</template>

<script lang="ts">
import { inject, getCurrentInstance, ref } from 'vue'
import type { FriendsViewModel } from '../viewmodels/FriendsViewModel';
    export default {
        setup() {
            const vm = ref(inject<FriendsViewModel>('friendsviewmodel'));
            const current = getCurrentInstance()
            return {
                vm,
                current
            }
        },
        methods: {
            async Search(event: any): Promise<void> {
                await this.vm!.SearchMembers(event.value as string)
                this.current?.emit('searched')
            }
        }
    }
    
</script>