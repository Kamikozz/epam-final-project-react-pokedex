# Final project

Это последнее задание в курсе. Дедлайн - **11/02**!

Для выполнения этого ДЗ Вам понадобятся следующие npm-пакеты:

* react
* react-dom
* react-router-dom
* webpack
* json-server

Выше описаны только самые необходимые пакеты, вероятно в процессе выполнения выяснится, что необходимо что-то еще.

**Задание**. Необходимо создать приложение `pokedex`.

### Общие требования:

1. **Пагинация**. Может быть реализована любым способом: 
    * Кнопка "Load more", которая подгружает следующую страницу в общий список
    * Endless scroll. Принцип тот же, что и у load more за исключеним того, что следующая порция должна подгружаться автоматически при достижении конца страницы.
    * Традиционная пагинация с номерами страниц

2. **Адаптивный дизайн**

3. **Должна присутствовать навигация (меню).**

### Требования:

1. **Главная страница**. Здесь должен выводиться список покемонов плашками. В каждой плашке должна быть картинка покемона, его имя и кнопка "Поймать". Если покемон уже пойман - кнопка должна быть `disabled`. При нажатии на покемона - нужно переходить на страничку покемона.

2. **Страница покемона**. Здесь должна выводится информация по указанному покемону: id, имя, картинка, статус (пойман или нет). Если покемон пойман, то нужно еще показывать дату его поимки.

3. **Пойманные покемоны**. Здесь логика точно такая же, как и на главной странице, за исключением того, что выводиться должны только пойманные покемоны.

### Рекомендации

1. Используйте какой-нибудь css-framework, чтобы верстка заняла минимум времени.

2. Пойманных покемонов лучше выносить в отдельную коллекцию и затем связывать их средствами json-server. Подробности можно найти в документации.

3. Постарайтесь показать себя во всей красе. Если есть какой-то опыт с дополнительными пакетами, не указанными в списке - не стесняйтесь их использовать (напр., `redux`).

4. Приветствуется создание доступного интерфейса.

5. Постарайтесь построить хорошую архитектуру приложения. Как минимум, стоит отделить бизнес-логику приложения от ее презентационного слоя (`view`).

6. Приветствуется покрытие unit-тестами.

7. Поддержка браузеров: последние версии современных браузеров, ie 11

### Примечание

Картинки покемонов и `db.json` для `json-server` можно найти в этом репозитории.

## Results (demo, description)

### Tag: #f8f3baa (2 years ago)
Unfinished project with few bugs

### Tag: #working-mui #61fa888

Final React application with Material-UI
- without any caching
- without unit-tests
- with different states in each of the component

### Tag: #working-mui-context-providers #31cff7c

Final React application with Material-UI, Context Providers
- with caching
- rename all of the components & place main components as a pages
- still without unit-tests
- one state on the upper-level provided using Context Providers
- reduced count of the requests & re-renders

### Tag: #working-mui-context-providers-typescript #c02fbae

Final React application with MUI, Context Providers & typescript
- all is the same like in the previous version, except typescript

### Tag: #working-mui-context-providers-ts-hooks #958e63c

Final React application with MUI, Context Providers, TS & React Hooks (without useReducer)
- move TSS/JSS into separate styles.ts file in each of the component's folder

### Tag: #working-mui-context-providers-ts-hooks-usereducer #fc092d3

Final React application with MUI, Typescript, useContext & useReducer

### Tag: #working-mui-redux-ts-hooks ???

Final React application with MUI, TS, Redux
- add index.ts for shortcut aliases of import/export (for components, redux slices & pages);
- remove outdated PropTypes due to using TS;
- remove explicit Prop type/interface declaration of classes;
- restructured store by removing caughtPokemonsIds for top-level and move it into
```js
caughtPokemons: {
  items: [],
  uniqueIds: Set(),
}
```
- add redux-saga;
- fix Nav bar's selected Tab bug (remove useless useState and rely on App's `location.pathname`
value that is passed to the Nav component via `selected` prop);
- add more redux actions, reducers, slices;
- move business logic on the components to sagas;
