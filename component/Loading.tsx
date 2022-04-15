import { useEffect } from "react"
import loadingStyle from "../styles/loading.module.css"
export default function Loading() {
    return (
        <div className={loadingStyle.content}>
            <div className={loadingStyle.loading}>
                <div className={loadingStyle.circle}></div>
            </div>
        </div>
    )
}