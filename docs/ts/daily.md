## 条件分发
- 只有针对泛型才有条件分发的概念。同时这个泛型是联合类型
```ts
type A555 <T = string|number|123> =  T extends string ? 1 : 2
type A7777 =   string|number|boolean extends string ? 1 : 2   // 2
type adfasdf = A555   1 | 2
```

## keyof

```ts
///////////////// b 是原型上的方法
type a = string | number
type b  = keyof a  // 'toString' | 'valueOf'

keyof interface 才是属性名集合
```

## namespace 和 module 的区别
<!-- 1. namespace 是全局的，会合并，同一个 namespace 下有同一个名的元素，会冲突。使用 export 转成模块则不会
2. module 不会合并 -->



## declare 声明类型
提示用的
```ts
// declare 写完后 自己可以不实现，别的地方实现。
// 不加declare 的话，表示只声明了，没有实现，使用会报错  无法 $. 调用
declare namespace $ {
  function ajax(url: string, settings: any): void
  let name: string
  namespace fn {
    function extend(): void
  }
}
```

## 查找声明文件配置
```json
"baseUrl": "./", // 使用 paths 必须配置
"paths": {
  "*": [
    "types/*"
  ]
}
```

## 模块内声明全局类型
```ts
/**
 *ts 文件声明 模块 export {}， 局部变量无法拓展属性
 模块内声明全局属性
 */
declare global {
  interface String {

  }
  interface String {
    double(): string
  }
}
```

## 既能当类型，又能当属性

| 关键字           | 类型          | 值  |
| :-------------   |:-------------:| :-----:|
| class           | yes     | yes |
| enum            | yes     | yes |
| interface       | yes     | no  |
| type            | yes     | no  |
| function        | no      | yes |
| var, let, const | no      | yes |


## any extends 判断时
转为数组
```ts
type a = any extends number ? 1 : 2  // 1 | 2
type aa = [any] extends [number] ? 1 : 2  // 1
```

## Equal 判断两个元素是否一样
```ts
// 判断两个元素是否一样
type Equal<T, K> = [T] extends [K] ? [K] extends [T] ? (
  keyof T extends keyof K ? (
    keyof K extends keyof T ? true : false
  ) : false
) : false : false
```


## 元组直接使用 number 获取内容
```ts
type aa = ['33', 'dd', 'sadf']
/**
 * 对于元组可以直接使用 number 获取每项内容
 * type a = {
    33: "33";
    dd: "dd";
    sadf: "sadf";
}
 */
type a = {
  [k in aa[number]]: k
}
```

## any 会触发分发
```ts
any  = string| boolean| number| symbol | null | undefined | 元组 | object
any extends never = true | false  => boolean
any extends never ? 1 | 2 => 1 | 2



type isTrue<T> = T extends true ? 1 : 2
isTrue<Boolean> 会分发
```