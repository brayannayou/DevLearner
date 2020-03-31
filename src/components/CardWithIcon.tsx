import React from "react"

interface Props {
  name: string;
  subtitle: string;
  description: string;
  footer: string;
  avatar: string;
}

export const CardWithIcon = ({ name, subtitle, description, footer, avatar }: Props) => {    
  return (
    <div style={{ border: '2px solid #484a51', marginBottom: 12, borderRadius: 8, padding: 8, alignItems: 'center', backgroundColor: '#31333C' }}>
      <div style={{ display: 'flex', marginBottom: 12 }}>
        <img src={avatar} style={{ borderRadius: '100%', height: 60, width: 60, margin: 0, minWidth: 60, minHeight: 60, backgroundColor: '#e3e8ed' }}/>
        <div style={{ marginLeft: 12 }}>
          <p style={{ fontWeight: 'bold', margin: 0 }}>{name}</p>
          <p style={{ fontWeight: 'bold', margin: 0, color: '#959190' }}>{subtitle}</p>
        </div>
      </div>
      <p style={{ margin: 0, marginBottom: 12 }}>{description}</p>
      <div dangerouslySetInnerHTML={{ __html: footer }} />
    </div>
  )
}
