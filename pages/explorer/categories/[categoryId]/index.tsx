import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getItemsByCategoryId } from "services/explorer";


const Category: NextPage<{ categoryId: string, results: any }> = ({ categoryId, results }) => {
  const router = useRouter()
  const goBack = () => { router.back() }

  return (
    <>
      <Head>
        <title>Categoria {categoryId} | MercadoTrivia</title>
      </Head>
      <button onClick={goBack} >VOLVER</button>

      <header>
        <h2>Items de categoria {categoryId}</h2>
      </header>
      
      <p>Mostrando {results.length} items</p>
      <ul>
        {results.length && results.map((item: any) => (
          <li key={item.id}>
            <Link href={`/explorer/items/${item.id}`} passHref><a>
              {item.id}
            </a></Link>
            : {item.title}

            <br />
            <Image src={item.thumbnail} width={100} height={100} alt={item.title} />
          </li>
        ))}

        <style jsx>{`
            li {
              border-bottom: 1px solid red;
            }
          `}</style>

      </ ul>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { categoryId } = context.query ?? null
  const { results, /* ...rest */ } = (!!categoryId && await getItemsByCategoryId(categoryId)) ?? null

  return {
    props: {
      categoryId,
      results,
      // rest
    }
  }
}


export default Category

