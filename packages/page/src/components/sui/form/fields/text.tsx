import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useState, useEffect, useRef } from 'preact/hooks'

import { randomString, isPromise, bem, isValidEmail } from 'src/helpers'


type ITextFieldValidator = F1<S, S | P<S>>
interface IProps {
  type?: 'text' | 'password' | 'email'
  name?: S
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
  type = 'text',
  name,
  label,
  placeholder,
  value: propValue = '',
  onInput: propOnInput,
  validate: propValidate,
  required = false,
  disabled = false,
  description,
  maxLength,
}: IProps) {
  const id = randomString()
  const inputId = `text-field-input-${id}`
  const lableId = `text-field-label-${id}`
  const listId = `text-field-list-${id}`

  const $input = useRef<HTMLInputElement>()
  const [{value, errMsg}, setState] = useState<ITextFieldState>({
    value: propValue,
    errMsg: '',
  })

  const validateValue = (newValue: S) => {
    const defaultValidator: ITextFieldValidator = msg => {
      if (required && newValue === '') return 'Required!'
      if (type === 'email') return isValidEmail(newValue) ? '' : 'Supposed to be a valid email address.'
      return ''
    }
    const validatedMsg = (propValidate || defaultValidator)(newValue)

    const validate = (msg: S) => setState(prev => {
      const isResolvingStale = prev.value !== newValue
      if (isResolvingStale) return prev
      if ($input.current && $input.current.validity.valid && msg) $input.current.setCustomValidity(msg)
      return { ...prev, errMsg: msg }
    })

    if (isPromise(validatedMsg)) validatedMsg.then(validate)
    else validate(validatedMsg)
  }

  const onInput: h.JSX.GenericEventHandler<HTMLInputElement> = event => {
    const target = event.currentTarget
    const newValue = target.value
    setState(prev => ({...prev, value: newValue}))

    target.setCustomValidity('')
    if (propOnInput) propOnInput.bind(event.currentTarget)(event)
  }

  useEffect(() => {
    validateValue(value)
  }, [value])

  const emailOptionalDomains = [
    'live.com', 'outlook.com', 'gmail.com', 'qq.com', 'apple.com', 'somarl.com',
  ]

  return (
    <div class={bem('text-field', [{ disabled, invalid: !!errMsg }])}>
      {!!label && <label id={lableId} for={inputId}>{label}</label>}
      <div class="text-field__input-container">
        <input
          ref={$input}
          type={type}
          name={name}
          id={inputId}
          value={value}
          placeholder={placeholder}
          onInput={onInput}
          disabled={disabled}
          required={required}
          aria-labelledby={lableId}
          maxLength={maxLength}
          aria-invalid={!!errMsg || (required && !value)}
          list={listId}
        />
      </div>
      {(type === 'email' && !!value && !value.includes('@')) && (
        <datalist id={listId}>
          {emailOptionalDomains.map(d => (
            <option value={value + '@' + d} key={d} />
          ))}
        </datalist>
      )}
      {!!description && <div class="text-field__description" role="alert">{description}</div>}
      {!!errMsg && <div class="text-field__error-message" role="alert">{errMsg}</div>}
    </div>
  )
}
