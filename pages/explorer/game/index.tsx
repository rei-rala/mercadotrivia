import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { useMemo } from "react"
import { getGameItems } from "services/game"

const GameProducts: React.FC<{ items: any[] }> = ({ items }) => {
  const uniqueItems = useMemo(() => items.filter((item, index, self) => self.findIndex(i => i.id === item.id) === index), [items])
  const router = useRouter()
  const goBack = () => { router.back() }


  return (
    <>
      <Head>
        <title>MLA game products | MercadoTrivia</title>
      </Head>

      <button onClick={goBack}>VOLVER</button>

      <header>
        <h1>Current InGame products from MLA</h1>
      </header>


      <main>
        <p>Total <b>{items.length} productos</b></p>
        <ol>
          {
            uniqueItems?.length && uniqueItems.map((item: any) => (
              <li key={item.id}>
                <Link href="/explorer/items/[itemId]" as={`/explorer/items/${item.id}`} passHref>
                  <a>{item.id}</a>
                </Link>
                : {item.title}
              </li>
            ))
          }
        </ol>
      </main>

    </>

  )
}

export async function getStaticProps() {
  const items = await getGameItems()

  return {
    props: {
      items
    }
  }
}

export default GameProducts