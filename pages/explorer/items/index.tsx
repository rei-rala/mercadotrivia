import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { searchItems } from 'services/explorer'

const Items: NextPage<any> = () => {
  const router = useRouter()

  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const goBack = () => { router.back() }
  const handleChange = (e: any) => setQuery(e.target.value)
  const handleSearch = async (e: any) => {
    e.preventDefault()

    if (query.length > 3) {
      const { results } = await searchItems(query)
      setResults(results)
    }
  }



  return (
    <>
      <Head>
        <title> Explorar items | MercadoTrivia</title>
      </Head>
      <button onClick={goBack}>VOLVER</button>

      <header>
        <h2>Busqueda items</h2>
      </header>

      <form onSubmit={handleSearch} >
        <input type="text" placeholder="Buscar..." value={query} onChange={handleChange} />
        <button type="submit">Buscar</button>
      </form>


      <h5>Items</h5>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {
          results.length ? results.map((item: any) => (
            <li key={item.id}>
              <Link href={`/explorer/items/${item.id}`} passHref><a>
                {item.id}
              </a></Link>
              : {item.title} <br />
              <Image src={item.thumbnail} width={100} height={100} alt={item.title} />
            </li>
          ))
            : <p>No hay items</p>
        }
      </ul>
      <style jsx>{`
            li {
              border-bottom: 1px solid red;
            }
          `}</style>
    </>
  )
}


export default Items
