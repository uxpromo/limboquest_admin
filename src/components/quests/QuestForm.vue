<template>
  <FForm :model="formState" ref="formRef" :rules="rules" :loading="props.loading" class="quest-form">
    <FRow :gap="16" containerQuery>
      <FCol :cols="{ xs: 12, md: 8 }">
        <FTabs v-model:active-key="activeTabKey">
          <FTab tab-key="main" label="Основное">
            <FFormItem label="Название" name="title">
              <FInput v-model:value="formState.title" wide />
            </FFormItem>
            <FFormItem label="Подзаголовок" name="subtitle">
              <FInput v-model:value="formState.subtitle" wide />
            </FFormItem>
            <FFormItem label="Системное имя" name="slug">
              <FInput v-model:value="formState.slug" wide />
            </FFormItem>
            <FFormItem label="Локация" name="location_id">
              <FSelect v-model:value="formState.location_id" wide :options="locationOptions"
                placeholder="Выберите локацию" allow-clear />
            </FFormItem>
            <FFormItem label="Краткое описание" name="short_description">
              <FRichEditor v-model:value="formState.short_description" placeholder="Введите текст..."
                toolbar-commands="standard" />

            </FFormItem>
            <FFormItem label="Полное описание" name="full_description">
              <FRichEditor v-model:value="formState.full_description" placeholder="Введите текст..."
                toolbar-commands="standard" />
            </FFormItem>
            <FFormItem label="Доп. информация" name="additional_info">
              <FRichEditor v-model:value="formState.additional_info" placeholder="Введите текст..."
                toolbar-commands="standard" />
            </FFormItem>
            <FFormItem label="Возрастной рейтинг" name="age_rating">
              <FInput v-model:value="formState.age_rating" wide />
            </FFormItem>
            <FFormItem label="Подробный возрастной допуск" name="age_rating_description">
              <FRichEditor v-model:value="formState.age_rating_description" placeholder="Введите текст..."
                toolbar-commands="standard" />
            </FFormItem>


            <FFormItem label="Время прохождения (мин)" name="playtime">
              <FInput v-model:value="formState.playtime" type="number" wide :min="0" />
            </FFormItem>

            <FFormItem label="Уровень сложности" name="difficulty_level">
              <FSegmentedSelect v-model:value="formState.difficulty_level" :options="difficultyLevelOptions" />
            </FFormItem>
            <FFormItem label="Уровень страха" name="scariness_level">
              <ScarinessLevelInput v-model:value="formState.scariness_level" />
            </FFormItem>

            <h4>Ценообразование</h4>
            <FFields class="fh-mb-4">
              <FFieldsItem label="Правило цен по умолчанию">
                <FFormItem name="pricing_rule_id">
                  <PricingRuleSelect v-model:value="formState.pricing_rule_id" />
                </FFormItem>
              </FFieldsItem>
              <FFieldsItem label="Количество игроков">
                <FFormItem :name="['players_min', 'players_max']">
                  <FSpace compact>
                    <FInput v-model:value="formState.players_min" type="number" wide :min="0" placeholder="Минимум">
                      <template #prepend>От</template>
                    </FInput>
                    <FInput v-model:value="formState.players_max" type="number" wide :min="0" placeholder="Максимум">
                      <template #prepend>До</template>
                    </FInput>
                  </FSpace>
                </FFormItem>
              </FFieldsItem>
              <FFieldsItem label="Базовая цена">
                <FFormItem name="base_price">
                  <FInput v-model:value="formState.base_price" type="number" wide :min="0">
                    <template #append>₽</template>
                  </FInput>
                </FFormItem>
              </FFieldsItem>
              <FFieldsItem label="Количество игроков для базовой цены">
                <FFormItem name="players_base_limit">
                  <FInput v-model:value="formState.players_base_limit" type="number" wide :min="0" />
                </FFormItem>
              </FFieldsItem>
              <FFieldsItem label="Надбавка за дополнительного игрока">
                <FFormItem name="surcharge_price">
                  <FInput v-model:value="formState.surcharge_price" type="number" wide :min="0">
                    <template #append>₽</template>
                  </FInput>
                </FFormItem>
              </FFieldsItem>
            </FFields>


            <h4>Статистика</h4>
            <FFields class="fh-mb-4">
              <FFieldsItem label="Среднее время">
                <FFormItem :name="['is_auto_average_time', 'average_time']">
                  <FSwitch v-model:checked="formState.is_auto_average_time"
                    label="Автоматически рассчитывать среднее время" />
                  <FTransitionCollapse>
                    <div v-if="!formState.is_auto_average_time">
                      <FInput v-model:value="formState.average_time" type="number" wide :min="0"
                        placeholder="Среднее время">
                        <template #append>Секунд</template>
                      </FInput>
                    </div>
                  </FTransitionCollapse>
                </FFormItem>
              </FFieldsItem>

              <FFieldsItem label="Лучшее время">
                <FFormItem :name="['is_auto_best_time', 'best_time']">
                  <FSwitch v-model:checked="formState.is_auto_best_time"
                    label="Автоматически рассчитывать лучшее время" />
                  <FTransitionCollapse>
                    <div v-if="!formState.is_auto_best_time">
                      <FInput v-model:value="formState.best_time" type="number" wide :min="0"
                        placeholder="Лучшее время">
                        <template #append>Секунд</template>
                      </FInput>
                    </div>
                  </FTransitionCollapse>
                </FFormItem>

              </FFieldsItem>
              <FFieldsItem label="Проходимость">
                <FFormItem :name="['is_auto_passability', 'passability']">
                  <FSwitch v-model:checked="formState.is_auto_passability"
                    label="Автоматически рассчитывать проходимость" />
                  <FTransitionCollapse>
                    <div v-if="!formState.is_auto_passability">
                      <FInput v-model:value="formState.passability" type="number" wide :min="0"
                        placeholder="Проходимость">
                        <template #append>%</template>
                      </FInput>
                    </div>
                  </FTransitionCollapse>
                </FFormItem>
              </FFieldsItem>
            </FFields>


            <h4>Состояние</h4>
            <FFields class="fh-mb-4">
              <FFieldsItem label="В разработке">
                <FFormItem name="is_in_dev">
                  <FSwitch v-model:checked="formState.is_in_dev" />
                </FFormItem>
              </FFieldsItem>
              <FFieldsItem label="Отображать на сайте">
                <FFormItem name="is_visible">
                  <FSwitch v-model:checked="formState.is_visible" />
                </FFormItem>
              </FFieldsItem>
              <FFieldsItem label="Доступен для бронирования">
                <FFormItem name="is_bookable">
                  <FSwitch v-model:checked="formState.is_bookable" />
                </FFormItem>
              </FFieldsItem>
            </FFields>

            <FFormItem label="Текст даты открытия" name="opening_date_text">
              <FInput v-model:value="formState.opening_date_text" wide />
            </FFormItem>

            <FFormItem label="Сортировка" name="sort">
              <FInput v-model:value="formState.sort" type="number" wide :min="0"
                placeholder="Пустое значение поместит в конец списка" />
            </FFormItem>
          </FTab>
          <FTab tab-key="images" label="Изображения" :disabled="isCreateMode">
            Tab 2 content
          </FTab>
        </FTabs>



      </FCol>
      <FCol :cols="{ xs: 12, md: 4 }">
        <QuestCard class="quest-form__quest-card" :quest="formState" />
      </FCol>
    </FRow>


  </FForm>
</template>

<script setup lang="ts">
import { QuestDraft } from '@/domains/quest'
import { ref, useTemplateRef, watch, computed } from 'vue'
import { FForm, FFormItem, Rule, type FFormInstanceType } from '@finzor-ui/form'
import ScarinessLevelInput from '@/components/quests/ScarinessLevelInput.vue'
import FInput from '@finzor-ui/input'
import { FRow, FCol } from '@finzor-ui/grid'
import FSwitch from '@finzor-ui/switch'
import FSpace from '@finzor-ui/space'
import { FFields, FFieldsItem } from '@finzor-ui/fields'
import FRichEditor from '@finzor-ui/rich-editor'
import FSelect from '@finzor-ui/select'
import FSegmentedSelect from '@finzor-ui/segmented-select'
import type Quest from '@/domains/quest/Quest.model'
import { useLocationListQuery } from '@/domains/location'
import QuestCard from './QuestCard.vue'
import { FTransitionCollapse } from '@finzor-ui/transitions'
import { FTabs, FTab } from '@finzor-ui/tabs'
import PricingRuleSelect from '@/components/pricing_rules/PricingRuleSelect.vue'

const formState = ref<QuestDraft>(new QuestDraft())
const formRef = useTemplateRef<FFormInstanceType>('formRef')
const activeTabKey = ref('main')
const { data: locationsData } = useLocationListQuery()
const locationOptions = computed(() => {
  const list = locationsData.value ?? []
  return list.map((loc) => ({ label: loc.short_address || loc.address || `#${loc.id}`, value: loc.id }))
})

defineOptions({
  name: 'QuestForm',
})

const props = withDefaults(
  defineProps<{
    loading: boolean
    model?: Quest | null
  }>(),
  {
    loading: false,
    model: undefined,
  },
)

watch(
  () => props.model,
  (model) => {
    if (model) {
      formState.value = QuestDraft.fromModel(model)
    }
  },
  { immediate: true },
)

const optionalNumberMin0 = Rule.custom({
  fn: (value: unknown) => {
    if (value === null || value === undefined || value === '') return true
    const num = Number(value)
    return !Number.isNaN(num) && num >= 0
  },
  message: 'Введите неотрицательное число',
})

const rules = {
  title: Rule.string('Введите название').required('Название обязательно'),
  slug: Rule.string('Введите slug').required('Slug обязателен'),
  location_id: Rule.custom({
    fn: (value) => {
      if (value === null || value === undefined || value === '') return false
      const num = Number(value)
      return !Number.isNaN(num) && num > 0
    },
    message: 'Выберите локацию',
  }),
  pricing_rule_id: Rule.custom({
    fn: (value) => {
      if (value === null || value === undefined || value === '') return false
      const num = Number(value)
      return !Number.isNaN(num) && num > 0
    },
    message: 'Выберите правило цен по умолчанию',
  }),
  base_price: optionalNumberMin0,
  playtime: optionalNumberMin0,
  players_min: optionalNumberMin0,
  players_max: optionalNumberMin0,
  sort: optionalNumberMin0,
  surcharge_price: optionalNumberMin0,
  players_base_limit: optionalNumberMin0,
  average_time: optionalNumberMin0,
  passability: optionalNumberMin0,
  best_time: optionalNumberMin0,
  difficulty_level: optionalNumberMin0,
  scariness_level: optionalNumberMin0,
  is_visible: Rule.boolean().required('Укажите видимость'),
  is_in_dev: Rule.boolean().required('Укажите статус разработки'),
  is_auto_average_time: Rule.boolean().required(),
  is_auto_passability: Rule.boolean().required(),
  is_auto_best_time: Rule.boolean().required(),
  is_bookable: Rule.boolean().required('Укажите доступность для бронирования'),
}

const validate = async () => {
  const result = await formRef.value?.validate()
  if (!result?.valid) return false
  const draft = formState.value
  // NOT NULL в БД: surcharge_price, base_price, sort (default 0,0,999) — не отправляем null
  const payload: Record<string, unknown> = {
    slug: draft.slug ?? '',
    title: draft.title ?? '',
    subtitle: draft.subtitle,
    playtime: draft.playtime ?? null,
    players_min: draft.players_min ?? null,
    players_max: draft.players_max ?? null,
    players_base_limit: draft.players_base_limit ?? null,
    surcharge_price: draft.surcharge_price ?? 0,
    base_price: draft.base_price ?? 0,
    pricing_rule_id: draft.pricing_rule_id ?? 0,
    location_id: draft.location_id ?? 0,
    short_description: draft.short_description,
    full_description: draft.full_description,
    additional_info: draft.additional_info,
    age_rating: draft.age_rating,
    age_rating_description: draft.age_rating_description,
    is_visible: draft.is_visible,
    is_in_dev: draft.is_in_dev,
    opening_date_text: draft.opening_date_text,
    average_time: draft.average_time ?? null,
    is_auto_average_time: draft.is_auto_average_time,
    passability: draft.passability ?? null,
    is_auto_passability: draft.is_auto_passability,
    best_time: draft.best_time ?? null,
    is_auto_best_time: draft.is_auto_best_time,
    difficulty_level: draft.difficulty_level ?? null,
    scariness_level: draft.scariness_level ?? null,
    is_bookable: draft.is_bookable,
    sort: draft.sort ?? 999,
  }
  return payload
}

const difficultyLevelOptions = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
]



const setModel = (model: Quest) => {
  formState.value = QuestDraft.fromModel(model)
}

const isCreateMode = computed(() => {
  return props.model == null
})

defineExpose({
  validate,
  setModel,
})
</script>

<style lang="scss">
.quest-form {
  .quest-form__quest-card {
    position: sticky;
    top: var(--f-space-4);
    height: fit-content;
  }
}
</style>
