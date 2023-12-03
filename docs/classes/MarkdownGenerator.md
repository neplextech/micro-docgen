## MarkdownGenerator

```typescript
new MarkdownGenerator(options);
```

| Parameter | Type                              | Optional |
| --------- | --------------------------------- | -------- |
| options   | MarkdownGeneratorMdBuilderOptions | ❌       |

## Properties

### public linker: any

### public options: any

## Methods

### public getClassHeading(c): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

| Parameter | Type            | Optional |
| --------- | --------------- | -------- |
| c         | DocumentedClass | ❌       |

### public getCtor(c): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

| Parameter | Type                       | Optional |
| --------- | -------------------------- | -------- |
| c         | DocumentedClassConstructor | ❌       |

### public getFunctions(m): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

| Parameter | Type                  | Optional |
| --------- | --------------------- | -------- |
| m         | DocumentedClassMethod | ❌       |

### public getMarkdown(c): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

| Parameter | Type            | Optional |
| --------- | --------------- | -------- |
| c         | DocumentedClass | ❌       |

### public getMethods(methods): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

| Parameter | Type                                                                                                                    | Optional |
| --------- | ----------------------------------------------------------------------------------------------------------------------- | -------- |
| methods   | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedClassMethod> | ❌       |

### public getProperties(properties): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

| Parameter  | Type                                                                                                                      | Optional |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- | -------- |
| properties | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedClassProperty> | ❌       |

### public getTypeMarkdown(t): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

| Parameter | Type            | Optional |
| --------- | --------------- | -------- |
| t         | DocumentedTypes | ❌       |

### public transformClass(classes): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<MarkdownGeneratorMarkdownBuild>

| Parameter | Type                                                                                                              | Optional |
| --------- | ----------------------------------------------------------------------------------------------------------------- | -------- |
| classes   | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedClass> | ❌       |

### public transformFunctions(types): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<MarkdownGeneratorMarkdownBuild>

| Parameter | Type                                                                                                                    | Optional |
| --------- | ----------------------------------------------------------------------------------------------------------------------- | -------- |
| types     | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedClassMethod> | ❌       |

### public transformTypes(types): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<MarkdownGeneratorMarkdownBuild>

| Parameter | Type                                                                                                              | Optional |
| --------- | ----------------------------------------------------------------------------------------------------------------- | -------- |
| types     | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<DocumentedTypes> | ❌       |
