import { configure } from '@storybook/preact'
import '../src/story-css/index.css'

configure(require.context('../src', true, /\.stories\.tsx$/), module)
