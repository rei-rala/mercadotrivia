import { NextPage } from "next";
import Link from "next/link";
import { getItemsByCategory } from "../../../../services";


const Category: NextPage<{ categoryId: string, results: any }> = ({ categoryId,results  }) => {

  console.log(results)

  return (
    <>
      <h2>Categorias {categoryId}</h2>
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
  const { categoryId } = context.query
  console.log(categoryId)
  const { results } =  (!!categoryId && await getItemsByCategory(categoryId)) ?? null

  return {
    props: {
      categoryId,
      results
    }
  }
}


export default Category

