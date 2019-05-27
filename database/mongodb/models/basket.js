module.exports = 
    
    class Basket {
        /* We use underscore here, because the mongo convention is to use _id, when refering to external
           documents, so it's easier just to reflect that in the variable name here also. */
        constructor(user_id, products) {
            this.user_id = user_id
            this.products = products
        }
    
}