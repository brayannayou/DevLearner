import React, { useState, useEffect } from "react"

import { Link } from "gatsby"

import Layout from "../components/layout"

import { Base } from "../components/Link"
import { get, map } from "lodash"
import { githubAxios } from "../utils/axios"
import { CardWithIcon } from "../components/CardWithIcon"
import { StateShow } from "../components/StateShow"
import { TSelectedRepo } from "../state/app"
import { connect } from "react-redux"

interface Props {
  selectedRepo: TSelectedRepo;
}
interface TRepos {
  title: string;
  html_url: string;
  user: string;
  created_at: string;
  body: string;
}

const SecondPage = ({ selectedRepo }: Props) => {
  const [currentState, setCurrentState] = useState<'LOADING' | 'SUCCESS' | 'EMPTY'>('LOADING')
  const [pullRequests, setPullRequests] = useState<Array<TRepos>>([])

  const owner = get(selectedRepo, 'ownerName', '')
  const repository = get(selectedRepo, 'name', '')

  useEffect(() => {
    if(owner && repository) {
      githubAxios.get(`repos/${owner}/${repository}/pulls`)
        .then(({ data }: { data: Array<TRepos> }) => {
          if(data.length) {
            setPullRequests(data)
            return setCurrentState('SUCCESS')
          }
          setCurrentState('EMPTY')
        })
        .catch((e) => alert(JSON.stringify(e)))
      return
    }
    setCurrentState('EMPTY')
  }, [])



  const toRender = () =>
    map(pullRequests, ({ title = '',  html_url, user, created_at, body }, index) => {
      const ownerName = get(user, 'login', '')
      const cardProps = {
        name: title,
        subtitle: `Por ${ownerName}`,
        description: body,
        footer: created_at,
        avatar: get(user, 'avatar_url'),
      }
      return (
        <Base target="_blank" to={html_url} key={title+ownerName+index}>
          <CardWithIcon  {...cardProps}/>
        </Base>
      )
    })

  return (
    <Layout>
      <h1>Pull Requests de {repository}</h1>
      <Link to="/" style={{ fontWeight: 'bold' }}>Voltar</Link>
      <div style={{ marginTop: 30 }}>
        {toRender()}
        <StateShow state={currentState} />
      </div>
    </Layout>
  )
}

export default connect(({ app: { selectedRepo } }: { app: { selectedRepo: TSelectedRepo } }) => ({
  selectedRepo,
}))(SecondPage)
