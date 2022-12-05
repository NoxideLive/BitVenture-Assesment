import {useCallback, useMemo, useState} from 'react';
import axios, {AxiosInstance, AxiosResponse, CancelTokenSource} from 'axios';
import {getEnv} from "../utils/env";

interface ApiResponse<T> {
    data: T | undefined;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    error: string | undefined;
    get: (endpoint: string) => Promise<void>;
    post: (endpoint: string, body: any) => Promise<void>;
    put: (endpoint: string, body: any) => Promise<void>;
    remove: (endpoint: string) => Promise<void>;
    fileUpload: (endpoint: string, file: File) => Promise<void>;
    fileDownload: (endpoint: string, fileName: string) => Promise<void>;
    isSuccess: boolean;
    cancel: () => void;
    reset: () => void;
}

const useApi = <T>(instance: AxiosInstance): ApiResponse<T> => {
    const [data, setData] = useState<T | undefined>(undefined);
    const [error, setError] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(null);

    const reset = useCallback(() => {
        setData(undefined);
        setError(null);
        setIsLoading(true);
        setIsSuccess(false);
        setCancelToken(null);
    }, []);

    const get = useCallback(
        async (url: string, options?: any): Promise<void> => {
            reset();
            try {
                const res: AxiosResponse<T> = await instance.get(url, options);
                setData(res.data);
                setIsSuccess(true);
            } catch (err) {
                setError(err);
            }
            setIsLoading(false);
        },
        [instance, reset]
    );

    const post = useCallback(
        async (url: string, data: any, options?: any): Promise<void> => {
            reset();
            try {
                const res: AxiosResponse<T> = await instance.post(url, data, options);
                setData(res.data);
                setIsSuccess(true);
            } catch (err) {
                setError(err);
            }
            setIsLoading(false);
        },
        [instance, reset]
    );

    const put = useCallback(
        async (url: string, data: any, options?: any): Promise<void> => {
            reset();
            try {
                const res: AxiosResponse<T> = await instance.put(url, data, options);
                setData(res.data);
                setIsSuccess(true);
            } catch (err) {
                setError(err);
            }
            setIsLoading(false);
        },
        [instance, reset]
    );

    const remove = useCallback(
        async (url: string, options?: any): Promise<void> => {
            reset();
            try {
                const res: AxiosResponse<T> = await instance.delete(url, options);
                setData(res.data);
                setIsSuccess(true);
            } catch (err) {
                setError(err);
            }
            setIsLoading(false);
        },
        [instance, reset]
    );

    const fileUpload = useCallback(
        async (endpoint: string, file: File) => {
            reset();
            try {
                const newCancelToken = axios.CancelToken.source()
                setCancelToken(newCancelToken);
                const formData = new FormData();
                formData.append('file', file);
                const response: AxiosResponse<T> = await instance.post(
                    endpoint,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        cancelToken: newCancelToken.token,
                    }
                );
                setData(response.data);
                setIsSuccess(true);
            } catch (err) {
                if (axios.isCancel(err)) {
                    // Request was cancelled, so do nothing
                } else {
                    setError(err);
                }
            }
            setIsLoading(false);
        },
        [instance, reset]
    );

    const fileDownload = useCallback(
        async (endpoint: string, fileName: string) => {
            reset();
            try {
                const response = await instance.get(endpoint, {
                    responseType: 'blob'
                });
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                setIsSuccess(true);
            } catch (err) {
                setError(err);
            }
            setIsLoading(false);
        },
        [instance, reset]
    );

    const cancel = useCallback(() => {
        if (cancelToken) {
            cancelToken.cancel();
        }
    }, [cancelToken]);

    return {
        data,
        error,
        isLoading,
        get,
        post,
        put,
        remove,
        fileUpload,
        isSuccess,
        cancel,
        reset,
        setIsLoading,
        fileDownload
    };
};

const useDelayedApi = <T>(instance: AxiosInstance): ApiResponse<T> => {
    // Check if the environment variable is set to true
    const useDelay = getEnv('REACT_APP_USE_API_DELAY', 'false') === 'true';

    // Use the useApi hook to fetch data from the API
    const api = useApi<T>(instance);
    // Create an AbortController
    const controller = useMemo(() => new AbortController(), []);


    const cancel = useCallback(() => {
        // Cancel the AbortController
        controller.abort();
    }, [controller]);
    const withDelay = <F extends (...args: any[]) => Promise<void>>(
        fn: F,
        delay: number
    ) => {
        return async (...args: Parameters<F>): Promise<void> => {
            api.reset();
            setTimeout(async () => {
                if (controller.signal.aborted) {
                    return;
                }
                try {
                    await fn(...args);
                    api.setIsLoading(false);
                    controller.signal.dispatchEvent(new Event("complete"));
                } catch (error) {
                    controller.abort();
                }
            }, delay);

            return new Promise((resolve) => {
                controller.signal.addEventListener("complete", () => resolve());
                controller.signal.addEventListener("abort", () => {
                    console.log("HERE")
                    api.cancel();
                    api.reset();
                    api.setIsLoading(false)
                    resolve()
                });
            });
        };
    };


    return useDelay ? {
        ...api,
        get: withDelay(api.get, 2000),
        post: withDelay(api.post, 2000),
        put: withDelay(api.put, 2000),
        remove: withDelay(api.remove, 2000),
        fileUpload: withDelay(api.fileUpload, 10000),
        fileDownload: withDelay(api.fileDownload, 2000),
        cancel,
    } : api;
};


const dataApiInstance = axios.create({
    baseURL: getEnv('REACT_APP_DATA_API_URL', 'https://localhost:7194/'),
})

export const useDataApi = <T>(): ApiResponse<T> => useDelayedApi<T>(dataApiInstance);
