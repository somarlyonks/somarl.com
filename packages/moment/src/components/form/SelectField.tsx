import {useContext, FormEventHandler, forwardRef} from 'react'

import {IFieldProps} from './shared'
import field from './Field'

interface IProps extends IFieldProps<HTMLSelectElement> {
    placeholder?: S
    options: Array<{
        key: string
        name: string
    }>
}

export default field('select', context => forwardRef<HTMLSelectElement, IProps>(({
    name,
    placeholder,
    onChange,
    required = false,
    disabled = false,
    options,
}, $input) => {
    const {value, errMsg, setState} = useContext(context)

    const handleInput: FormEventHandler<HTMLSelectElement> = (event) => {
        const target = event.currentTarget
        const newValue = target.value
        setState(prev => ({...prev, value: newValue}))

        target.setCustomValidity('')
        if (onChange) onChange.call(target, event)
    }

    return (
        <select
            id={`field-${name}`}
            ref={$input}
            name={name}
            value={value}
            placeholder={placeholder}
            onInput={handleInput}
            disabled={disabled}
            required={required}
            aria-invalid={!!errMsg || (required && !value)}
        >
            {options.map(({key, name}) => <option key={key} value={key}>{name}</option>)}
        </select>
    )
},
))
