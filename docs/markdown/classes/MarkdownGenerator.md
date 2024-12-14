---
title: MarkdownGenerator
description: MarkdownGenerator is a class that generates markdown documentation for classes, functions, and types. It transforms the JSON output from the serializer into markdown and applies the necessary formatting or linking.
---


## MarkdownGenerator
MarkdownGenerator is a class that generates markdown documentation for classes, functions, and types.
It transforms the JSON output from the serializer into markdown and applies the necessary formatting or linking.



```typescript
MarkdownGenerator(options)
```
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| options | MarkdownGeneratorMdBuilderOptions | ❌ |


## Properties
### public linker: any
- [Source](https://github.com/neplextech/micro-docgen/blob/fbfcd84c930585aff5882714b14f394715057a88/src/generators/MarkdownGenerator.ts#L32)
### public options: any
- [Source](https://github.com/neplextech/micro-docgen/blob/fbfcd84c930585aff5882714b14f394715057a88/src/generators/MarkdownGenerator.ts#L34)

## Methods
### public getClassHeading(c): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| c | DocumentedClass | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/fbfcd84c930585aff5882714b14f394715057a88/src/generators/MarkdownGenerator.ts#L50)
### public getCtor(c): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| c | DocumentedClassConstructor | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/fbfcd84c930585aff5882714b14f394715057a88/src/generators/MarkdownGenerator.ts#L58)
### public getFunctions(m): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| m | DocumentedClassMethod | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/fbfcd84c930585aff5882714b14f394715057a88/src/generators/MarkdownGenerator.ts#L275)
### public getHeaders(value): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| value | DocumentedClass | DocumentedClassMethod | DocumentedTypes | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/fbfcd84c930585aff5882714b14f394715057a88/src/generators/MarkdownGenerator.ts#L38)
### public getMarkdown(c): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| c | DocumentedClass | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/fbfcd84c930585aff5882714b14f394715057a88/src/generators/MarkdownGenerator.ts#L164)
### public getMethods(methods): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| methods | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedClassMethod> | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/fbfcd84c930585aff5882714b14f394715057a88/src/generators/MarkdownGenerator.ts#L206)
### public getProperties(properties): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| properties | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedClassProperty> | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/fbfcd84c930585aff5882714b14f394715057a88/src/generators/MarkdownGenerator.ts#L179)
### public getTypeMarkdown(t): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| t | DocumentedTypes | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/fbfcd84c930585aff5882714b14f394715057a88/src/generators/MarkdownGenerator.ts#L121)
### public transformClass(classes): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<MarkdownGeneratorMarkdownBuild>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| classes | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedClass> | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/fbfcd84c930585aff5882714b14f394715057a88/src/generators/MarkdownGenerator.ts#L91)
### public transformFunctions(types): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<MarkdownGeneratorMarkdownBuild>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| types | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedClassMethod> | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/fbfcd84c930585aff5882714b14f394715057a88/src/generators/MarkdownGenerator.ts#L101)
### public transformTypes(types): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<MarkdownGeneratorMarkdownBuild>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| types | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedTypes> | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/fbfcd84c930585aff5882714b14f394715057a88/src/generators/MarkdownGenerator.ts#L111)