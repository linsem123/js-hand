# js-hand

This Repo aims to introduce and share the light JS lang hand writing about awesome JS features.
And TS may be involved in some cases.

## Branch style

`feature/xxx-xxx-yyyyMMdd` for new feature or update features.
`hotfix/xxx-xxx-yyyyMMdd` for fixing issues.
`doc/xxx-xxx-yyyyMMdd` for documents enhancement.

## Coding style

1. file name should be like `xxx-xxx-xx.xx`.
2. class name should be Uppercase.
3. function name should be lowercase.
4. use single quote.
5. throw err firstly, like below.

    ```js
    function saveData(data) {
    const status = callRequestToSaveData(data);
    if (status === 'error') return;
    // To do the next steps.
    }
    ```

6. declare interface for `TS` model.
7. do not use any for typechecking in `TS`.
8. take care for unsubscribe hot observable.
9. take care for clear cache leaking operation like `setTimeout` or `setInterval`.
10. coding with well folder structure like project [angular chart](https://github.com/angryreid/angular-chart).

## JS hand writing featrue done

1. call
2. apply
3. bind
4. EventEmitter
5. debounce
6. throttle
7. promise

## JS hand writing featrue to do

1. rxjs
2. zone.js
