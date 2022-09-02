import { fetcher } from "@/lib/utils"
import useSWR from "swr"

export const useLoadSingleData = <T>(id: string, url: string) => {
    const { data: resData, error } = useSWR<{ data: T }>(`${url}/${id}`, fetcher)
    const loading = !resData && !error
    const data = resData ? resData.data : undefined

    return { loading, data, error }
}
