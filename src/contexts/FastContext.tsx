import { useRef, createContext, useContext, useCallback, useSyncExternalStore } from 'react'

/**
 * Generic "fast context" used to give context to a group of components.  Normally you might use
 * useContext + useReducer to achieve the same thing, but that strategy updates every component
 * within the context upon every change.  This strategy only updates the components that needs it.
 *
 * Based off of this youtube video
 * {@link https://www.youtube.com/watch?v=ZKlXqrcBx88}
 *
 * Repository link
 * {@link https://github.com/jherr/fast-react-context}
 */
export default function createFastContext<Store>(initialState: Store) {
	interface UseStoreData {
		get: () => Store
		set: (value: Partial<Store>) => void
		subscribe: (callback: () => void) => () => void
	}

	const useStoreData = (): UseStoreData => {
		const store = useRef(initialState)
		const subscribers = useRef(new Set<() => void>())

		const get = useCallback(() => store.current, [])

		const set = useCallback((value: Partial<Store>) => {
			store.current = {
				...store.current,
				...value,
			}
			subscribers.current.forEach((callback) => callback())
		}, [])

		const subscribe = useCallback((callback: () => void) => {
			subscribers.current.add(callback)

			// optional cleanup function
			return () => subscribers.current.delete(callback)
		}, [])

		return {
			get,
			set,
			subscribe,
		}
	}

	const StoreContext = createContext<UseStoreData | null>(null)

	const Provider = ({ children }: { children: React.ReactNode }) => (
		<StoreContext.Provider value={useStoreData()}>
			{children}
		</StoreContext.Provider>
	)

	const useStore = <SelectorOutput, >(selector: (store: Store) => SelectorOutput): [
		SelectorOutput,
		(value: Partial<Store>) => void
	] => {
		const store = useContext(StoreContext)

		if (!store) {
			throw new Error('Store not found')
		}

		const state = useSyncExternalStore(
			store.subscribe,
			() => selector(store.get()),
			() => selector(initialState),
		)

		return [state, store.set]
	}

	return {
		Provider,
		useStore,
	}
}