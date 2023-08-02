import React from 'react'
import { useParams } from 'react-router-dom'

function SessionPage() {
  const { id } = useParams()
  return <div>OrderPage{id}</div>
}

export default SessionPage
