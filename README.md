# Исторические даты

React-приложение с демонстрацией исторических дат. Проект представляет собой тестовое задание с использованием TypeScript, Webpack, styled-components и js-анимаций.

## Используемые технологии

- React 19
- TypeScript
- styled-components
- Webpack
- Babel
- GSAP (для анимаций)
- Swiper (для слайдера)

## Структура проекта

- `public/` — статические файлы
- `src/` — исходный код приложения
- `.gitignore` — файл для запрета на попадание в git-репозиторий файлов, указанных в .gitignore
- `package-lock.json` — файл, фиксирующий точные версии установленных зависимостей (создается автоматически после `npm install`)
- `package.json` — список зависимостей и скриптов проекта
- `README.md` — файл с инструкция по запуску проекта
- `tsconfig.json` — конфигурация TypeScript
- `webpack.config.js` — конфигурация Webpack

## Запуск проекта

Необходимо, чтобы был установлен [Node.js](https://nodejs.org/en).

Клонируйте репозиторий и перейдите в папку с проектом:

Если вы используете HTTPS:
```sh
git clone https://github.com/GeniaV/historical-dates.git
```

Если вы используете SSH:
```sh
git clone git@github.com:GeniaV/historical-dates.git
```

Установите зависимости:
```sh
npm install
```

Запустите проект в режиме разработки:
```sh
npm start
```

## Сборка проекта

Для создания production-сборки выполните:
```sh
npm run build
```