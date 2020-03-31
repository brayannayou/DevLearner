import React, { useEffect, useState, Dispatch } from "react"

import { Action } from "redux"
import { connect } from 'react-redux'
import { get, map, debounce, orderBy } from 'lodash'

import Layout from "../components/layout"
import { Base } from "../components/Link"
import { StateShow } from "../components/StateShow"
import { githubAxios } from "../utils/axios"
import { CardWithIcon } from "../components/CardWithIcon"
import { StyledButton } from "../components/StyledButton"
import { Star, Fork, Text } from "../../assets/Icons"
import { selectRepo, TSelectedRepo } from "../state/app"

interface Props {
  dispatch: Dispatch<Action>;
}

interface TRepositories {
  name: string;
  description: string;
  forks: number;
  stargazers_count: number;
  owner: string;
  selectedRepo: TSelectedRepo;
  
}

const IndexPage = ({ dispatch }: Props) => {
  const [currentState, setCurrentState] = useState<'LOADING' | 'SUCCESS' | 'EMPTY'>('LOADING')
  const [repositories, setRepositories] = useState<Array<TRepositories>>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [sortedBy, setSortedBy] = useState<{ name: string, order: 'asc' | 'desc' }>()

  const fetchItems = (currentList: Array<TRepositories>, page: number) => {
    const append = search ? '+' : ''
    setCurrentState('LOADING')
    githubAxios.get('search/repositories',
    { params: { q: `${search + append}language:Javascript` , page }})
      .then(({ data }: { data: { items: Array<TRepositories> }}) => {
        const repos: Array<TRepositories> = get(data, 'items', [])
        const newRepoList = [ ...currentList, ...repos]
        setRepositories(newRepoList)
        if (newRepoList.length) {
          return setCurrentState('SUCCESS')
        }
        setCurrentState('EMPTY')
      })
      .catch(e => alert(JSON.stringify(e)))
  }

  useEffect(() => { fetchItems(repositories, currentPage) }, [currentPage, search])

  const handleScroll = () => {
    const endOfPage = window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight
    if (endOfPage) return
    setCurrentPage(e => e + 1)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toRender = () =>
    map(repositories, ({ name, description, forks, stargazers_count, owner }: TRepositories, index: number) => {
      const ownerName: string = get(owner, 'login', '')
      const cardProps = {
        name,
        subtitle: `Por ${ownerName}`,
        description,
        footer: `&#10029; ${stargazers_count} &#127860;${forks}`,
        avatar: get(owner, 'avatar_url', ''),
      }
      return (
        <Base onClick={() => dispatch(selectRepo({ name, ownerName }))} to="/pull-requests" key={name+ownerName+index}>
          <CardWithIcon  {...cardProps}/>
        </Base>
      )
    })

  const debouncedSearch = debounce((value: string) => {
    setRepositories([])
    setSearch(value)
  }, 1000)

  const onInputSearch = ({ target: { value } }: { target: { value: string} }) => debouncedSearch(value)

  function sortRepos(by: 'name' | 'forks' | 'stargazers_count') {
    const order = !sortedBy || (sortedBy && sortedBy.name !== by) ? 'asc' : 'desc'
    setSortedBy({ name: by, order })
    
    const sortedRepo = orderBy(repositories, [(repo: TRepositories) => typeof repo[by] === 'string' ? repo[by].toString().toLowerCase() : repo[by]], order)
    setRepositories(sortedRepo)
  }
  
  return (
    <Layout>
      <h1>Repositórios GitHub</h1>
      <input onKeyUp={onInputSearch} placeholder="Procurar" type="text" />
      <div style={{ marginTop: 24 }}>
        <p style={{ fontWeight: 'bold' }}>Ordenar</p>
        <StyledButton onClick={() => sortRepos('name')}><Text /></StyledButton>
        <StyledButton onClick={() => sortRepos('stargazers_count')}><Star /></StyledButton>
        <StyledButton onClick={() => sortRepos('forks')}><Fork /></StyledButton>
      </div>
      <div style={{ marginTop: 30 }}>
        {toRender()}
        <StateShow state={currentState} />
      </div>
    </Layout>
  )
}

export default connect(({ app: { selectedRepo } }: { app: { selectedRepo: TSelectedRepo } }) => ({
  selectedRepo,
}))(IndexPage)
