import { NextPage } from "next"
import { inquiry } from "../../../models/Inquiry"
import useCustomSWR from "../../../utils/client/useCustumSWR"
import Loading from "../../Loading"
import ReadPost from "./ReadPost"

export interface extraInquiry extends inquiry {
    reply: inquiry[]
}

const Board: NextPage = () => {
    let postlist: Array<extraInquiry> = []
    const { data, isLoading, isError } = useCustomSWR("/api/inquiry/me")

    if (isError) return <div>failed to load</div>
    if (isLoading) return <div><Loading /></div>
    for (let post of data) {
        postlist.unshift(post)
    }

    return (
        <form >
            <div className="container">
                <div className="header">
                </div>
                <div className="body">
                    <div className="t_body">
                        <table>
                            <thead>
                                <tr>
                                    <th>구분</th>
                                    <th>제목</th>
                                    <th>등록일자</th>
                                    <th>답변여부</th>
                                    <th>기타</th>
                                </tr>
                            </thead>
                            <tbody>
                                {postlist && postlist.map(post =>
                                    <ReadPost key={post._id} data={post} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="footer">
                </div>
            </div>
        </form>
    )
}

export default Board