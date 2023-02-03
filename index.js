const fs = require("fs");

// Category sınıfı, bir kategori için gerekli olan bilgileri tutar
class Category {
  // Constructor metodu, kategori adını alır ve items dizisini oluşturur
  constructor(name) {
    this.name = name;
    this.items = [];
  }

  // addItem metodu, kategoriye bir öğe ekler
  addItem(item) {
    this.items.push(item);
  }

  // updateItem metodu, verilen kimliğe sahip bir öğeyi günceller
  updateItem(id, item) {
    // items dizisinde verilen id'yi arar
    const index = this.items.findIndex((i) => i.id === id);
    // Eğer öğe bulunursa, güncelleme yapılır
    if (index !== -1) {
      this.items[index] = item;
    }
  }

  // deleteItem metodu, verilen kimliğe sahip bir öğeyi siler
  deleteItem(id) {
    // items dizisinde verilen id'ye sahip öğe bulunmazsa, items dizisi filtrelenir
    this.items = this.items.filter((i) => i.id !== id);
  }
}

// Categories sınıfı, kategoriler hakkında bilgileri tutar
class Categories {
  // Constructor metodu, categories nesnesini oluşturur
  constructor() {
    this.categories = {};
  }

  // createCategory metodu, yeni bir kategori oluşturur
  createCategory(categoryName) {
    this.categories[categoryName] = new Category(categoryName);
  }

  // addItem metodu, verilen kategoriye bir öğe ekler
  addItem(categoryName, item) {
    this.categories[categoryName].addItem(item);
  }

  // updateItem metodu, verilen kategori ve kimlik değerine sahip bir öğeyi günceller
  updateItem(categoryName, id, item) {
    this.categories[categoryName].updateItem(id, item);
  }

  // deleteItem metodu, verilen kategori ve kimlik değerine sahip bir öğeyi siler
  deleteItem(categoryName, id) {
    this.categories[categoryName].deleteItem(id);
  }

  // deleteCategory metodu, verilen kategori adına sahip bir kategoriyi siler
  deleteCategory(categoryName) {
    delete this.categories[categoryName];
  }

  // saveToFile metodu, kategorileri verilen dosya adına kaydeder
  saveToFile(filename) {
    // categories nesnesini JSON formatına çevirir
    const data = JSON.stringify(this.categories);
    // Verilen dosya adına kaydeder
    fs.writeFileSync(fileName, data);
  }

  // loadFromFile metodu, verilen dosya adından kategorileri yükler
  loadFromFile(fileName) {
    // Verilen dosya adından verileri okur
    const data = fs.readFileSync(fileName);
    // Okunan verileri categories nesnesine dönüştürür
    this.categories = JSON.parse(data);
  }
  listCategories() {
    // Kategorilerin isimlerini döngü ile gez
    for (const categoryName of Object.keys(this.categories)) {
      console.log(`Category: ${categoryName}`);

      // Her bir kategori içindeki öğeleri döngü ile gez
      for (const item of this.categories[categoryName]) {
        console.log(`  - ${item.name}`);
      }
    }
  }
}

// categories nesnesini oluşturur
const categories = new Categories();

// Tüm kategorileri ve her bir kategori içindeki öğeleri listeleyen fonksiyonu çalıştırır
categories.listCategories();

// Yeni bir kategori oluşturur
categories.createCategory("Books");

// Books kategorisine bir öğe ekler
categories.addItem("Books", { id: 1, name: "The Lord of the Rings" });

// Books kategorisindeki öğeyi günceller
categories.updateItem("Books", 1, {
  id: 1,
  name: "The Lord of the Rings: The Fellowship of the Ring",
});

// Books kategorisindeki öğeyi siler
categories.deleteItem("Books", 1);

// categories nesnesini categories.json dosyasına kaydeder
categories.saveToFile("categories.json");

// categories nesnesini categories.json dosyasından yükler
categories.loadFromFile("categories.json");
