// Produtos com categorias
const products = [
    { 
        id: 1, 
        name: "Nintendo swity lite", 
        price: 2099.99, 
        image: "https://via.placeholder.com/300x200?text=Super+Nintendo", 
        category: "retro" 
    },
    { 
        id: 2, 
        name: "PlayStation 5", 
        price: 4500.00, 
        image: "https://via.placeholder.com/300x200?text=PS5", 
        category: "atual" 
    },
    { 
        id: 3, 
        name: "ps3 desbloqueado", 
        price: 360.99, 
        image: "https://via.placeholder.com/300x200?text=Zelda", 
        category: "retro" 
    },
    { 
        id: 4, 
        name: "God of War Ragnarök", 
        price: 299.99, 
        image: "/https/via.placeholder.com/300x200?text=Zelda", 
        category: "atual" 
    },
    { 
        id: 5, 
        name: "PlayStation 2", 
        price: 150.00, 
        image: "https://via.placeholder.com/300x200?text=PS2", 
        category: "retro" 
    },
    { 
        id: 6, 
        name: "GTA San Andreas", 
        price: 130.00, 
        image: "https://via.placeholder.com/300x200?text=GTA+San+Andreas", 
        category: "atual" 
    }
];


// Carrinho (carrega do localStorage se existir)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Filtro de produtos
function filterProducts() {
    const filter = document.getElementById("filter").value;
    const filteredProducts = filter === "all" 
        ? products 
        : products.filter(p => p.category === filter);
    
    displayProducts(filteredProducts);
}

// Exibir produtos (com filtro)
function displayProducts(productsToShow = products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    productsToShow.forEach(product => {
        productsContainer.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">R$ ${product.price.toFixed(2)}</p>
                        <button onclick="addToCart(${product.id})" class="btn btn-primary">Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Adicionar ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Verifica se o item já está no carrinho
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity += 1; // Incrementa a quantidade se já existir
    } else {
        cart.push({ ...product, quantity: 1 }); // Adiciona novo item
    }
    
    updateCart();
    alert(`${product.name} foi adicionado ao carrinho!`);
}

// Remover item do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Atualizar carrinho (HTML + localStorage)
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // Salva no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza o contador
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Renderiza os itens do carrinho
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center">Seu carrinho está vazio.</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h6>${item.name}</h6>
                    <small>R$ ${item.price.toFixed(2)} x ${item.quantity}</small>
                </div>
                <button onclick="removeFromCart(${item.id})" class="btn btn-sm btn-danger">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        // Calcula o total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartItems.innerHTML += `
            <hr>
            <div class="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span id="cart-total">R$ ${total.toFixed(2)}</span>
            </div>
        `;
    }
}

// Finalizar compra (simulação)
function checkout() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    
    alert(`Compra finalizada! Total: R$ ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`);
    cart = [];
    updateCart();
}

// Inicializa o site
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCart();
});
// Carregar produtos de um arquivo JSON local
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts();
    });

// Ou de uma API (ex: Google Sheets via Apps Script)
fetch('SUA_URL_DA_API')
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts();
    });
    