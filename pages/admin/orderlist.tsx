import { NextPage } from "next"
import { useRouter } from "next/router"
import useCustomSWR from "../../utils/client/useCustumSWR"
import 'bootstrap/dist/css/bootstrap.css'

const Orderlist: NextPage = () => {
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
    if (data.role != "admin") {
        alert("권한이 없습니다")
        router.push("/")
    }
}
export default Orderlist