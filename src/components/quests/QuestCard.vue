<template>
    <div class="quest-card">
        <div class="quest-card__image">

        </div>
        <div class="quest-card__content">
            <h3 class="quest-card__title">{{ quest.title }}</h3>
            <p class="quest-card__subtitle">{{ quest.subtitle }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import QuestDraft from '@/domains/quest/Quest.draft'
import type Quest from '@/domains/quest/Quest.model'

defineOptions({
    name: 'QuestCard'
})

const props = withDefaults(defineProps<{
    quest: QuestDraft | Quest
}>(), {
    quest: () => new QuestDraft(),
})

</script>

<style lang="scss">
.quest-card {
    --quest-card-padding: var(--f-space-4);

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: var(--f-space-3);
        aspect-ratio: 16 / 9;
        border-radius: var(--f-space-3);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        background-color: var(--f-color-zinc-800);
        padding: var(--quest-card-padding);

        &:hover {
            box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
        }
    }

    &__content {
        padding: var(--quest-card-padding);
    }
}
</style>