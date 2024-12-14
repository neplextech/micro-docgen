---
title: MicroDocgenInit
description: Interface for initializing MicroDocgen.
---

## MicroDocgenInit

Interface for initializing MicroDocgen.

| Property | Type | Value |
| ----------- | ----------- | ----------- |
| clean | [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | N/A |
| custom | Array\<MicroDocgenCustomFile> | N/A |
| debug | 'Error' \| LogLevel \| 'Verbose' \| 'Info' \| 'Warn' \| 'None' | N/A |
| extension | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | N/A |
| flattenSingleModule | [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | N/A |
| includeMarkdownHeaders | [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | N/A |
| input | null \| Array\<string> | N/A |
| jsonInputPath | null \| string | N/A |
| jsonName | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | N/A |
| links | MicroDocgenLink | N/A |
| markdown | [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | N/A |
| noEmit | [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | N/A |
| noLinkTypes | [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | N/A |
| omitTypeLinkerExtension | [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | N/A |
| output | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | N/A |
| print | [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | N/A |
| spaces | [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | N/A |
| tsconfigPath | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | N/A |
| typeLinker | (   type: string,   ref: Array\<string> ) => string | N/A |
| typeLinkerBasePath | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | N/A |


- [Source](https://github.com/neplextech/micro-docgen/blob/371ee6a0b1da9f772b4a8da6879190804ab8453b/src/documentation.ts#L26)