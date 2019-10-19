import { h } from 'preact' // lgtm [js/unused-local-variable]
import { TextField, Button } from 'src/components/sui'


export default {
  title: 'sui',
}

export const textField = () => {
  const maxLength = 10
  const validate = async (value: S) =>
    value.length > maxLength
      ? `Limited length ${maxLength}! Currently${value.length}.`
      : ''
  return (
    <div>
      <TextField label="Standard" placeholder="placeholder" onInput={console.info} />
      <TextField label="Disabled" value="test value" disabled={true} onInput={console.info} />
      <TextField label="Required" required={true} onInput={console.info} />
      <TextField label="maxLength" maxLength={maxLength} placeholder="placeholder" onInput={console.info} />
      <TextField
        label="PromiseValidate"
        value="This is too looooooooooooooooooooog."
        required={true}
        onInput={console.info}
        validate={validate}
      />
      <TextField label="With description" description="this is required" required={true} onInput={console.info} />
    </div>
  )
}

export const button = () => {
  return (
    <Button label="Standard" />
  )
}
