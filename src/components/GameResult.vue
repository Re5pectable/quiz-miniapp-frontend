<template lang="">
    <div>
        {{gameId}}
        <HeaderComponent/>
    </div>
</template>
<script>
import HeaderComponent from './HeaderComponent.vue';
import { apiGetGame, apiGetResult } from '@/api/game';

export default {
    components: { HeaderComponent },
    props: {
        gameId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            gameInfo: null,
            result: null,
        }
    },
    async mounted() {
        this.gameInfo = await apiGetGame(this.gameId)
        if (!this.gameInfo.is_finished) {
            alert("Cannot get result of unfinished game.")
            return
        }
        this.result = await apiGetResult(this.gameId)
    },

}
</script>
<style lang="">

</style>