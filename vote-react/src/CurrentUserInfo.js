//当前登录信息

import { createContext } from "react";
import { useAxios } from "./hooks";

export let UserContext = createContext()

export default function CurrentUserInfo({ children }) {
  let userInfo = useAxios({ url: '/account/current-user' })

  return (
    <UserContext.Provider value={userInfo}>
      {children}
    </UserContext.Provider>
  )
}

