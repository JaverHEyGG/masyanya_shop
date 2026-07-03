# Масяня — интернет-магазин воздушных шариков

Этот проект содержит клиентский интернет-магазин и админ-панель на HTML5, CSS3 и Vanilla JavaScript, с использованием Firebase Firestore, Storage и Authentication.

## Структура проекта

- `index.html` — главная страница магазина
- `admin.html` — панель администратора
- `style.css` — общие стили
- `script.js` — логика главной страницы
- `admin.js` — логика админ-панели
- `firebase.js` — конфигурация Firebase и утилиты

## 1. Как создать проект Firebase

1. Перейдите на [Firebase Console](https://console.firebase.google.com/).
2. Нажмите **Add project** (Добавить проект).
3. Укажите имя проекта, например `masyanya-shop`.
4. Отключите Google Analytics, если не нужно, и завершите создание.

## 2. Как включить Firestore

1. В Firebase Console выберите ваш проект.
2. Перейдите в раздел **Firestore Database**.
3. Нажмите **Create database**.
4. Выберите режим **Production** или **Test**.
5. Укажите ближайший регион и подтвердите.

## 3. Как включить Storage

1. В Firebase Console перейдите в раздел **Storage**.
2. Нажмите **Get started**.
3. Выберите регион и подтвердите.
4. Разрешите доступ по умолчанию, затем при необходимости настройте правила.

## 4. Как включить Authentication

1. В Firebase Console перейдите в раздел **Authentication**.
2. Нажмите **Get started**.
3. В разделе **Sign-in method** включите **Email/Password**.
4. Перейдите во вкладку **Users** и добавьте нового пользователя.
5. Укажите email администратора и пароль.

## 5. Как вставить ключи Firebase

1. В Firebase Console перейдите в раздел **Project settings**.
2. В блоке **Your apps** добавьте **Web app**.
3. Скопируйте конфигурацию Firebase.
4. Откройте файл `firebase.js`.
5. Замените параметры в объекте `firebaseConfig` на данные из Firebase:

```js
const firebaseConfig = {
  apiKey: 'ВАШ_API_KEY',
  authDomain: 'PROJECT.firebaseapp.com',
  projectId: 'PROJECT_ID',
  storageBucket: 'PROJECT_ID.appspot.com',
  messagingSenderId: 'MESSAGING_SENDER_ID',
  appId: 'APP_ID'
};
```

> Убедитесь, что `projectId` и `storageBucket` совпадают с вашим проектом.

## 6. Как загрузить проект на GitHub Pages

1. Создайте новый репозиторий на GitHub.
2. Скопируйте файлы проекта в папку локального репозитория.
3. Выполните команды:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

4. В настройках репозитория на GitHub откройте **Pages**.
5. В разделе **Source** выберите ветку `main` и папку `/ (root)`.
6. Сохраните. Через несколько минут сайт будет доступен.

## 7. Как пользоваться админкой

1. Откройте страницу `admin.html`.
2. Введите email и пароль администратора.
3. После входа вы увидите форму для добавления товара и список существующих товаров.
4. Заполните название, цену, количество, описание и загрузите фотографию.
5. Нажмите **Сохранить**.
6. Чтобы изменить товар, нажмите **Редактировать**, внесите изменения и нажмите **Обновить**.
7. Чтобы удалить товар, нажмите **Удалить**.

## Рекомендации по товарам

- Загружайте качественные изображения размером не более 5 МБ.
- Описывайте товар кратко и понятно.
- Используйте актуальную цену в гривнах.

## Примечание

- Для работы проекта требуется подключение к интернету.
- Firebase Authentication хранит учетные данные администратора.
- Все товары сохраняются в Firestore, а изображения — в Firebase Storage.
