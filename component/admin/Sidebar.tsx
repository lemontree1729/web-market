import { NextPage } from "next"
import Link from "next/link"
import sidebarStyle from "../../styles/mypage/sidebar.module.css"
const SideBar: NextPage<{ toggle: string }> = ({ toggle }) => {
    return (

        <div className={sidebarStyle.content}>
            <h3>관리자페이지</h3>
            <Link href="/admin">
                <span className={toggle === "userlist" ? sidebarStyle.spanselect : sidebarStyle.span}>유저목록</span>
            </Link>
            <Link href="/admin/productlist">
                <span className={toggle === "productlist" ? sidebarStyle.spanselect : sidebarStyle.span}>상품목록</span>
            </Link>

        </div >
    )
}
export default SideBar