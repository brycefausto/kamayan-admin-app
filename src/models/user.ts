export interface User {
    id: string
    name: string
    email: string
    avatar: string
    roleTitle: string
}

export const emptyUser: User = {
    id: '',
    name: '',
    email: '',
    avatar: '',
    roleTitle: ''
}
