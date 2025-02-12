import { createLoader, parseAsString } from 'nuqs/server'

export const searchParams = {
    q: parseAsString
}

export const loadSearchParams = createLoader(searchParams)