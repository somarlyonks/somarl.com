
import {FormEventHandler, Dispatch, SetStateAction, Context} from 'react'

export interface IFieldProps<T = HTMLInputElement> {
    name?: string
    label?: string
    value?: string
    required?: boolean
    disabled?: boolean
    onInput?: FormEventHandler<T>
}

export type IFieldValidator = F1<S, S | P<S>>

export interface IFieldState {
    value: S
    errMsg: S
}

export type IFieldContextStore = IFieldState & {
    setState: Dispatch<SetStateAction<IFieldState>>
}

export type IFieldContext = Context<IFieldContextStore>
