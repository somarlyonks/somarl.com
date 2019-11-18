import { h } from 'preact' // lgtm [js/unused-local-variable]
import { storiesOf } from '@storybook/preact'

import {
  AvatarStory, DominoStory,
  HoverableStory, DialogStory,
  ButtonStory, TextFieldStory
} from './sui'


storiesOf('sui', module)
  .add('Avatar', () => <AvatarStory />)
  .add('Domino', () => <DominoStory />)
  .add('Hoverable', () => <HoverableStory />)
  .add('Dialog', () => <DialogStory />)

storiesOf('sui|form', module)
  .add('Button', () => <ButtonStory />)
  .add('TextField', () => <TextFieldStory />)
