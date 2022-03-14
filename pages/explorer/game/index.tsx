import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { filterUniqueItems, getGameItems } from "services/game"

import FloatingButton from "components/FloatingButton/FloatingButton";

const GameProducts: React.FC<{ itemIds: string[] }> = () => {
  const router = useRouter()
  const goBack = () => { router.back() }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ found: false, message: "" })
  const [uniqueItems, setUniqueitems] = useState<any[]>([])

  useEffect(() => {
    Promise.resolve()
      .then(() => setLoading(true))
      .then(() => getGameItems())
      .then(filterUniqueItems)
      .then(setUniqueitems)
      .catch(err => setError({ found: true, message: err.message }))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <Head>
        <title>MLA game products | MercadoTrivia</title>
      </Head>

      <FloatingButton click={goBack}>VOLVER</FloatingButton>

      <header>
        <h1>Current InGame products from MLA</h1>
      </header>

      {
        loading
          ? <div>Loading...</div>
          : error.found
            ? <div>{error.message}</div>
            : <>
              <p>Total <b>{uniqueItems.length} productos</b></p>
              <ol>
                {
                  uniqueItems?.length ? uniqueItems.map((item: any) => (
                    <li key={item.id} >
                      <Link href="/explorer/items/[itemId]" as={`/explorer/items/${item.id}`} passHref>
                        <a>{item.id}</a>
                      </Link>
                      : {item.title}
                    </li>
                  ))
                    : <li>No hay productos</li>
                }
              </ol>
            </>
      }
    </section>
  )
}


export default GameProducts