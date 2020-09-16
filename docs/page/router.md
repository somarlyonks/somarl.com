
# Router

The router is fully adapted with hooks api. It creates router context in redux store and use local state to track changes of path or search parameters with corresponding hooks.

## components

### Route

Route accepts pattern with dynamic segments.

```tsx
<Route path="/user/:name">
  {({name}) => <Avatar name={name} />}
</Router>
<Route path="/user/:name" component={Avatar} />
```

### Switch

Match paths like switch pattern which only renders the first matching route.

```tsx
<Switch>
  <Route path="/">Hola!</Route>
  <Route path="/about">I'm page.</Route>
  <Route path="/:missing*">404</Route>
</Switch>
```

### Link

Performs a navigation when clicked.

```tsx
<Link href="/">Home</Link>
<Link href="/"><a class="link">Home</a></Link>
```

### Redirect

Swiftly redirect.

```tsx
<Redirect to="/" replace>
```

### ~~Router~~

There is no need to use this, except that you would like to use sub routers, which is deprecated.

## hooks

### useLocation

```tsx
const Example = () => {
  const [path, navigate] = useLocation()

  return (
    <Button onClick={() => navigate('/')}>Current: {path}</Button>
  )
}
```

### useSearchParam

```tsx
const Example = () => {
  const shCommand = useSearchParam('sh')

  return (
    <span>{shCommand}</span>
  )
}
```

### useRoute

```tsx
const Example = () => {
  const [match, {name}] = useRoute('/user/:name')

  return (
    <Transition in={match}>I'm {name}.</Transition>
  )
}
```

### ~~useRouter~~

Deprecated as `Router`.
