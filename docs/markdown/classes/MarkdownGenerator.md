---
title: MarkdownGenerator
description: No description provided
---


## MarkdownGenerator


```typescript
MarkdownGenerator(options)
```
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| options | MarkdownGeneratorMdBuilderOptions | ❌ |


## Properties
### public linker: any
- [Source](https://github.com/neplextech/micro-docgen/blob/0a3a2574da6de7199a2316a00abcd9d9f17c69a7/src/generators/MarkdownGenerator.ts#L28)
### public options: any
- [Source](https://github.com/neplextech/micro-docgen/blob/0a3a2574da6de7199a2316a00abcd9d9f17c69a7/src/generators/MarkdownGenerator.ts#L30)

## Methods
### public getClassHeading(c): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| c | DocumentedClass | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/0a3a2574da6de7199a2316a00abcd9d9f17c69a7/src/generators/MarkdownGenerator.ts#L46)
### public getCtor(c): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| c | DocumentedClassConstructor | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/0a3a2574da6de7199a2316a00abcd9d9f17c69a7/src/generators/MarkdownGenerator.ts#L54)
### public getFunctions(m): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| m | DocumentedClassMethod | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/0a3a2574da6de7199a2316a00abcd9d9f17c69a7/src/generators/MarkdownGenerator.ts#L271)
### public getHeaders(value): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| value | DocumentedClass | DocumentedClassMethod | DocumentedTypes | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/0a3a2574da6de7199a2316a00abcd9d9f17c69a7/src/generators/MarkdownGenerator.ts#L34)
### public getMarkdown(c): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| c | DocumentedClass | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/0a3a2574da6de7199a2316a00abcd9d9f17c69a7/src/generators/MarkdownGenerator.ts#L160)
### public getMethods(methods): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| methods | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedClassMethod> | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/0a3a2574da6de7199a2316a00abcd9d9f17c69a7/src/generators/MarkdownGenerator.ts#L202)
### public getProperties(properties): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| properties | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedClassProperty> | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/0a3a2574da6de7199a2316a00abcd9d9f17c69a7/src/generators/MarkdownGenerator.ts#L175)
### public getTypeMarkdown(t): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| t | DocumentedTypes | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/0a3a2574da6de7199a2316a00abcd9d9f17c69a7/src/generators/MarkdownGenerator.ts#L117)
### public transformClass(classes): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<MarkdownGeneratorMarkdownBuild>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| classes | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedClass> | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/0a3a2574da6de7199a2316a00abcd9d9f17c69a7/src/generators/MarkdownGenerator.ts#L87)
### public transformFunctions(types): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<MarkdownGeneratorMarkdownBuild>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| types | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedClassMethod> | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/0a3a2574da6de7199a2316a00abcd9d9f17c69a7/src/generators/MarkdownGenerator.ts#L97)
### public transformTypes(types): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<MarkdownGeneratorMarkdownBuild>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| types | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedTypes> | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/0a3a2574da6de7199a2316a00abcd9d9f17c69a7/src/generators/MarkdownGenerator.ts#L107)