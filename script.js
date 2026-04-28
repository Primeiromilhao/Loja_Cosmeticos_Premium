document.addEventListener("DOMContentLoaded", () => {
    const catalog = document.getElementById("catalog");
    
    if (typeof produtos === "undefined" || produtos.length === 0) {
        catalog.innerHTML = "<div class='loader'>Nenhum produto encontrado. Aguardando extração do WhatsApp...</div>";
        return;
    }

    catalog.innerHTML = ""; // Limpar loader

    produtos.forEach((produto, index) => {
        // Criar delay para animação em cascata
        const animDelay = (index * 0.15) + "s";
        
        // Link pré-preenchido do WhatsApp (Pode ser alterado para o número real)
        const waText = encodeURIComponent(`Olá! Tenho interesse no produto: ${produto.nome}.`);
        const waLink = `https://wa.me/?text=${waText}`;

        // Tratar imagem: se extraída usa a da pasta local ou dados
        const imgSrc = produto.imagem && produto.imagem.endsWith(".png") 
                        ? `imagens/${produto.imagem}` 
                        : "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop";

        const card = document.createElement("div");
        card.className = "product-card fade-in";
        card.style.animationDelay = animDelay;
        
        card.innerHTML = `
            <div class="img-container">
                <img src="${imgSrc}" alt="${produto.nome}" onerror="this.src='https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop'">
            </div>
            <div class="product-info">
                <span class="product-category">ÍRIS DARC-BÊNÇÃO</span>
                <h3 class="product-name">${produto.nome}</h3>
                <div class="product-footer">
                    <span class="product-price">${produto.preco}</span>
                    <a href="${waLink}" target="_blank" class="btn-buy">Saber Mais</a>
                </div>
            </div>
        `;
        catalog.appendChild(card);
    });
});
