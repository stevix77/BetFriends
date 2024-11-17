<template>
    <main>
        <form>
            <div v-if="vm?.error">
                <span>{{ vm!.error }}</span>
            </div>
            <div>
                <span><input type="radio" value="true" name="result" v-model="vm!.result" />Gagné</span> 
                <span><input type="radio" value="false" name="result" v-model="vm!.result" />Perdu</span>
            </div>
            <div v-if="vm?.result == 'true'">
                <button class="btn btn-info" @click="onPickFile">Upload proof</button>
                <input
                    type="file"
                    style="display: none"
                    ref="fileInput"
                    accept="image/*"
                    @change="onFilePicked" />
            </div>
            <div v-if="vm?.proof" style="float: right;">
                <img v-bind:src="vm.proof" width="350" height="500" />
            </div>
            <div class="col-sm">
                <button class="btn btn-success" type="button" @click="valide()">
                    Terminer 
                </button>
            </div>
        </form>
    </main>
</template>

<script lang="ts">
import { getCurrentInstance, inject, ref } from 'vue'
import { CompleteBetViewModel } from '../viewmodels/CompleteBetViewModel';

    export default {
        props: {
            betId: String
        },
        setup(props) {
            console.log(props.betId)
            const betId = props.betId;
            const vm = ref(inject<CompleteBetViewModel>('completebetviewmodel'))
            const current = getCurrentInstance()
            return {
                vm,
                current,
                betId
            }
        },
        methods: {
            onPickFile (event) {
                event.preventDefault();
                this.$refs.fileInput.click()
            },
            onFilePicked (event) {
                const files = event.target.files
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                    this.vm!.proof = fileReader.result;
                })
                fileReader.readAsDataURL(files[0])
            },
            async valide() {
                await this.vm!.Complete(this.betId!)
                this.current?.proxy?.$forceUpdate();
            }
        }
    }
</script>