
import { h } from 'preact' // lgtm [js/unused-local-variable]

import { Fabric, Button, Quote } from 'src/components/sui'
import { Link } from 'src/router'


export default function F0F () {
  const goBack = () => history.back()

  return (
    <Fabric class="absolute--full f0f-container">
      <div class="relative"><hgroup data-word="404">404<div class="noise" /></hgroup></div>
      <Fabric><Quote inline quote="远方除了遥远一无所有" author="海子" work="远方" /></Fabric>
      <Fabric clearfix>
        <Button borderless label="Back" onClick={goBack} />
        <span>/</span>
        <Link href="/"><Button borderless label="Home" /></Link>
      </Fabric>
    </Fabric>
  )
}
