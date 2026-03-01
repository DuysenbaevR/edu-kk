# 📚 lingvomed.uz — Ustazlar ushın taptırmas kómekshi

Образовательный портал на **каракалпакском языке**. Учителя могут публиковать презентации, видеоуроки и тесты.

**Стек:** Next.js 14 + TailwindCSS + Firebase (Firestore + Storage)

---

## ⚡ Быстрый старт

```bash
git clone https://github.com/your/edu-kk.git
cd edu-kk
npm install
cp .env.local.example .env.local
# → заполни ключи Firebase в .env.local
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

> Без Firebase сайт работает с демо-данными.

---

## 📸 Страницы

| Страница | URL | Описание |
|---|---|---|
| Главная | `/` | Баннер + CTA |
| Каталог | `/materials` | Карточки + фильтр |
| Просмотр | `/materials/[id]` | PDF/video viewer |
| Профиль | `/profile` | Преподаватель |
| Админка | `/admin` | Пароль → CRUD |

---

## 🔥 Настройка Firebase

### 1. Создать проект
1. [console.firebase.google.com](https://console.firebase.google.com) → **Add project**
2. Включить **Firestore Database** (Production mode)
3. Включить **Storage** (тот же регион)

### 2. Получить ключи
Настройки проекта → Your apps → Web → скопируй `firebaseConfig`

### 3. Заполнить `.env.local`

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc

# Пароль для /admin (обязательно смените!)
NEXT_PUBLIC_ADMIN_PASSWORD=super_secret_password
```

---

## 🔒 Правила безопасности

### Firestore Rules (вставьте в Firebase Console → Firestore → Rules)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /materials/{docId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

### Storage Rules (Firebase Console → Storage → Rules)

Содержимое файла `storage.rules` из этого репозитория:
- Чтение: публичное
- Запись: только авторизованным, max 200MB, только PDF/PPT/MP4

---

## 🌱 Seed — тестовые данные

```bash
npm install firebase-admin
# Скачай serviceAccount.json из Firebase Console → Project Settings → Service accounts
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json node scripts/seed.js
```

---

## 🚀 Деплой на Vercel

```bash
npm i -g vercel
vercel
# Добавь все NEXT_PUBLIC_* переменные в Vercel Dashboard
vercel --prod
```

Или: [vercel.com](https://vercel.com) → New Project → Import from GitHub → Add env vars → Deploy.

---

## 📁 Структура проекта

```
edu-kk/
├── components/
│   ├── Header.tsx          # Навигация + логотип + соцсети
│   ├── Footer.tsx
│   ├── Layout.tsx
│   ├── MaterialCard.tsx    # Карточка в каталоге
│   └── FileUploader.tsx    # Загрузчик + запись в Firestore
├── pages/
│   ├── index.tsx           # Главная
│   ├── profile.tsx         # Профиль преподавателя
│   ├── materials/
│   │   ├── index.tsx       # Каталог
│   │   └── [id].tsx        # Просмотр
│   └── admin/index.tsx     # Панель администратора
├── lib/
│   ├── firebase.ts         # Firebase SDK init
│   └── types.ts            # TypeScript типы
├── locales/kk.ts           # Все тексты на каракалпакском
├── styles/globals.css
├── scripts/seed.js         # Демо-данные
├── firestore.rules
├── storage.rules
└── .env.local.example
```

---

## 🗃️ Схема данных Firestore (коллекция `materials`)

| Поле | Тип | Описание |
|---|---|---|
| `id` | string | UUID |
| `title_kk` | string | Название (каракалп.) |
| `description_kk` | string | Описание |
| `type` | enum | `presentation/video/quiz/test` |
| `storagePath` | string | Путь в Storage |
| `downloadUrl` | string | Публичная ссылка |
| `thumbnailUrl` | string | Миниатюра |
| `uploadedAt` | Timestamp | Дата |
| `uploader` | string | Имя автора |

---

## 🛠️ Команды

```bash
npm run dev      # localhost:3000
npm run build    # Production сборка
npm run seed     # Заполнить Firestore
```
