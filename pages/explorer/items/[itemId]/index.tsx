import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import ImageSlider from '../../../../components/ImageSlider'
import { getItemsById } from '../../../../services'

const Item: NextPage<any> = ({ itemId, item }) => {
  const router = useRouter()
  const goBack = () => { router.back() }
  return (
    <>
      <button onClick={goBack}>VOLVER</button>

      {
        !!item.error
          ? <><h2>Item {itemId} no encontrado</h2> <p>{item.error}</p> </>
          : (
            <>
              <h2>Item id {itemId}</h2>
              <h3>{item.title}</h3>

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
