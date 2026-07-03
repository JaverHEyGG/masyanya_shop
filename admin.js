import {
  signInUser,
  signOutUser,
  onAuthChange,
  subscribeProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage
} from './firebase.js';

const authPanel = document.getElementById('authPanel');
const adminPanel = document.getElementById('adminPanel');
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const authError = document.getElementById('authError');
const logoutButton = document.getElementById('logoutButton');
const productForm = document.getElementById('productForm');
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const productStock = document.getElementById('productStock');
const productDescription = document.getElementById('productDescription');
const productImage = document.getElementById('productImage');
const imagePreviewWrapper = document.getElementById('imagePreviewWrapper');
const imagePreview = document.getElementById('imagePreview');
const saveButton = document.getElementById('saveButton');
const cancelEdit = document.getElementById('cancelEdit');
const formHeading = document.getElementById('formHeading');
const productList = document.getElementById('productList');
const adminSearch = document.getElementById('adminSearch');
const adminSort = document.getElementById('adminSort');
const adminEmpty = document.getElementById('adminEmpty');

let products = [];
let currentProductId = null;
let currentImageUrl = '';

function showAuthPanel() {
  adminPanel.classList.add('hidden');
  authPanel.classList.remove('hidden');
}

function showAdminPanel() {
  authPanel.classList.add('hidden');
  adminPanel.classList.remove('hidden');
}

function showAuthError(message) {
  authError.textContent = message;
  authError.classList.remove('hidden');
}

function hideAuthError() {
  authError.textContent = '';
  authError.classList.add('hidden');
}

function resetForm() {
  productForm.reset();
  currentProductId = null;
  currentImageUrl = '';
  imagePreviewWrapper.classList.add('hidden');
  formHeading.textContent = 'Добавить новый товар';
  cancelEdit.classList.add('hidden');
  saveButton.textContent = 'Сохранить';
}

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'card admin-card-item';

  card.innerHTML = `
    <div class="card-body">
      <h3 class="card-title">${product.name}</h3>
      <div class="card-meta">
        <span class="price">${formatMoney(product.price)} грн</span>
        <span class="stock">${product.stock} шт.</span>
      </div>
      <p class="desc">${product.description || 'Описание отсутствует'}</p>
      <div class="card-actions admin-actions">
        <button type="button" class="button button-primary" data-action="edit" data-id="${product.id}">Редактировать</button>
        <button type="button" class="button button-secondary" data-action="delete" data-id="${product.id}">Удалить</button>
      </div>
    </div>
  `;

  return card;
}

function formatMoney(value) {
  return Number(value).toLocaleString('uk-UA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

function renderProductList() {
  const query = adminSearch.value.trim().toLowerCase();
  const sorted = [...products];

  switch (adminSort.value) {
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

  const visible = sorted.filter((item) => item.name.toLowerCase().includes(query));
  productList.innerHTML = '';

  if (!visible.length) {
    adminEmpty.classList.remove('hidden');
    return;
  }

  adminEmpty.classList.add('hidden');
  visible.forEach((product) => productList.appendChild(createProductCard(product)));
}

function fillFormForEdit(product) {
  currentProductId = product.id;
  productName.value = product.name;
  productPrice.value = product.price;
  productStock.value = product.stock;
  productDescription.value = product.description || '';
  currentImageUrl = product.image;
  imagePreview.src = product.image;
  imagePreview.alt = product.name;
  imagePreviewWrapper.classList.remove('hidden');
  formHeading.textContent = 'Редактировать товар';
  cancelEdit.classList.remove('hidden');
  saveButton.textContent = 'Обновить';
}

async function handleEditRequest(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) {
    return;
  }

  fillFormForEdit(product);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function handleDeleteRequest(productId) {
  const confirmed = confirm('Удалить этот товар навсегда?');
  if (!confirmed) {
    return;
  }

  try {
    await deleteProduct(productId);
  } catch (error) {
    console.error('Ошибка удаления товара:', error);
    alert('Не удалось удалить товар. Попробуйте ещё раз.');
  }
}

productList.addEventListener('click', async (event) => {
  const action = event.target.dataset.action;
  const id = event.target.dataset.id;
  if (!action || !id) {
    return;
  }

  if (action === 'edit') {
    handleEditRequest(id);
  }

  if (action === 'delete') {
    handleDeleteRequest(id);
  }
});

productImage.addEventListener('change', () => {
  const file = productImage.files[0];
  if (!file) {
    imagePreviewWrapper.classList.add('hidden');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    imagePreview.src = reader.result;
    imagePreviewWrapper.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
});

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  hideAuthError();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    await signInUser(email, password);
  } catch (error) {
    if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
      showAuthError('Неверный пароль');
      return;
    }
    showAuthError('Ошибка входа. Проверьте данные и попробуйте снова.');
    console.error('Ошибка авторизации:', error);
  }
});

logoutButton.addEventListener('click', async () => {
  await signOutUser();
});

productForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = productName.value.trim();
  const price = Number(productPrice.value);
  const stock = Number(productStock.value);
  const description = productDescription.value.trim();
  const file = productImage.files[0];

  if (!name || !price || Number.isNaN(price) || price <= 0) {
    alert('Введите корректное название и цену.');
    return;
  }

  if (Number.isNaN(stock) || stock < 0) {
    alert('Введите корректное количество.');
    return;
  }

  saveButton.disabled = true;
  saveButton.textContent = currentProductId ? 'Сохраняем...' : 'Сохраняем...';

  try {
    let imageUrl = currentImageUrl;

    if (file) {
      const fileName = `products/${Date.now()}_${file.name}`;
      imageUrl = await uploadProductImage(file, fileName);
    }

    const productData = {
      name,
      price,
      stock,
      description,
      image: imageUrl || '',
      updatedAt: new Date()
    };

    if (currentProductId) {
      await updateProduct(currentProductId, productData);
    } else {
      if (!imageUrl) {
        alert('Пожалуйста, загрузите фотографию товара.');
        saveButton.disabled = false;
        saveButton.textContent = currentProductId ? 'Обновить' : 'Сохранить';
        return;
      }
      await addProduct(productData);
    }

    resetForm();
  } catch (error) {
    console.error('Ошибка сохранения товара:', error);
    alert('Не удалось сохранить товар. Попробуйте еще раз.');
  } finally {
    saveButton.disabled = false;
    saveButton.textContent = currentProductId ? 'Обновить' : 'Сохранить';
  }
});

cancelEdit.addEventListener('click', resetForm);
adminSearch.addEventListener('input', renderProductList);
adminSort.addEventListener('change', renderProductList);

function handleProductSnapshot(snapshot) {
  products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  renderProductList();
}

function handleProductSnapshotError(error) {
  console.error('Ошибка загрузки списка товаров:', error);
}

onAuthChange((user) => {
  if (user) {
    showAdminPanel();
    hideAuthError();
    subscribeProducts(handleProductSnapshot, handleProductSnapshotError);
  } else {
    showAuthPanel();
  }
});

resetForm();