import React from "react";

function Item({ item,updateItem,onDeleteItem }) {

  function handleDeleteClick(){
    fetch(` http://localhost:4000/items/${item.id}`,{
      method:"DELETE",
    })
    .then((res)=>res.json())
    .then(()=>onDeleteItem(item))
  }

  function handleAddToCartClick() {
    fetch(` http://localhost:4000/items/${item.id}`,{
      method:"PATCH",
      headers:{"content-Type":"application/json"},
      body:JSON.stringify({
        isInCart:!item.isInCart,
      }),
    })
    .then((res)=>res.json())
    .then((updatedItem)=>updateItem(updatedItem))
  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleAddToCartClick} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button  className="remove" onClick={handleDeleteClick} >Delete</button>
    </li>
  );
}

export default Item
