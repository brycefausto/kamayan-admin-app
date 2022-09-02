import { FC } from 'react'

export type AuthSessionStatusProps = {
    status: string | null
    className: string
    [x: string]: any
}

const AuthSessionStatus: FC<AuthSessionStatusProps> = ({
    status,
    className,
    ...props
}) => (
    <>
        {status && (
            <div
                className={`${className} font-medium text-sm text-green-600`}
                {...props}>
                {status}
            </div>
        )}
        {/* <div
                className={`${className} font-medium text-sm text-green-600`}
                {...props}>
                {'sample auth status'}
            </div> */}
    </>
)

export default AuthSessionStatus
