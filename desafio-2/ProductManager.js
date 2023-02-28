import fs from "fs";

export default class ProductManager {
    
    constructor(path){
        //this.products = [];
        this.path = path;
    }

    addProduct = async (product) =>{
        //validacion de campo code 
        if (!this.#validField(product.code)){
            return("addProduct: El valor del campo code no es valido");
        }
       
        const products = await this.getProducts();

        // verificacion de que el campo code no se repida
        const auxProduct = products.find((product) => product.code === product.code);
        if (auxProduct){
            return("addProduct: El codigo " + `${product.code}` +" ya existe");
        }
 
        //Validacion de campos obligatorios
        if (!this.#validField(product.title)){
            return("addProduct: El valor del campo title no es valido");
        }
        if (!this.#validField(product.description)){
            return("addProduct: El valor del campo description no es valido");
        }
        if (!this.#validField(product.price)){
            return("addProduct: El valor del campo price no es valido");
        }
        if (!this.#validField(product.thumbnail)){
            return("addProduct: El valor del campo thumbnail no es valido");
        }
        if (!this.#validField(product.stock)){
            return("addProduct: El valor del campo stock no es valido");
        }

        if (products.length === 0){
            product.id = 1;
        } else {
            product.id = products[products.length-1].id + 1;
        }

        products.push(product);

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));

        return("addProduct: Producto agregado con exito")
    }

    getProducts = async () =>{

        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(data);
            return products;
        } else {
            return [];
        }
         
    }

    getProductById = async (id) =>{
        
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(data);

            const productId = products.findIndex((product) => product.id === id);

            if (productId === -1){
                return("getProductById: id de producto no encontrado");
            }
            return products[productId];

        } else {
            return("getProductById: archivo no encontrado");
        }
    }

    deleteProduct = async (id) =>{

    }

    updateProduct = async (id) =>{

    }

    #validField = (field) =>{
        //funcion que valida el contenido de los campos
        if( field == null || field.length == 0 || /^\s+$/.test(field) ) {
            return false;
          }
          return true;
    }
}
