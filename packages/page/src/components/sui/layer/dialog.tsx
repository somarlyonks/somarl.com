import { h, Ref } from 'preact'
import { useRef } from 'preact/hooks'
import { forwardRef } from 'preact/compat'

import { Layer } from './layer'
import { Button } from '../form'
import { Cross } from 'src/components/icons'


interface IDialogLayerProps {
  visible: boolean
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
  form?: S
}


const DialogLayer = forwardRef(({
  visible,
  children,
  class: className = '',
}: IDialogLayerProps, ref: Ref<HTMLDivElement>) => {
  if (visible) return (
    <Layer type="dialog">
      <div
        ref={ref}
        class={'dialog ' + className}
        tabIndex={-1}
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
  form,
}: IDialogProps) {
  const $dialog = useRef<HTMLElement>()

  return (
    <DialogLayer
      ref={$dialog}
      visible={visible}
    >
      {
        !!title && (
          <div class="dialog__title flex">
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
          <div class="dialog__button-group flex">
            <Button form={form} type={form ? 'submit' : 'button'} label="Confirm" onClick={onConfirm} primary />
            <Button form={form} label="Cancel" onClick={onCancel} />
          </div>
        )
      }
    </DialogLayer>
  )
}
