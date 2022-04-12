import { NextPage } from 'next'
import { product } from '../../models/Product'
import styles from '../../styles/CategoryList.module.css'

const CategoryList: NextPage<{ data: product }> = ({ data }) => {
    return (
        <div>
            <div className={styles.content}>
                <div className={styles.tumbs}>
                    <img className={styles.image} src={data.imageUrl}></img>
                </div>
                <div className={styles.itemInfo}>
                    <div className={styles.infoStyle}>
                        <span>{data.name}</span>
                        <span>{data.category1} | {data.category2}</span>
                        <div className={styles.btn_group}>
                            <button>찜하기</button>
                            <button>장바구니</button>
                        </div>
                    </div>
                </div>
                <div className={styles.sideInfo}>
                    <div className={styles.infoStyle}>{data.price}</div>
                    <div className={styles.postStyle}>택배비3500원</div>
                    <div className={styles.makerStyle}>{data.maker}</div>
                </div>
            </div>
        </div >
    )
}

export default CategoryList