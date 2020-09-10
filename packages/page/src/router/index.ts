
import { h, createContext, isValidElement, cloneElement, ComponentChildren, toChildArray } from 'preact'
import { useRef, useLayoutEffect, useContext, useCallback } from 'preact/hooks'

import { useLocation as _useLocation } from './useLocation'
import { makeMatcher } from './matcher'


interface IRouterBuildOptions {
  hook?: typeof _useLocation
  base?: S
  matcher?: R<typeof makeMatcher>
}

interface INavigateOptions {
  to?: S
  href: S
  replace?: boolean
}

interface IRouteProps {
  path: S
  match?: [boolean, F0<void>]
  component?: S
  children: ComponentChildren
}

interface ILinkProps extends INavigateOptions {
  children: ComponentChildren
  onClick?: h.JSX.MouseEventHandler<Element>
}


const RouterCtx = createContext<{v?: R<typeof buildRouter>}>({})

const buildRouter = ({
  hook = _useLocation,
  base = '',
  matcher = makeMatcher(),
}: IRouterBuildOptions = {}) => ({ hook, base, matcher })

export const useRouter = () => {
  const globalRef = useContext(RouterCtx)

  // either obtain the router from the outer context (provided by the
  // `<Router /> component) or create an implicit one on demand.
  return globalRef.v || (globalRef.v = buildRouter())
}

export const useLocation = () => {
  const router = useRouter()
  return router.hook(router)
}

export const useRoute = (pattern: S) => {
  const [path] = useLocation()
  return useRouter().matcher(pattern, path)
}

const useNavigate = (options: INavigateOptions) => {
  const navRef = useRef<F0<void>>()
  const [, navigate] = useLocation()

  navRef.current = () => navigate(options.to || options.href, options)
  return navRef
}

export const Router = (props: IRouterBuildOptions & {children: ComponentChildren}) => {
  const ref = useRef()

  const value = ref.current || (ref.current = { v: buildRouter(props) })

  return h(RouterCtx.Provider, {
    value,
    children: props.children,
  } as A)
}

export const Route = ({ path, match, component, children }: IRouteProps) => {
  const useRouteMatch = useRoute(path)

  // `props.match` is present - Route is controlled by the Switch
  const [matches, params] = match || useRouteMatch

  if (!matches) return null

  // React-Router style `component` prop
  if (component) return h(component, { params })

  // support render prop or plain children
  return typeof children === 'function' ? children(params) : children
}

export const Link = (props: ILinkProps) => {
  const navRef = useNavigate(props)
  const { base } = useRouter()

  const { to, href = to, children, onClick } = props

  const handleClick = useCallback<h.JSX.MouseEventHandler<Element>>(event => {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      event.shiftKey ||
      event.button !== 0
    )
      return

    event.preventDefault()
    navRef.current()
    if (onClick) onClick.call(event.currentTarget, event)
  },
    // navRef is a ref so it never changes
    [onClick]
  )

  // wraps children in `a` if needed
  const extraProps = { href: base + href, onClick: handleClick, to: null }
  const jsx = isValidElement(children) ? children : h('a', props as A)

  return cloneElement(jsx, extraProps)
}

export const Switch = ({ children, location }: {children: ComponentChildren, location: S}) => {
  const { matcher } = useRouter()
  const [originalLocation] = useLocation()

  children = toChildArray(children)

  for (const element of children) {
    if (isValidElement(element)) {
      const match = (element.props as A).path
        ? matcher((element.props as A).path, location || originalLocation)
        : [true, {}]
      if (match[0]) return cloneElement(element, { match })
    }
  }

  return null
}

export const Redirect = (props: INavigateOptions) => {
  const navRef = useNavigate(props)
  useLayoutEffect(() => navRef.current(), [])

  return null
}
