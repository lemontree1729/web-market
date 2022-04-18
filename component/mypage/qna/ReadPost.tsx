// import postrowStyle from "../../styles/post/postrow.module.css"
import { useState } from "react"
import customAxios from "../../../utils/customAxios"
import Link from "next/link"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { extraInquiry } from "./Board"
import qnaStyle from "../../../styles/mypage/qna.module.css"


const ReadPost: NextPage<{ data: extraInquiry }> = ({ data }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [isAnswer, setisAnswer] = useState(false)
    const answer = "답변예정"
    // data.reply.length ? "답변완료" : 
    function clickContent() {
        if (answer) {
            setisAnswer(!isAnswer)
        }
        setIsOpen(!isOpen)
    }
    async function deleteApi(event: any) {
        event.preventDefault()
        if (window.confirm("삭제하시겠습니까?")) {
            try {
                const res = await customAxios.delete(`/api/inquiry?_id=${data._id}`)
                if (res.status == 200) {
                    alert('글이 삭제되었습니다.')
                } else {
                    alert('글이 존재하지 않습니다.')
                }
            } catch (err) {
                console.log(err)
                alert('삭제가 실패했습니다..')
            }
        }
    }

    return (
        <>
            <tr onClick={clickContent}>
                <td className={qnaStyle.headline}>{data.qacategory}</td>
                <td className={qnaStyle.headline}>{data.title}</td>
                <td className={qnaStyle.headline}>{data.createdAt.toString().replace(/-/g, ".").substring(0, 10)}</td>
                <td className={qnaStyle.headline}>{answer}</td>
                <td className={qnaStyle.headline}>
                    <Link href={`/mypage/updatepost/${data._id}`} passHref>
                        <button>수정하기</button>
                    </Link>
                    <button onClick={deleteApi}>삭제</button>
                </td>
            </tr>
            {
                isOpen ? (
                    <tr onClick={clickContent}>
                        <td></td>
                        <td>{data.content}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                ) : <></>
            }
            {
                isAnswer ? (
                    <tr onClick={clickContent}>

                        <td>답변</td>
                        <td>답변내용</td>
                        <td>답변일자</td>
                        <td></td>
                        <td></td>
                    </tr>
                ) : <></>
            }
        </>
    )
}

export default ReadPost