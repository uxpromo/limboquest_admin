# Implementation Plan: Домен Quest (Admin + API)

Branch: none  
Created: 2025-02-12

## Settings
- Testing: no
- Logging: standard (логировать вход в экшены, ошибки, успешные ответы с кодами)

## Обзор
Реализовать домен Quest по образцу Location: бэкенд — контроллер, ресурсы, политика, реквесты и маршруты в admin API; фронтенд — домен (types, model, draft, api, query), страницы index/create/edit и форма QuestForm.

## Commit Plan
- **Commit 1** (после задач 1–4): `feat(api): add Quest admin API (policy, resource, requests, controller, routes)`
- **Commit 2** (после задач 5–9): `feat(admin): add Quest domain and pages (index, create, edit)`

---

## Tasks

### Phase 1: API (api.limbo)

#### Task 1: Политика и привязка к модели Quest
- Создать `app/Policies/V1/Admin/QuestPolicy.php` по образцу `LocationPolicy`: `viewAny`, `view`, `create`, `update`, `delete` (доступ только для `$user->is_admin`).
- В `app/Models/Quest.php`: подключить `App\Policies\V1\Admin\QuestPolicy` через `#[UsePolicy(QuestPolicy::class)]` и трейт `HasAuthor` (если есть в проекте), как в Location.
- **Logging:** не требуется внутри политики; логирование в контроллере.
- **Files:** `app/Policies/V1/Admin/QuestPolicy.php`, `app/Models/Quest.php`

#### Task 2: QuestResource и Request-классы
- Создать `app/Http/Resources/V1/Admin/Quest/QuestResource.php`: в `toArray()` отдать все fillable-поля модели Quest (id, author_id, slug, title, subtitle, playtime, players_min, players_max, players_base_limit, surcharge_price, base_price, location_id, short_description, full_description, additional_info, age_rating, is_visible, is_in_dev, opening_date_text, average_time, is_auto_average_time, passability, is_auto_passability, best_time, is_auto_best_time, difficulty_level, scariness_level, is_bookable, sort, created_at, updated_at при необходимости). Привести типы (bool, int, float, string, null) как в модели.
- Создать Request-классы в `app/Http/Requests/V1/Admin/Quest/`: `QuestIndexRequest`, `QuestShowRequest`, `QuestDestroyRequest` (пустые `rules()`), `QuestStoreRequest` и `QuestUpdateRequest` — правила валидации для всех полей, допускаемых при создании/обновлении (required/optional, типы, max length, numeric bounds по аналогии с Location).
- **Logging:** не в ресурсе/реквестах; в контроллере.
- **Files:** `app/Http/Resources/V1/Admin/Quest/QuestResource.php`, `app/Http/Requests/V1/Admin/Quest/*.php`

#### Task 3: QuestController и маршруты Admin API
- Создать `app/Http/Controllers/V1/Admin/QuestController.php`: методы `index`, `store`, `show`, `update`, `destroy` по образцу `LocationController` (использовать Quest, QuestResource, Quest*Request, `$this->can()` для авторизации). index — список квестов (при необходимости с фильтрами позже), store — 201 + данные, show/update/destroy — findOrFail + can + ответ.
- **Logging:** при входе в каждый экшен логировать метод и id (для show/update/destroy); при ошибках (catch, failed save/delete) — полный контекст; уровень INFO для успешных операций, ERROR для ошибок.
- В `routes/V1/admin.php` внутри группы `auth:sanctum`, `admin` добавить `Route::apiResources(['quests' => QuestController::class])` (или эквивалент для quests).
- **Files:** `app/Http/Controllers/V1/Admin/QuestController.php`, `routes/V1/admin.php`

### Phase 2: Admin frontend (admin.limbo)

#### Task 4: Домен Quest — types, model, draft
- Создать `src/domains/quest/Quest.types.ts`: интерфейс `QuestDTO` с полями, совпадающими с ответом API (типы: number, string, boolean, null по модели).
- Создать `src/domains/quest/Quest.model.ts`: класс `Quest`, конструктор принимает `QuestDTO`, поля readonly; даты через `dayjsCast` (как в Location).
- Создать `src/domains/quest/Quest.draft.ts`: класс `QuestDraft` с полями для формы (соответствие fillable + id | null); конструктор от `Quest?`, статический `fromModel(quest: Quest): QuestDraft`.
- **Files:** `src/domains/quest/Quest.types.ts`, `src/domains/quest/Quest.model.ts`, `src/domains/quest/Quest.draft.ts`

#### Task 5: Домен Quest — API и Query
- Создать `src/domains/quest/Quest.api.ts`: `QuestAPI` с endpoint `/quests`, методами `view`, `list`, `create`, `update`, `remove` по образцу `Location.api.ts` (useApi(), get/post/put/delete).
- Создать `src/domains/quest/Quest.query.ts`: конфиг для `useModelQuery` (mapper: DTO → Quest), экспорт `useQuestViewQuery`, `useQuestListQuery`, `useQuestCreateMutation`, `useQuestUpdateMutation`, `useQuestRemoveMutation`.
- Создать `src/domains/quest/index.ts`: реэкспорт модели, драфта, типов, API, query.
- **Files:** `src/domains/quest/Quest.api.ts`, `src/domains/quest/Quest.query.ts`, `src/domains/quest/index.ts`

#### Task 6: Компонент QuestForm и страницы create/edit
- Создать `src/components/quests/QuestForm.vue`: форма по образцу `LocationForm.vue` — props `loading`, `model?: Quest | null`; внутреннее состояние `QuestDraft`; watch на `model` с `QuestDraft.fromModel`; правила валидации для полей формы (обязательные текст/числа, диапазоны); `defineExpose({ validate, setModel })`; validate возвращает draft или false.
- Поля формы выбрать по приоритету: title, slug, location_id (select из локаций), short_description, full_description, base_price, playtime, players_min/max, is_visible, is_bookable, sort и при необходимости остальные fillable — чтобы создать/редактировать квест без перегрузки UI.
- **Files:** `src/components/quests/QuestForm.vue`

#### Task 7: Страницы index, create, edit и маршруты
- Обновить `src/pages/quests/index.vue`: таблица с колонками (id, title, location_id/название, is_visible, is_bookable, actions); кнопки «Обновить», «Новый квест»; использование `useQuestListQuery`; переходы на create и edit по имени маршрута.
- Создать `src/pages/quests/create.vue`: заголовок/хлебные крошки, `QuestForm`, кнопка «Создать»; `useQuestCreateMutation`, по validate — вызов create mutation.
- Создать или обновить `src/pages/quests/edit.vue`: по образцу `locations/edit.vue` — `useQuestViewQuery(id)`, `useQuestUpdateMutation`, форма с model, кнопка «Сохранить», validate → update mutation; breadcrumbs.
- В `src/router/_quests.ts` добавить маршруты `quests.create` и `quests.edit` (path `/quests/create`, `/quests/:id/edit`), оставить `quests.index`.
- **Logging:** в create/edit при onError мутаций логировать в консоль (id, error) для отладки.
- **Files:** `src/pages/quests/index.vue`, `src/pages/quests/create.vue`, `src/pages/quests/edit.vue`, `src/router/_quests.ts`

---

## Зависимости
- Task 2 зависит от Task 1 (модель с политикой).
- Task 3 зависит от Task 2 (контроллер использует Resource и Requests).
- Task 5 зависит от Task 4 (API и query используют типы и модель).
- Task 6 зависит от Task 4 (QuestDraft, Quest).
- Task 7 зависит от Task 5 и Task 6 (страницы используют query и QuestForm).

## Проверка
- API: GET/POST/PUT/DELETE `/api/V1/admin/quests` и `/api/V1/admin/quests/{id}` с авторизацией admin возвращают ожидаемые данные и коды.
- Admin: список квестов, создание и редактирование квеста сохраняются через API и отображаются в списке.
