<template>
  <FForm :model="formState" ref="formRef" :rules="rules" :loading="props.loading">
    <FFormItem label="Квесты" name="quest_ids">
      <FSelect
        v-model:value="formState.quest_ids"
        :options="questOptions"
        :multiple="true"
        wide
        placeholder="Выберите квесты"
        allow-clear
      />
    </FFormItem>

    <FFormItem label="Дата начала действия шаблона" name="starts_on">
      <FDatepicker v-model:value="startsOnDateValue" wide clearable />
    </FFormItem>

    <FFormItem label="Дата завершения действия шаблона" name="ends_on">
      <FDatepicker v-model:value="endsOnDateValue" wide clearable />
    </FFormItem>

    <FFormItem label="Активность" name="is_active">
      <FSwitch v-model:checked="formState.is_active" />
    </FFormItem>

    <div class="quest-session-template-form__grid-wrap">
      <h3 class="quest-session-template-form__grid-title">Сетка шаблона</h3>
      <p class="quest-session-template-form__grid-subtitle">
        Сетка строится строго на одну неделю (пн-вс). Диапазон действия шаблона ниже влияет только
        на период повторения этой недельной схемы.
      </p>

      <div v-if="!props.preGeneration" class="quest-session-template-form__hint">
        Сначала заполните и подтвердите параметры предгенерации выше.
      </div>

      <div v-else-if="templateRows.length === 0" class="quest-session-template-form__hint">
        Нет данных для отображения. Проверьте квесты, дату старта шаблона и параметры времени.
      </div>

      <div
        v-for="section in sections"
        :key="`quest-${section.questId}`"
        class="quest-session-template-form__quest-section"
      >
        <h4 class="quest-session-template-form__quest-title">{{ section.questTitle }}</h4>
        <div class="quest-session-template-form__week-label">Базовая неделя (Пн-Вс)</div>

        <div class="quest-session-template-form__week-grid">
          <div
            v-for="day in section.days"
            :key="`${section.questId}-${day.weekday}`"
            class="quest-session-template-form__day-row"
          >
            <div class="quest-session-template-form__day-row-title">
              {{ day.label }}
            </div>

            <div class="quest-session-template-form__day-row-sessions">
              <div
                v-for="session in day.sessions"
                :key="`${section.questId}-${day.weekday}-${session.time}`"
                class="quest-session-template-form__session"
                :class="{ 'quest-session-template-form__session--skip-slot': session.skip_slot }"
              >
                <div
                  class="quest-session-template-form__session-time"
                  :class="{ 'quest-session-template-form__session-time--forbidden': session.booking_forbidden }"
                >
                  {{ session.time }}
                </div>
                <div class="quest-session-template-form__session-price">
                  {{ getPricingRuleBasePriceLabel(session.pricing_rule_id) }}
                </div>
                <div class="quest-session-template-form__session-icons">
                  <PhCurrencyCircleDollar
                    class="quest-session-template-form__status-icon"
                    :class="{
                      'quest-session-template-form__status-icon--active': session.prepayment_only,
                    }"
                  />
                  <PhWarningOctagon
                    class="quest-session-template-form__status-icon"
                    :class="{
                      'quest-session-template-form__status-icon--active': session.booking_forbidden,
                    }"
                  />
                  <FIconButton
                    title="Настройки ячейки"
                    :size="18"
                    @click="openSessionSettingsDrawer(session)"
                  >
                    <PhGear />
                  </FIconButton>
                </div>
              </div>
              <div v-if="day.sessions.length === 0" class="quest-session-template-form__empty">
                -
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FForm>

  <FDrawer
    v-model:visible="isSessionSettingsDrawerVisible"
    ariaLabel="Настройки ячейки шаблона"
    placement="right"
  >
    <div v-if="sessionEditorState" class="quest-session-template-form__drawer-content">
      <h4 class="quest-session-template-form__drawer-title">Настройки ячейки</h4>

      <FForm :model="sessionEditorState">
        <FFormItem label="Время">
          <FInput v-model:value="sessionEditorState.time" type="time" wide />
        </FFormItem>
        <FFormItem label="Длительность (мин)">
          <FInput v-model:value="sessionEditorState.duration" type="number" :min="0" wide />
        </FFormItem>
        <FFormItem label="Правило цен">
          <PricingRuleSelect v-model:value="sessionEditorState.pricing_rule_id" />
        </FFormItem>
        <FFormItem label="Только предоплата">
          <FSwitch v-model:checked="sessionEditorState.prepayment_only" />
        </FFormItem>
        <FFormItem label="Запретить бронирование">
          <FSwitch v-model:checked="sessionEditorState.booking_forbidden" />
        </FFormItem>
        <FFormItem label="Пропустить создание слота">
          <FSwitch v-model:checked="sessionEditorState.skip_slot" />
        </FFormItem>
      </FForm>

      <div class="quest-session-template-form__drawer-actions">
        <FButton type="solid" color="primary" @click="saveSessionSettings">Сохранить</FButton>
      </div>
    </div>
  </FDrawer>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import { FForm, FFormItem, Rule, type FFormInstanceType } from '@finzor-ui/form'
import FInput from '@finzor-ui/input'
import FSelect from '@finzor-ui/select'
import FSwitch from '@finzor-ui/switch'
import FButton from '@finzor-ui/button'
import { FDatepicker } from '@finzor-ui/datepicker'
import { FDrawer } from '@finzor-ui/drawer'
import { FIconButton } from '@finzor-ui/icon-button'
import { useDayJs, type DayjsType } from '@finzor-ui/use-day-js'
import { PhCurrencyCircleDollar, PhWarningOctagon, PhGear } from '@phosphor-icons/vue/compact'
import { useQuestListQuery } from '@/domains/quest'
import { usePricingRuleListQuery } from '@/domains/pricing_rule'
import PricingRuleSelect from '@/components/pricing_rules/PricingRuleSelect.vue'
import type Quest from '@/domains/quest/Quest.model'
import type { QuestSessionTemplatePreGenerationPayload } from './QuestSessionTemplatePreGenerationForm.vue'

type QuestSessionTemplateConstructorState = {
  quest_ids: number[]
  starts_on: string | null
  ends_on: string | null
  is_active: boolean
}

type TemplateRow = {
  weekday: number
  time: string
  quest_id: number
  duration: number | null
  pricing_rule_id: number
  prepayment_only: boolean
  booking_forbidden: boolean
  skip_slot: boolean
}

type QuestSessionTemplateConstructorPayload = {
  quest_ids: number[]
  starts_on: string | null
  ends_on: string | null
  template: TemplateRow[]
  is_active: boolean
}

type GridDay = {
  label: string
  weekday: number
  sessions: TemplateRow[]
}

type GridSection = {
  questId: number
  questTitle: string
  days: GridDay[]
}

defineOptions({
  name: 'QuestSessionTemplateForm',
})

const props = withDefaults(
  defineProps<{
    loading: boolean
    preGeneration?: QuestSessionTemplatePreGenerationPayload | null
  }>(),
  {
    loading: false,
    preGeneration: null,
  },
)

const formState = ref<QuestSessionTemplateConstructorState>({
  quest_ids: [],
  starts_on: null,
  ends_on: null,
  is_active: true,
})

const formRef = useTemplateRef<FFormInstanceType>('formRef')
const templateRows = ref<TemplateRow[]>([])
const dayjs = useDayJs()
const isSessionSettingsDrawerVisible = ref(false)
const selectedSessionRef = ref<TemplateRow | null>(null)
const sessionEditorState = ref<TemplateRow | null>(null)

const { data: questsData } = useQuestListQuery()
const { data: pricingRulesData } = usePricingRuleListQuery()
const questOptions = computed(() => {
  const list = questsData.value ?? []
  return list.map((q) => ({
    label: q.title || `#${q.id}`,
    value: q.id,
  }))
})

const questsMap = computed(() => {
  const map = new Map<number, Quest>()
  for (const quest of questsData.value ?? []) {
    map.set(quest.id, quest)
  }
  return map
})

const startsOnDateValue = computed<DayjsType | null>({
  get: () => {
    if (!formState.value.starts_on) return null
    return dayjs(formState.value.starts_on, 'YYYY-MM-DD')
  },
  set: (value) => {
    formState.value.starts_on = value ? value.format('YYYY-MM-DD') : null
  },
})

const endsOnDateValue = computed<DayjsType | null>({
  get: () => {
    if (!formState.value.ends_on) return null
    return dayjs(formState.value.ends_on, 'YYYY-MM-DD')
  },
  set: (value) => {
    formState.value.ends_on = value ? value.format('YYYY-MM-DD') : null
  },
})

const pricingRuleBasePriceMap = computed(() => {
  const map = new Map<number, number | null>()
  for (const rule of pricingRulesData.value ?? []) {
    map.set(rule.id, rule.base_price ?? null)
  }
  return map
})

const parseDate = (value: string | null | undefined): Date | null => {
  if (!value) return null
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return null
  return date
}

const parseTimeToMinutes = (value: string): number | null => {
  if (!value || !/^\d{2}:\d{2}$/.test(value)) return null
  const [hoursRaw, minutesRaw] = value.split(':')
  const hours = Number(hoursRaw)
  const minutes = Number(minutesRaw)
  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null
  }
  return hours * 60 + minutes
}

const minutesToTime = (value: number): string => {
  const hours = Math.floor(value / 60)
  const minutes = value % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

const generateTimeSlots = (duration: number | null): string[] => {
  if (!props.preGeneration) return []

  const first = parseTimeToMinutes(props.preGeneration.first_session_start_time)
  const last = parseTimeToMinutes(props.preGeneration.last_session_start_time)
  if (first === null || last === null || last < first) return []

  const durationMinutes = Number(duration ?? 0)
  const breakMinutes = Number(props.preGeneration.break_between_sessions_minutes ?? 0)
  const safeDuration = Number.isFinite(durationMinutes) ? durationMinutes : 0
  const safeBreak = Number.isFinite(breakMinutes) ? breakMinutes : 0
  const step = safeDuration + safeBreak
  if (step <= 0) return [minutesToTime(first)]

  const slots: string[] = []
  let cursor = first
  while (cursor <= last) {
    slots.push(minutesToTime(cursor))
    cursor += step
  }
  return slots
}

const regenerateTemplateRows = () => {
  if (!props.preGeneration) {
    templateRows.value = []
    return
  }

  const rows: TemplateRow[] = []

  for (const questId of formState.value.quest_ids) {
    const quest = questsMap.value.get(questId)
    const slots = generateTimeSlots(quest?.playtime ?? null)
    for (let dayOffset = 0; dayOffset < 7; dayOffset += 1) {
      const weekday = dayOffset + 1
      for (const slot of slots) {
        rows.push({
          weekday,
          time: slot,
          quest_id: questId,
          duration: quest?.playtime ?? null,
          pricing_rule_id: props.preGeneration.pricing_rule_id,
          prepayment_only: false,
          booking_forbidden: false,
          skip_slot: false,
        })
      }
    }
  }

  templateRows.value = rows
}

watch(
  () => [
    props.preGeneration,
    formState.value.quest_ids.join(','),
    formState.value.starts_on,
    questsData.value,
  ],
  regenerateTemplateRows,
  { immediate: true },
)

const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const sections = computed<GridSection[]>(() => {
  const rowsByQuestAndWeekday = new Map<string, TemplateRow[]>()
  for (const row of templateRows.value) {
    const key = `${row.quest_id}_${row.weekday}`
    const list = rowsByQuestAndWeekday.get(key) ?? []
    list.push(row)
    rowsByQuestAndWeekday.set(key, list)
  }

  for (const entries of rowsByQuestAndWeekday.values()) {
    entries.sort((a, b) => a.time.localeCompare(b.time))
  }

  return formState.value.quest_ids.map((questId) => {
    const quest = questsMap.value.get(questId)
    const days: GridDay[] = dayNames.map((label, dayIndex) => {
      const weekday = dayIndex + 1
      const key = `${questId}_${weekday}`
      return {
        label,
        weekday,
        sessions: rowsByQuestAndWeekday.get(key) ?? [],
      }
    })

    return {
      questId,
      questTitle: quest?.title || `Квест #${questId}`,
      days,
    }
  })
})

const getPricingRuleBasePriceLabel = (pricingRuleId: number): string => {
  const basePrice = pricingRuleBasePriceMap.value.get(pricingRuleId)
  if (basePrice === null || basePrice === undefined) return 'База: -'
  return `База: ${basePrice} ₽`
}

const openSessionSettingsDrawer = (session: TemplateRow) => {
  selectedSessionRef.value = session
  sessionEditorState.value = { ...session }
  isSessionSettingsDrawerVisible.value = true
}

const closeSessionSettingsDrawer = () => {
  isSessionSettingsDrawerVisible.value = false
  selectedSessionRef.value = null
  sessionEditorState.value = null
}

const saveSessionSettings = () => {
  if (!selectedSessionRef.value || !sessionEditorState.value) return
  Object.assign(selectedSessionRef.value, sessionEditorState.value)
  closeSessionSettingsDrawer()
}

const rules = {
  quest_ids: Rule.custom({
    fn: (value: unknown) => Array.isArray(value) && value.length > 0,
    message: 'Выберите хотя бы один квест',
  }),
  starts_on: Rule.custom({
    fn: (value: unknown) => {
      if (value === null || value === undefined || value === '') return true
      return typeof value === 'string' && parseDate(value) !== null
    },
    message: 'Укажите корректную дату начала действия',
  }),
  ends_on: Rule.custom({
    fn: (value: unknown) => {
      if (value === null || value === undefined || value === '') return true
      if (typeof value !== 'string') return false
      const endDate = parseDate(value)
      if (!endDate) return false

      const startDate = parseDate(formState.value.starts_on)
      if (!startDate) return true
      return endDate >= startDate
    },
    message: 'Укажите корректную дату завершения (не раньше даты начала)',
  }),
  is_active: Rule.boolean().required('Укажите активность'),
}

const validate = async (): Promise<QuestSessionTemplateConstructorPayload | false> => {
  const result = await formRef.value?.validate()
  if (!result?.valid) return false
  if (!props.preGeneration) return false

  if (templateRows.value.length === 0) {
    regenerateTemplateRows()
  }

  return {
    quest_ids: formState.value.quest_ids,
    starts_on: formState.value.starts_on,
    ends_on: formState.value.ends_on,
    template: templateRows.value,
    is_active: formState.value.is_active,
  }
}

defineExpose({
  validate,
})
</script>

<style lang="scss">
.quest-session-template-form__grid-wrap {
  margin-top: var(--f-space-4);
}

.quest-session-template-form__grid-title {
  margin: 0 0 var(--f-space-2);
}

.quest-session-template-form__grid-subtitle {
  color: var(--f-color-zinc-600);
  margin-bottom: var(--f-space-4);
}

.quest-session-template-form__hint {
  color: var(--f-color-zinc-500);
}

.quest-session-template-form__quest-section {
  margin-top: var(--f-space-5);
}

.quest-session-template-form__quest-title {
  margin: 0 0 var(--f-space-3);
}

.quest-session-template-form__week-label {
  margin-bottom: var(--f-space-2);
  color: var(--f-color-zinc-600);
}

.quest-session-template-form__week-grid {
  display: flex;
  flex-direction: column;
  gap: var(--f-space-2);
}

.quest-session-template-form__day-row {
  border: 1px solid var(--f-color-zinc-200);
  border-radius: var(--f-radius-2);
  padding: var(--f-space-2) var(--f-space-3);
  display: flex;
  gap: var(--f-space-3);
  align-items: flex-start;
}

.quest-session-template-form__day-row-title {
  min-width: 130px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.quest-session-template-form__day-row-sessions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  flex: 1;
}

.quest-session-template-form__session {
  border-radius: var(--f-radius-2);
  background-color: var(--f-color-zinc-100);
  padding: var(--f-space-2);
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 140px;
}

.quest-session-template-form__session--skip-slot {
  background-color: var(--f-color-danger-100, var(--f-color-red-100, #fee2e2));
  border: 1px solid var(--f-color-danger-300, var(--f-color-red-300, #fca5a5));
  opacity: 0.65;
}

.quest-session-template-form__session-time {
  font-weight: 600;
}

.quest-session-template-form__session-time--forbidden {
  text-decoration: line-through;
  color: var(--f-color-zinc-500);
}

.quest-session-template-form__session-price {
  color: var(--f-color-zinc-600);
}

.quest-session-template-form__session-icons {
  display: flex;
  align-items: center;
  gap: 6px;
}

.quest-session-template-form__status-icon {
  color: var(--f-color-zinc-400);
}

.quest-session-template-form__status-icon--active {
  color: var(--f-color-danger);
}

.quest-session-template-form__drawer-content {
  padding: var(--f-space-4);
}

.quest-session-template-form__drawer-title {
  margin: 0 0 var(--f-space-3);
}

.quest-session-template-form__drawer-actions {
  display: flex;
  gap: var(--f-space-2);
  margin-top: var(--f-space-4);
}

.quest-session-template-form__empty {
  color: var(--f-color-zinc-400);
}
</style>
