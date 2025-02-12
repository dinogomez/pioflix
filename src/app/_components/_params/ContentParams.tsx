import { createLoader, parseAsString } from 'nuqs/server'

export const contentParams = {
    id: parseAsString
}

export const loadContentParams = createLoader(contentParams)