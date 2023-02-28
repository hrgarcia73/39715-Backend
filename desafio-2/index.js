import ProductManager from './ProductManager.js';



/*TESTING*/
//Creacion de la instancia.
const productManager = new ProductManager('./files/products.json');

//llamada al metodo getProducts() esperando el objeto vacio.
console.log("llamada a getProducts() pro primera vez")

//Llamada al metodo addProduct para cargar el primer producto.
const newProduct = {
    title: "Producto1",
    description: "un producto",
    price: 105.7,
    thumbnail: "producto1.png",
    code: "ABC123",
    stock: 35,
}
console.log(await productManager.addProduct(newProduct));


//Llamada a getProducts() esperando el objeto con el producto creado.
console.log(await productManager.getProducts());

//llamada a getProductById() con id valido.
console.log(await productManager.getProductById(1));

/*
//Llamada al metodo addProduct para cargar el segundo producto esperando 
//el mensaje de error por tener el mismo valor en el campo code.
console.log(await productManager.addProduct("Producto1","un producto" ,105.7,"producto1.png","ABC123",35));

//Agrego segundo producto
console.log(await productManager.addProduct("Producto2","otro producto" ,26.5,"producto2.png","ABC126",22));



//llamada a getProductById() con id no valido para que de error.
console.log(await productManager.getProductById(3));
*/