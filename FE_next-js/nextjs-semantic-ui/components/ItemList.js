import React from 'react'
import { Grid, ItemMeta } from 'semantic-ui-react';
import { Image } from 'semantic-ui-react';
import Link from 'next/link';
import styles from '../styles/ItemList.module.css'

export const ItemList = ({ list }) => {
  return (
    <div>
      <Grid columns={3} divided>
        <Grid.Row>
          {list.map((item) => (
            <Grid.Column key={item.id}>
                <Link href={`/view/${item.id}`}><a>
                <div className={styles.wrap}>
                  <Image src={item.image_link} alt={item.name} className={styles.img_item} />
                  <strong className={styles.title_item}>{item.name}</strong>
                  <span className={styles.txt_info}>
                    {item.category} {item.product_type}
                  </span>
                  <strong className={styles.num_price}>${item.price}</strong> 
                </div>
            </a></Link>
          </Grid.Column>
        ))}
        </Grid.Row>
      </Grid>
    </div>
  )
}
