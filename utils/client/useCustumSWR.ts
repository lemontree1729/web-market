import { AxiosRequestConfig } from "axios"
import useSWR from "swr"
import useSWRImmutable from "swr/immutable"
import customAxios from "../customAxios"
useSWRImmutable
export default function useCustomSWR(url: string, config?: AxiosRequestConfig, afterValidate?: boolean, immutable?: boolean) {
    const fetcher = (url: string) => customAxios(url, config).then(res => res.data)
    const { data, error, isValidating } = immutable ? useSWRImmutable(url, fetcher) : useSWR(url, fetcher)
    console.log(error)
    const finaldata = data ? data.result : data
    const normalerror = data?.error
    const isLoading = afterValidate ? ((error === undefined) && (data === undefined)) || isValidating : (error === undefined) && (data === undefined)
    return {
        isValidating,
        data: finaldata,
        isLoading,
        isApiError: normalerror,
        isServerError: error,
        isError: normalerror || error
    }
}