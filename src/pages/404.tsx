import React from "react"

import Lottie from 'react-lottie'
import { Link } from "gatsby"

import Layout from "../components/layout"
import animationData from '../../assets/lotties/404.json'

const NotFoundPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  return (
    <Layout>
      <h1>NOT FOUND</h1>
      <Lottie
        options={defaultOptions}
        height={200}
        width={200}
      />
      <p>Esta página não existe</p>
      <Link to="/" style={{ fontWeight: 'bold' }}>Voltar</Link>
    </Layout>
  )
}

export default NotFoundPage
