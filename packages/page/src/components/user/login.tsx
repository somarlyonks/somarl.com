
import { h, Fragment } from 'preact' // lgtm [js/unused-local-variable]
import { useState } from 'preact/hooks'

import { Avatar, Dialog, LoginForm, useSlide } from 'src/components/sui'

import { useRedux, actors, actor } from 'src/redux'
import { Api, CONSTS } from 'src/helpers'


interface IFormData {
  email: S
  password: S
}


export default function Login () {
  const { user, loginVisible } = useRedux(state => ({
    user: state.user.user,
    loginVisible: state.user.loginVisible,
  }))

  const [loginStep, setLoginStep] = useState('Login')
  const [info, setInfo] = useState('')
  const [formData, setFormData] = useState<IFormData>({email: '', password: ''})
  const [Slide, slideProps, slideGo] = useSlide()

  const showLogin = () => {
    actors.user.SHOWLOGIN(undefined)
  }

  const hideLogin = () => actor({ type: actor.types.user.HIDELOGIN, payload: undefined })

  const onLogin: h.JSX.GenericEventHandler<HTMLFormElement> = event => {
    if (loginStep !== 'Login') return

    const target = event.currentTarget
    const formdata = new FormData(target)
    const data: IFormData = Object.fromEntries(formdata.entries()) as A
    Api.login(data.email, data.password)
      .then(r => {
        console.info(r)
        hideLogin()
      })
      .catch(error => {
        const { message } = error
        console.warn(message)
        if (message === CONSTS.ERRORS.auth.NOT_REGISTERED) {
          slideGo('left', () => {
            setLoginStep(CONSTS.ERRORS.auth.NOT_REGISTERED)
            setFormData(data)
          })
        } else if (message === CONSTS.ERRORS.auth.PASSWORD_WRONG) {
          setInfo(message)
        }
      })
  }

  const onConfirm = () => {
    if (loginStep === CONSTS.ERRORS.auth.NOT_REGISTERED) {
      Api.sign(formData.email, formData.password)
        .then(r => {
          hideLogin()
        })
        .catch(error => {
          const { message } = error
          console.warn(message)
        })
    }
  }
  const onCancel = () => {
    if (loginStep === CONSTS.ERRORS.auth.NOT_REGISTERED) {
      slideGo('right', () => {
        setLoginStep('Login')
      })
    } else {
      hideLogin()
    }
    setInfo('')
  }

  const onInput: h.JSX.GenericEventHandler<HTMLInputElement> = event => {
    // const target = event.currentTarget
    setInfo('')
  }

  return (
    <>
      <Avatar class="mg--5" user={user} onClick={showLogin} />
      <Dialog visible={loginVisible} title={loginStep} onCancel={onCancel} onConfirm={onConfirm} form="login-form">
        <Slide {...slideProps} width="20rem">
          {loginStep === CONSTS.ERRORS.auth.NOT_REGISTERED
            ? <p><b>{formData.email}</b> is not registered yet. Do you want to register as it?</p>
            : <LoginForm id="login-form" onSubmit={onLogin} formData={formData} onInput={onInput} />
          }
        </Slide>
        {!!info && (
          <p class="mg-t--0 mg-b--2em fabric-scarlet">{info}</p>
        )}
      </Dialog>
    </>
  )
}
