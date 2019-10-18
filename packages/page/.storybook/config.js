import { configure } from '@storybook/preact';
import '../src/css/index.css'

configure(require.context('../src', true, /\.stories\.tsx$/), module);
