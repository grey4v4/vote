import { Link } from "react-router-dom"
import './Create.css'
import SinglePic from './单选.png'
import MultiplePic from './多选.png'


//选择创建单选还是多选的界面
export default function Create() {
  return (
    <div>
      <div className="card">
        <Link to="/create-vote" className="link">
          <img className="card-img" src={SinglePic} />
          创建单选
        </Link>
      </div>

      
      <div className="card">
        <Link to="/create-vote?multiple=1" className="link">
          <img className="card-img" src={MultiplePic} />
          创建多选
        </Link>
      </div>
    </div>
  )
}