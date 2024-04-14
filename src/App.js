import { useState } from "react";
import "./index.css";
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "charger", quantity: 1, packed: true },
// ];
export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((items) => items.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAdditems={handleAddItems} />
      <PackingForm
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1>🌴 Far Away🎒</h1>;
}
function Form({ onAdditems }) {
  const [description, Setdescription] = useState("");
  const [quantity, Setquantity] = useState(5);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAdditems(newItem);
    Setdescription("");
    Setquantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip 😍</h3>
      <select
        onChange={(e) => Setquantity(Number(e.target.value))}
        value={quantity}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item../"
        value={description}
        onChange={(e) => Setdescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingForm({ items, onDeleteItem, onToggleItem }) {
  const [sortBy, setsortby] = useState("packed");
  let sorteditems;
  if (sortBy === "input") {
    sorteditems = items;
  } else if (sortBy === "packed") {
    // Sort items by packed status
    sorteditems = [...items].sort((a, b) => (a.packed ? 1 : -1));
  } else if (sortBy === "description") {
    // Sort items by description
    sorteditems = [...items].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  }
  return (
    <div className="list">
      <ul>
        {sorteditems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={() => onDeleteItem(item.id)}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setsortby(e.target.value)}>
          {" "}
          <option value="input">Sort by input order</option>
          <option value="packed">Sort by packed status</option>
          <option value="description">sort by description</option>
        </select>
      </div>
    </div>
  );
}
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => {
            onToggleItem(item.id);
          }}
        />
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>you need to start adding items</em>
      </p>
    );
  const numId = items.length;
  const numPacked = items.filter((item) => item.packed).length;

  const per = Math.round((numPacked / numId) * 100);

  return (
    <footer className="stats">
      <em>
        {per === 100
          ? "you got everything ! you got to go "
          : ` 💼You have ${numId} items packed in bag you already packed ${numPacked} (
        ${per}%)`}
      </em>
    </footer>
  );
}
