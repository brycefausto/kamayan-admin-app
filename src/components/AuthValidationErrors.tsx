import { FC } from 'react'

export type AuthValidationErrorsProps = {
    errors: any[]
    className: string
    [x: string]: any
}

const sampleErrors = ['email or password is incorrect', 'something went wrong']

const AuthValidationErrors: FC<AuthValidationErrorsProps> = ({
    errors = [],
    ...props
}) => (
    <>
        {errors.length > 0 && (
            <div {...props}>
                <div className="font-medium text-red-600">
                    Whoops! Something went wrong.
                </div>

                <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            </div>
        )}
        {/* <div {...props}>
                <div className="font-medium text-red-600">
                    Whoops! Something went wrong.
                </div>

                <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                    {sampleErrors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            </div> */}
    </>
)

export default AuthValidationErrors
