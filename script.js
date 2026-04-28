const CONFIG = {
    whatsappNumber: "351912345678", 
    brandName: "Meuspa | Íris Darc-Bênção",
    iban: "PT50 0000 0000 0000 0000 0000 0",
    mbway: "9XX XXX XXX"
};

document.addEventListener("DOMContentLoaded", () => {
    const catalog = document.getElementById("catalog");
    
    if (typeof produtos === "undefined" || produtos.length === 0) {
        catalog.innerHTML = "<div class='loader'>Nenhum produto encontrado. Aguardando extração...</div>";
        return;
    }

    catalog.innerHTML = ""; 

    produtos.forEach((produto, index) => {
        const animDelay = (index * 0.1) + "s";
        
        const waText = encodeURIComponent(`Olá! Tenho interesse no produto: ${produto.nome}.`);
        const waLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${waText}`;

        const imgSrc = `imagens/${produto.imagem}`;

        const card = document.createElement("div");
        card.className = "product-card"; // A classe 'reveal' será adicionada pelo Observer
        card.style.animationDelay = animDelay;
        
        card.innerHTML = `
            <div class="img-container">
                <img src="${imgSrc}" alt="${produto.nome}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop'">
            </div>
            <div class="product-info">
                <span class="product-category">${CONFIG.brandName}</span>
                <h3 class="product-name">${produto.nome}</h3>
                <div class="product-footer">
                    <span class="product-price">${produto.preco}</span>
                    <button onclick="openModal(${produto.id})" class="btn-info">Conheça o Produto</button>
                    <a href="${waLink}" target="_blank" class="btn-buy">Comprar Agora</a>
                </div>
            </div>
        `;
        catalog.appendChild(card);
    });

    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
            }
        });
    }, observerOptions);

    // Observar os cards criados
    document.querySelectorAll(".product-card").forEach(card => {
        observer.observe(card);
    });
});

// Modal Logic
const modal = document.getElementById("productModal");
const closeModal = document.querySelector(".close-modal");

function openModal(id) {
    if (typeof produtos === "undefined") return;
    const produto = produtos.find(p => p.id === id);
    const body = document.getElementById("modalBody");
    
    const waText = encodeURIComponent(`Olá! Gostaria de encomendar o ${produto.nome}.`);
    const waLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${waText}`;
    
    body.innerHTML = `
        <div class="modal-header">
            <div class="modal-img-container">
                <img src="imagens/${produto.imagem}" alt="${produto.nome}">
            </div>
            <h2>${produto.nome}</h2>
        </div>
        <div class="modal-info-section">
            <h3>✨ Benefícios</h3>
            <p>${produto.beneficios}</p>
        </div>
        <div class="modal-info-section">
            <h3>🌿 Como Usar</h3>
            <p>${produto.instrucoes}</p>
        </div>
        <div class="modal-footer">
            <a href="${waLink}" target="_blank" class="btn-buy">Encomendar via WhatsApp</a>
        </div>
    `;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

if (closeModal) {
    closeModal.onclick = () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Close modal when clicking outside
window.onclick = (event) => {
    const modalElement = document.getElementById("productModal");
    if (event.target == modalElement) {
        modalElement.style.display = "none";
        document.body.style.overflow = "auto";
    }
};
