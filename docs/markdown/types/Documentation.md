---
title: Documentation
description: Interface for the generated documentation.
---

## Documentation

Interface for the generated documentation.

| Property | Type | Value |
| ----------- | ----------- | ----------- |
| custom | Record\<string, Array\<MicroDocgenCustomFile & \{   content: string }>> | N/A |
| metadata | DocumentationMetadata | N/A |
| modules | Record\<string, \{   classes: Array\<\{   data: DocumentedClass,   markdown: Array\<MarkdownGeneratorMarkdownBuild> }>,   enum: Array\<\{   data: DocumentedTypes,   markdown: Array\<MarkdownGeneratorMarkdownBuild> }>,   functions: Array\<\{   data: DocumentedClassMethod,   markdown: Array\<MarkdownGeneratorMarkdownBuild> }>,   name: string,   types: Array\<\{   data: DocumentedTypes,   markdown: Array\<MarkdownGeneratorMarkdownBuild> }>,   variables: Array\<\{   data: DocumentedTypes,   markdown: Array\<MarkdownGeneratorMarkdownBuild> }> }> | N/A |


- [Source](https://github.com/neplextech/micro-docgen/blob/0a3a2574da6de7199a2316a00abcd9d9f17c69a7/src/documentation.ts#L69)