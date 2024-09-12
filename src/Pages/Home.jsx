import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
    <h1>
        <Link to="/home2">
        Hello
        </Link>
        </h1>

    </>
  )
}

export default Home