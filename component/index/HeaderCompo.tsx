import styles from '../../styles/HeaderCompo.module.css'
import Link from 'next/link'
import useCustomSWR from '../../utils/client/useCustumSWR'
import MenuToggle from '../menutoggle/MenuToggle'
import { NextPage } from 'next'
import customAxios from '../../utils/customAxios'
import { useRouter } from 'next/router'
import Search from '../Search'
import Loading from '../Loading'
import { useState } from 'react'


const HeaderCompo: NextPage = () => {
    const router = useRouter()
    const params = new URLSearchParams();
    ["id"].forEach(value => params.append("required", value))
    const { data, isLoading, isApiError, isServerError } = useCustomSWR("/api/user/me", { params }, true)
    if (isLoading) return <div><Loading /></div>
    if (isServerError) {
        alert("서버 에러가 발생하였습니다")
    }

    const role = data?.role
    async function logout() {
        try {
            await customAxios.delete("/api/login")
            if (router.pathname === "/") {
                router.reload()
            } else {
                router.replace("/")
            }
        } catch {
            alert("로그아웃에 실패하였습니다")
            router.reload()
        }
    }

    return (
        <div className={styles.header}>
            <div className={styles.headbar}>

                <div className={styles.category}>
                    <MenuToggle />
                    <Link href="/" passHref>
                        <div className={styles.logo}></div>
                    </Link>
                </div>
                <Search></Search>
                {
                    isApiError
                        ? <>
                            <div className={styles.logingroup}>
                                <Link href="/login" passHref>
                                    <div className={styles.loginBtn}>로그인</div>
                                </Link>
                                <span>|</span>
                                <Link href="/signup" passHref>
                                    <div className={styles.loginBtn}>회원가입</div>
                                </Link>
                            </div>
                            <div className={styles.mypage}>
                                <Link href="/mypage" passHref>
                                    <div className={styles.mypagebtn}>
                                    </div>
                                </Link>
                                <div className={styles.itemBox}>
                                </div>
                            </div>
                        </>
                        : role === "admin"
                            ? <>
                                <div className={styles.logingroup}>
                                    <Link href="/admin" passHref>
                                        <div>
                                            관리자
                                        </div>
                                    </Link>
                                    <span>|</span>
                                    <div className={styles.loginbtn} onClick={logout}>로그아웃</div>
                                </div>
                                <div className={styles.mypage}>
                                    <Link href="/mypage" passHref>
                                        <div className={styles.mypagebtn}>
                                        </div>
                                    </Link>
                                    <div className={styles.itemBox}>
                                    </div>
                                </div>
                            </>
                            : <>
                                <div className={styles.logingroup}>
                                    <Link href="/mypage" passHref>
                                        <div className={styles.id}>
                                            {data.id}
                                        </div>
                                    </Link>
                                    <span>|</span>
                                    <div className={styles.loginbtn} onClick={logout}>로그아웃</div>
                                </div>
                                <div className={styles.mypage}>
                                    <Link href="/mypage" passHref>
                                        <div className={styles.mypagebtn}>
                                        </div>
                                    </Link>
                                    <div className={styles.itemBox}>
                                    </div>
                                </div>
                            </>
                }
            </div>
        </div >
    )
}

export default HeaderCompo