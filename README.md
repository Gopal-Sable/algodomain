# algodomain
here i used mongodb cloud version but it is very slow some time shows the server down if it is happening like that
then you can test it to localhost you need to change connection string only

1) to fetch all data
localhost:5000/api/products/fetch                 get


2)to add product->
localhost:5000/api/products/addproduct            post

product body should be as bellow
{
  "name":"lenevo",
  "productType":"laptop",
  "category":"Clothing",
  "basePrice":45000
  
}


3) to update product
localhost:5000/api/products/updateproduct/<product id here>        put
product body to update should be as bellow
{
  "name":"lenevo",
  "productType":"laptop",
  "category":"Clothing",
  "basePrice":45000
  
}


4) to delete Product
localhost:5000/api/products//deleteProduct/<product id here>        delete