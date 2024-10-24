import axios from '../utils/axios-customize';

export const callRegister = (username, email, password, phone) => {
    return axios.post('/api/v1/auth/register', { username, email, password, phone })
}

export const callLogin = (username, password) => {
    return axios.post('/api/v1/auth/login', { username, password })
}

export const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account')
}

export const callLogout = () => {
    return axios.post('/api/v1/auth/logout')
}

export const callFetchListAccountWithPagination = (query) => {
    // current=1&pageSize=3
    return axios.get(`/api/v1/accounts?${query}`)
}

export const callCreateAUser = (username, password, email, phone, role) => {
    return axios.post('/api/v1/account', { username, password, email, phone, role: { id: role } })
}

export const callBulkCreateUser = (data) => {
    return axios.post('/api/v1/account/bulk-create', data)
}

export const callUpdateUser = (id, username, phone, role) => {
    return axios.put('/api/v1/account', { id, username, phone, role: { id: role } })
}

export const callDeleteUser = (id) => {
    return axios.delete(`/api/v1/account/${id}`)
}

///////////////////////

export const callFetchListBook = (query) => {
    return axios.get(`/api/v1/books?${query}`)
}


export const callFetchCategory = () => {
    return axios.get('/api/v1/categories');
}

export const callCreateBook = (thumbnail, slider, mainText, author, price, sold, quantity, categories) => {
    return axios.post('/api/v1/book', {
        thumbnail, slider, mainText, author, price, sold, quantity, category: { id: categories }
    })
}

export const callUpdateBook = (id, thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.put(`/api/v1/book/${id}`, {
        thumbnail, slider, mainText, author, price, sold, quantity, category: { id: category }
    })
}

export const callUploadBookImg = (file, folder) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    bodyFormData.append('folder', 'book');

    return axios({
        method: 'post',
        url: '/api/v1/files',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const callDeleteBook = (id) => {
    return axios.delete(`/api/v1/book/${id}`);
}

export const callFetchBookById = (id) => {
    return axios.get(`api/v1/book/${id}`)
}

export const callPlaceOrder = (data) => {
    return axios.post('/api/v1/order', {
        ...data
    })
}

export const callOrderHistory = (accountId) => {
    return axios.get(`/api/v1/order/history/${accountId}`);
}

export const callUpdateAvatar = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', fileImg);
    bodyFormData.append('folder', 'avatar');

    return axios({
        method: 'post',
        url: '/api/v1/files',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const callUpdateUserInfo = (id, phone, username, avatar) => {
    return axios.put(`/api/v1/account`, {
        id, phone, username, avatar
    })
}

export const callUpdatePassword = (email, oldPassword, newPassword) => {
    return axios.post(`/api/v1/account/change-password`, {
        email, oldPassword, newPassword
    })
}

export const callFetchDashboard = () => {
    return axios.get('/api/v1/database/dashboard')
}

export const callFetchListOrder = (query) => {
    return axios.get(`/api/v1/order?${query}`)
}

export const callTestAPi = () => {
    return axios.get('/test');
}

export const callAddBookToCart = (email, bookId, quantity) => {
    return axios.post('/api/v1/cart/add', { email, bookId, quantity })
}

export const callUpdateQuantityBookInCart = (cartId, cartItemId, quantity) => {
    return axios.put('/api/v1/cart/update', { cartId, cartItemId, quantity })
}

export const callDeleteItemInCart = (cartItemId) => {
    return axios.delete(`/api/v1/cart/delete/${cartItemId}`);
}

export const callListRole = () => {
    return axios.get('/api/v1/role');
}
