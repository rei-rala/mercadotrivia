import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"

const Game: React.FC = ({ }) => {
  const router = useRouter()
  const goBack = () => { router.back() }


  return (
    <>
      <Head>
        <title>Jugar MercadoTrivia</title>
      </Head>
      <button onClick={goBack}>VOLVER</button>

      <header>
        <h1>Game</h1>
      </header>

      <main>
        <strong> Work in progress </strong>
      </main>

    </>

  )
}

export default Game