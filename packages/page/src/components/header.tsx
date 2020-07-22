
import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useState } from 'preact/hooks'

import WeatherWidget from 'src/components/weather'
import { Avatar, Dialog, LoginForm } from 'src/components/sui'

import { useRedux, actors, actor } from 'src/redux'
import { Api, CONSTS } from 'src/helpers'


interface IFormData {
  email: S
  password: S
}


export default function Header () {
  const { user, logged, loginVisible } = useRedux(state => ({
    logged: state.user.isLoggedIn,
    user: state.user.user,
    loginVisible: state.user.loginVisible,
  }))

  const [loginStep, setLoginStep] = useState('Login')
  const [formData, setFormData] = useState<IFormData>({email: '', password: ''})

  const showLogin = () => actors.user.SHOWLOGIN(undefined)
  const hideLogin = () => actor({ type: actor.types.user.HIDELOGIN, payload: undefined })

  const onLogin: h.JSX.GenericEventHandler<HTMLFormElement> = event => {
    if (loginStep !== 'Login') return

    const target = event.currentTarget
    const formdata = new FormData(target)
    const data: IFormData = Object.fromEntries(formdata.entries()) as A
    console.info('data', data)
    Api.login(data.email, data.password)
      .then(r => {
        console.info(r)
        hideLogin()
      })
      .catch(error => {
        const { message } = error
        console.warn(message)
        if (message === CONSTS.ERRORS.auth.NOT_REGISTERED) {
          setLoginStep(CONSTS.ERRORS.auth.NOT_REGISTERED)
          setFormData(data)
        } else if (message === CONSTS.ERRORS.auth.PASSWORD_WRONG) {
          //
        }
      })
  }

  const onConfirm = () => {
    if (loginStep === CONSTS.ERRORS.auth.NOT_REGISTERED) {
      Api.sign(formData.email, formData.password)
        .then(r => {
          console.info(r)
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
      setLoginStep('Login')
    } else {
      hideLogin()
    }
  }

  return (
    <header class="nav absolute--tl flex">
      <WeatherWidget />
      <div class="flex-grow" />
      {logged
        ? <Avatar class="mg--5" user={user} />
        : <Avatar class="mg--5" user={user} onClick={showLogin} />
      }
      <Dialog visible={loginVisible} title={loginStep} onCancel={onCancel} onConfirm={onConfirm} form="login-form">
        <div class="w-max--25rem">
          {loginStep === CONSTS.ERRORS.auth.NOT_REGISTERED
            ? <p><b>{formData.email}</b> is not registered yet. Do you want to register as it?</p>
            : <LoginForm id="login-form" onSubmit={onLogin} formData={formData} />
          }
        </div>
      </Dialog>
    </header>
  )
}
