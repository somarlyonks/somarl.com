import { h } from 'preact' // lgtm [js/unused-local-variable]


interface IFabricProps {
  class?: S
  children: A
}

export default function Fabric ({
  class: className = '',
  children,
}: IFabricProps) {
  return (
    <div class={`fabric-wrapper ${className}`}>
      <div class="fabric-container">
        {...children}
      </div>
    </div>
  )
}
