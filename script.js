const form = document.querySelector("form");
const salesOrderList = document.getElementById('sales-order-list');

let orderDetailCount = 1;

document.getElementById("add_order_detail").addEventListener("click", () => {
  const orderDetailsDiv = document.getElementById("order_details");

  const newOrderDetailDiv = document.createElement("div");
  newOrderDetailDiv.className = "order_detail";

  newOrderDetailDiv.innerHTML = `
    <label for="product_id_${orderDetailCount}">Product ID:</label>
    <input type="number" id="product_id_${orderDetailCount}" name="product_id_${orderDetailCount}"><br><br>

    <label for="sale_quantity_${orderDetailCount}">Sale Quantity:</label>
    <input type="number" id="sale_quantity_${orderDetailCount}" name="sale_quantity_${orderDetailCount}"><br><br>

    <label for="discount_${orderDetailCount}">Discount:</label>
    <input type="number" id="discount_${orderDetailCount}" name="discount_${orderDetailCount}"><br><br>
<hr>
`;

  orderDetailsDiv.appendChild(newOrderDetailDiv);

  orderDetailCount++;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const salesId = parseInt(document.getElementById("sales_id").value);
  const customer = document.getElementById("customer").value;

  const orderDetails = [];

  const orderDetailDivs = document.querySelectorAll(".order_detail");
  orderDetailDivs.forEach((orderDetailDiv) => {
    const productId = parseInt(orderDetailDiv.querySelector("input[name^='product_id']").value);
    
    const saleQuantity = parseInt(orderDetailDiv.querySelector("input[name^='sale_quantity']").value);
    const discount = parseFloat(orderDetailDiv.querySelector("input[name^='discount']").value);

    const product = {
      "productId": productId,
      "description": "XXXX",
      "brandName": "brandName",
      "salePrice": 0,
      "stockQuantity": 0,
      "name": "productName"
    };

    const orderDetail = {
      "orderDet_Id": 0,
      "product": product,
      "saleQuantity": saleQuantity,
      "discount": discount
    };

    orderDetails.push(orderDetail);
  });

  const salesOrder = {
    "sales_Id": 0,
    "customer": customer,
    "timeStamp": new Date(),
    "orderDetails": orderDetails
  };

 
  let save = await saveSalesOrder(salesOrder);
  console.log(save);
  alert(JSON.stringify(save));
});

const saveSalesOrder = async (salesOrder) =>{
  let option = {
      method:"POST",
      headers:{"Content-type":"application/json"},
      body: JSON.stringify(salesOrder)
  }

  let data = await fetch('https://productorderdetailapplication-production.up.railway.app/salesOrder/add',option);
  let response = await data.json();
  return response;
}


const listSalesOrders = async () =>{
  let orders = await fetch("https://productorderdetailapplication-production.up.railway.app/salesOrder/all");
  let response = await orders.json();
  viewSalesOrder(response);
  console.log(response);
}


let viewSalesOrder =  (data) =>{
  salesOrderList.innerHTML = '';
  data.forEach(salesOrder => {
      const li = document.createElement("li");
          li.appendChild(document.createTextNode(`Sales Order Id :  ${salesOrder.sales_Id},Customer:${salesOrder.customer},TimeStamp: ${salesOrder.timeStamp}, Order Details : `));
              const ul = document.createElement('ul');
              salesOrder.orderDetails.forEach( orderDetails =>{
                  const li2 = document.createElement('li');
                  li2.appendChild(document.createTextNode(`Order Detail Id : ${orderDetails.orderDet_Id}, Sale Quantity : ${orderDetails.saleQuantity}, Sale Discount : ${orderDetails.discount},Product :`));
                  const li3 = document.createElement("ul");
                  let prod = orderDetails.product;
                  li3.appendChild(document.createTextNode(`Product id : ${prod.productId},  Name: ${prod.name}, Description: ${prod.description}, Brand Name: ${prod.brandName}, Sale Price: ${prod.salePrice}, Stock Quantity: ${prod.stockQuantity}`))
                  ul.append(li2);
                  ul.append(li3);
              } )
              li.append(ul);
      salesOrderList.append(li);
  } ) 

}

let listSalesOrdersButton = document.getElementById("list-sales-orders-btn").addEventListener('click', listSalesOrders);
