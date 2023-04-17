const addProductForm = document.getElementById('add-product-form');
const adjustStockForm = document.getElementById('adjust-stock-form');
const productList = document.getElementById('product-list');


const addProduct = async (event) => {
    event.preventDefault();
    const name = addProductForm.elements['name'].value;
    const description = addProductForm.elements['description'].value;
    const brandName = addProductForm.elements['brandName'].value;
    const salePrice = addProductForm.elements['salePrice'].value;
    const stockQuantity = addProductForm.elements['stockQuantity'].value;

    let product = {
        productId:Math.floor(Math.random()*100000),
        description: description,
        brandName: brandName,
        salePrice: salePrice,
        stockQuantity: stockQuantity,
        name: name
    }
    let data = await saveProduct(product);
    console.log(data);
  }

const saveProduct = async (product) => {
    let objBody = {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(product),
    }
  
    let data = await fetch('https://productorderdetailapplication-production.up.railway.app/product/save', objBody)
    let response = await data.json();
    return response;
  }


const adjustStock = async (event) => {
    event.preventDefault();
    const productId = adjustStockForm.elements['productId'].value;
    const newStockQuantity = adjustStockForm.elements['newStockQuantity'].value;

    let option = {
        method: "PATCH",
        headers:{"Content-type":"application/json"}
    }

    let data = await fetch(`https://productorderdetailapplication-production.up.railway.app/product/${productId}/${newStockQuantity}`, option);
    let response = await data.json();
    console.log(response);
    
}

const listProducts = async () =>{
    let products = await  fetch('https://productorderdetailapplication-production.up.railway.app/product/all');
    let data = await products.json();
        console.log(data);
        productList.innerHTML = '';
            data.forEach(product => {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(`ID: ${product.productId}, Name: ${product.name}, Description: ${product.description}, Brand Name: ${product.brandName}, Sale Price: ${product.salePrice}, Stock Quantity: ${product.stockQuantity}`));
                productList.appendChild(li);
            });
}



addProductForm.addEventListener('submit', addProduct);
adjustStockForm.addEventListener('submit', adjustStock);
let listProductsButton = document.getElementById("list-products-btn").addEventListener('click', listProducts);