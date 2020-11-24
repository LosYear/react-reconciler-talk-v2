# React Reconciler: как написать собственный рендерер – HolyJS 2020 Moscow

React – удивительно универсальная технология, прочно вошедшая в нашу жизнь. Применение React уже давно вышло за пределы веба,
его используют в огромном множестве задач: от разработки мобильных приложений и до генерации макетов. Интересно ли Вам, как такое стало возможно?

В ходе доклада мы разберем, что такое React Reconciler и как с его помощью создаются рендеры, напишем мини-версию привычного React DOM
и увидим, как можно связать React с более экзотичными средами на примере отрисовки React-компонентов в Figma.

Доклад окажется полезным практикующим разработчикам и прольет свет на внутреннее устройство архитектуры React и React DOM.

[Слайды](https://speakerdeck.com/losyear/react-reconciler-kak-napisat-sobstviennyi-riendierier-holyjs-moscow-2020)

## Примеры

### React DOM mini

Пример создания собственного рендера из React в DOM, является минимальной версией React DOM.

Чтобы запустить:

1. `cd react-dom-mini && npm i`
2. `npm start`

Файловая структура:

- `src/examples/` – примеры кода, порождающего вызовы тех или иных методов реконсилятора (например, добавление узла)
- `src/renderer.ts` – содержит реализацию хост-конфига

### React Figma

Отрисовщик React-компонентов в Figma, файловая структура аналогична предыдущему примеру.

Для запуска:

1. Установить [Figma](https://www.figma.com/)
2. `cd react-figma && npm i`
3. `npm start`
4. Добавить плагин вв Figma:
   1. Создать новый документ
   2. `Plugins` -> `Development` -> `New plugin`...
   3. Нажмите `Link existing plugin` и укажите путь к `src/manifest.json`
5. Запустите:

   `Plugins` -> `Development` -> `[HolyJS] React Renderer`

## Ссылки

### Со слайдов

- [React Figma](https://github.com/react-figma)
- [Пакет react-reconciler](https://github.com/facebook/react/tree/master/packages/react-reconciler)
- [Figma Plugin API](https://www.figma.com/plugin-docs/intro/)
- [Figma to code](https://github.com/bernaferrari/FigmaToCode)
- [Overlay](https://overlay-tech.com)
- [Зар Захаров, Александр Каменяр — Figma to React: доставка дизайна в код](https://www.youtube.com/watch?v=A3CamtT9VBs)
- [Илья Лесик – Как создать мультиплатформенную дизайн-систему на React](https://holyjs-moscow.ru/2020/msk/talks/5udhzhsrgbzzg3r496hmge/)

### Создание рендеров

- [Хост-конфиг React DOM](https://github.com/facebook/react/blob/master/packages/react-dom/src/client/ReactDOMHostConfig.js)
- [Atul R – Beginners guide to Custom React Renderers](https://blog.atulr.com/react-custom-renderer-1/)
- [Manas Jayanth – Learn how React Reconciler package works by building your own lightweight React DOM](https://hackernoon.com/learn-you-some-custom-react-renderers-aed7164a4199)
- [Sophie Alpert – Building a Custom React Renderer](https://www.youtube.com/watch?v=CGpMlWVcHok)
- [Aziz Khambati – Building an Async React Renderer with Diffing in Web Worker](https://medium.com/@azizhk/building-an-async-react-renderer-with-diffing-in-web-worker-f3be07f16d90)

### Про архитектуру React

- [React Docs: Reconciliation](https://reactjs.org/docs/reconciliation.html)
- [React Docs: Components, Elements and Instances](https://ru.reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html)
- [Lin Clark – A Cartoon Intro to Fiber – React Conf 2017](https://www.youtube.com/watch?v=ZCuYPiUIONs)
- [Maxim Koretskyi – Inside Fiber: in-depth overview of the new reconciliation algorithm in React](https://indepth.dev/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react/)
- [Maxim Koretskyi – The how and why on React’s usage of linked list in Fiber to walk the component’s tree](https://medium.com/react-in-depth/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-67f1014d0eb7)
- [Rodrigo Pombo – Building your own React](https://pomb.us/build-your-own-react/)

### Еще

- [Awesome React Renderer list](https://github.com/chentsulin/awesome-react-renderer)
- [Предыдущий доклад на аналогичную тему](https://github.com/LosYear/react-reconciler-talk)
