import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ImageSlider from 'components/ImageSlider/ImageSlider'
import { EXCLUDED_CATEGORIES_ENTRIES, EXCLUDED_PROPERTIES_ENTRIES, INCLUDED_PROPERTIES_ENTRIES } from 'constants/gameConstraints'
import { getItemsById } from 'services/explorer'

import FloatingButton from 'components/FloatingButton/FloatingButton'

const Item: NextPage<any> = ({ itemId, item }) => {
  const router = useRouter()
  const goBack = () => { router.back() }

  return (
    <section>
      <Head>
        <title>Item {itemId} - MercadoTrivia</title>
      </Head>
      <FloatingButton click={goBack}>VOLVER</FloatingButton>

      {
        !!item.error
          ? <><h2>Item {itemId} no encontrado</h2> <p>{item.error}</p> </>
          : (
            <>
              <header>
                <h2>Item id {itemId}</h2>
                <h3>{item.title}</h3>
              </header>

              <fieldset>
                <legend>Atributos de inclusion</legend>

                <details>

                  <summary>Propiedades incluidas</summary>
                  <ul>
                    {
                      INCLUDED_PROPERTIES_ENTRIES.map(([prop, propValue]) => (
                        <li key={`prop${prop}`}>{prop}: {propValue === item[prop] ? 'OK' : 'Excluido'}</li>
                      ))
                    }
                  </ul>
                </details>

                <details>

                  <summary>Propiedades excluidas</summary>
                  <ul>
                    {
                      EXCLUDED_PROPERTIES_ENTRIES.map(([prop, propValue]) => (
                        <li key={`prop${prop}`}>{prop}: {propValue === item[prop] ? 'Excluido' : 'OK'}</li>
                      ))
                    }
                  </ul>
                </details>

                <details>
                  <summary>Categorias excluidas</summary>
                  <ul>
                    {
                      EXCLUDED_CATEGORIES_ENTRIES.map(([catId, catName]) => (
                        <li key={`cat${catId}`}>{catName}: {item.category_id === catId ? 'Excluido' : 'OK'}</li>
                      ))
                    }
                  </ul>
                </details>

              </fieldset>

              {
                item.pictures
                && <ImageSlider images={item.pictures.map((picture: any) => ({ src: picture.secure_url }))} altText={item.title} />
              }

              <p>Precio {item.currency_id} {item.price}</p>
              <a href={item.permalink} target='_blank' rel="noreferrer" > <strong>Link publicacion</strong></a>

              <h5>Otros metadatos</h5>
              <ul style={{ display: 'flex', flexDirection: 'column' }}>
                {
                  Object.keys(item).map((itemKey: any) => {

                    const value = item[itemKey]

                    return ['string', 'number'].includes(typeof value)
                      ? <li key={itemKey}> {itemKey}: {value} </li>
                      : <li key={itemKey} style={{ order: 999 }}>
                        <ol >
                          {itemKey}: <br />

                          {
                            !!value
                              ? Object.values(value).map((v: any, index: number) => (
                                <li key={'prop' + itemKey + index} style={{ color: 'red', wordBreak: 'break-all' }}> {JSON.stringify(v)}</li>
                              ))
                              : <span  style={{ color: 'red' }}>No hay valor</span>
                          }
                        </ol>
                      </li>
                  })
                }
              </ul>
            </>
          )
      }
    </section>
  )

}


export async function getServerSideProps(context: any) {
  const { itemId } = context.query
  const itemData = itemId && await getItemsById(itemId) || null
  const item = itemData[0]?.body || null

  return {
    props: {
      itemId,
      item
    }
  }
}


export default Item
