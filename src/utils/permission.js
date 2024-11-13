export const ALL_PERMISSIONS = {
    ACCOUNTS: {
        CREATE: { method: "POST", apiPath: '/api/v1/account', module: "ACCOUNTS" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/account', module: "ACCOUNTS" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/account/{id}', module: "ACCOUNTS" },
        GET_BY_ID: { method: "GET", apiPath: '/api/v1/account/{id}', module: "ACCOUNTS" },
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/accounts', module: "ACCOUNTS" },
        CHANGE_PASSWORD: { method: "POST", apiPath: '/api/v1/account/change-password', module: "ACCOUNTS" }
    },
    CATEGORIES: {
        GET: { method: "GET", apiPath: '/api/v1/categories', module: "CATEGORIES" }
    },
    BOOKS: {
        CREATE: { method: "POST", apiPath: '/api/v1/book', module: "BOOKS" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/book/{id}', module: "BOOKS" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/book/{id}', module: "BOOKS" },
        GET_BY_ID: { method: "GET", apiPath: '/api/v1/book/{id}', module: "BOOKS" },
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/books', module: "BOOKS" },
        GET_NO_PAGINATE: { method: "GET", apiPath: '/api/v1/booksNoPagination', module: "BOOKS" }
    },
    CARTS: {
        ADD_ITEM: { method: "POST", apiPath: '/api/v1/cart/add', module: "CARTS" },
        DELETE_ITEM: { method: "DELETE", apiPath: '/api/v1/cart/delete/{id}', module: "CARTS" },
        UPDATE_ITEM: { method: "PUT", apiPath: '/api/v1/cart/update', module: "CARTS" }
    },
    ORDERS: {
        CREATE: { method: "POST", apiPath: '/api/v1/order', module: "ORDERS" },
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/order', module: "ORDERS" },
        GET_HISTORY: { method: "GET", apiPath: '/api/v1/order/history/{id}', module: "ORDERS" },
        CREATE_ORDER: { method: "POST", apiPath: '/api/v1/order/create', module: "ORDERS" },
        UPDATE_ORDER: { method: "PUT", apiPath: '/api/v1/order', module: "ORDERS" }
    },
    DASHBOARD: {
        GET: { method: "GET", apiPath: '/api/v1/database/dashboard', module: "DASHBOARD" }
    },
    CUSTOMERS: {
        CREATE: { method: "POST", apiPath: '/api/v1/customer', module: "CUSTOMERS" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/customer', module: "CUSTOMERS" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/customer/{id}', module: "CUSTOMERS" },
        GET_BY_ID: { method: "GET", apiPath: '/api/v1/customer/{id}', module: "CUSTOMERS" },
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/customers', module: "CUSTOMERS" }
    },
    EMPLOYEES: {
        CREATE: { method: "POST", apiPath: '/api/v1/employee', module: "EMPLOYEES" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/employee', module: "EMPLOYEES" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/employee/{id}', module: "EMPLOYEES" },
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/employees', module: "EMPLOYEES" }
    },
    SHIPPINGSTATUS: {
        GET: { method: "GET", apiPath: '/api/v1/shippingStatus', module: "SHIPPINGSTATUS" }
    },
    SUPPLIERS: {
        CREATE: { method: "POST", apiPath: '/api/v1/supplier', module: "SUPPLIERS" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/supplier', module: "SUPPLIERS" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/supplier/{id}', module: "SUPPLIERS" },
        GET_BY_ID: { method: "GET", apiPath: '/api/v1/supplier/{id}', module: "SUPPLIERS" },
        GET_NO_PAGINATE: { method: "GET", apiPath: '/api/v1/suppliers', module: "SUPPLIERS" },
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/suppliers-pagination', module: "SUPPLIERS" },
        GET_BOOK_BY_SUPPLIER_ID: { method: "GET", apiPath: '/api/v1/supplier/{id}/books', module: "SUPPLIERS" },
        GET_SUPPLY_BY_SUPPLIER_ID: { method: "GET", apiPath: '/api/v1/supplier/{id}/supplies', module: "SUPPLIERS" }
    },
    SUPPLIES: {
        CREATE: { method: "POST", apiPath: '/api/v1/supply', module: "SUPPLIES" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/supply', module: "SUPPLIES" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/supply/{id}', module: "SUPPLIES" },
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/supplies', module: "SUPPLIES" },
        GET_BY_BOOK_AND_SUPPLIER: { method: "POST", apiPath: '/api/v1/fetch-supply', module: "SUPPLIES" }
    },
    IMPORTRECEIPTS: {
        CREATE: { method: "POST", apiPath: '/api/v1/receipt', module: "IMPORTRECEIPTS" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/receipt', module: "IMPORTRECEIPTS" },
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/receipts', module: "IMPORTRECEIPTS" }
    },
    FILES: {
        UPLOAD: { method: "GET", apiPath: '/api/v1/files', module: "FILES" }
    },
    PERMISSIONS: {
        CREATE: { method: "POST", apiPath: '/api/v1/permissions', module: "PERMISSIONS" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/permissions', module: "PERMISSIONS" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/permissions/{id}', module: "PERMISSIONS" },
        GET_BY_ID: { method: "GET", apiPath: '/api/v1/permissions/{id}', module: "PERMISSIONS" },
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/permissions', module: "PERMISSIONS" }
    },
    ROLES: {
        CREATE: { method: "POST", apiPath: '/api/v1/role', module: "ROLES" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/role', module: "ROLES" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/role/{id}', module: "ROLES" },
        GET_BY_ID: { method: "GET", apiPath: '/api/v1/role/{id}', module: "ROLES" },
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/roles', module: "ROLES" },
        GET_NO_PAGINATE: { method: "GET", apiPath: '/api/v1/role', module: "ROLES" }
    },
}

export const ALL_MODULES = {
    COMPANIES: 'COMPANIES',
    JOBS: 'JOBS',
    PERMISSIONS: 'PERMISSIONS',
    RESUMES: 'RESUMES',
    ROLES: 'ROLES',
    USERS: 'USERS',
    SUBSCRIBERS: 'SUBSCRIBERS',
    CATEGORIES: 'CATEGORIES',
    BOOKS: 'BOOKS',
    CARTS: 'CARTS',
    ORDERS: 'ORDERS',
    DASHBOARD: 'DASHBOARD',
    CUSTOMERS: 'CUSTOMERS',
    EMPLOYEES: 'EMPLOYEES',
    SHIPPINGSTATUS: 'SHIPPINGSTATUS',
    SUPPLIERS: 'SUPPLIERS',
    SUPPLIES: 'SUPPLIES',
    IMPORTRECEIPTS: 'IMPORTRECEIPTS',
    FILES: 'FILES'
}
