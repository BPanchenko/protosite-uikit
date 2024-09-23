# CSS фреймворк Protosite UIKit

[![npm](https://img.shields.io/npm/v/@bpanchenko/uikit.svg)](https://www.npmjs.com/package/@bpanchenko/uikit)

Библиотека правил CSS для определения представления элементов веб-интерфейса.

Интерфейс подключения библитеки реализован в виде типизированного CSS-модуля для применения как в нативной реализации так и в CommonJS или
TypeScript окружении разработки веб-приложений. Так-же активы библиотеки содержат нативные модули JavaScript (ECMAScript Module) для
подключения в браузерах.

## Пространства имён

#### `o-`: [_Объект_](https://github.com/BPanchenko/protosite-uikit/tree/master/object)

Абстрактный блок модульной сетки веб-приложения, страницы или документа. Область интерфейса с индивидуальным поведением. Нечто, на что
направлена практическая или познавательная деятельность пользователя. Объединяет компоненты и логику работы. Пользователь может менять
состояние объекта взаимодействуя с отдельными его компонентами. Внешний вид объекта зависит от контекста использования.

#### `c-`: [_Компонента_](https://github.com/BPanchenko/protosite-uikit/tree/master/component)

Минимальная составная часть пользовательского интерфейса. Внешний вид может различатся в зависимости от контекста использования или темы
оформления интерфейса. Косметическое оформление компоненты может быть измено в результате воздействия пользователем непосредственно на
элемент.

#### `u-`: [_Утилита_](https://github.com/BPanchenko/protosite-uikit/tree/master/utility)

Вспомогательные классы CSS. Инструмент коррекции поведения элементов относительно окружения.

#### `t-`: [_Тема оформления_](https://github.com/BPanchenko/protosite-uikit/tree/master/theme)

Глобальные темы переопределяют правила представления модулей интерфейса или структуры документа. Класс с такой приставкой определяет
стилистическое оформление содержимого документа и должен быть объявлен в корневом элементе.

#### `s-`: [_Косметический стиль_](https://github.com/BPanchenko/protosite-uikit/tree/master/style)

Правила стилистического оформления отдельных элементов веб-интерфейса. Стиль контекста определяет косметический вид отдельной компоненты
чаще, области документа реже. Стиль оформления подобен теме.

#### `is-`, `has-`: _Модификатор состояния_

Эти приставки означают что в данный момент времени элемент находится в определённом состоянии, которое меняет его внишний вид и, возможно,
поведение. При измении состояния такие классы CSS удаляются или заменяются на другие. Хорошей практикой является использование атриботов
`aria-` или `data-` в качестве индикаторов состояния, классами CSS лучше не злоупотреблять.

#### `js-`: _Селектор веб-приложения для ссылки на элемент DOM-дерева_

Приставка определяет селектор используемый вашим кодом на JavaScript для получения прямой ссылки на элемент в DOM-дереве. Ссылка на элемент
позволяет менять его состояние, содержимое, отслеживать события или просто удалить.

#### `qa-`: _Селектор автоматизированных тестов_

Класс с этой приставкой необходим для поиска и связывания элементов DOM в автоматизированных тестах визаулизации GUI в браузере. Оцениваются
результаты прохождения различных сценариев взаимодействия и функционирование подсистем. Хорошей практикой является использование атрибота
`data-` в качестве контейнера данных промежуточного состояния элемента в сценарии.

## Базовые настройки и переопределение стилей браузера

#### [`./document`](https://github.com/BPanchenko/protosite-uikit/tree/master/document)

Переопределение браузерных правил CSS для стандартных элементов страницы HTML. Определены правила оформления простого документа на основе
базовых переменных дизайн-системы Протосайта.

#### [`./settings`](https://github.com/BPanchenko/protosite-uikit/tree/master/settings)

Базовые переменные дизайн-системы Протосайта: размерности величин и экранов адаптивной вёрстки, шрифты, тени, палитра цветов.

## Использование активов библиотеки

#### Через подключение модулей пакета Node.js

```shell
yarn add @bpanchenko/uikit -D
```

#### Через загрузку ресурсов веб-страницы в браузер

```js
//assets.protosite.rocks/uikit/components.{css,mjs}
//assets.protosite.rocks/uikit/document.{css,mjs}
//assets.protosite.rocks/uikit/main.{css,mjs}
//assets.protosite.rocks/uikit/objects.{css,mjs}
//assets.protosite.rocks/uikit/styles.{css,mjs}
//assets.protosite.rocks/uikit/utilities.{css,mjs}

//assets.protosite.rocks/uikit/component/avatar.{css,mjs}
//assets.protosite.rocks/uikit/component/backdrop.{css,mjs}
//assets.protosite.rocks/uikit/component/badge.{css,mjs}
//assets.protosite.rocks/uikit/component/button.{css,mjs}
//assets.protosite.rocks/uikit/component/chart.{css,mjs}
//assets.protosite.rocks/uikit/component/control.{css,mjs}
//assets.protosite.rocks/uikit/component/dialog.{css,mjs}
//assets.protosite.rocks/uikit/component/list.{css,mjs}
//assets.protosite.rocks/uikit/component/pagination.{css,mjs}
//assets.protosite.rocks/uikit/component/panel.{css,mjs}
//assets.protosite.rocks/uikit/component/popover.{css,mjs}
//assets.protosite.rocks/uikit/component/progress.{css,mjs}
//assets.protosite.rocks/uikit/component/tabs.{css,mjs}
//assets.protosite.rocks/uikit/component/thumbnail.{css,mjs}
//assets.protosite.rocks/uikit/component/toolbar.{css,mjs}

//assets.protosite.rocks/uikit/style/animated-gradient.{css,mjs}
//assets.protosite.rocks/uikit/style/backgrounds.{css,mjs}
//assets.protosite.rocks/uikit/style/clean.{css,mjs}
//assets.protosite.rocks/uikit/style/cursor.{css,mjs}
//assets.protosite.rocks/uikit/style/floating.{css,mjs}
//assets.protosite.rocks/uikit/style/highlighted.{css,mjs}
//assets.protosite.rocks/uikit/style/hovered.{css,mjs}
//assets.protosite.rocks/uikit/style/icon.{css,mjs}
//assets.protosite.rocks/uikit/style/inversed.{css,mjs}
//assets.protosite.rocks/uikit/style/lead.{css,mjs}
//assets.protosite.rocks/uikit/style/link.{css,mjs}
//assets.protosite.rocks/uikit/style/loading.{css,mjs}
//assets.protosite.rocks/uikit/style/rounded.{css,mjs}
//assets.protosite.rocks/uikit/style/shadows.{css,mjs}
//assets.protosite.rocks/uikit/style/sizes.{css,mjs}
//assets.protosite.rocks/uikit/style/striped.{css,mjs}
//assets.protosite.rocks/uikit/style/text.{css,mjs}
//assets.protosite.rocks/uikit/style/transform.{css,mjs}
```
