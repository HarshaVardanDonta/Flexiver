import React from 'react'
import logo from '../Assets/logoBlack.svg'

const LoginPageHeader = (props:any) => {
  return (
    <div style={{margin:"1% 2%"}}>
    <div>
        <img src={logo} height="40px"/>
    </div>
    {props.children}
    </div>
  )
}

export default LoginPageHeader