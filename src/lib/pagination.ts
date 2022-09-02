
export interface PaginationLinks {
    url?: string
    label: string
    active: boolean
}

export interface PaginationMeta {
    current_page: number
    from: number
    last_page: number
    links: PaginationLinks[]
    path: string
    per_page: number
    to: number
    total: number
}

export interface PaginatedItems<T> {
    data: T[]
    links: {
        first?: string
        last?: string
        next?: string
        prev?: string
    }
    meta: PaginationMeta
}

export function getPaginatedData<T>(data: any) {
    const items = data ? (data.data as T[]) : []
    const meta = data && data.meta ? data.meta as PaginationMeta : null
    const limit = meta ? meta.per_page : 0
    const total = meta ? meta.total : 0
    const count = total <= limit ? 1 : Math.ceil(total / limit)

    return { items, limit, count }
}
