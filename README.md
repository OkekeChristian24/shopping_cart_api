# Shopping cart API
This is a documentation of an implemented shopping cart of an arbitrary ecommerce store

- ### Carts: `for retrieving and deleting users cart`


  ### Endpoints
  - `GET` `/api/cart/:id` `retrieve the user's cart`
      - ### Request
        - ##### Content-Type: application/json
        - ##### Path parameters
          `:id` `number` `id of the cart of the user` `required`
      - ### Request example
          `http://localhost:5000/api/cart/2`
      - ### Response example
          ```javascript
            {
              "success": 1,
              "data": {
                  "id": 20,
                  "user_id": 1,
                  "total_quantity": 3,
                  "total_price": 1605.08,
                  "items": [
                      {
                          "id": 1,
                          "cart_id": 20,
                          "product_id": 1,
                          "quantity": 1,
                          "name": "iPhone 13 pro max",
                          "description": "Apple&#x27;s ultimate phone for the season",
                          "category": "phone",
                          "price": 1000
                      },
                      {
                          "id": 3,
                          "cart_id": 20,
                          "product_id": 3,
                          "quantity": 2,
                          "name": "Sony air conditioner",
                          "description": "Cool breeze conditioner",
                          "category": "appliances",
                          "price": 302.54
                      }
                  ]
              }
          }
          ```
          
      - ### Response schema
        | Response item | Description | Data type |
        | :---         |     :---:      |          ---: |
        | success   | Specifies if the request was successful and returned the requested data. It is 1 for a successful request and 0 for a failed request    | Integer    |
        | data   | The requested data       | Object      |
        | data/id     | The id of the user's cart      | Integer   |
        | data/user_id     | The id of the user       | Integer      |
        | data/total_quantity    | The total number of products in the cart       | Integer    |
        | data/total_price     | The total price for all the product items found in the cart      | Decimal     |
        | data/items    | A list of the product items in the cart       | Array |
        | data/items/id     | The id of the cart item       | Integer      |
        | data/items/cart_id     | The id of the cart       | Integer     |
        | data/items/product_id     | The id of the product       | Integer  |
        | data/items/quantity    | The quantity or number of the product in the cart     | Integer   |
        | data/items/name     | Name for the product     | String     |
        | data/items/description  | It gives details about the product       | String    |
        | data/items/category   | The category the product belongs to     | String |
        | data/items/price  | Price of the product       | Decimal |
        
   - `DELETE` `/api/cart/:id` `deletes the user's cart`
      - ### Request
        - ##### Content-Type: application/json
        - ##### Path parameters
          `:id` `number` `id of the cart of the user` `required`
      - ### Request example
          `http://localhost:5000/api/cart/2`
      - ### Response example
          ```javascript
            {
              "success": 1,
              "message": "Cart deleted successfully"
          }
          ```
          
      - ### Response schema
        | Response item | Description | Data type |
        | :---         |     :---:      |          ---: |
        | success   | Specifies if the request was successful and returned the requested data. It is 1 for a successful request and 0 for a failed request    | Integer    |
        | message   | Gives information on the result of the request      | String      |
        



<br />
<br />

- ### Cart Item: `This is the API for managing the various products(items) in every user's cart`


  ### Endpoints
  - `POST` `/api/cartitem/:id` `Adds item to a user's cart. New cart is created if there's none`
      - ### Request
        - ##### Content-Type: application/json
        - ##### Path parameters
          `:id` `number` `id of the user` `required`
        - ##### Request body
          `product_id` `id the product item` `required`
          <br />
          `quantity` `quantity of the product item` `required`
          <br />
          `item_price` `price of the product` `required`
          <br />
      - ### Request example
          `http://localhost:5000/api/cartitem/1`
      - ### Response example
          ```javascript
            {
              "success": 1,
              "message": "Item added to cart"
          }
          ```
          
      - ### Response schema
        | Response item | Description | Data type |
        | :---         |     :---:      |          ---: |
        | success   | Specifies if the request was successful and returned the requested data. It is 1 for a successful request and 0 for a failed request    | Integer    |
        | message   | Gives information on the result of the request       | String      |
        
   - `PUT` `/api/cartitem/:id` `updates the quantity of an item in the user's cart with new quantity`
      - ### Request
        - ##### Content-Type: application/json
        - ##### Path parameters
          `:id` `number` `id of the cart item` `required`
        - ##### Request body
          `cart_id` `id of the cart of the user` `required`
          <br />
          `new_item_qty` `the new quantity of the product item` `required`
          <br />
          `new_total_qty` `the total item quantity to be updated with cart` `required`
          <br />
          `new_total_price` `the new total price as a result of the change in quantity of items` `required`
      - ### Request example
          `http://localhost:5000/api/cartitem/3`
      - ### Response example
          ```javascript
            {
              "success": 1,
              "message": "Cart updated successfully"
          }
          ```
          
      - ### Response schema
        | Response item | Description | Data type |
        | :---         |     :---:      |          ---: |
        | success   | Specifies if the request was successful and returned the requested data. It is 1 for a successful request and 0 for a failed request    | Integer    |
        | message   | Gives information on the result of the request      | String      |
   
   - `PUT` `/api/cartitem/inc/:id` `increases the quantity of an item in the user's cart with the given quantity`
      - ### Request
        - ##### Content-Type: application/json
        - ##### Path parameters
          `:id` `number` `id of the cart item in the user's cart` `required`
        - ##### Request body
          `quantity` `the amount to increase the cart item with in the user's cart` `required`
      - ### Request example
          `http://localhost:5000/api/cartitem/inc/3`
      - ### Response example
          ```javascript
            {
              "success": 1,
              "message": "Cart item increased"
          }
          ```
          
      - ### Response schema
        | Response item | Description | Data type |
        | :---         |     :---:      |          ---: |
        | success   | Specifies if the request was successful and returned the requested data. It is 1 for a successful request and 0 for a failed request    | Integer    |
        | message   | Gives information on the result of the request      | String      |
   
   
   - `PUT` `/api/cartitem/dec/:id` `decreases the quantity of an item in the user's cart by the given quantity`
      - ### Request
        - ##### Content-Type: application/json
        - ##### Path parameters
          `:id` `number` `id of the cart item in the user's cart` `required`
        - ##### Request body
          `quantity` `the amount to decrease the cart item with in the user's cart` `required`
      - ### Request example
          `http://localhost:5000/api/cartitem/inc/3`
      - ### Response example
          ```javascript
            {
              "success": 1,
              "message": "Cart item decreased"
          }
          ```
          
      - ### Response schema
        | Response item | Description | Data type |
        | :---         |     :---:      |          ---: |
        | success   | Specifies if the request was successful and returned the requested data. It is 1 for a successful request and 0 for a failed request    | Integer    |
        | message   | Gives information on the result of the request      | String      |
   
   
   - `DELETE` `/api/cartitem/:id` `deletes the user's cart`
      - ### Request
        - ##### Content-Type: application/json
        - ##### Path parameters
          `:id` `number` `id of the cart item in the user's cart` `required`
      - ### Request example
          `http://localhost:5000/api/cartitem/2`
      - ### Response example
          ```javascript
            {
              "success": 1,
              "message": "Cart item deleted successfully"
          }
          ```
          
      - ### Response schema
        | Response item | Description | Data type |
        | :---         |     :---:      |          ---: |
        | success   | Specifies if the request was successful and returned the requested data. It is 1 for a successful request and 0 for a failed request    | Integer    |
        | message   | Gives information on the result of the request      | String      |
        
