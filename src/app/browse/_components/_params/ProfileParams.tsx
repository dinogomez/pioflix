import { parseAsString } from "nuqs/server"

import { createLoader } from "nuqs/server"

export const profileSearchParams = {
    profile: parseAsString
}

export const loadProfileParams = createLoader(profileSearchParams)