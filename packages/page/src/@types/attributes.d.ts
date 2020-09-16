import preact from 'preact'
import { JSXInternal } from 'preact/src/jsx'


declare module 'preact/src/jsx' {

  namespace JSXInternal {
    interface IntrinsicElements {
      animateTransform: A
    }
    interface HTMLAttributes {
      cite?: S
    }
  }

}
