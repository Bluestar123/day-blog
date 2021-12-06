## CapitalizeString
首字母大写
```ts
type a1 = CapitalizeString<'handler'>       // Handler
type a2 = CapitalizeString<'parent'>        // Parent
type a3 = CapitalizeString<233>             // 233
```

## FirstChar
获取字符串字面量中的第一个字符
```ts
type A = FirstChar<'BFE'> // 'B'
type B = FirstChar<'dev'> // 'd'
type C = FirstChar<''> // never
```

## LastChar
获取字符串字面量中的最后一个字符
```ts
type A = LastChar<'BFE'> // 'E'
type B = LastChar<'dev'> // 'v'
type C = LastChar<''> // never
```

## StringToTuple
字符串转换为元组类型
```ts
type A = StringToTuple<'BFE.dev'> // ['B', 'F', 'E', '.', 'd', 'e','v']
type B = StringToTuple<''> // []
```

## TupleToString
将字符串类型的元素转换为字符串字面量类型
```ts
type A = TupleToString<['a', 'b', 'c']> // 'abc'
type B = TupleToString<[]>              // ''
type C = TupleToString<['a']>           // 'a'
```

## RepeatString<T,C>
复制字符T为字符串类型，长度为C
```ts
type A = RepeatString<'a', 3> // 'aaa'
type B = RepeatString<'a', 0> // ''
```

## SplitString
将字符串字面量类型按照指定字符，分割为元组。无法分割则返回原字符串字面量
```ts
type A1 = SplitString<'handle-open-flag', '-'>        // ["handle", "open", "flag"]
type A2 = SplitString<'open-flag', '-'>               // ["open", "flag"]
type A3 = SplitString<'handle.open.flag', '.'>        // ["handle", "open", "flag"]
type A4 = SplitString<'open.flag', '.'>               // ["open", "flag"]
type A5 = SplitString<'open.flag', '-'>               // ["open.flag"]
```

## LengthOfString
计算字符串字面量类型的长度
```ts
type A = LengthOfString<'BFE.dev'> // 7
type B = LengthOfString<''> // 0
```

## KebabCase
驼峰命名转横杠命名
```ts
type a1 = KebabCase<'HandleOpenFlag'>           // handle-open-flag
type a2 = KebabCase<'OpenFlag'>                 // open-flag
```

## CamelCase
横杠命名转化为驼峰命名
```ts
type a1 = CamelCase<'handle-open-flag'>         // HandleOpenFlag
type a2 = CamelCase<'open-flag'>                // OpenFlag
```

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



## LengthOfTuple
计算元组类型的长度
```ts
type A = LengthOfTuple<['B', 'F', 'E']> // 3
type B = LengthOfTuple<[]> // 0
```

## FirstItem
得到元组类型中的第一个元素
```ts
type A = FirstItem<[string, number, boolean]> // string
type B = FirstItem<['B', 'F', 'E']> // 'B'
```


## LastItem
得到元组类型中的最后一个元素
```ts
type A = LastItem<[string, number, boolean]> // boolean
type B = LastItem<['B', 'F', 'E']> // 'E'
type C = LastItem<[]> // never
```


## Shift
移除元组类型中的第一个类型
```ts
type A = Shift<[1, 2, 3]> // [2,3]
type B = Shift<[1]> // []
type C = Shift<[]> // []
```

## Push
在元组类型T中添加新的类型I
```ts
type A = Push<[1,2,3], 4> // [1,2,3,4]
type B = Push<[1], 2> // [1, 2]
```

## ReverseTuple
反转元组
```ts
type A = ReverseTuple<[string, number, boolean]> // [boolean, number, string]
type B = ReverseTuple<[1, 2, 3]> // [3,2,1]
type C = ReverseTuple<[]> // []
```

## Flat
拍平元组
```ts
type A = Flat<[1, 2, 3]> // [1,2,3]
type B = Flat<[1, [2, 3], [4, [5, [6]]]]> // [1,2,3,4,5,6]
type C = Flat<[]> // []
type D = Flat<[1]> // [1]
```

## Repeat<T,C>
复制类型T为C个元素的元组类型
```ts
type A = Repeat<number, 3> // [number, number, number]
type B = Repeat<string, 2> // [string, string]
type C = Repeat<1, 1> // [1]
type D = Repeat<0, 0> // []
```

## Filter<T,A>
保留元组类型T中的A类型
```ts
type A = Filter<[1,'BFE', 2, true, 'dev'], number> // [1, 2]
type B = Filter<[1,'BFE', 2, true, 'dev'], string> // ['BFE', 'dev']
type C = Filter<[1,'BFE', 2, any, 'dev'], string> // ['BFE', any, 'dev']
```

## FindIndex<T,E>
找出E类型在元组类型T中的下标
```ts
type A = [any, never, 1, '2', true]
type B = FindIndex<A, 1> // 2
type C = FindIndex<A, 3> // never
```

## TupleToEnum
元组类型转换为枚举类型
```ts
// 默认情况下，枚举对象中的值就是元素中某个类型的字面量类型
type a1 = TupleToEnum<["MacOS", "Windows", "Linux"]>
// -> { readonly MacOS: "MacOS", readonly Windows: "Windows", readonly Linux: "Linux" }

// 如果传递了第二个参数为true，则枚举对象中值的类型就是元素类型中某个元素在元组中的index索引，也就是数字字面量类型
type a2 = TupleToEnum<["MacOS", "Windows", "Linux"], true>
// -> { readonly MacOS: 0, readonly Windows: 1, readonly Linux: 2 }
```

## Slice
截取元组中的部分元素
```ts
type A1 = Slice<[any, never, 1, '2', true, boolean], 0, 2>          // [any,never,1]                    从第0个位置开始，保留到第2个位置的元素类型
type A2 = Slice<[any, never, 1, '2', true, boolean], 1, 3>          // [never,1,'2']                    从第1个位置开始，保留到第3个位置的元素类型
type A3 = Slice<[any, never, 1, '2', true, boolean], 1, 2>          // [never,1]                        从第1个位置开始，保留到第2个位置的元素类型
type A4 = Slice<[any, never, 1, '2', true, boolean], 2>             // [1,'2',true,boolean]             从第2个位置开始，保留后面所有元素类型
type A5 = Slice<[any], 2>                                           // []                               从第2个位置开始，保留后面所有元素类型
type A6 = Slice<[], 0>                                              // []
```

## Splice
删除并且替换部分元素
```ts
type A1 = Splice<[string, number, boolean, null, undefined, never], 0, 2>                   // [boolean,null,undefined,never]               从第0开始删除，删除2个元素
type A2 = Splice<[string, number, boolean, null, undefined, never], 1, 3>                   // [string,undefined,never]                     从第1开始删除，删除3个元素
type A3 = Splice<[string, number, boolean, null, undefined, never], 1, 2, [1, 2, 3]>        // [string,1,2,3,null,undefined,never]          从第1开始删除，删除2个元素，替换为另外三个元素1,2,3

```