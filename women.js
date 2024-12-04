document.addEventListener('DOMContentLoaded', () => {
    let box = document.getElementById("filterbox");
    let filter = document.getElementById("filters");

    // Price slider
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    priceRange.addEventListener('input', function () {
        priceValue.textContent = `$${this.value}`;
    });

    // Toggle filter box visibility
    filter.addEventListener('click', () => {
        box.classList.toggle('active');
    });

    // Close filter box
    let closebtn = document.getElementById("closeBtn");
    closebtn.addEventListener('click', () => {
        box.classList.toggle('active');
    });

    // Product listing
    let womenProductContainer = document.getElementById("menproduct");

    function createProductHTML(product) {
        return `
            <div class="menproductchild" id="${product.id}">
                <img src="${product.mainImage}" alt="${product.name}">
                <p class="details">${product.name}</p>
                <p class="price">${product.price}</p>
            </div>
        `;
    }

    // Dynamically generate product listings
    products.forEach(product => {
        // Assuming you have a category or type property to differentiate men's and women's products
        if (product.category === 'women') {
            womenProductContainer.innerHTML += createProductHTML(product);
        }
    });

    // Add event listeners to each product item
    document.querySelectorAll('.menproductchild').forEach(item => {
        item.addEventListener('click', () => {
            const productId = item.getAttribute('id');
            window.location.href = `productdetails.html?id=${productId}`;
        });
    });
});

