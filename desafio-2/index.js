import ProductManager from './ProductManager.js';



/*TESTING*/
//Creacion de la instancia.
const productManager = new ProductManager('./files/products.json');

//llamada al metodo getProducts() esperando el objeto vacio.
//console.log(await productManager.getProducts());

//Llamada al metodo addProduct para cargar el primer producto.
/*
const newProduct = {
    title: "Producto3",
    description: "otro producto mas",
    price: 105.7,
    thumbnail: "producto3.png",
    code: "DEF789",
    stock: 15,
}
console.log(await productManager.addProduct(newProduct));
*/

//Llamada a getProducts() esperando el objeto con el producto creado.
//console.log(await productManager.getProducts());

//llamada a getProductById() con id valido.
//console.log(await productManager.getProductById(1));

const updateProduct = {
    title: "Producto1",
    description: "un producto",
    price: 105.7,
    thumbnail: "producto1.png",
    code: "ABC123",
    stock: 45,
}
console.log(await productManager.updateProduct(1, updateProduct));

//Llamada a deleteProduct(id) esperando el objeto eliminado.
//console.log(await productManager.deleteProduct(3));
