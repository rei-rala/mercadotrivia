import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getItemsByCategoryId } from "services/explorer";

import FloatingButton from "components/FloatingButton/FloatingButton";
import { priceFormat, shortenString } from "utils";

const Price: React.FC<{ currency: string, price: number }> = ({ currency, price }) => {

  const [priceRound, cents] = priceFormat(price).split('.')


  return (
    <span>{currency} {priceRound} <sup>{cents}</sup></span>
  );
};

const Category: NextPage<{ categoryId: string, results: any }> = ({ categoryId, results }) => {
  const router = useRouter()
  const goBack = () => { router.back() }

  console.log(results)

  return (
    <section>
      <Head>
        <title>Categoria {categoryId} | MercadoTrivia</title>
      </Head>
      <FloatingButton click={goBack} >VOLVER</FloatingButton>

      <header>
        <h2>Items de categoria {categoryId}</h2>
      </header>

      <p>Mostrando {results.length} items</p>
      <ol>
        {results.length && results.map((item: any) => (
          <li key={item.id}>
            <Image src={item.thumbnail} width={100} height={100} objectFit='contain' alt={item.title} />

            <div>
              <Link href={`/explorer/items/${item.id}`} passHref><a>
                {item.id}
              </a></Link>
              <span title={item.title}> {shortenString(item.title)} </span>
              <Price currency={item.currency_id} price={item.price} />
            </div>

          </li>
        ))}


      </ol>
      <style jsx>{`
      ol {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
      }

      ol div {
        display: flex;
        flex-direction: column;
        padding: 1rem;
      }
        li {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 5px;
          padding: 5px;
        }
        li image {
          order: 1;
        }

        sup {
          transform: translate(-25%, -10%);
        }
      `}</style>
    </section>
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

