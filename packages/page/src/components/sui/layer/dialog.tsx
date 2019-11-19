import { h } from 'preact'
import { forwardRef, Ref, useRef, useState, useEffect } from 'preact/compat'

import { Layer } from './layer'
import { Button } from '../form'
import { Cross } from 'src/components/icons'


interface IDialogLayerProps {
  visible: boolean
  top: N
  left: N
  children: A
  class?: S
}


interface IDialogProps {
  children: h.JSX.Element | L<h.JSX.Element>
  visible: boolean
  class?: S
  onConfirm?: F0<void>
  onCancel?: F0<void>
  showButtons?: boolean
  title?: S
}


interface IDialogState {
  x: N
  y: N
}


const DialogLayer = forwardRef(({
  visible,
  children,
  left,
  top,
  class: className = '',
}: IDialogLayerProps, ref: Ref<HTMLDivElement>) => {
  if (visible) return (
    <Layer type="dialog">
      <div
        ref={ref}
        class={'dialog ' + className}
        tabIndex={-1}
        style={{ top, left }}
      >
        {children}
      </div>
    </Layer>
  )

  return (<div ref={ref} class="dialog__scarecrow">{children}</div>)
})


export function Dialog ({
  children,
  class: className = '',
  visible,
  onCancel = () => {},
  onConfirm = () => {},
  showButtons = true,
  title = '',
}: IDialogProps) {
  const $dialog = useRef<HTMLElement>()
  const [{ x, y }, setState] = useState<IDialogState>({
    x: 0,
    y: 0,
  })
  const getPosition = ($el: HTMLElement) => {
    const dialogBox = $el.getBoundingClientRect()
    return {
      x: (window.innerWidth - dialogBox.width) / 2,
      y: (window.innerHeight - dialogBox.height) * 2 / 5,
    }
  }

  useEffect(() => {
    if (!$dialog.current) return
    setState(getPosition($dialog.current))
  }, [visible])

  return (
    <DialogLayer
      ref={$dialog}
      left={x}
      top={y}
      visible={visible}
    >
      {
        !!title && (
          <div
            class="dialog__title flex"
            style="justify-content: space-between; align-items: center;"
          >
            <h1>{title}</h1>
            <Button
              icon={<Cross />}
              onClick={onCancel}
              borderless
            />
          </div>
        )
      }
      <div class={'dialog__content ' + className}>
        {children}
      </div>
      {
        showButtons && (
          <div
            class="dialog__button-group flex"
            style="justify-content: flex-end;"
          >
            <Button label="Confirm" onClick={onConfirm} primary />
            <Button label="Cancel" onClick={onCancel} />
          </div>
        )
      }
    </DialogLayer>
  )
}
