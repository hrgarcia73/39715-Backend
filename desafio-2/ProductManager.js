import fs from "fs";

export default class ProductManager {
    
    constructor(path){
        this.path = path;
    }

    addProduct = async (newProduct) =>{
        //validacion de campo code 
        if (!this.#validField(newProduct.code)){
            return("addProduct: El valor del campo code no es valido");
        }
       
        const products = await this.getProducts();

        // verificacion de que el campo code no se repida
        const auxProduct = products.find((product) => product.code === newProduct.code);
        if (auxProduct){
            return("addProduct: El codigo " + `${newProduct.code}` +" ya existe");
        }
 
        //Validacion de campos obligatorios
        if (!this.#validField(newProduct.title)){
            return("addProduct: El valor del campo title no es valido");
        }
        if (!this.#validField(newProduct.description)){
            return("addProduct: El valor del campo description no es valido");
        }
        if (!this.#validField(newProduct.price)){
            return("addProduct: El valor del campo price no es valido");
        }
        if (!this.#validField(newProduct.thumbnail)){
            return("addProduct: El valor del campo thumbnail no es valido");
        }
        if (!this.#validField(newProduct.stock)){
            return("addProduct: El valor del campo stock no es valido");
        }

        if (products.length === 0){
            newProduct.id = 1;
        } else {
            newProduct.id = products[products.length-1].id + 1;
        }

        products.push(newProduct);

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
        const products = await this.getProducts();
        const productId = products.findIndex((product) => product.id === id);
        if (productId === -1){
            return ("deleteProduct: id de producto no encontrado");
        } else {
            const auxProducts = [...products];
            const deletedProduct = auxProducts.splice(productId,1);

            await fs.promises.writeFile(this.path, JSON.stringify(auxProducts, null, "\t"));

            return ("deleteProduct: Producto eliminado con exito");
        }
    }

    updateProduct = async (id, updateProduct) =>{
        const products = await this.getProducts();
        const productId = products.findIndex((product) => product.id === id);
        if (productId === -1){
            return ("updateProduct: id de producto no encontrado");
        } else {
            const auxProducts = [...products];
            auxProducts[productId] = {...updateProduct, id};

            await fs.promises.writeFile(this.path, JSON.stringify(auxProducts, null, "\t"));

            return ("updateProduct: Producto actualizado con exito");
        }
        
    }

    #validField = (field) =>{
        //funcion que valida el contenido de los campos
        if( field == null || field.length == 0 || /^\s+$/.test(field) ) {
            return false;
          }
          return true;
    }
}
