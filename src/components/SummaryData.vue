<script setup lang="ts">
import SummaryDataItem from './SummaryDataItem.vue'
import ToolingIcon from './icons/IconTooling.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
    <!--Data Metric values TBA... -->
    <div class="padding">
        <SummaryDataItem>
            <template #icon>
            <SupportIcon />
            </template>
            <template #heading>
                <h3>Visit Count</h3>
            </template>
            <h1 class="data-value">10</h1>
        </SummaryDataItem>

        <SummaryDataItem>
            <template #icon>
            <ToolingIcon />
            </template>
            <template #heading>
                <h3>XP</h3>
            </template>
            <h1 class="data-value">10</h1>
        </SummaryDataItem>
    </div>
</template>

<style scoped>
h3 {
    color: var(--color-text);
    margin-top: 1.4em;
}

.data-value {
    color: var(--color-primary);
    font-size: 1.5em;
}

.padding {
    padding: 1.9em;
}
</style>