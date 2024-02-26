<template>
    <input type="text" placeholder="Rechercher" @input="$event => Search($event.target)" />
</template>

<script lang="ts">
    export default {
        methods: {
            Search(event: any) {
                this.$emit('searchMembers', event.value)
            }
        }
    }
    
</script>