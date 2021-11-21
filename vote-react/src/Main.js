import { NavLink, Route, Redirect } from "react-router-dom"
import Create from "./Create"
import MyVotes from "./MyVotes"


export default function Main() {
  return (
    <div>
      <Route path="/main" exact>
        <Redirect to="/main/create" />
      </Route>
      <Route path="/main/create" component={Create} />
      <Route path="/main/myvotes" component={MyVotes} />

      <nav>
        <NavLink style={{textDecoration: 'none'}} to="/main/create">新建</NavLink>
        {" | "}
        <NavLink style={{textDecoration: 'none'}} to="/main/myvotes">我的</NavLink>

      </nav>
    </div>
  )
}