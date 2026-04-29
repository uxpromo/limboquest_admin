<template>
    <div class="scariness-level-input">
        <span class="scariness-level-input__label scariness-level-input__label--safe">Не страшно</span>

        <div class="scariness-level-input__track" :style="trackStyle" role="radiogroup" aria-label="Уровень страха">
            <button v-for="segment in segments" :key="segment.value" type="button"
                class="scariness-level-input__segment" :class="[
                    `scariness-level-input__segment--${segment.color}`,
                    { 'scariness-level-input__segment--selected': selectedIndex === segment.value },
                ]" role="radio" :aria-checked="selectedIndex === segment.value"
                :aria-label="`Уровень страха: ${segment.percent}%`" @click="setValue(segment.value)" />
            <div v-if="selectedIndex !== null" class="scariness-level-input__marker" :style="markerStyle"
                aria-hidden="true" />
        </div>
        <span class="scariness-level-input__label scariness-level-input__label--scary">Страшно</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
    name: 'ScarinessLevelInput',
})

const props = withDefaults(
    defineProps<{
        value?: number | null
        scoreCount?: number
    }>(),
    {
        value: null,
        scoreCount: 18,
    },
)

const emit = defineEmits<{
    (e: 'update:value', value: number): void
}>()

type SegmentColor = 'green' | 'yellow' | 'red'

const segmentCount = computed(() => {
    const raw = Number(props.scoreCount)
    if (Number.isNaN(raw)) return 9
    return Math.max(1, Math.floor(raw))
})

const getSegmentColor = (index: number, count: number): SegmentColor => {
    const greenLimit = Math.ceil(count / 3)
    const yellowLimit = Math.ceil((count * 2) / 3)

    if (index < greenLimit) return 'green'
    if (index < yellowLimit) return 'yellow'
    return 'red'
}

const segments = computed<Array<{ value: number; color: SegmentColor; percent: number }>>(() => {
    const count = segmentCount.value
    return Array.from({ length: count }, (_, index) => ({
        value: index,
        color: getSegmentColor(index, count),
        percent: indexToPercent(index, count),
    }))
})

const normalizedPercent = computed(() => {
    const raw = Number(props.value)
    if (Number.isNaN(raw)) return null
    return Math.max(0, Math.min(100, Math.round(raw)))
})

const markerStyle = computed<Record<string, number> | null>(() => {
    if (selectedIndex.value === null) return null
    return {
        '--selected-index': selectedIndex.value,
    }
})

const trackStyle = computed<Record<string, number>>(() => ({
    '--segment-count': segmentCount.value,
}))

const selectedIndex = computed(() => {
    if (normalizedPercent.value === null) return null
    if (segmentCount.value <= 1) return 0
    return Math.round((normalizedPercent.value / 100) * (segmentCount.value - 1))
})

const indexToPercent = (index: number, count: number) => {
    if (count <= 1) return 0
    return Math.round((index / (count - 1)) * 100)
}

const setValue = (index: number) => {
    emit('update:value', indexToPercent(index, segmentCount.value))
}
</script>

<style scoped lang="scss">
.scariness-level-input {
    width: 100%;
    height: var(--f-form-control--height);
    display: flex;
    align-items: center;
    gap: var(--f-space-3);
    padding: 0 var(--f-space-3);
    border-radius: var(--f-border-radius);
    background-color: var(--f-color-secondary-50);
    border: var(--f-form-control--border-width) var(--f-form-control--border-style) var(--f-form-control--border-color);

    &__label {
        &--safe {
            color: var(--f-color-success-600);
        }

        &--scary {
            color: var(--f-color-danger);
        }
    }

    &__track {
        --segment-count: 9;
        --segment-gap: 0px;
        position: relative;
        flex: 1;
        display: grid;
        grid-template-columns: repeat(var(--segment-count), 1fr);
        gap: var(--segment-gap);
    }

    &__segment {
        position: relative;
        height: 16px;
        border: 0;
        outline: none;
        cursor: pointer;
        transition: filter 0.15s ease;
        box-shadow: inset -1px 0 0 0 rgba(0, 0, 0, 0.1);

        &:hover {
            filter: brightness(0.9);
        }

        &:focus-visible {
            z-index: 1;
            box-shadow: 0 0 0 2px var(--f-color-zinc-500, rgba(74, 121, 255, 0.35));
        }

        &:first-of-type {
            border-radius: 4px 0 0 4px;
        }

        &:last-of-type {
            border-radius: 0 4px 4px 0;
        }

        &--green {
            background-color: var(--f-color-success);
        }

        &--yellow {
            background-color: var(--f-color-warning);
        }

        &--red {
            background-color: var(--f-color-danger);
        }
    }

    &__marker {
        position: absolute;
        top: 0;
        bottom: 0;
        --segment-width: calc((100% - ((var(--segment-count) - 1) * var(--segment-gap))) / var(--segment-count));
        left: calc((var(--selected-index) * var(--segment-width)) + (var(--selected-index) * var(--segment-gap)) + (var(--segment-width) / 2));
        width: 0;
        pointer-events: none;
        transition: left 0.2s ease;

        &::before,
        &::after {
            content: '';
            position: absolute;
            left: 0;
            width: 0;
            height: 0;
            transform: translateX(-50%);
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
        }

        &::before {
            bottom: -6px;
            border-bottom: 12px solid var(--f-color-zinc-500);
        }

        &::after {
            top: -6px;
            border-top: 12px solid var(--f-color-zinc-500);
        }
    }
}
</style>
