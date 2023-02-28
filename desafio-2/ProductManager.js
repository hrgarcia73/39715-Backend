import fs from "fs";

class ProductManager {


    constructor(){
        this.products = [];
    }

    addProduct = (title, description, price, thumbnail, code, stock) =>{
        //validacion de campo code 
        if (!this.#validField(code)){
            return("addProduct: El valor del campo code no es valido");
        }
       
        // verificacion de que el campo code no se repida
        const product = this.products.find((product) => product.code === code);
        if (product){
            return("addProduct: El codigo " + `${code}` +" ya existe");
        }
 
        //Validacion de campos obligatorios
        if (!this.#validField(title)){
            return("addProduct: El valor del campo title no es valido");
        }
        if (!this.#validField(description)){
            return("addProduct: El valor del campo description no es valido");
        }
        if (!this.#validField(price)){
            return("addProduct: El valor del campo price no es valido");
        }
        if (!this.#validField(thumbnail)){
            return("addProduct: El valor del campo thumbnail no es valido");
        }
        if (!this.#validField(stock)){
            return("addProduct: El valor del campo stock no es valido");
        }

        const newProduct = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }
        this.products.push(newProduct);

        return("addProduct: Producto agregado con exito")
    }

    getProducts = () =>{
        return this.products; 
    }

    getProductById = (id) =>{
        const productId = this.products.findIndex((product) => product.id === id);

        if (productId === -1){
            return("getProductById: id de producto no encontrado");
        }
        return this.products[productId];
    }

    deleteProduct = (id) =>{

    }

    #validField = (field) =>{
        //funcion que valida el contenido de los campos
        if( field == null || field.length == 0 || /^\s+$/.test(field) ) {
            return false;
          }
          return true;
    }
}

/*TESTING*/
//Creacion de la instancia.
const productsManger = new ProductManager();

//llamada al metodo getProducts() esperando el objeto vacio.
console.log(productsManger.getProducts());

//Llamada al metodo addProduct para cargar el primer producto.
console.log(productsManger.addProduct("Producto1","un producto" ,105.7,"producto1.png","ABC123",35));

//Llamada a getProducts() esperando el objeto con el producto creado.
console.log(productsManger.getProducts());

//Llamada al metodo addProduct para cargar el segundo producto esperando 
//el mensaje de error por tener el mismo valor en el campo code.
console.log(productsManger.addProduct("Producto1","un producto" ,105.7,"producto1.png","ABC123",35));

//Agrego segundo producto
console.log(productsManger.addProduct("Producto2","otro producto" ,26.5,"producto2.png","ABC126",22));

//llamada a getProductById() con id valido.
console.log(productsManger.getProductById(1));

//llamada a getProductById() con id no valido para que de error.
console.log(productsManger.getProductById(3));