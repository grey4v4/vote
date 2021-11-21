

import { useMemo } from 'react'
import { useState } from 'react'
import { useImmer } from 'use-immer' 
import { useInput, useBooleanInput , useQuery, forceLogin} from './hooks'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import dayjs from 'dayjs'


function CreateVote({ userInfo }) {
  let [options, setOptions] = useImmer(['', ''])
  let title = useInput()
  let desc = useInput()
  let deadline = useInput(useMemo(() => dayjs().add(1, 'year').format('YYYY-MM-DDTHH:mm'), [])) //截止日期
  let anonymous = useBooleanInput()
  let history = useHistory()
  let query = useQuery() 

  function remove(idx) {
    setOptions( options => {
        options.splice(idx, 1)
      })
  }

  function setOption(idx, val) {
    setOptions( options => {
        options[idx] = val
      })
  }

  async function create() {
    let vote = {
      title: title.value,
      desc: desc.value,
      options: options,
      deadline: deadline.value,
      anonymous: anonymous.checked,
      multiple: query.get('multiple') === '1' ? true : false  //是否是多选
    }
    console.log(vote)
    try {
      let res = await axios.post('/vote', vote)
      let createdVote = res.data.result  //data里有创建好的data信息
      console.log(createdVote)
      history.push('/view-vote/' + createdVote.voteId)
    } catch (e) {
      throw e
    }
  }

  

  return (
    <div>
      <h1>创建投票</h1>
      <div><input type="text" placeholder="投票标题" {...title}/></div>
      <div><input type="text" placeholder="补充描述（选填）" {...desc}/></div>
      {
        options.map((option, idx) => 
          <div key={idx}>
            <input type="text" placeholder="选项" value={option} onChange={(e) => setOption(idx, e.target.value) }/>
            <button tabIndex="-1" onClick={() => remove(idx)}>-</button>
          </div>
          )
      }
      <div><button onClick={() => setOptions(options => { options.push('')})}>添加选项</button></div>
      <div>截止日期：<input type="datetime-local" {...deadline}/></div>
      <div>匿名投票：<input type="checkbox" {...anonymous} /></div>
      <div><button onClick={create}>创建投票</button></div>

    </div>
  )
}

export default forceLogin(CreateVote)