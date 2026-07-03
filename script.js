import { subscribeProducts } from './firebase.js';

const productsNode = document.getElementById('products');
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');
const emptyState = document.getElementById('emptyState');
const productModal = document.getElementById('productModal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalStock = document.getElementById('modalStock');
const modalDescription = document.getElementById('modalDescription');

let products = [];
let activeProduct = null;

function createCard(product) {
  const card = document.createElement('article');
  card.className = 'card';

  card.innerHTML = `
    <img src="${product.image}" alt="${escapeHtml(product.name)}">
    <div class="card-body">
      <h2 class="card-title">${escapeHtml(product.name)}</h2>
      <div class="card-meta">
        <span class="price">${formatMoney(product.price)} грн</span>
        <span class="stock">В наличии: ${product.stock}</span>
      </div>
      <p class="desc">${escapeHtml(product.description || 'Описание отсутствует')}</p>
      <div class="card-actions">
        <button type="button" class="button button-primary" data-id="${product.id}">Подробнее</button>
      </div>
    </div>
  `;

  const detailsButton = card.querySelector('button');
  detailsButton.addEventListener('click', () => openProductModal(product));

  return card;
}

function formatMoney(value) {
  return Number(value).toLocaleString('uk-UA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderProducts() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const sorted = [...products];

  switch (sortSelect.value) {
    case 'priceAsc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'priceDesc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'stock':
      sorted.sort((a, b) => b.stock - a.stock);
      break;
    default:
      sorted.sort((a, b) => a.name.localeCompare(b.name, 'uk'));
  }

  const filtered = sorted.filter((product) => product.name.toLowerCase().includes(searchValue));

  productsNode.innerHTML = '';

  if (!filtered.length) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  filtered.forEach((product) => productsNode.appendChild(createCard(product)));
}

function openProductModal(product) {
  activeProduct = product;
  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalTitle.textContent = product.name;
  modalPrice.textContent = `${formatMoney(product.price)} грн`;
  modalStock.textContent = `В наличии: ${product.stock}`;
  modalDescription.textContent = product.description || 'Описание отсутствует';
  productModal.classList.remove('hidden');
  productModal.setAttribute('aria-hidden', 'false');
}

function closeProductModal() {
  activeProduct = null;
  productModal.classList.add('hidden');
  productModal.setAttribute('aria-hidden', 'true');
}

function handleSnapshot(snapshot) {
  products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  renderProducts();
}

function handleSnapshotError(error) {
  console.error('Ошибка загрузки товаров:', error);
  productsNode.innerHTML = `<div class="empty-state"><div class="empty-card"><h2>Ошибка загрузки данных</h2><p>Пожалуйста, обновите страницу или проверьте подключение.</p></div></div>`;
}

searchInput.addEventListener('input', renderProducts);
sortSelect.addEventListener('change', renderProducts);
modalClose.addEventListener('click', closeProductModal);
productModal.addEventListener('click', (event) => {
  if (event.target.dataset.close === 'true') {
    closeProductModal();
  }
});

subscribeProducts(handleSnapshot, handleSnapshotError);
