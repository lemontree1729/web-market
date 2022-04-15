import axios from "axios"
import AddressInput from "../../component/address/AddressInput"
import { useState, useRef } from "react"
import addressStyle from "../../styles/address/address.module.css"
import { useRouter } from "next/router";
import { NextPage } from "next";
import Link from "next/link";
import useCustomSWR from "../../utils/client/useCustumSWR";
import Loading from "../loading";

const Addresschange: NextPage = () => {
    const [Zonecode, setZonecode] = useState(''); // 우편번호
    const [Address, setAddress] = useState(''); // 주소
    const [AddressDetail, setAddressDetail] = useState(''); // 상세주소
    const [Validationaddress, setvalidationaddress] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const addressValue = useRef(null)
    const zonecodeValue = useRef(null)
    const router = useRouter()

    const { data, isLoading, isError } = useCustomSWR("/api/user/me")
    if (isError) return <div>failed to load</div>
    if (isLoading) return <div><Loading /></div>

    async function addressPost() {
        try {
            const res = await axios.patch("/api/user/me", {
                "fulladdress": {
                    "zonecode": Zonecode,
                    "address": Address,
                    "addressdetail": AddressDetail
                }
            })
            if (res.status === 200) {
                alert("주소가 변경되었습니다")
                setIsOpen(false)
                router.push("/mypage")
            } else
                alert("주소변경에 실패했습니다.")

        } catch (err) {
        }
    }
    const validatrionAddress = (value: string) => {
        if (value !== "") {
            return true
        } else
            return false

    }

    const setAddressFunction = (value: any) => {
        addressValue.current = value
        setAddress(value)
        setvalidationaddress(true)
        console.log(Validationaddress + "add")
    }

    const setZonecodeFunction = (value: any) => {
        zonecodeValue.current = value
        setZonecode(value)
    }
    const addressDetailInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const addressDetailValue = event.currentTarget.value
        if (validatrionAddress(addressDetailValue)) {
            setAddressDetail(addressDetailValue)

        }
    }
    return (
        <div className={addressStyle.content}>
            <div className={addressStyle.title}>주소변경</div>
            <table>
                <tbody>
                    <tr>
                        <th>우편번호</th>
                        <th>주소</th>
                        <th>상세주소</th>
                    </tr>
                    <tr>
                        <td>{data.fulladdress.zonecode}</td>
                        <td>{data.fulladdress.address}</td>
                        <td>{data.fulladdress.addressdetail}</td>
                        <td>
                            <button className={addressStyle.modify_btn} onClick={() => setIsOpen(!isOpen)}>수정하기</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {isOpen ?
                <div className={addressStyle.modal_background}>
                    <div className={addressStyle.modal}>
                        <div className={addressStyle.input_group}>
                            <h3> 주소변경</h3>

                            <AddressInput
                                setAddressFunction={setAddressFunction}
                                setZonecodeFunction={setZonecodeFunction}
                            />
                            <input className={addressStyle.input} type="text" id="addressDetail" defaultValue={AddressDetail} onChange={addressDetailInputHandler} placeholder="상세주소" />
                            <div className={addressStyle.btn_group}>
                                <button onClick={addressPost}>주소변경하기</button>
                                <button onClick={() => setIsOpen(false)}>닫기</button >
                            </div>
                        </div>
                    </div>
                </div >
                : ""
            }

        </div >
    )
}

export default Addresschange