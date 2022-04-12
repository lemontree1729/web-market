import Link from "next/link"
import { NextPage } from "next"
import qnaStyle from "../../../styles/mypage/qna.module.css"
import Board from "./Board"


const QnA: NextPage = () => {
    return (
        <div className={qnaStyle.content}>
            <div className={qnaStyle.title}>QnA</div>
            <Board></Board>
            <div className={qnaStyle.btn_group}>
                <Link href="/mypage/createpost" passHref>
                    < button > 글쓰기</button>
                </Link >
            </div>
        </div >
    )
}

export default QnA