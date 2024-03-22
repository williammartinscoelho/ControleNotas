<template>
    <div class="d-flex justify-center mt-3">
        <v-progress-circular :size="size" :color="color" indeterminate />
    </div>
</template>

<script>
export default {
    name: "ProgressCircular",
    props: {
        size: {
            type: Number,
            default: 50
        },
        color: {
            type: String
        },
    }
};
</script>