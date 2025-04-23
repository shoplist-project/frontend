import {DefaultError, useMutation} from "@tanstack/react-query";
import {useRef} from "react";

type MutationFunc<T extends unknown[], R> = (signal: AbortSignal, ...args: T) => Promise<R>

export function useMutationRequest<T extends unknown[], R>(func: MutationFunc<T, R>) {
    const abortSignal = useRef(new AbortController())
    const {mutateAsync, data, isPending} = useMutation<R, DefaultError, T>({
        mutationFn: (args: T) => func(abortSignal.current.signal, ...args)
    })

    const requestFn = (...args: T): Promise<R> => {
        return mutateAsync(args)
    }
    return {request: requestFn, data, loading: isPending}
}