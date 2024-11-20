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

export const callUpdateUser = (id, email, username, phone, role) => {
    return axios.put('/api/v1/account', { id, email, username, phone, role: { id: role } })
}

export const callDeleteUser = (id) => {
    return axios.delete(`/api/v1/account/${id}`)
}

///////////////////////

export const callFetchListBook = (query) => {
    return axios.get(`/api/v1/books?${query}`)
}

export const callFetchListBookNoPagination = () => {
    return axios.get(`/api/v1/booksNoPagination`)
}




export const callFetchCategory = () => {
    return axios.get('/api/v1/categories');
}

export const callCreateBook = (thumbnail, mainText, author, price, sold, quantity, categories, bookImages) => {
    return axios.post('/api/v1/book', {
        thumbnail, mainText, author, price, sold, quantity, category: { id: categories }, bookImages
    })
}

export const callUpdateBook = (id, thumbnail, mainText, author, price, sold, quantity, category, bookImages) => {
    return axios.put(`/api/v1/book/${id}`, {
        thumbnail, mainText, author, price, sold, quantity, category: { id: category }, bookImages
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
    return axios.get(`api/v1/books/${id}`)
}

export const callPlaceOrder = (data) => {
    return axios.post('/api/v1/order', {
        ...data
    })
}

export const callOrderHistory = (id) => {
    return axios.get(`/api/v1/order/history/${id}`);
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

export const callUpdateUserInfo = (id, email, phone, username, avatar) => {
    return axios.put(`/api/v1/account`, {
        id, email, phone, username, avatar, role: { id: 2 }
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

export const callFetchCustomerWithPagination = (query) => {
    return axios.get(`/api/v1/customers?${query}`);
}

export const callCreateCustomer = (name, address, phone, email, gender, birthday) => {
    return axios.post('/api/v1/customer', { name, address, phone, email, gender, birthday })
}

export const callDeleteCustomer = (id) => {
    return axios.delete(`/api/v1/customer/${id}`)
}

export const callUpdateCustomer = (id, name, address, phone, email, gender, birthday) => {
    return axios.put('/api/v1/customer', { id, name, address, phone, email, gender, birthday })
}

export const callFetchEmployeeWithPagination = (query) => {
    return axios.get(`/api/v1/employees?${query}`);
}

export const callCreateEmployee = (fullName, address, phone, email, hireDate, salary) => {
    return axios.post('/api/v1/employee', { fullName, address, phone, email, hireDate, salary })
}

export const callUpdateEmployee = (id, fullName, address, phone, email, hireDate, salary) => {
    return axios.put('/api/v1/employee', { id, fullName, address, phone, email, hireDate, salary })
}

export const callDeleteEmployee = (id) => {
    return axios.delete(`/api/v1/employee/${id}`)
}

export const callFetcListShippingStatus = () => {
    return axios.get('/api/v1/shippingStatus');
}

export const callCreateOrder = (receiverName, email, receiverAddress, receiverPhone, totalPrice, status, rqProducts) => {
    return axios.post('/api/v1/order/create', { receiverName, email, receiverAddress, receiverPhone, totalPrice, statusId: status, orderItems: rqProducts })
}

export const callUpdateOrder = (id, status, note) => {
    return axios.put('/api/v1/order', { id, statusId: status, note })
}

export const callFetchListSupplier = () => {
    return axios.get('/api/v1/suppliers');
}

export const callFetchSupplierById = (id) => {
    return axios.get(`/api/v1/supplier/${id}`);
}

export const callSupplyBySupplierIDAndBookID = (supplierID, bookID) => {
    return axios.post(`/api/v1/fetch-supply`, { supplierID, bookID });
}

export const callFetchAllImportReceipt = (query) => {
    return axios.get(`/api/v1/receipts?${query}`);
}

export const callCreateImportReceipt = (employeeEmail, totalPrice, rqProducts) => {
    return axios.post('/api/v1/receipt', { employeeEmail: employeeEmail, totalPrice, importReceiptItems: rqProducts });
}

export const callFetchBookBySupplierId = (id) => {
    return axios.get(`/api/v1/supplier/${id}/books`);
}

export const callUpdateImportReceipt = (id, employeeEmail, totalPrice, rqProducts) => {
    return axios.put('/api/v1/receipt', { id, employeeEmail, totalPrice, importReceiptItems: rqProducts });
}

export const callFetchAllSupplyWithPagination = (query) => {
    return axios.get(`/api/v1/supplies?${query}`);
}

export const callCreateSupply = (supplierID, bookID, supplyPrice) => {
    return axios.post('/api/v1/supply', { supplier: { id: supplierID }, book: { id: bookID }, supplyPrice });
}

export const callDeleteSupply = (id) => {
    return axios.delete(`/api/v1/supply/${id}`);
}

export const callUpdateSupply = (id, supplierID, bookID, supplyPrice) => {
    return axios.put('/api/v1/supply', { id, supplier: { id: supplierID }, book: { id: bookID }, supplyPrice });
}

export const callFetchAllSupplierWithPagination = (query) => {
    return axios.get(`/api/v1/suppliers-pagination?${query}`);
}

export const callFetchSupplyBySupplierId = (id) => {
    return axios.get(`/api/v1/supplier/${id}/supplies`);
}

export const callCreateASupplier = (name, address, phone, email) => {
    return axios.post('/api/v1/supplier', { name, address, phone, email });
}

export const callUpdateSupplier = (id, name, address, phone, email) => {
    return axios.put('/api/v1/supplier', { id, name, address, phone, email });
}

export const callDeleteSupplier = (id) => {
    return axios.delete(`/api/v1/supplier/${id}`);
}

export const callFetchAllPermission = (query) => {
    return axios.get(`/api/v1/permissions?${query}`);
}

export const callCreatePermission = (name, apiPath, method, module) => {
    return axios.post('/api/v1/permissions', { name, apiPath, method, module });
}

export const callUpdatePermission = (id, name, apiPath, method, module) => {
    return axios.put('/api/v1/permissions', { id, name, apiPath, method, module });
}

export const callDeletePermission = (id) => {
    return axios.delete(`/api/v1/permissions/${id}`);
}

export const callFetchAllRoleWithPagination = (query) => {
    return axios.get(`/api/v1/roles?${query}`);
}

export const callCreateRole = (name, description, permissions) => {
    return axios.post('/api/v1/role', { name, description, permissions });
}

export const callUpdateRole = (id, name, description, permissions) => {
    return axios.put('/api/v1/role', { id, name, description, permissions });
}

export const callDeleteRole = (id) => {
    return axios.delete(`/api/v1/role/${id}`);
}

export const callFetchListPermissionNoPagination = () => {
    return axios.get('/api/v1/permissions-no-pagination');
}

export const callFetchPermissionById = (id) => {
    return axios.get(`/api/v1/permissions/${id}`);
}

export const callFetchPermissionByName = (name) => {
    return axios.get(`/api/v1/permissions-name?name=${name}`);
}

export const callFetchRevenue = (year) => {
    return axios.get(`/api/v1/monthly-revenue?year=${year}`);
}

export const callGetTop5BestBuyer = () => {
    return axios.get('/api/v1/top5-customers');
}

export const callRevenueBookArePlaced = (dateStart, dateFinish) => {
    return axios.get(`/api/v1/sold-books?startDate=${dateStart}&endDate=${dateFinish} 23:59:59`);
}

export const callFetchInvoiceByCustomerId = (customerId) => {
    return axios.get(`/api/v1/customers/${customerId}/invoices`);
}

export const callFetchAllCategoryAndQuantityBookAreSold = () => {
    return axios.get('/api/v1/dashboard/view1');
}

export const callFetchTop5BookAreSold = () => {
    return axios.get('/api/v1/dashboard/get-top5-books-sold');
}

export const callFetchView6 = () => {
    return axios.get('/api/v1/dashboard/view6');
}

export const callFetchGenderRatio = () => {
    return axios.get('/api/v1/dashboard/view9');
}