# /Model Domain Specification

## 1️⃣ Model.ts — Domain Model

**Назначение:**

* Представляет бизнес-сущность `Model`.
* Содержит валидные поля, методы и вычисляемые свойства.
* Не зависит от API или формы.

```ts
export class Model {
  constructor(
    readonly id: number,
    public name: string,
    public email: string,
  ) {}

  get displayName(): string {
    return this.name || this.email;
  }
}
```

---

## 2️⃣ Model.types.ts — Model-level TS types (опционально)

**Назначение:**

* Дополнительные типы для модели или адаптеров.

```ts
export type ModelId = number;
export type ModelName = string;
```

---

## 3️⃣ Model.dto.ts — DTO (API raw types)

**Назначение:**

* Интерфейсы данных от API.
* Без методов и логики.

```ts
export interface ModelDTO {
  id: number;
  users: User[];
}

export interface ModelOutgoingDTO {
  id: number;
  user_ids: number[]
}
```

---

## 4️⃣ Model.mapper.ts — Mapper: DTO ↔ Model, Model ↔ Draft

**Назначение:**

* Конвертация между слоями.

```ts
import { Model } from './Model';
import { ModelDTO } from './Model.dto';
import { ModelCreationDraft, ModelUpdateDraft } from './Model.draft';

export const ModelMapper = {
  fromDTO(dto: ModelDTO): Model {
    return new Model(dto.id, dto.full_name ?? '', dto.email ?? '');
  },

  toCreationDraft(model?: User): UserCreationDraft {
  return {
    name: model?.name ?? null,
    email: model?.email ?? null,
  };
}


  toUpdateDraft(Model: Model): ModelUpdateDraft {
    return { id: Model.id, name: Model.name, email: Model.email };
  },

  /**
   * Конвертация Draft → DTO для отправки на сервер
   */
  draftToDTO(draft: UserCreationDraft | UserUpdateDraft): ModelOutgoingDTO {
    const dto: ModelOutgoingDTO = {
      full_name: draft.name,
      email: draft.email,
    };

    // Для UpdateDraft добавляем id, если есть
    if ('id' in draft) {
      dto.id = draft.id;
    }

    return dto;
  }

};
```

---

## 5️⃣ Model.draft.ts — Draft types (Creation/Update)

**Назначение:**

* Типы для форм создания и редактирования.

```ts
export interface ModelCreationDraft {
  name: string | null;
  email: string | null;
}

export interface ModelUpdateDraft {
  id: number;
  name: string | null;
  email: string | null;
}
```

---

## 6️⃣ Model.api.ts — API функции

**Назначение:**

* Работа с бэкендом: fetch, create, update.
* Использует DTO.

```ts
import { ModelDTO } from './Model.dto';

export const ModelAPI = {
  getById(id: number): Promise<ModelDTO> { ... },
  create(dto: ModelOutgoingDTO): Promise<ModelDTO> { ... },
  update(id: number, dto: ModelOutgoingDTO): Promise<ModelDTO> { ... },
  list(): Promise<ModelDTO[]> { ... },
};
```

---

## 7️⃣ Model.repository.ts — TanStack Query hooks/useCases

**Назначение:**

* Интеграция API + мапперов + реактивности.
* UI работает только с Model.

```ts
import { useQuery, useMutation } from '@tanstack/vue-query';
import { ModelAPI } from './Model.api';
import { ModelMapper } from './Model.mapper';
import { Model, ModelUpdateDraft } from './Model.draft';

export function useModel(id: number) {
  return useQuery(['Model', id], async () => {
    const dto = await ModelAPI.getById(id);
    return ModelMapper.fromDTO(dto);
  });
}

export function useUpdateModel() {
  return useMutation(async ({ id, draft }: { id: number; draft: ModelUpdateDraft }) => {
    const dto = ModelMapper.draftToDTO(draft);
    const updatedDTO = await ModelAPI.update(id, dto);
    return ModelMapper.fromDTO(updatedDTO);
  });
}
```

---

## 8️⃣ index.ts — Barrel export

**Назначение:**

* Удобный экспорт всех частей домена.

```ts
export * from './Model';
export * from './Model.types';
export * from './Model.dto';
export * from './Model.mapper';
export * from './Model.draft';
export * from './Model.api';
export * from './Model.repository';
```

---

# ✅ Итог

* Полная изоляция слоёв: Model ↔ Draft ↔ DTO ↔ API ↔ Repository
* Mapper — единственная точка конверсий
* UI работает только с Model / Draft
* Структура легко масштабируется на другие домены (`Order`, `Product`)
