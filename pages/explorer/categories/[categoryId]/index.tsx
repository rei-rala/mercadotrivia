import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { getItemsByIdByCategory } from "../../../../services";


const Category: NextPage<{ categoryId: string, results: any }> = ({ categoryId, results  }) => {
  const router = useRouter()
  const goBack = () => { router.back() }
  
  return (
    <>
      <button onClick={goBack} >VOLVER</button>
      <h2>Items de categoria {categoryId}</h2>
      <p>Mostrando {results.length} items</p>
      <ul>
        {results.length && results.map((item:any) => (
          <li key={item.id}>
            <Link href={`/explorer/items/${item.id}`} passHref>
              <a> {item.id}: {item.title} </a>
            </Link>
          </li>
        ))}
      </ ul>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { categoryId } = context.query ?? null
  const { results, /* ...rest */ } =  (!!categoryId && await getItemsByIdByCategory(categoryId)) ?? null

  return {
    props: {
      categoryId,
      results,
    }
  }
}


export default Category

