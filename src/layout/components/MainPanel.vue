<template>
    <div class="mainPanel">
        <router-view/>
    </div>
</template>

<script>
    import {defineComponent} from 'vue';

    export default defineComponent({
        name: "MainPanel",
        props: [],
        components: {},
        setup() {
            return {}
        },
        computed: {
            cachedViews() {
                return this.$store.getters.cachedViews
            },
            key() {
                return this.$route.path
            }
        }
    })
</script>

<style scoped>
    .mainPanel {
        padding: 24px;
    }
</style>
