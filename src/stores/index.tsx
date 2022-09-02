import React, { createContext, ReactNode } from 'react'
import { TodoStore } from './config.store'

interface IStoreContext {
    todoStore: TodoStore
}

const todoStore = new TodoStore()

export const StoreContext = createContext<IStoreContext>({
    todoStore,
})

export type StoreProviderProps = {
    children: ReactNode
    value: IStoreContext
}

export function StoreProvider({ value, children }: StoreProviderProps) {
    return (
        <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    )
}

export function useStores() {
    return React.useContext(StoreContext)
}
