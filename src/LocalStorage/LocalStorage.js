function storeDataAuth(data) {
    console.log(data.tokens.access.token)
    console.log(data.user.username)

    localStorage.setItem('tokenAccess',`${data.tokens.access.token}`)
    localStorage.setItem('expiresAccess',`${data.tokens.access.expires}`)
    localStorage.setItem('tokenRefresh',`${data.tokens.refresh.token}`)
    localStorage.setItem('expiresRefresh',`${data.tokens.access.expires}`)
    localStorage.setItem('userName',`${data.user.username}`)
}

export default {storeDataAuth};