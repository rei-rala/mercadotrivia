import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {

  return (
    <>
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
          <Link href={`/#`} passHref >
            <a> Game [WIP] </a>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default Home
