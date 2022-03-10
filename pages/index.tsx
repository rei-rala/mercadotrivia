import type { NextPage } from 'next'
import Link from 'next/link'



const Home: NextPage = () => {

  return (
    <>
      <h2>Bienvenido!</h2>
      <ul>
          <li>
            <Link href={`/explorer/categories`} passHref>
              <a> Ver categorias de ML Argentina </a>
            </Link>
          </li>
      </ul>
    </>
  )
}

export default Home
