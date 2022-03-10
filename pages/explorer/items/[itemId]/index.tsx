import type { NextPage } from 'next'
import Image from 'next/image'
import { getItems } from '../../../../services'

const Item: NextPage<any> = ({ itemId, item }) => {
  console.log({ itemId, item })

  return (
    <>
      <h2>Item id#{itemId}</h2>
      <h3>{item.title}</h3>

      {item.pictures[0]?.secure_url && <Image src={item.pictures[0].secure_url} width={300} height={300} objectFit='contain' alt={item.title} />}

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


export async function getServerSideProps(context: any) {
  const { itemId } = context.query
  const itemData = itemId ? await getItems(itemId) : null
  const item = itemData[0]?.body

  return {
    props: {
      itemId,
      item
    }
  }
}


export default Item
