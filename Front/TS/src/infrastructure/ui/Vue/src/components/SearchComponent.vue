<template>
    <input type="text" placeholder="Rechercher" @input="$event => Search($event.target)" />
</template>

<script lang="ts">
import { inject, getCurrentInstance } from 'vue'
import { FriendsController } from '../../../../adapters/controllers/FriendsController'
    export default {
        setup() {
            const controller = inject<FriendsController>('friendsController');
            const current = getCurrentInstance()
            return {
                controller,
                current
            }
        },
        methods: {
            async Search(event: any): Promise<void> {
                await this.controller!.SearchMembers(event.value)
                this.current?.emit('searched')
            }
        }
    }
    
</script>