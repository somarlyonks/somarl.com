import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { createPortal } from 'preact/compat'

import { useBem } from 'src/helpers'


interface ILayerProps {
  children: h.JSX.Element | L<h.JSX.Element>
  type: 'callout' | 'dialog'
}

interface ILayerState {
  $el?: HTMLDivElement
}


/** @todo @sy events */
export function Layer ({
  children,
  type,
}: ILayerProps) {
  const [{ $el }, setState] = useState<ILayerState>({
  })
  const className = useBem('layer', '', [type])
  useEffect(() => {
    const layerHost = document.createElement('div')
    layerHost.className = className
    document.body.appendChild(layerHost)
    setState({
      $el: layerHost,
    })
    return () => document.body.removeChild(layerHost)
  }, [])

  return (
    <div class={className}>
      { $el &&
        createPortal(
          (
            <div class="layer__content">
              {children}
            </div>
          ),
          $el as Element
        )
      }
    </div>
  )
}
