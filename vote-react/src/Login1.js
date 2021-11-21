// import { useCallback, useState } from "react"
import axios from 'axios'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useInput, useUser } from './hooks'
// import api from './api'


// function useInput(init = '') {
//   let [value, setValue] = useState(init)
//   let onChange = useCallback(function onChange(e) {
//     setValue(e.target.value)
//   }, [])
//   return {
//     value, onChange
//   }
// }

export default function Login() {
  let name = useInput()
  let password = useInput()
  let history = useHistory()
  let userInfo = useUser()

  useEffect(() => {
    if (userInfo.data) {
      history.goBack()
    }
  }) 

  async function login() {
    let info = {
      name: name.value,
      password: password.value,
    }
    try {
      var res = await axios.post('/account/login', info) //axios返回的都是响应对象；响应体在响应对象的data字段上
      // let data = res.data //响应体在响应对象的data字段上
      // console.log(data)
      userInfo.update()
      history.goBack()
    } catch (e) {
      // let res = await axios.post('/account/login', info) //axios返回的都是响应对象；响应体在响应对象的data字段上
      let data = res.data
      alert(data.msg)
    }
  }

  return (  
    <div>
      <div>用户名：</div>
      <input type="text" {...name}/>
      <div>密  码：</div>
      <input type="password" {...password}/>
      
      <div><button onClick={login}>登录</button></div>
    </div>
  )
}