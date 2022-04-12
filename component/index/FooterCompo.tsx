import { NextPage } from 'next'
import styles from '../../styles/FooterCompo.module.css'

function Before(porps: any) {
    return (
        <div className={styles.before}></div>
    )
}

const FooterCompo: NextPage = () => {
    return (
        <footer className={styles.footer}>
            <div>
                <div className={styles.info}>
                    <div>이용약관</div>
                    <div>{<Before></Before>}개인정보처리방침</div>
                    <div>{<Before></Before>}법적고지 및 주의사항</div>
                    <div>{<Before></Before>}입점안내</div>
                    <div>{<Before></Before>}쇼핑윈도 노출안내</div>
                    <div>{<Before></Before>}안전거래 센터</div>
                    <div>{<Before></Before>}전자금융거래약관</div>
                    <div>{<Before></Before>}고객센터</div>
                </div>
                <p className={styles.marketing}>
                    OOO은 통신판매 중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.
                </p>
                <div className={styles.address}>
                    <div>사업자등록번호:123-45-67890</div>
                    <div>{<Before></Before>}통신판매업신고번호: 제2022-대구동구-1234호</div>
                    <div>{<Before></Before>}대표이사: 송영진</div>
                    <div>{<Before></Before>}사업자등록확인</div>
                    <div>{<Before></Before>}이메일: abcdefg123@naver.com</div>
                    <div>주소: 대구시 동구 화랑로 525</div>
                    <div>{<Before></Before>}대표전화: 9876-5432</div>
                    <div>{<Before></Before>}1:1문의 바로가기</div>
                    <div>{<Before></Before>}호스팅 서비스 제공: AWS</div>
                </div>
                <div className={styles.logo}></div>
            </div>
        </footer>
    )
}
export default FooterCompo