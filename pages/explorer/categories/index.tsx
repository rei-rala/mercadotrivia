import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { EXCLUDED_CATEGORIES, EXCLUDED_CATEGORIES_ENTRIES } from '../../../constants'
import { getCategories } from '../../../services'

type MeliCategory = {
  id: string
  name: string
}


export async function getServerSideProps() {
  const categories = await getCategories()

  return {
    props: {
      categories,
    }
  }
}


const Categories: NextPage<{ categories: MeliCategory[] }> = ({ categories }) => {
  const router = useRouter()
  const goBack = () => { router.back() }
  
  return (
    <>
      <button onClick={goBack} >VOLVER</button>
      <h2>Categorias <abbr title="MercadoLibre Argentina?">MLA</abbr></h2>
      <p>Total <b>{categories.length}</b> categorias, {EXCLUDED_CATEGORIES_ENTRIES.length} excluidas del juego por default </p>

      <h4> Excluyendo </h4>
      <ol>
        {EXCLUDED_CATEGORIES_ENTRIES.map(([catId, catName]) => <li key={catId}>
          {catName} <Link href={`/explorer/categories/${catId}`}><a>{catId}</a></Link>
        </li>)}
      </ol>

      <h4> Incluyendo </h4>
      <ol>
        {categories
          .filter(category => EXCLUDED_CATEGORIES_ENTRIES.flat().includes(category.id) === false)
          .map(category => (
            <li key={category.id}>
              {category.name} <Link href={`/explorer/categories/${category.id}`}><a>{category.id}</a></Link>
            </li>
          ))}
      </ol>
    </>
  )
}

export default Categories
