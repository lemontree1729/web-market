import sidebarStyle from "../../styles/mypage/sidebar.module.css"
import Link from "next/link"
import { NextPage } from "next"

const SideBar: NextPage<{ toggle: string }> = ({ toggle }) => {
    console.log(toggle)
    return (
        <div className={sidebarStyle.content}>
            <h3>마이페이지</h3>
            <Link href="/mypage">
                <span className={toggle === "userinfo" ? sidebarStyle.spanselect : sidebarStyle.span}>회원 정보</span>
            </Link>
            <Link href="/mypage/passwordchange">
                <span className={toggle === "passwordchange" ? sidebarStyle.spanselect : sidebarStyle.span}> 비밀번호 변경</span>
            </Link>
            <Link href="/mypage/addresschange">
                <span className={toggle === "addresschange" ? sidebarStyle.spanselect : sidebarStyle.span}>주소 변경</span>
            </Link>
            <Link href="/mypage/orderhistory">
                <span className={toggle === "orderhistory" ? sidebarStyle.spanselect : sidebarStyle.span}>주문 내역</span>
            </Link>
        </div>
    )
}
export default SideBar