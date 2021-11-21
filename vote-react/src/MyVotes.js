import RequireLogin from "./RequireLogin"
import { useAxios, forceLogin } from "./hooks"
import { Link } from "react-router-dom"



function MyVotes(userInfo) {

  let { loading, data, error } = useAxios({url: '/vote'})

  if (loading) {
    return null
  }

  return (
    <div>
      <h3>我的投票</h3>
      <ul>
        {/* <li><Link to="/view-vote/6">6</Link></li>
        <li><Link to="/view-vote/4">4</Link></li> */}

        {
          data.map(vote => {
            return ( 
              <li key={vote.voteId}>
                <Link to={"/view-vote/" + vote.voteId} style={{textDecoration: 'none'}}>{vote.title}</Link>

                <span style={{ color: '#3269da' }}>[{vote.multiple ? '多选' : '单选'}]</span>
                <span style={{ color: '#3269da' }}>[{vote.anonymous ? '匿名' : '公开'}]</span>
              </li>
            )
          })
        }
      </ul>
    </div>   
  )
}

export default forceLogin(MyVotes)