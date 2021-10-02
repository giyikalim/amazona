import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: 'Alim',
            email: 'admin@ibb.gov.tr',
            password: bcrypt.hashSync('123456', 8),
            isAdmin: true
        },
        {
            name: 'John',
            email: 'user@ibb.gov.tr',
            password: bcrypt.hashSync('123456', 8),
            isAdmin: false
        }
    ],
    products: [
        {
            name: "Nike Slim Shirt1",
            category: 'Shirts',
            image: '../images/p1.jpg',
            price: 100,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 1,
            description: 'High quality product'
        },
        {
            name: "Nike Slim Shirt2",
            category: 'Shirts',
            image: '../images/p1.jpg',
            price: 100,
            countInStock: 0,
            brand: 'Nike',
            rating: 0.5,
            numReviews: 10,
            description: 'High quality product'
        },
        {
            name: "Nike Slim Shirt3",
            category: 'Shirts',
            image: '../images/p1.jpg',
            price: 100,
            countInStock: 0,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 0,
            description: 'High quality product'
        },
        {
            name: "Nike Slim Shirt4",
            category: 'Shirts',
            image: '../images/p1.jpg',
            price: 100,
            countInStock: 20,
            brand: 'Nike',
            rating: 1.5,
            numReviews: 10,
            description: 'High quality product'
        },
        {
            name: "Nike Slim Shirt5",
            category: 'Shirts',
            image: '../images/p1.jpg',
            price: 100,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 1,
            description: 'High quality product'
        },
        {
            name: "Nike Slim Shirt6",
            category: 'Shirts',
            image: '../images/p1.jpg',
            price: 100,
            countInStock: 0,
            brand: 'Nike',
            rating: 3.5,
            numReviews: 10,
            description: 'High quality product'
        }
    ]
}


export default data;