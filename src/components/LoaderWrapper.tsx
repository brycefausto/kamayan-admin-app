import { ReactNode } from 'react'
import Loader from './Loader'

export interface LoaderWrapperProps {
    loading: boolean
    children: ReactNode
}

function LoaderWrapper({ loading, children }: LoaderWrapperProps) {
    return <>{loading ? <Loader /> : children}</>
}

export default LoaderWrapper
