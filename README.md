# Масяня — інтернет-магазин повітряних кульок

Цей проєкт містить клієнтський інтернет-магазин та адмін-панель на HTML5, CSS3 і Vanilla JavaScript з використанням Firebase Firestore, Storage та Authentication.

## Структура проєкту

- `index.html` — головна сторінка магазину
- `admin.html` — панель адміністратора
- `style.css` — загальні стилі
- `script.js` — логіка головної сторінки
- `admin.js` — логіка адмін-панелі
- `firebase.js` — конфігурація Firebase та утиліти

## 1. Як створити проєкт Firebase

1. Перейдіть на [Firebase Console](https://console.firebase.google.com/).
2. Натисніть **Add project** (Додати проєкт).
3. Вкажіть назву проєкту, наприклад `masyanya-shop`.
4. Вимкніть Google Analytics, якщо не потрібно, та завершіть створення.

## 2. Як увімкнути Firestore

1. У Firebase Console виберіть свій проєкт.
2. Перейдіть до розділу **Firestore Database**.
3. Натисніть **Create database**.
4. Оберіть режим **Production** або **Test**.
5. Вкажіть найближчий регіон і підтвердіть.

## 3. Як увімкнути Storage

1. У Firebase Console перейдіть до розділу **Storage**.
2. Натисніть **Get started**.
3. Оберіть регіон і підтвердіть.
4. Дозвольте доступ за замовчуванням, а потім при необхідності налаштуйте правила.

## 4. Як увімкнути Authentication

1. У Firebase Console перейдіть до розділу **Authentication**.
2. Натисніть **Get started**.
3. У розділі **Sign-in method** увімкніть **Email/Password**.
4. Перейдіть на вкладку **Users** і додайте нового користувача.
5. Вкажіть email адміністратора та пароль.

## 5. Як вставити ключі Firebase

1. У Firebase Console перейдіть до розділу **Project settings**.
2. У блоці **Your apps** додайте **Web app**.
3. Скопіюйте конфігурацію Firebase.
4. Відкрийте файл `firebase.js`.
5. Замініть параметри в об'єкті `firebaseConfig` на дані з Firebase:

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

> Переконайтеся, що `projectId` і `storageBucket` збігаються з вашим проєктом.

## 6. Як завантажити проєкт на GitHub Pages

1. Створіть новий репозиторій на GitHub.
2. Скопіюйте файли проєкту до папки локального репозиторію.
3. Виконайте команди:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

4. У налаштуваннях репозиторію на GitHub відкрийте **Pages**.
5. У розділі **Source** оберіть гілку `main` і папку `/ (root)`.
6. Збережіть. Через кілька хвилин сайт буде доступний.

## 7. Як користуватися адмінкою

1. Відкрийте сторінку `admin.html`.
2. Введіть email та пароль адміністратора.
3. Після входу ви побачите форму для додавання товару та список існуючих товарів.
4. Заповніть назву, ціну, кількість, опис і завантажте фото.
5. Натисніть **Зберегти**.
6. Щоб змінити товар, натисніть **Редагувати**, внесіть зміни та натисніть **Оновити**.
7. Щоб видалити товар, натисніть **Видалити**.

## Рекомендації щодо товарів

- Завантажуйте якісні зображення розміром не більше 5 МБ.
- Описуйте товар коротко та зрозуміло.
- Використовуйте актуальну ціну в гривнях.

## Примітка

- Для роботи проєкту потрібне підключення до інтернету.
- Firebase Authentication зберігає облікові дані адміністратора.
- Усі товари зберігаються у Firestore, а зображення — у Firebase Storage.
