const menus = [
    {
        name: 'Category',
        id: 'category',
        path: '/admin/categories',
        icon: 'fas fa-th',
        subMenus: [
            {
                name: 'List Category',
                id: 'list-category',
                path: '/admin/categories',
                icon: 'far fa-circle nav-icon',
            },
            {
                name: 'Add Category',
                id: 'add-category',
                path: '/admin/categories/create',
                icon: 'far fa-circle nav-icon',
            },
        ],
    },
    {
        name: 'Product',
        id: 'product',
        path: '/admin/products',
        icon: 'fas fa-th',
        subMenus: [
            {
                name: 'List Product',
                id: 'list-product',
                path: '/admin/products',
                icon: 'far fa-circle nav-icon',
            },
            {
                name: 'Add Product',
                id: 'add-product',
                path: '/admin/products/create',
                icon: 'far fa-circle nav-icon',
            },
        ],
    },
];

module.exports = menus;
