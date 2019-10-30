import { h } from 'preact' // lgtm [js/unused-local-variable]
import { Button } from 'src/components/sui'
import { Suite } from '../../helpers'


export const ButtonStory = () => {
  return (
    <div>
      <Suite caption="common">
        <Button label="Standard" onClick={console.info} />
        <Button label="Primary" classNames={['primary']} />
        <Button label="Borderless" classNames={['borderless']} />
      </Suite>

      <Suite caption="disabled">
        <Button label="Disabled" disabled />
      </Suite>

      <Suite caption="loading">
        <Button label="Loading" loading />
      </Suite>
    </div>
  )
}
