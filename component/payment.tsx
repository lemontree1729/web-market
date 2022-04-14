import styles from '../styles/payment.module.css'
import Layout from './Layout'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useCustomSWR from '../utils/client/useCustumSWR'

function Before() {
    return (
        <div className={styles.before}></div>
    )
}

function doPayment() {
    alert()
}

const Payment: NextPage = () => {
    const router = useRouter()
    const { data, isLoading, isApiError, isServerError } = useCustomSWR("/api/user/me")
    if (isLoading) return <div>로딩중...</div>
    if (isServerError) {
        alert("서버 에러가 발생하였습니다")
        router.push("/")
    }
    if (isApiError) {
        alert("로그인이 필요합니다")
        router.push("/login")
    }
    return (
        <Layout>
            <div className={styles.container}>
                {/* ----------------------------주문상품정보---------------------------- */}
                <div className={styles.orderLayout}>
                    <div className={styles.orderTag}>주문/결제</div>
                    <table>
                        <colgroup>
                            <col width={600}></col>
                            <col width={155}></col>
                            <col width={140}></col>
                            <col width={90}></col>
                            <col width={140}></col>
                            <col width={170}></col>
                        </colgroup>
                        <thead className={styles.orderContent}>
                            <tr>
                                <th scope='col'>상품정보</th>
                                <th scope='col'>판매자</th>
                                <th scope='col'>배송비</th>
                                <th scope='col'>수량</th>
                                <th scope='col'>상품금액</th>
                                <th scope='col'>총 결제금액</th>
                            </tr>
                        </thead>
                        <tbody className={styles.orderContentInfo}>
                            <tr>
                                <td>상품정보내용</td>
                                <td>판매자내용</td>
                                <td>배송비내용</td>
                                <td>수량내용</td>
                                <td>상품금액내용</td>
                                <td>총 결제금액</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* -----------------------------배송지----------------------------- */}
                <div className={styles.customerLayout}>
                    <div className={styles.address}>
                        <h5>배송지정보</h5>
                        <div>
                            <div>수령인</div>
                            <input></input>
                        </div>
                        <div>
                            <div>연락처</div>
                            <input></input>
                        </div>
                        <div>
                            <div>배송지 주소</div>
                            <input></input>
                        </div>
                        <div>
                            <div>배송 시 요청사항</div>
                            <input></input>
                        </div>
                    </div>
                    <div className={styles.customerInfo}>
                        <h5>주문자 정보</h5>
                        <div>이름</div>
                        <div>연락처</div>
                    </div>
                </div>
                {/* ----------------------------결제수단---------------------------- */}
                <div className={styles.paymentMethod}>
                    <div className={styles.method}>
                        <h5>결제 수단</h5>
                    </div>
                    <div className={styles.info}>
                        <h5>결제 상세</h5>
                        <div className={styles.priceSum}>
                            <div className={styles.p}>주문 금액</div>
                            <div className={styles.sum}>OOOOO원</div>
                        </div>
                        <div className={styles.priceSum}>
                            {<Before></Before>}
                            <div className={styles.p2}>상품 금액</div>
                            <div className={styles.sum2}>OOOOO원</div>
                        </div>
                        <div className={styles.priceSum}>
                            {<Before></Before>}
                            <div className={styles.p2}>배송 금액</div>
                            <div className={styles.sum2}>OOOOO원</div>
                        </div>
                    </div>
                </div>
                <div className={styles.btn}>
                    <button className={styles.paymentBtn} onClick={doPayment}>결제하기</button>
                </div>
            </div>
        </Layout>
    )
}
export default Payment