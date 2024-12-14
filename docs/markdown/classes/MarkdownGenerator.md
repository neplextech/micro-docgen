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
- [Source](https://github.com/neplextech/micro-docgen/blob/515b36b40a80a8da0e52785839d6336deb90e3f3/src/generators/MarkdownGenerator.ts#L26)
### public options: any
- [Source](https://github.com/neplextech/micro-docgen/blob/515b36b40a80a8da0e52785839d6336deb90e3f3/src/generators/MarkdownGenerator.ts#L28)

## Methods
### public getClassHeading(c): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| c | DocumentedClass | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/515b36b40a80a8da0e52785839d6336deb90e3f3/src/generators/MarkdownGenerator.ts#L44)
### public getCtor(c): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| c | DocumentedClassConstructor | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/515b36b40a80a8da0e52785839d6336deb90e3f3/src/generators/MarkdownGenerator.ts#L52)
### public getFunctions(m): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| m | DocumentedClassMethod | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/515b36b40a80a8da0e52785839d6336deb90e3f3/src/generators/MarkdownGenerator.ts#L269)
### public getHeaders(value): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| value | DocumentedClass | DocumentedClassMethod | DocumentedTypes | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/515b36b40a80a8da0e52785839d6336deb90e3f3/src/generators/MarkdownGenerator.ts#L32)
### public getMarkdown(c): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| c | DocumentedClass | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/515b36b40a80a8da0e52785839d6336deb90e3f3/src/generators/MarkdownGenerator.ts#L158)
### public getMethods(methods): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| methods | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedClassMethod> | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/515b36b40a80a8da0e52785839d6336deb90e3f3/src/generators/MarkdownGenerator.ts#L200)
### public getProperties(properties): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| properties | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedClassProperty> | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/515b36b40a80a8da0e52785839d6336deb90e3f3/src/generators/MarkdownGenerator.ts#L173)
### public getTypeMarkdown(t): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| t | DocumentedTypes | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/515b36b40a80a8da0e52785839d6336deb90e3f3/src/generators/MarkdownGenerator.ts#L115)
### public transformClass(classes): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<MarkdownGeneratorMarkdownBuild>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| classes | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedClass> | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/515b36b40a80a8da0e52785839d6336deb90e3f3/src/generators/MarkdownGenerator.ts#L85)
### public transformFunctions(types): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<MarkdownGeneratorMarkdownBuild>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| types | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedClassMethod> | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/515b36b40a80a8da0e52785839d6336deb90e3f3/src/generators/MarkdownGenerator.ts#L95)
### public transformTypes(types): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<MarkdownGeneratorMarkdownBuild>
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| types | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedTypes> | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/515b36b40a80a8da0e52785839d6336deb90e3f3/src/generators/MarkdownGenerator.ts#L105)