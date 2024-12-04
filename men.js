document.addEventListener('DOMContentLoaded', () => {
    let box = document.getElementById("filterbox");
    let filter = document.getElementById("filter");

    // Price slider
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    priceRange.addEventListener('input', function () {
        priceValue.textContent = `$${this.value}`;
    });

    // Bring filter
    filter.addEventListener('click', () => {
        box.classList.toggle('active');
    });

    // Close filter
    let closebtn = document.getElementById("closeBtn");
    closebtn.addEventListener('click', () => {
        box.classList.toggle('active');
    });

    // Search box toggle
    let searchbtn = document.getElementById("search");
    let searchbox = document.getElementById("searchboxx");
    searchbtn.addEventListener('click', () => {
        searchbox.classList.toggle('move');
    });
    let closesearch = document.getElementById("cbtn");
    closesearch.addEventListener('click', () => {
        searchbox.classList.toggle('move');
    });

    // Product listings
    const productContainer = document.getElementById('menproduct');
    if (!productContainer) {
        console.error('Element with id "menproduct" not found.');
        return;
    }

    
    function createProductHTML(product) {
        return `
            <div class="menproductchild" id="${product.id}">
                <img src="${product.mainImage}" alt="${product.name}">
                <p class="details">${product.name}</p>
                <p class="price">${product.price}</p>
            </div>
        `;
    }
    // Insert product HTML into container
    products.forEach(produc => {
        if (produc.category === 'men') {
        productContainer.innerHTML += createProductHTML(produc);
        }
    });

    // Add click event to each product to navigate to detail page
    document.querySelectorAll('.menproductchild').forEach(item => {
        item.addEventListener('click', () => {
            const productId = item.getAttribute('id');
            window.location.href = `productdetails.html?id=${productId}`; // Correct file name
        });
    });
});
