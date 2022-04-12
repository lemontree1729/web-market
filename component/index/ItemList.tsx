import { NextPage } from 'next'
import Link from 'next/link'
import { product } from '../../models/Product'
import styles from '../../styles/ItemList.module.css'
import useScrollFadeIn from '../../utils/client/useScrollFadeIn'


const Item: NextPage<{ data: product }> = ({ data }) => {
    return (
        <div className={styles.content}>
            <Link href={`/product?no=${data.no}`} passHref>
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
        </div>
    )
}

const ItemList: NextPage<{ data: Array<product> }> = ({ data }) => {
    const animationItem = useScrollFadeIn('up', 1, 0)
    return (
        <div className={styles.style}>
            <div>
                <div className={styles.category}>{data[0].category1}</div>
            </div>
            <div {...animationItem} className={styles.item}>
                {/* <div className={styles.item}> */}
                {data.map(product => <Item key={product.no} data={product}></Item>)}
            </div>
        </div>
    )
}

export default ItemList