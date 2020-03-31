import React from "react"

import "./layout.css"

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <div style={{
      backgroundColor: '#1C2129',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
  }}>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.5rem 1.0875rem 1.45rem`,
        width: '100%',
      }}
    >
      <main>{children}</main>
    </div>
  </div>
)

export default Layout
