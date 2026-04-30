<template>
    <div class="scariness-level-input">
        <span class="scariness-level-input__label scariness-level-input__label--safe">Не страшно</span>

        <div ref="controlRef" class="scariness-level-input__control" role="slider" tabindex="0"
            aria-label="Уровень страха в процентах" :aria-valuemin="0" :aria-valuemax="100" :aria-valuenow="rangeValue"
            :aria-valuetext="`${rangeValue}%`" @pointerdown="startDrag" @keydown="handleKeydown">
            <div class="scariness-level-input__track" :style="trackStyle" aria-hidden="true">
                <span v-for="segment in segments" :key="segment.value" class="scariness-level-input__segment" :class="[
                    `scariness-level-input__segment--${segment.color}`,
                    { 'scariness-level-input__segment--selected': selectedIndex === segment.value },
                ]" />
                <div v-if="selectedIndex !== null" class="scariness-level-input__marker"
                    :class="{ 'scariness-level-input__marker--dragging': isDragging }" :style="markerStyle"
                    @pointerdown.stop="startDrag" />
            </div>
        </div>

        <span class="scariness-level-input__label scariness-level-input__label--scary">Страшно</span>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeUnmount } from 'vue'

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

const controlRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)

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

const segments = computed<Array<{ value: number; color: SegmentColor }>>(() => {
    const count = segmentCount.value
    return Array.from({ length: count }, (_, index) => ({
        value: index,
        color: getSegmentColor(index, count),
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

const rangeValue = computed(() => normalizedPercent.value ?? 0)
const stepPercent = computed(() => {
    if (segmentCount.value <= 1) return 100
    return 100 / (segmentCount.value - 1)
})

const selectedIndex = computed(() => {
    if (normalizedPercent.value === null) return null
    if (segmentCount.value <= 1) return 0
    return Math.round((normalizedPercent.value / 100) * (segmentCount.value - 1))
})

const indexToPercent = (index: number, count: number) => {
    if (count <= 1) return 0
    return Math.round((index / (count - 1)) * 100)
}

const percentToNearestIndex = (percent: number, count: number) => {
    if (count <= 1) return 0
    return Math.round((percent / 100) * (count - 1))
}

const emitSnappedPercent = (percent: number) => {
    const normalized = Math.max(0, Math.min(100, Math.round(percent)))
    const nearestIndex = percentToNearestIndex(normalized, segmentCount.value)
    emit('update:value', indexToPercent(nearestIndex, segmentCount.value))
}

const getPercentFromClientX = (clientX: number) => {
    const control = controlRef.value
    if (!control) return rangeValue.value
    const rect = control.getBoundingClientRect()
    if (rect.width <= 0) return rangeValue.value

    const ratio = (clientX - rect.left) / rect.width
    return Math.max(0, Math.min(100, Math.round(ratio * 100)))
}

const handleDragMove = (event: PointerEvent) => {
    emitSnappedPercent(getPercentFromClientX(event.clientX))
}

const stopDrag = () => {
    isDragging.value = false
    window.removeEventListener('pointermove', handleDragMove)
    window.removeEventListener('pointerup', stopDrag)
    window.removeEventListener('pointercancel', stopDrag)
}

const startDrag = (event: PointerEvent) => {
    event.preventDefault()
    stopDrag()
    isDragging.value = true
    emitSnappedPercent(getPercentFromClientX(event.clientX))
    window.addEventListener('pointermove', handleDragMove)
    window.addEventListener('pointerup', stopDrag)
    window.addEventListener('pointercancel', stopDrag)
}

const moveBySteps = (delta: number) => {
    emitSnappedPercent(rangeValue.value + delta * stepPercent.value)
}

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        event.preventDefault()
        moveBySteps(-1)
        return
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        event.preventDefault()
        moveBySteps(1)
        return
    }

    if (event.key === 'Home') {
        event.preventDefault()
        emitSnappedPercent(0)
        return
    }

    if (event.key === 'End') {
        event.preventDefault()
        emitSnappedPercent(100)
    }
}

onBeforeUnmount(() => {
    stopDrag()
})
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

    &__control {
        position: relative;
        flex: 1;
        cursor: pointer;
        outline: none;
        touch-action: none;

        &:focus-visible {
            border-radius: 4px;
            box-shadow: 0 0 0 2px var(--f-color-zinc-500, rgba(74, 121, 255, 0.35));
        }
    }

    &__track {
        --segment-count: 9;
        --segment-gap: 0px;
        position: relative;
        display: grid;
        grid-template-columns: repeat(var(--segment-count), 1fr);
        gap: var(--segment-gap);
    }

    &__segment {
        height: 16px;
        box-shadow: inset -1px 0 0 0 rgba(0, 0, 0, 0.1);

        &:first-of-type {
            border-radius: 4px 0 0 4px;
        }

        &:last-of-type {
            border-radius: 0 4px 4px 0;
        }

        &--selected {
            filter: brightness(0.9);
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
        pointer-events: auto;
        cursor: grab;
        transition: left 0.12s ease-out;

        &--dragging {
            cursor: grabbing;
            filter: brightness(1.08);
        }

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
