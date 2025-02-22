import { useState } from "react";

const groceryItems = [
  {
    id: 1,
    name: "Kopi Bubuk",
    quantity: 2,
    checked: true,
  },
  {
    id: 2,
    name: "Gula Pasir",
    quantity: 5,
    checked: false,
  },
  {
    id: 3,
    name: "Air Mineral",
    quantity: 3,
    checked: false,
  },
];

// Export Default Function ------------------->
export default function App() {
  const [items, setItems] = useState(groceryItems);

  function handleAddItem(item) {
    setItems([...items, item]); // Add new item to the existing list
  }

  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  return (
    <div className="app">
      <Header />
      <FormAdd onAddItem={handleAddItem} />
      <GrocierList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggle={handleToggleItem}
      />
      <Footer />
    </div>
  );
}

function Header() {
  return <h1>Catatan Belanjaku 📝</h1>;
}

function FormAdd({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    // Ketika Click/Enter, pertama prevent/mencegah dari menjalankan function submit default by browser, karena button submit di sini tidak mengirim url submit, hanya menambahkan list
    e.preventDefault(); //Berfungsi untuk tidak menjalankan fungsi Default
    if (!name) return; // Jika tidak ada inputan, maka tidak akan menambahkan list
    // Membuat objek baru
    const newItem = {
      name: name,
      quantity: quantity,
      checked: false,
      id: Date.now(),
    }; // id di set dengan waktu sekarang
    // Membuat fungsi handleAddItem yang akan dipanggil oleh parent
    onAddItem(newItem);
    setName("");
    setQuantity(1);
  }

  const quantityNum = [...Array(20)].map((_, i) => (
    <option key={i} value={i + 1}>
      {i + 1}
    </option>
  ));

  return (
    // Alasan menggunakan onSubmit, bukan onClick ialah agar ketika form di isi, kita bisa menggunakan ENTER sebagai Submit, tidak mesti mengclick Button submitnya
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Hari ini belanja apa kita?</h3>
      <div>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          //Number () digunakan untuk mengubah string menjadi angka
        >
          {quantityNum}
        </select>
        <input
          type="text"
          placeholder="nama barang..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button>Tambah</button>
    </form>
  );
}

function GrocierList({ items, onDeleteItem, onToggle }) {
  return (
    <>
      <div className="list">
        <ul>
          {items.map((item) => (
            <ItemList
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onToggle={onToggle}
            />
          ))}
        </ul>
      </div>
      <div className="actions">
        <select>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button>Bersihkan Daftar</button>
      </div>
    </>
  );
}

function ItemList({ item, onDeleteItem, onToggle }) {
  return (
    <li key={item.id}>
      <input
        type="checkbox"
        defaultChecked={item.checked}
        onChange={() => onToggle(item.id)}
      />
      <span style={item.checked ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.name}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>&times;</button>
    </li>
  );
}

function Footer() {
  return (
    <footer className="stats">
      Ada 10 barang di daftar belanjaan, 5 barang sudah dibeli (50%)
    </footer>
  );
}
