## ClassSerializer extends AbstractSerializer

```typescript
new ClassSerializer(declaration);
```

| Parameter   | Type                  | Optional |
| ----------- | --------------------- | -------- |
| declaration | DeclarationReflection | ❌       |

## Properties

### public declaration: any

## Methods

### public parseMethod(decl): DocumentedClassMethod

| Parameter | Type                  | Optional |
| --------- | --------------------- | -------- |
| decl      | DeclarationReflection | ❌       |

### public parseParameter(decl): DocumentedParameter

| Parameter | Type                    | Optional |
| --------- | ----------------------- | -------- |
| decl      | TypeParameterReflection | ❌       |

### public parseProperties(decl): DocumentedClassProperty

| Parameter | Type                  | Optional |
| --------- | --------------------- | -------- |
| decl      | DeclarationReflection | ❌       |

### public serialize(): DocumentedClass
