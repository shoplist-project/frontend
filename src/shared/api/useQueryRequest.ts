import {useQuery} from "@tanstack/react-query";

type QueryFunc<R> = (signal: AbortSignal) => Promise<R>


export function useQueryRequest<R>(queryKey: unknown[], func: QueryFunc<R>) {
    const {data, isLoading} = useQuery({
        queryKey,
        queryFn: ({signal}) => func(signal)
    })

    return {data, loading: isLoading}
}