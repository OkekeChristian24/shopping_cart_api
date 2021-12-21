# Shopping cart API
This is a documentation of an implemented shopping cart of an arbitrary ecommerce store

### Table of Content
  - [Procedure](#procedure)
  - [Carts endpoint](#carts)
  - [Cart Items endpoint](#cartitems)



<a name="procedure"/>

- ### Procedure

  - #### Adding to cart
    When a user tries to "add to cart", the following steps occur
      - Note: There is table for `carts` and also for `cart_items`
      - The endpoint `/api/cartitem/:id` is called with `:id` as the id of the user. `product_id`, `quantity`, and `item_price` are sent as the request body. The algorithm checks if the product is in the products table. It returns `product does not exist` message if it does not.
      - If the product exists, it check if the user has a cart created already. It creates a new cart if there is none for the user.
      - With the cart's id (id on the cart's table), the product is added to the cart items table. If it was an already existing cart that was used, the cart details are updated with the product item details (quantity, price)
  - #### Increasing and decreasing cart item quantity in a cart
    When the quantity of a product in a cart is increased or reduced, the following happens
      - `/api/cartitem/inc/:id` (increase) or `/api/cartitem/dec/:id` (decrease) is called for the process. The `:id` is the id of the item on the cart item table. `quantity` sent as the request body is the amount to either increase or decrease the item's existing quantity with.
  - #### Updating the cart item with different values
      The endpoint `/api/cartitem/:id` is used update any item in the cart with new quantity value. `:id` is the id of the item in the cart item table. Request body parameters sent with the call are `cart_id`, `new_item_qty`, `new_total_qty`, and `new_total_price`. After the cart item quantity is updated, the cart table is also updated accordingly.
  - #### Removing product item from the cart
    To remove an item from the cart the endpoint `/api/cartitem/:id` is called with `:id` as the id of the item on the cart item table. This checks if the cart item exist on the cart item table. It removes it from the table and adjust the cart's data accordingly
  - #### Displaying the user's cart
    The endpoint `/api/cart/:id` retrieves the user's cart and all the product items associated with the cart. `:id` is the cart's id of the user. The algorithm checks if the cart id exists, then get all information about the cart. After which it also gets all the items in the cart.
  - #### Deleting a user's cart
    When the user needs to delete the cart with items in the it, the endpoint `/api/cart/:id` is used where `:id` is the id of the user's cart to delete. This endpoint deletes all the cart details from the cart's table and also removes the associated product items from the cart items table

<a name="carts"/>

<br />
<br />

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

<a name='cartitems' />

- ### Cart Items: `This is the API for managing the various products(items) in every user's cart`


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
        
