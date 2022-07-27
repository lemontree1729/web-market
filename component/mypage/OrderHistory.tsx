import { NextPage } from "next"
import { order } from "../../models/Order"


const Orderhistory: NextPage<{ data: order[] }> = ({ data }) => {
    const orders = data
    return (
        <div className="content">
            <div className="inquiryPeriod">
                조회기간
                <button>조회하기</button>
            </div>
            <div className="item">
                <div>주문날짜</div>
                <div>주문번호</div>
                <div>배송중</div>
                <div>상품이미지</div>
                <div>제품이름</div>
                <div>제품정보</div>
                <div>가격</div>
                <div>수량</div>
            </div>
        </div>
    )
}

export default Orderhistory