import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"

import FloatingButton from "components/FloatingButton/FloatingButton"

const Game: React.FC = ({ }) => {
  const router = useRouter()
  const goBack = () => { router.back() }


  return (
    <section>
      <Head>
        <title>Jugar MercadoTrivia</title>
      </Head>

      <FloatingButton click={goBack}>VOLVER</FloatingButton>

      <header>
        <h1>Game</h1>
      </header>

      <main>
        <strong> Work in progress </strong>
      </main>

    </section>

  )
}

export default Game