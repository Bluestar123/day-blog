## CapitalizeString
首字母大写
```ts
type a1 = CapitalizeString<'handler'>       // Handler
type a2 = CapitalizeString<'parent'>        // Parent
type a3 = CapitalizeString<233>             // 233
```

:::demo 使用模板字符串类型，`L` 表示第一个字符，`R` 表示剩下的字符串

```ts
type CapitalizeString<T> = T extends `${infer L}${infer R}` ? `${Uppercase<L>}${R}` : T
```
:::

## FirstChar
获取字符串字面量中的第一个字符
```ts
type A = FirstChar<'BFE'> // 'B'
type B = FirstChar<'dev'> // 'd'
type C = FirstChar<''> // never
```
:::demo 使用模板字符串类型，`L` 表示第一个字符，`R` 表示剩下的字符串

```ts
type FirstChar<T> = T extends `${infer L}${infer R}` ? L : never
```
:::


## LastChar
获取字符串字面量中的最后一个字符
```ts
type A = LastChar<'BFE'> // 'E'
type B = LastChar<'dev'> // 'v'
type C = LastChar<''> // never
```
:::demo 使用模板字符串类型，`L` 表示第一个字符，`R` 表示剩下的字符串，递归处理，直到 `R` 为空串或者 `T` 不满足 `${infer L}${infer R}` 为止

```ts
type LastChar<T> = T extends `${infer L}${infer R}` ? R extends '' ? L : LastChar<R> : never

type LastChar<T, S = never> = T extends `${infer L}${infer R}` ? LastChar<R, L> : S
// 注意
type a = '' extends `${infer L}${infer R}` ? 1 : 2  // 2
```
:::



## StringToTuple
字符串转换为元组类型
```ts
type A = StringToTuple<'BFE.dev'> // ['B', 'F', 'E', '.', 'd', 'e','v']
type B = StringToTuple<''> // []
```

:::demo 使用模板字符串类型，`L` 表示第一个字符，`R` 表示剩下的字符串

```ts
type StringToTuple<T, S extends any[] = []> = T extends `${infer L}${infer R}` ? StringToTuple<R, [...S, L]> : S
```
:::

## TupleToString
将字符串类型的元素转换为字符串字面量类型
```ts
type A = TupleToString<['a', 'b', 'c']> // 'abc'
type B = TupleToString<[]>              // ''
type C = TupleToString<['a']>           // 'a'
```

:::demo 使用模板字符串类型，`L` 表示元组第一个字符，`R` 表示剩下的字符串数组，类似 `...rest`

```ts
type TupleToString<T, S extends string = ''> = T extends [infer L, ...infer R] ? (
   L extends string ? TupleToString<R, `${S}${L}`> : never
) : S
```
:::


## RepeatString<T,C>
复制字符T为字符串类型，长度为C
```ts
type A = RepeatString<'a', 3> // 'aaa'
type B = RepeatString<'a', 0> // ''
```

:::demo 使用数组做判断的通常使用元组形式，用长度判断

```ts
type RepeatString<T, K, A extends any[] = [], S extends string = ''> = A['length'] extends K ? S : (
    RepeatString<T, K, [...A, 1], `${S}${T}`>
)
```
:::


## SplitString
将字符串字面量类型按照指定字符，分割为元组。无法分割则返回原字符串字面量
```ts
type A1 = SplitString<'handle-open-flag', '-'>        // ["handle", "open", "flag"]
type A2 = SplitString<'open-flag', '-'>               // ["open", "flag"]
type A3 = SplitString<'handle.open.flag', '.'>        // ["handle", "open", "flag"]
type A4 = SplitString<'open.flag', '.'>               // ["open", "flag"]
type A5 = SplitString<'open.flag', '-'>               // ["open.flag"]
```

:::demo 以 `K` 为分隔符，`L` 为前面字符，`R` 为后面字符

```ts
type SplitString<T, K, S extends any[] = []> = T extends `${infer L}${K}${infer R}` ? SplitString<R, K, [...S, L]> : [...S, T]
```
:::


## LengthOfString
计算字符串字面量类型的长度
```ts
type A = LengthOfString<'BFE.dev'> // 7
type B = LengthOfString<''> // 0
```

:::demo 以元组形式判断长度

```ts
type LengthOfString<T, S extends any[] = []> = T extends `${infer L}${infer R}` ? LengthOfString<R, [...S, L]> : S['length']
```
:::

## KebabCase
驼峰命名转横杠命名
```ts
type a1 = KebabCase<'HandleOpenFlag'>           // handle-open-flag
type a2 = KebabCase<'OpenFlag'>                 // open-flag
```

:::demo 从左到右遍历，遇到大写字母则转换为 `-` + 小写字符

```ts
type RemoveFirstChar<T> = T extends `-${infer L}` ? L : T
type KebabCase<T, S extends string = ''> = T extends `${infer L}${infer R}` (
    L extends Uppercase<L> ? KebabCase<R, `${S}-${Lowercase<L>}`> : KebabCase<R, `${S}${L}`>
) ? : RemoveFirstChar<S>
```
:::

## CamelCase
横杠命名转化为驼峰命名
```ts
type a1 = CamelCase<'handle-open-flag'>         // HandleOpenFlag
type a2 = CamelCase<'open-flag'>                // OpenFlag
```

:::demo 从左到右遍历，遇到 `-` + 小写字母则转换为大写字符

```ts
type CapitalizeString<T> = T extends `${infer L}${infer R}` ? `${Uppercase<L>}${R}` : T
type CamelCase<T, S extends string = ''> = T extends `${infer L}-${infer R}` ? CamelCase<R, `${S}${CapitalizeString<L>}`> : `${S}${CapitalizeString<T>}`
```
:::

## ObjectAccessPaths
得到对象中的值访问字符串
```ts
// 简单来说，就是根据如下对象类型：
/*
{
    home: {
        topBar: {
            title: '顶部标题',
            welcome: '欢迎登录'
        },
        bottomBar: {
            notes: 'XXX备案，归XXX所有',
        },
    },
    login: {
        username: '用户名',
        password: '密码'
    }
}
*/
// 得到联合类型：
/*
home.topBar.title | home.topBar.welcome | home.bottomBar.notes | login.username | login.password
*/

// 完成 createI18n 函数中的 ObjectAccessPaths<Schema>，限制函数i18n的参数为合法的属性访问字符串
function createI18n<Schema>(schema: Schema): ((path: ObjectAccessPaths<Schema>) => string) {return [{schema}] as any}

// i18n函数的参数类型为：home.topBar.title | home.topBar.welcome | home.bottomBar.notes | login.username | login.password
const i18n = createI18n({
    home: {
        topBar: {
            title: '顶部标题',
            welcome: '欢迎登录'
        },
        bottomBar: {
            notes: 'XXX备案，归XXX所有',
        },
    },
    login: {
        username: '用户名',
        password: '密码'
    }
})

i18n('home.topBar.title')           // correct
i18n('home.topBar.welcome')         // correct
i18n('home.bottomBar.notes')        // correct

// i18n('home.login.abc')              // error，不存在的属性
// i18n('home.topBar')                 // error，没有到最后一个属性
```

:::demo 如果是对象拼接 `K`, 判断对象 `Record<string, any>`

```ts
type RemoveFirstChar<T> = T extends `.${infer L}` ? L : T
type ObjectAccessPaths<T, S extends string = '', K extends keyof T> =
    K extends keyof T ?
        K extends string ?
            T[K] extends Record<string, any> ?
                (ObjectAccessPaths<T[K], `${S}.${K}`>) : RemoveFirstChar<`${S}.${K}`> :
            never :
        never

```
:::


## ComponentEmitsType

定义组件的监听事件类型
```ts
// 实现 ComponentEmitsType<Emits> 类型，将
/*
{
    'handle-open': (flag: boolean) => true,
    'preview-item': (data: { item: any, index: number }) => true,
    'close-item': (data: { item: any, index: number }) => true,
}
*/
// 转化为类型
/*
{
    onHandleOpen?: (flag: boolean) => void,
    onPreviewItem?: (data: { item: any, index: number }) => void,
    onCloseItem?: (data: { item: any, index: number }) => void,
}
*/


function createComponent<Emits extends Record<string, any>>(emits: Emits): ComponentEmitsType<Emits> {return [{emits}] as any}

// 最后返回的 Component变量类型为一个合法的React组件类型，并且能够通过`on事件驼峰命名`的方式，监听定义的事件，并且能够自动推导出事件的参数类型
const Component = createComponent({
    'handle-open': (flag: boolean) => true,
    'preview-item': (data: { item: any, index: number }) => true,
    'close-item': (data: { item: any, index: number }) => true,
})
console.log(
    <Component
        // onHandleOpen 的类型为 (flag: boolean) => void
        onHandleOpen={val => console.log(val.valueOf())}
        // onPreviewItem 的类型为 (data: { item: any, index: number }) => void
        onPreviewItem={val => {
            const {item, index} = val
            const a: number = item
            console.log(a, index.toFixed(2))
        }}
        // 所有的监听事件属性都是可选属性，可以不传处理函数句柄
        // onCloseItem={val => [{val}]}
    />
)

// 提示，定义组件的props类型方式为 { (props: Partial<Convert<Emits>>): any }
// 比如 Comp 可以接收属性 {name:string, age:number, flag:boolean, id?:string}，其中id为可选属性，那么可以这样写

const Comp: { (props: { name: string, age: number, flag: boolean, id?: string }): any } = Function as any

console.log(<Comp name="" age={1} flag/>)           // 正确
console.log(<Comp name="" age={1} flag id="111"/>)  // 正确
// console.log(<Comp name={1} age={1} flag/>)          // 错误，name为字符串类型
// console.log(<Comp age={1} flag/>)                   // 错误，缺少必须属性name:string
```


:::demo 如果是对象拼接 `K`, 判断对象 `Record<string, any>`

```ts
// 转为驼峰
type CamelCase<T extends string = '', S extends string = ''> = T extends `${infer L}-${infer R1}${infer R2}` ? `${
    CamelCase<R2, `${S}${L}${Uppercase<R1>}`>
  }`: Capitalize<`${S}${T}`>

type ComponentEmitsType<T> = {
    [K in keyof T as `on${K extends string ? CamelCase<K> : never}`]: T[K] extends (...args: infer P) => any ? (...args:P) => void : T[K]
}

```
:::