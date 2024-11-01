<template>
    <div>
        <div>
            <span>{{vm?.OwnerName}}</span>
        </div>
        
        <div>
            <span>{{vm?.EndDate}}</span>
        </div>
        <div>
            <span>{{vm?.Chips}}</span>
        </div>
        <div>
            <p>{{ vm?.Description }}</p>
        </div>
    </div>
</template>

<script lang="ts">
    import { ref, inject, getCurrentInstance } from 'vue'
    import { DetailBetViewModel } from '../../viewmodels/DetailBetViewModel'
    
    export default {
        props: {
            id: String
        },

        setup() {
            const vm = ref(inject<DetailBetViewModel>('detailbetviewmodel'))
            const current = getCurrentInstance()
            return {
                vm,
                current
            }
        },

        async mounted(): Promise<void> {
            await this.vm!.LoadBet(this.id!)
            this.current?.proxy?.$forceUpdate();
        },
    }
</script>