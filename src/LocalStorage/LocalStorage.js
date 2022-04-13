function storeDataAuth(data) {
    console.log(data.tokens.access.token)
    console.log(data.user.username)

    localStorage.setItem('tokenAccess',`${data.tokens.access.token}`)
    localStorage.setItem('expiresAccess',`${data.tokens.access.expires}`)
    localStorage.setItem('tokenRefresh',`${data.tokens.refresh.token}`)
    localStorage.setItem('expiresRefresh',`${data.tokens.access.expires}`)
    localStorage.setItem('userName',`${data.user.username}`)
    localStorage.setItem('role',`${data.user.role}`)
}

function RemoveDataAuth() {
    localStorage.removeItem('tokenAccess')
    localStorage.removeItem('expiresAccess')
    localStorage.removeItem('tokenRefresh')
    localStorage.removeItem('expiresRefresh')
    localStorage.removeItem('userName')
    localStorage.removeItem('role')
}

export default {storeDataAuth,RemoveDataAuth};