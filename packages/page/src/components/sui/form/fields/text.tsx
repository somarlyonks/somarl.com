import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useState, useEffect } from 'preact/hooks'

import { randomString, isPromise } from 'src/helpers/Adapter'
import { bem } from 'src/helpers'


type ITextFieldValidator = F1<S, S | P<S>>
interface ITextFieldProps {
  label?: S
  value?: S
  placeholder?: S
  onInput?: h.JSX.GenericEventHandler<HTMLInputElement>
  required?: boolean
  disabled?: boolean
  validate?: ITextFieldValidator
  description?: S
  maxLength?: N
}

interface ITextFieldState {
  value: S
  errMsg: S
}


export default function TextField ({
  label,
  placeholder,
  value: propValue = '',
  onInput: propOnInput,
  validate: propValidate,
  required = false,
  disabled = false,
  description,
  maxLength,
}: ITextFieldProps) {
  const id = randomString()
  const inputId = `text-field-input-${id}`
  const lableId = `text-field-label-${id}`
  const [{value, errMsg}, setState] = useState<ITextFieldState>({
    value: propValue,
    errMsg: '',
  })

  const validateValue = (newValue: S) => {
    const defaultValidator: ITextFieldValidator = msg => required && newValue === '' ? 'Required!' : ''
    propValidate = propValidate || defaultValidator
    const validatedMsg = propValidate(newValue)
    const validate = (msg: S) => setState(prev => ({ ...prev, errMsg: msg }))
    if (isPromise(validatedMsg)) validatedMsg.then(validate)
    else validate(validatedMsg)
  }

  const onInput: h.JSX.GenericEventHandler<HTMLInputElement> = event => {
    const target = event.target as HTMLInputElement
    const newValue = target.value
    const newState: ITextFieldState = {
      value: newValue,
      errMsg: '',
    }
    setState(newState)

    if (propOnInput) propOnInput(event)
  }

  useEffect(() => {
    validateValue(value)
  }, [value])

  return (
    <div class={bem('text-field', '', [{ disabled, invalid: !!errMsg }])}>
      {!!label && <label id={lableId} for={inputId}>{label}</label>}
      <div class="text-field__input-container">
        <input
          type="text"
          id={inputId}
          value={value}
          placeholder={placeholder}
          onInput={onInput}
          disabled={disabled}
          required={required}
          aria-labelledby={lableId}
          maxLength={maxLength}
          aria-invalid={!!errMsg || (required && !value)}
        />
      </div>
      {!!description && <div className="text-field__description" role="alert">{description}</div>}
      {!!errMsg && <div class="text-field__error-message" role="alert">{errMsg}</div>}
    </div>
  )
}
