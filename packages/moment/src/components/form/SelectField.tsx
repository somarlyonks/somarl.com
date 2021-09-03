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
    onInput: propOnInput,
    required = false,
    disabled = false,
    options,
}: IProps, $input) => {
    const {value, errMsg, setState} = useContext(context)

    const onInput: FormEventHandler<HTMLSelectElement> = event => {
        const target = event.currentTarget
        const newValue = target.value
        setState(prev => ({...prev, value: newValue}))

        target.setCustomValidity('')
        if (propOnInput) propOnInput.call(target, event)
    }

    return (
        <select
            id={`field-${name}`}
            ref={$input}
            name={name}
            value={value}
            placeholder={placeholder}
            onInput={onInput}
            disabled={disabled}
            required={required}
            aria-invalid={!!errMsg || (required && !value)}
        >
            {/* tslint:disable-next-line: no-shadowed-variable */}
            {options.map(({key, name}) => <option key={key} value={key}>{name}</option>)}
        </select>
    )
}
))
