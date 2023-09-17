const enviroment = {
    api: {
        products: {
            url: "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74",
            endpoint: { }
        },
        common: {
            url: 'https://ecommerce-f204f-default-rtdb.asia-southeast1.firebasedatabase.app',
            endpoint: {
                order: 'orders.json',
                user: 'users.json',
            }
        }
    }
}

export default enviroment;