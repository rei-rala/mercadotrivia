import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ImageSlider from 'components/ImageSlider/ImageSlider'
import { EXCLUDED_CATEGORIES_ENTRIES, EXCLUDED_PROPERTIES_ENTRIES, INCLUDED_PROPERTIES_ENTRIES } from 'constants/gameConstraints'
import { getItemsById } from 'services/explorer'

const Item: NextPage<any> = ({ itemId, item }) => {
  const router = useRouter()
  const goBack = () => { router.back() }

  return (
    <>
      <Head>
        <title>Item {itemId} - MercadoTrivia</title>
      </Head>
      <button onClick={goBack}>VOLVER</button>

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

                <b>Propiedades incluidas</b>
                <ul>
                  {
                    INCLUDED_PROPERTIES_ENTRIES.map(([prop, propValue]) => (
                      <li key={`prop${prop}`}>{prop}: {propValue === item[prop] ? 'OK' : 'Excluido'}</li>
                    ))
                  }
                </ul>

                <b>Propiedades excluidas</b>
                <ul>
                  {
                    EXCLUDED_PROPERTIES_ENTRIES.map(([prop, propValue]) => (
                      <li key={`prop${prop}`}>{prop}: {propValue === item[prop] ? 'Excluido' : 'OK'}</li>
                    ))
                  }
                </ul>

                <b>Categorias excluidas</b>
                <ul>
                  {
                    EXCLUDED_CATEGORIES_ENTRIES.map(([catId, catName]) => (
                      <li key={`cat${catId}`}>{catName}: {item.category_id === catId ? 'Excluido' : 'OK'}</li>
                    ))
                  }
                </ul>
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
                      : <li key={itemKey} style={{ color: 'red', order: 999 }}> {itemKey}: {typeof value} </li>

                  })
                }
              </ul>
            </>
          )
      }
    </>
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
