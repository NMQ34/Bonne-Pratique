const products = [
  { name: 'Clavier gaming', price: 79, inStock: true, onSale: false },
  { name: 'Souris sans fil', price: 49, inStock: true, onSale: true },
  { name: 'Écran 27"', price: 249, inStock: false, onSale: true },
  { name: 'Casque audio', price: 129, inStock: true, onSale: false }
];

const listEl = document.querySelector('#products-list');
const emptyStateEl = document.querySelector('#empty-state');

const showAllBtn = document.querySelector('#show-all-btn');
const inStockBtn = document.querySelector('#in-stock-btn');
const onSaleBtn = document.querySelector('#on-sale-btn');

function renderProducts(filteredProducts, emptyMessage) {
  listEl.innerHTML = '';

  if (filteredProducts.length === 0) {
    emptyStateEl.textContent = emptyMessage;
    emptyStateEl.style.display = 'block';
    return;
  }
  
  emptyStateEl.style.display = 'none';

  const productsHtml = filteredProducts.map(product => {
    return `
      <li class="product-card">
        <h3>${product.name}</h3>
        <p>Prix : ${product.price} €</p>
      </li>
    `;
  }).join('');

  listEl.innerHTML = productsHtml;
}

function showAll() {
  const filtered = products;
  renderProducts(filtered, 'Aucun produit à afficher.');
}

function showInStock() {
  const filtered = products.filter(p => p.inStock);
  renderProducts(filtered, 'Aucun produit en stock.');
}

function showOnSale() {
  const filtered = products.filter(p => p.onSale);
  renderProducts(filtered, 'Aucun produit en promotion.');
}

showAllBtn.addEventListener('click', showAll);
inStockBtn.addEventListener('click', showInStock);
onSaleBtn.addEventListener('click', showOnSale);

showAll();