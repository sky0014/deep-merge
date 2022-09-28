# deep-merge

Merge second object to first object just like Object.assign, best to use it with immer.

## Install

```bash
npm install @sky0014/deep-merge
```

## Usage

```ts
import produce from "immer";
import { deepMerge } from "@sky0014/deep-merge";

const a = { a: 1, b: 2, c: { hello: "world" } };

const b = produce(a, (draft) => {
  Object.assign(draft, { c: { hello: "world" } });
});

const c = produce(a, (draft) => {
  deepMerge(draft, { c: { hello: "world" } }); // equal to draft.c.hello = "world"
});

const d = produce(a, (draft) => {
  deepMerge(draft, { c: {} }); // d = { a: 1, b: 2, c: { } }
});

console.log(a === b); // false 内容未变，引用改变
console.log(a === c); // true  内容未变，引用未变
console.log(a === d); // false 内容改变，引用改变

const e = produce(a, (draft) => {
  return deepMerge(draft, { a: 1 }, true); // replace(NOT merge) draft
}); // e = { a: 1 }
```

## Publish

If your first time publish a package, login first:

```bash
npm login --registry=http://registry.npmjs.org
```

Then you can publish:

```bash
npm run pub
```
