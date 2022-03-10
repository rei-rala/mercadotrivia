import type { NextPage } from 'next'
import Link from 'next/link'
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


const Home: NextPage<{categories: MeliCategory[]}> = ({categories}) => {

  return (
    <>
      <h2>Categorias MLA</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <Link href={`/explorer/categories/${category.id}`} passHref>
              <a> {category.name} <sub style={{color:'red'}}><sup>{category.id}</sup></sub> </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Home
