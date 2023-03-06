/*
    DESAFIO 3 - SERVIDOR EXPRESS
    Se trata de un servidor express simple.

    /productos : muestra todos los productos que hay en el archivo de productos.

    /productoRandom : muestra un producto cuyo id fue generado al azar.
*/
//importamos la clase contenedor
import ProductManager from '../ProductManager.js';

//importamos express
import express from 'express';
const app = express();
const port = process.env.PORT || 8080;

//Creacion de la instancia.
const productManager = new ProductManager('./files/products.json');

//Instacio el objeto clase contenedor
app.get('/', (req, res) => {
    res.send("Desafío 3 - /products, devuelve todos los productos.\n  /products?limit=x devuelve los primeros (x) items \n y /product/z, devuelve el producto cuyo id=(z)")
  })

app.get('/products', async(req, res) => {
  //Tomo la cantidad del query
  let limit = req.query.limit
  const products = await productManager.getProducts();

  if (!limit) {
      /* Pido todos los productos */
      res.send(products);
  } else {

    const queryProducts = products.slice(0,limit)

    res.send(queryProducts);
  }
  
})

app.get('/product/:id', async(req, res) => { 
    //Tomo el id de los parámetros
    //Convierto a numero para que no se me queje la clase
    let productId = Number(req.params.id); 

    /* Pido el producto con id generado de manera aleatoria */
    const producto = await productManager.getProductById(productId);

    res.send(producto);
    
  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})