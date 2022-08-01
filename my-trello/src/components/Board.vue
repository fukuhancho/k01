<template>
<div>
    <header>
        my Trello
    </header>
    <main>
        <p class="info-Line">All: 0 tasks</p>
        <list-add />
    </main>
</div>
</template>

<script>
import ListAdd from './ListAdd.vue'

export default{

    components: {
        ListAdd
    },

}
</script>