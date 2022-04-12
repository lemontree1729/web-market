import { NextPage } from 'next'
import Link from 'next/link'
import { product } from '../../models/Product'
import styles from '../../styles/PickedRank.module.css'

const Item: NextPage<{ data: product }> = ({ data }) => {
    return (
        <div className={styles.content}>
            <Link href={`/product?id=${data.id}`} passHref>
                <div className={styles.lList}>
                    <div className={styles.thumb}>
                        <img className={styles.imageUrl} src={data.imageUrl}></img>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.name}>{data.name.replaceAll(/<\/*b>/gi, "")}</div>
                        <div className={styles.price}>
                            <strong>{data.price}</strong>원
                        </div>
                    </div>
                </div>
            </Link>
        </div >
    )
}

const PickRank: NextPage<{ data: Array<product> }> = ({ data }) => {
    return (
        <div className={styles.style}>
            <div>
                <div className={styles.category}>BEST 5</div>
            </div>
            <div className={styles.item}>
                {data.map(product => <Item key={product.id} data={product}></Item>)}
            </div>
        </div>
    )
}

export default PickRank