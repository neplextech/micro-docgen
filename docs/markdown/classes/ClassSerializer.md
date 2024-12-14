---
title: ClassSerializer
description: No description provided
---


## ClassSerializer extends [AbstractSerializer](/docs/markdown/classes/AbstractSerializer.md)


```typescript
ClassSerializer(declaration)
```
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| declaration | DeclarationReflection | ❌ |


## Properties
### public declaration: any
- [Source](https://github.com/neplextech/micro-docgen/blob/fbfcd84c930585aff5882714b14f394715057a88/src/serializers/AbstractSerializer.ts#L4)

## Methods
### public parseMethod(decl): DocumentedClassMethod
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| decl | DeclarationReflection | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/fbfcd84c930585aff5882714b14f394715057a88/src/serializers/ClassSerializer.ts#L185)
### public parseParameter(decl): DocumentedParameter
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| decl | TypeParameterReflection | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/fbfcd84c930585aff5882714b14f394715057a88/src/serializers/ClassSerializer.ts#L226)
### public parseProperties(decl): DocumentedClassProperty
| Parameter | Type | Optional |
| ----------- | ----------- | ----------- |
| decl | DeclarationReflection | ❌ |


- [Source](https://github.com/neplextech/micro-docgen/blob/fbfcd84c930585aff5882714b14f394715057a88/src/serializers/ClassSerializer.ts#L123)
### public serialize(): DocumentedClass
- [Source](https://github.com/neplextech/micro-docgen/blob/fbfcd84c930585aff5882714b14f394715057a88/src/serializers/ClassSerializer.ts#L69)