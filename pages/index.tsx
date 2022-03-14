import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {

  return (
    <section>
      <Head>
        <title>Home | MercadoTrivia</title>
      </Head>
      
      <header>
        <h2>Bienvenido!</h2>
      </header>

      <ul>
        <li>
          <Link href={`/explorer/categories`} passHref>
            <a> Categorias MLA </a>
          </Link>
        </li>
        <li>
          <Link href={`/explorer/items`} passHref>
            <a> Items MLA </a>
          </Link>
        </li>
        <li>
          <Link href={`/explorer/game`} passHref>
            <a> Game MLA products </a>
          </Link>
        </li>

        <li>
          <Link href={`/game`} passHref >
            <a> Game [WIP] </a>
          </Link>
        </li>
      </ul>
    </section>
  )
}

export default Home
