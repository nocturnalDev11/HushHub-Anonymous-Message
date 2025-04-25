<template>
    <div class="background scrollable-section">
        <main>
            <router-view />
        </main>
    </div>
</template>

<script>

export default {
    mounted: function () {
        let elHtml = document.getElementsByTagName('html')[0]
        elHtml.style.overflowY = 'hidden'
    },
    destroyed: function () {
        let elHtml = document.getElementsByTagName('html')[0]
        elHtml.style.overflowY = null
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

* {
    font-family: 'Poppins', sans-serif;
}

.status-bar {
    background-color: transparent !important;
}

.scrollable-section {
    overflow-y: auto;
    max-height: 100vh;
}
</style>
