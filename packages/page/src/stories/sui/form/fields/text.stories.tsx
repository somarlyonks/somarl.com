import { h } from 'preact' // lgtm [js/unused-local-variable]
import { TextField } from 'src/components/sui'


export const TextFieldStory = () => {
  const maxLength = 10
  const validate = async (value: S) =>
    value.length > maxLength
      ? `Limited length ${maxLength}! Currently${value.length}.`
      : ''
  return (
    <div>
      <TextField label="Standard" placeholder="placeholder" onInput={console.info} />
      <TextField label="Disabled" value="test value" disabled onInput={console.info} />
      <TextField label="Required" required onInput={console.info} />
      <TextField label="maxLength" maxLength={maxLength} placeholder="placeholder" onInput={console.info} />
      <TextField
        label="Async Validate"
        value="This is too looooooooooooooooooooog."
        required
        onInput={console.info}
        validate={validate}
      />
      <TextField
        label="With description"
        description="this is required"
        required
        onInput={console.info}
      />
      <TextField label="Password" type="password" placeholder="placeholder" onInput={console.info} />
    </div>
  )
}
