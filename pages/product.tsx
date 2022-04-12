import styles from '../styles/product.module.css'
import { useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import customAxios from '../utils/customAxios'
import { useRouter } from 'next/router'
import useCustomSWR from '../utils/client/useCustumSWR'
import Layout from '../component/Layout'
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await customAxios.get(`/api/product?_id=${context.query._id}`)
    await customAxios.patch("/api/product/viewcount", { _id: context.query._id })
    const { data: { result } } = res
    console.log(result.data[0])
    return {
        props: { ...result.data[0] }
    }
}


function Before(props: any) {
    return (
        <div className={styles.before}></div>
    )
}

function Before2(props: any) {
    return (
        <div className={styles.before2}></div>
    )
}


const Product: NextPage = (props: any) => {
    const router = useRouter()
    const { query } = router
    const params = new URLSearchParams();
    ["likelist", "cartlist"].forEach(value => params.append("required", value))
    const { data, isLoading, isApiError, isServerError } = useCustomSWR("/api/user/me", { params }, true)
    const [count, setCount] = useState(0)
    if (isLoading || !props) return <div>로딩중...</div>
    if (isServerError) {
        alert("서버 에러가 발생하였습니다")
        router.push("/")
    }
    console.log(data)
    const { likelist, cartlist } = data || {}
    const onIncrease = () => setCount(count + 1)
    const onDecrease = () => setCount(count - 1)
    const SumPrice = () => count * parseInt(props.price)
    const pressLike = async () => {
        if (isApiError) {
            alert("로그인이 필요합니다")
            router.push("/login")
        } else {
            if (!likelist.includes(props._id)) {
                likelist.push(props._id)
            } else {
                likelist.splice(likelist.indexOf(props._id), 1)
            }
            await customAxios.patch("/api/user/me", { likelist })
        }
    }
    const pressCart = async () => {
        if (isApiError) {
            alert("로그인이 필요합니다")
            router.push("/login")
        } else {
            if (!cartlist.includes(props._id)) {
                cartlist.push(props._id)
                await customAxios.patch("/api/user/me", { cartlist })
                alert("장바구니에 추가되었습니다")
            } else {
                alert("이미 장바구니에 추가되어있습니다")
                router.push(`/mypage/cartlist`)
            }
        }
    }

    const pressPayment = async () => {
        if (isApiError) {
            alert("로그인이 필요합니다")
            router.push("/login")
        } else {
            console.log(cartlist)
            if (!cartlist.includes(props._id)) {
                cartlist.push(props._id)
            }
            await customAxios.patch("/api/user/me", { cartlist })
            router.push(`/payment`)
        }
    }
    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.purchaseList}>
                    <img className={styles.itemImage} src={props.imageUrl}></img>
                    <div className={styles.purchasePart}>
                        <div>
                            <div className={styles.itemName}>{props.name}</div>
                            <div className={styles.price}>{props.price}원</div>
                        </div>
                        <div className={styles.countList}>
                            <div className={styles.countName}>수량</div>
                            <div className={styles.total}>
                                <div className={styles.countBut}>
                                    <button disabled={count === 0 ? true : false} onClick={onDecrease} className={styles.count}>-</button>
                                    <div className={styles.count}>{count}</div>
                                    <button onClick={onIncrease} className={styles.count}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.start}>
                            <div className={styles.icon}>택배아이콘</div>
                            <div className={styles.p}>
                                <div>오늘출발 상품</div>
                                <div>오늘 13:00시까지 결제 시 오늘 바로 발송됩니다.</div>
                            </div>
                        </div>
                        <div className={styles.express}>택배배송비:3500원</div>

                        <div className={styles.totalPrice}>
                            <div>총 상품금액</div>
                            <div className={styles.totalPrice2}>
                                <div>총수량 {count}개</div>
                                <div>{<Before2></Before2>}총 금액 {SumPrice()}원</div>
                            </div>
                        </div>
                        <div className={styles.purchaseButton}>
                            <Link href={`/payment?_id=${query._id}`} passHref>
                                <button className={styles.button} onClick={pressPayment}>구매버튼</button>
                            </Link>
                            <div>
                                <button className={styles.etcMenu} onClick={pressLike}>찜하기</button>
                                <button className={styles.etcMenu} onClick={pressCart}>장바구니</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ------------------------------상품설명----------------------------------- */}

                <div className={styles.itemInfo}>
                    <div className={styles.itemTag}>
                        <div className={styles.tagLayout}>
                            <div>상세정보</div>
                            <div>{<Before></Before>}상품후기</div>
                            <div>{<Before></Before>}상푼문의</div>
                            <div>{<Before></Before>}반품/교환정보</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Product