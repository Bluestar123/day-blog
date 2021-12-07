## 函数组件
```tsx
const TodoItem: React.FC<Props> = (props: Props) => (
  <li style={todoItemStyle}>{props.todo.text}</li>
)
```

## css 类型声明
```tsx
const todoItemStyle: React.CSSProperties = {
  color: 'red',
  backgroundColor: 'green'
}
```

## 鼠标悬停查看类型
![图片](/react/get-type.jpg)