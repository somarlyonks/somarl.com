
import { h, isValidElement, cloneElement, ComponentChildren, toChildArray, ComponentType } from 'preact'
import { useLayoutEffect, useCallback } from 'preact/hooks'

import { isFunction } from 'src/helpers'
import { useRedux } from 'src/redux'
export { useSearchParam } from './hooks'


interface INavigateOptions {
  to?: S
  href: S
  replace?: boolean
}

interface IRouteProps {
  path: S
  match?: [boolean, Record<S, S>]
  component?: ComponentType
  children?: ComponentChildren
}

interface ILinkProps extends INavigateOptions {
  children: ComponentChildren
  onClick?: h.JSX.MouseEventHandler<Element>
}

export const useRouter = () => {
  const { router } = useRedux(state => ({
    router: state.router,
  }))
  return router
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
  const [, navigate] = useLocation()

  return useCallback(() => navigate(options.to || options.href, options), [])
}

export const Route = ({ path, match, component, children }: IRouteProps) => {
  const useRouteMatch = useRoute(path)

  // `props.match` is present - Route is controlled by the Switch
  const [matches, params] = match || useRouteMatch

  if (!matches) return null

  if (component) return h(component, params)
  return isFunction(children) ? children(params) : children
}

export const Link = (props: ILinkProps) => {
  const navigate = useNavigate(props)
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
    navigate()
    if (onClick) onClick.call(event.currentTarget, event)
  },
    [onClick]
  )

  // wraps children in `a` if needed
  const extraProps = { href: base + href, onClick: handleClick, to: null }
  const jsx = isValidElement(children) ? children : h('a', props as A)

  return cloneElement(jsx, extraProps)
}

export const Switch = ({ children, location }: {children: ComponentChildren, location?: S}) => {
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
  const navigate = useNavigate(props)
  useLayoutEffect(() => navigate(), [])

  return null
}
