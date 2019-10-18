import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useState } from 'preact/hooks'

import { randomString } from 'src/helpers/Adapter'
import { bem } from 'src/helpers'


interface ITextFieldProps {
  label?: S
  value?: S
  placeholder?: S
  onInput?: h.JSX.GenericEventHandler
  required?: boolean
  disabled?: boolean
}

interface ITextFieldState {
  value: S
  errMsg: S
}


export default function TextField ({
  label,
  placeholder = '',
  value: propValue = '',
  onInput: propInput,
  required = false,
  disabled = false,
}: ITextFieldProps) {
  const id = randomString()
  const inputId = `text-field-input-${id}`
  const lableId = `text-field-label-${id}`
  const [{value, errMsg}, setState] = useState<ITextFieldState>({
    value: propValue,
    errMsg: 'Error message!',
  })
  const onInput: h.JSX.GenericEventHandler = event => {
    const target = event.target as HTMLInputElement
    const newState: ITextFieldState = {
      value: target.value,
      errMsg: '',
    }
    setState(newState)
    if (propInput) propInput(event)
  }

  return (
    <div class={bem('text-field', '', [{ disabled }])}>
      {!!label && <label id={lableId} for={inputId}>{label}</label>}
      <div class="text-field__input-container">
        <input
          type="text"
          id={inputId}
          value={value}
          placeholder={placeholder}
          onInput={onInput}
          disabled={disabled}
          aria-labelledby={lableId}
          aria-invalid={required && !value}
        />
      </div>
      {!!errMsg && <div class="text-field__error-message" role="alert">{errMsg}</div>}
    </div>
  )
}
