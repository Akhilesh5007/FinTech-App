import React from "react";

const JewelryList = ({ items = [], onEdit, onDelete }) => {
  
  if (!items || items.length === 0) return <p>No jewelry items yet.</p>;
  return (
    <div className="text-center">
     <table className="table table-striped">
    <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">PRICE</th>
      <th scope="col">Add item</th>
      <th scope="col">Delete item</th>
      
    </tr>
    </thead>
    <tbody>
       {
        items.map((item,indx)=>{
            return<tr key={'tr'+indx}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td><button className="btn btn-success" onClick={() => onEdit && onEdit(item)}>Edit</button></td>
                  <td><button className="btn btn-danger" onClick={() => onDelete && onDelete(item.id)}>Delete</button></td>
            </tr>
        })  
    }
  </tbody>
</table>
      
    </div>
  );
};

export default JewelryList;


{/* <ul>
        {items.map(item => (
          <li key={item.id} style={{ marginBottom: 8 }}>
            <strong>{item.name}</strong> ({item.type}) — ₹{item.price ?? item.value ?? 0}
            <button style={{ marginLeft: 8 }} onClick={() => onEdit && onEdit(item)}>Edit</button>
            <button style={{ marginLeft: 6, color: "red" }} onClick={() => onDelete && onDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul> */}