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

export default function App() {
  return (
    <div className="app">
      <Header />
      <FormAdd />
      <GrocierList />
      <Footer />
    </div>
  );
}

function Header() {
  return <h1>Catatan Belanjaku 📝</h1>;
}

function FormAdd() {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    // Ketika Click/Enter, pertama prevent/mencegah dari menjalankan function submit default by browser, karena button submit di sini tidak mengirim url submit, hanya menambahkan list
    e.preventDefault(); //Berfungsi untuk tidak menjalankan fungsi Default
    alert(name);
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
        <select>{quantityNum}</select>
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

function GrocierList() {
  return (
    <>
      <div className="list">
        <ul>
          {groceryItems.map((item) => (
            <ItemList item={item} key={item.id} />
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

function ItemList({ item }) {
  return (
    <li key={item.id}>
      <input type="checkbox" defaultChecked={true} />
      <span style={item.checked ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.name}
      </span>
      <button>&times;</button>
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
