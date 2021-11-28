
export const storeToken = (token) =>
    localStorage.setItem('Token', token)

export const getToken = () => localStorage.getItem('Token')

export const authHeaders = {
    "Authorization": "Bearer " + getToken(),
    'Content-Type': 'application/json'
}

export const storeRefreshToken = (refresh) => {
    localStorage.setItem("RefreshToken", refresh)
    localStorage.setItem("LastRefreshTime", Date.now().toString())
}

export const jsonHeaders = new Headers({
    'Content-Type': 'application/json',
})

export const setHasUserBeenLoggedIn = () =>
    localStorage.setItem("HasBeenLoggedIn", '1')

export const getJWTHeaders = (
) => {
    const token = localStorage.getItem('Token')
    if (!token) {
        return { Authorization: '' }
    }
    return { Authorization: `JWT ${token}` }
}

export const renewToken = () => {
    const url = 'http://localhost:8000/api/auth/refresh/'
    const refreshesDone = parseFloat(
        localStorage.getItem('tkRefreshSemaphore') || '0'
    )

    const refreshToken = localStorage.getItem("RefreshToken")

    const finalOptions = {
        headers: jsonHeaders,
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ refresh: refreshToken }),
    }

    return fetch(url, finalOptions)
        .then((response) => {
            const { status } = response
            const isValid = status >= 200 && status <= 299
            return isValid ? response : Promise.reject(response)
        })
        .then((response) => response.json())
        .then((response) => {
            const refreshesDoneAfterMe =
                1 + parseFloat(localStorage.getItem('tkRefreshSemaphore') || '0')
            localStorage.setItem(
                'tkRefreshSemaphore',
                refreshesDoneAfterMe.toString()
            )
            storeToken(response.token)
            storeRefreshToken(response.refresh || '')
        })
        .catch(() => {
            const refreshesDoneAfter = parseFloat(
                localStorage.getItem('tkRefreshSemaphore') || '0'
            )
            if (refreshesDoneAfter !== refreshesDone) {
                return 'another tab has refreshed successfully'
            }
            // clearToken()
            return Promise.reject('failed to refresh')
        })
}

export const clearToken = () => {
    localStorage.removeItem('Token')
    localStorage.removeItem("RefreshToken")
    localStorage.removeItem("LastRefreshTime")
    localStorage.removeItem("HasBeenLoggedIn")

}