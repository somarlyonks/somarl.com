import {useContext, FormEventHandler, forwardRef} from 'react'

import {IFieldProps} from './shared'
import field from './Field'


interface IProps extends IFieldProps {
    type?: 'text' | 'password'
    placeholder?: S
    maxLength?: N
}

export default field('text', context => forwardRef<HTMLInputElement, IProps>(({
    type = 'text',
    name,
    placeholder,
    onChange,
    required = false,
    disabled = false,
    maxLength,
}, $input) => {
    const {value, errMsg, setState} = useContext(context)

    const handleInput: FormEventHandler<HTMLInputElement> = event => {
        const target = event.currentTarget
        const newValue = target.value
        setState(prev => ({...prev, value: newValue}))

        target.setCustomValidity('')
        if (onChange) onChange.call(target, event)
    }

    return (
        <input
            id={`field-${name}`}
            ref={$input}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onInput={handleInput}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            aria-invalid={!!errMsg || (required && !value)}
        />
    )
}))
