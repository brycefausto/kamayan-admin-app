import { MAX_FILE_COUNT, MAX_FILE_SIZE } from '@/config'
import axios from '@/lib/axios'
import { isArray } from 'lodash'
import * as yup from 'yup'

export const isServer = typeof window === 'undefined'

export const onChangeSetState = (setStateFunction: (value: string) => void) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
        setStateFunction(event.target.value)
    }
}

export const sleep = (delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

export const URL_REGEX =
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/

export const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export const yupImageValidator = yup
    .mixed()
    .required('Image File is required')
    .test(
        'fileSize',
        `The file is too large. The maximum file size is ${formatBytes(
            MAX_FILE_SIZE,
        )}`,
        value => value?.size <= MAX_FILE_SIZE,
    )

export const yupMultipleImageValidator = yup
    .array()
    .max(MAX_FILE_COUNT, `You can only select up to ${MAX_FILE_COUNT} files at a time`)
    .required('Image files are required')
    .test(
        'fileSize',
        `The some of the files is too large. The maximum file size is ${formatBytes(
            MAX_FILE_SIZE,
        )}`,
        value => {
            let valid = true
            if (value) {
                let files = value as File[]
                for (let file of files) {
                    if (file.size > MAX_FILE_SIZE) {
                        valid = false

                        break
                    }
                }
            }

            return valid
        },
    )

export const fetcher = (url: string) => axios.get(url).then(res => res.data)

export const getPathWithoutQuery = (url: string) => url.split(/[?#]/)[0]

export const getParentDirectory = (url: string) => {
    if (url.endsWith('/edit')) {
        return url.substring(0, url.lastIndexOf('/') - 1)
    }

    return url.substring(0, url.lastIndexOf('/'))
}
