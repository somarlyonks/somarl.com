import {useCallback, useState, createContext, useContext} from 'react'
import type {ChangeEventHandler, Dispatch, SetStateAction, PropsWithChildren} from 'react'

export interface IConfig {
    width: number
    height: number
    seconds: number
}

export function useConfig () {
    return useContext(ConfigContext)
}

const configPresets: Record<string, IConfig> = {
    desktop: {
        width: 1920,
        height: 1080,
        seconds: 4,
    },
    mobile: {
        width: 1080,
        height: 1920,
        seconds: 4,
    },
}

export const ConfigContext = createContext<{
    config: IConfig
    setConfig: Dispatch<SetStateAction<IConfig>>
}>({config: configPresets.desktop, setConfig: () => {}} as ANY)

export function ConfigProvider ({children}: PropsWithChildren) {
    const [config, setConfig] = useState<IConfig>(configPresets.desktop)

    return (
        <ConfigContext.Provider value={{config, setConfig}}>{children}</ConfigContext.Provider>
    )
}

export function ConfigField () {
    const {config, setConfig} = useConfig()
    const [preset, setPreset] = useState('desktop')

    const handleSelectPreset: ChangeEventHandler<HTMLSelectElement> = useCallback(({target}) => {
        if (configPresets[target.value]) {
            setConfig(configPresets[target.value])
            setPreset(target.value)
        }
    }, [])

    const handleChangeWidth: ChangeEventHandler<HTMLInputElement> = useCallback(({target}) => {
        if (parseInt(target.value)) setConfig(prev => ({...prev, width: +target.value | 0}))
    }, [])
    const handleChangeHeight: ChangeEventHandler<HTMLInputElement> = useCallback(({target}) => {
        if (parseInt(target.value)) setConfig(prev => ({...prev, height: +target.value | 0}))
    }, [])
    const handleChangeSeconds: ChangeEventHandler<HTMLInputElement> = useCallback(({target}) => {
        if (parseInt(target.value)) setConfig(prev => ({...prev, seconds: +target.value | 0}))
    }, [])

    return (
        <fieldset>
            <legend>Configurations</legend>
            <label>
                <span>presets</span>
                <select value={preset} onChange={handleSelectPreset}>
                    <option value="desktop">desktop</option>
                    <option value="mobile">mobile</option>
                </select>
            </label>
            <label>
                <span>width</span>
                <input type="number" step={1} min={0} value={config.width} onChange={handleChangeWidth} />
            </label>
            <label>
                <span>height</span>
                <input type="number" step={1} min={0} value={config.height} onChange={handleChangeHeight} />
            </label>
            <label>
                <span>seconds</span>
                <input type="number" step={1} min={0} value={config.seconds} onChange={handleChangeSeconds} />
            </label>

            <pre>{JSON.stringify(config, null, 2)}</pre>
        </fieldset>
    )
}
