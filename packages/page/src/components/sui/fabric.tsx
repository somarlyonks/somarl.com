import { h } from 'preact' // lgtm [js/unused-local-variable]


interface IFabricProps {
  class?: S
  children: A
  clearfix?: boolean
}

export default function Fabric ({
  class: className = '',
  children,
  clearfix = false,
}: IFabricProps) {
  if (clearfix) return (
    <div class={`fabric-wrapper ${className}`}>
      {...children}
    </div>
  )

  return (
    <div class={`fabric-wrapper ${className}`}>
      <div class="fabric-container">
        {...children}
      </div>
    </div>
  )
}
