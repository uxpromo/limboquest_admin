import { localeManagerInstance, installLocaleManager } from '@finzor-ui/locale'

import { ru, en } from '@finzor-ui/locale/locales'
import _dayjs from 'dayjs'
import dayjsRu from 'dayjs/locale/ru'
import dayjsEn from 'dayjs/locale/en'

/**
 * Создает и настраивает менеджер локализации
 */
export function createLocaleManager() {
  return localeManagerInstance
    .addLocale('ru', ru, dayjsRu, false)
    .addLocale('en', en, dayjsEn, false)
    .setActiveLocale('ru')
    .setFallbackLocale('en')
}

/**
 * Возвращает функцию для установки менеджера локализации в Vue приложение
 */
export function getLocaleManagerPlugin() {
  const localeManager = createLocaleManager()
  return installLocaleManager(localeManager)
}
