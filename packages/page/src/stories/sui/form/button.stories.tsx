import { h } from 'preact' // lgtm [js/unused-local-variable]
import { Button } from 'src/components/sui'
import { Cross } from 'src/components/icons'
import { Suite } from '../../helpers'


export const ButtonStory = () => {
  return (
    <div>
      <Suite caption="common">
        <Button label="Standard" onClick={console.info} />
        <Button label="Primary" primary />
        <Button label="Borderless" borderless />
      </Suite>

      <Suite caption="disabled">
        <Button label="Disabled" disabled />
      </Suite>

      <Suite caption="loading">
        <Button label="Loading" loading />
      </Suite>

      <Suite caption="with icon">
        <Button icon={<Cross />} borderless />
      </Suite>
    </div>
  )
}
