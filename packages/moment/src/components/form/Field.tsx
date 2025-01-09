import {useState, useEffect, forwardRef, createContext, ForwardRefExoticComponent} from 'react'
import {useBem} from '../../libs/useBem'
import {isPromise} from '../../libs/is'
import {IFieldProps, IFieldValidator, IFieldState, IFieldContextStore, IFieldContext} from './shared'

export interface IProps extends IFieldProps {
    forwardedRef: ANY
    validate?: IFieldValidator
    description?: string
    className?: string
}

export default function field<TFieldProps> (
    type: string,
    ComponentFactory: (context: IFieldContext) => ForwardRefExoticComponent<TFieldProps>,
) {
    const FieldContext = createContext<IFieldContextStore>({
        value: '',
        errMsg: '',
        setState () {},
    })

    const Component = ComponentFactory(FieldContext)

    function Field ({
        forwardedRef,
        label,
        value: propValue = '',
        validate: propValidate,
        description,
        className = '',
        ...props
    }: PropsWithoutRef<TFieldProps & Omit<IProps, 'forwardedRef'>> & Pick<IProps, 'forwardedRef'>) {
        const {
            name,
            required = false,
            disabled = false,
        } = props
        const [{value, errMsg}, setState] = useState<IFieldState>({
            value: propValue,
            errMsg: '',
        })

        const validateValue = (newValue: S) => {
            const defaultValidator: IFieldValidator = (newValue: S) => {
                if (required && newValue === '') return 'Required!'
                return ''
            }
            const validatedMsg = (propValidate! || defaultValidator)(newValue)

            const validate = (msg: S) => setState((prev) => {
                const isResolvingStale = prev.value !== newValue
                if (isResolvingStale) return prev
                if (forwardedRef && forwardedRef.validity.valid && msg) {
                    forwardedRef.setCustomValidity(msg)
                }
                return {...prev, errMsg: msg}
            })

            if (isPromise(validatedMsg)) validatedMsg.then(validate)
            else validate(validatedMsg)
        }

        useEffect(() => {
            validateValue(value)
        }, [value])

        return (
            <FieldContext.Provider value={{value, errMsg, setState}}>
                <div className={`${className} field-${type} ` + useBem('field', '', {disabled, invalid: !!errMsg})}>
                    {!!label && <label htmlFor={`field-${name}`}>{label}</label>}
                    <div className="field__container">
                        <Component {...props as TFieldProps} ref={forwardedRef} />
                    </div>
                    {!!description && <div className="field__description" role="alert">{description}</div>}
                    {!!errMsg && <div className="field__error-message" role="alert">{errMsg}</div>}
                </div>
            </FieldContext.Provider>
        )
    }

    return forwardRef<unknown, TFieldProps & Omit<IProps, 'forwardedRef'>>((props, ref) => <Field {...props} forwardedRef={ref} />)
}

type PropsWithoutRef<P> = P extends ANY ? ('ref' extends keyof P ? Omit<P, 'ref'> : P) : P
