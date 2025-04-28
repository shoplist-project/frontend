import {useQuery} from "@tanstack/react-query";

type QueryFunc<R> = (signal: AbortSignal) => Promise<R>

type RequestParams = {
    enabled?: boolean
}

export function useQueryRequest<R>(queryKey: unknown[], func: QueryFunc<R>, params?: RequestParams) {
    const {data, isLoading, isError} = useQuery({
        queryKey,
        queryFn: ({signal}) => func(signal),
        enabled: params?.enabled ?? true
    })

    return {data, loading: isLoading, hasError: isError}
}