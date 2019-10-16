import { h } from 'preact' // lgtm [js/unused-local-variable]


interface IFabricProps {
  class?: S
  children: A
}

export default function Fabric (props: IFabricProps) {
  return (
    <div class={`fabric-wrapper absolute--full ${props.class}`}>
      <div class="fabric-container">
        {...props.children}
      </div>
    </div>
  )
}
