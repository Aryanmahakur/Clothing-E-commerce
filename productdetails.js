// Function to get URL parameters
function getURLParameter(name) {
    return new URLSearchParams(window.location.search).get(name);
}

document.addEventListener('DOMContentLoaded', () => {
    const productId = getURLParameter('id');
    console.log('Product ID from URL:', productId); // Debugging log
    let totalprice = 0;

    const product = products.find(p => p.id === productId);
    console.log('Product found:', product); // Debugging log

    if (product) {
        // Display product details
        document.getElementById('product-image').src = product.mainImage;
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = product.price;
        document.getElementById('product-description').textContent = product.description;

        const productGallery = document.getElementById('product-gallery');
        product.images.forEach((image, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.alt = product.name;
            imgElement.classList.add('thumbnail');
            imgElement.id = `image-${index + 1}`;
            productGallery.appendChild(imgElement);
        });

        const mainImage = document.getElementById('product-image');
        const thumbnails = document.querySelectorAll('#product-gallery .thumbnail');
        thumbnails.forEach((thumbnail) => {
            thumbnail.addEventListener('click', () => {
                const tempSrc = mainImage.src;
                mainImage.src = thumbnail.src;
                thumbnail.src = tempSrc;
            });
        });

        let cartbtn = document.getElementById("add-to-cart");
        cartbtn.addEventListener('click', () => {
            console.log('Adding to cart:', product); // Debugging log

            let cartdata = JSON.parse(localStorage.getItem('cartProduct')) || [];
            cartdata.push(product);
            localStorage.setItem('cartProduct', JSON.stringify(cartdata));

            window.location.href = 'cart.html';
        });

        // Buy section
        let buybtn = document.getElementById("buy-now");
        buybtn.addEventListener('click', () => {
            console.log('Buying product:', product); // Debugging log
            
            let buydata = JSON.parse(localStorage.getItem('buyproduct')) || [];
            buydata.push(product);
            localStorage.setItem('buyproduct', JSON.stringify(buydata));
            window.location.href = 'checkout.html';
        });
    } else {
        console.log('Product not found'); // Debugging log
        const productDetails = document.querySelector('.product-details');
        if (productDetails) {
            productDetails.innerHTML = '<p>Product not found.</p>';
        } else {
            console.error('Element with class "product-details" not found.');
        }
    }

    // If we're on the cart page, display the cart details
    if (window.location.pathname.endsWith('cart.html')) {
        let cartdata1 = JSON.parse(localStorage.getItem('cartProduct')) || [];
        console.log('Cart data:', cartdata1); // Debugging log

        if (cartdata1.length > 0) {
            let output = cartdata1.map((product) => {
                // Log raw price value
                console.log(`Raw product price (ID: ${product.id}):`, product.price); 

                // Remove non-numeric characters and convert to integer
                let cleanedPrice = product.price.replace(/[^\d]/g, '');
                let price = parseInt(cleanedPrice, 10);

                if (isNaN(price)) {
                    console.error(`Invalid price for product ID ${product.id}:`, product.price);
                } else {
                    totalprice += price;
                    console.log("Total price after adding this product:", totalprice); // Debugging log
                }

                return `
                    <div class="cart-item" id="${product.id}">
                        <img class="cart-image" src="${product.mainImage}" alt="Product Image">
                        <h1 class="product-name">${product.name}</h1>
                        <div class="btnforsize">
                            <button class="size-button">XS</button>
                            <button class="size-button">S</button>
                            <button class="size-button">M</button>
                            <button class="size-button">L</button>
                        </div>
                        <button class="decrease">-</button>
                        <input type="number" class="quantity" value="1" min="1" max="99">
                        <button class="increase">+</button>
                        <p class="product-price" id="product-price">${product.price}</p>
                        <i class="fas fa-trash" data-id="${product.id}"></i>
                    </div>
                `;
            }).join('');

            const productContainer = document.getElementById("product-container");
            if (productContainer) {
                productContainer.innerHTML = output;
            } else {
                console.error('Element with id "product-container" not found.');
            }
        } else {
            const productContainer = document.getElementById("product-container");
            if (productContainer) {
                productContainer.innerHTML = '<p>No product in cart.</p>';
            } else {
                console.error('Element with id "product-container" not found.');
            }
        }

        // Log final total price
        console.log("Final total price:", totalprice);

        // Display total price
        document.getElementById('product-total').innerHTML = `Total: ₹${totalprice}`;
    }

    // If we're on the checkout page, display the buy details
    if (window.location.pathname.endsWith('checkout.html')) {
        console.log('Checkout page loaded'); // Debugging log
        let buydata = JSON.parse(localStorage.getItem('buyproduct')) || [];
        console.log('Loaded buy data:', buydata); // Debugging log
        
        let buyingoutput = buydata.map((productofbuy) => {
            return `
                <div class="cart-item" id="${productofbuy.id}">
                    <img class="cart-image" src="${productofbuy.mainImage}" alt="Product Image">
                    <h1 class="product-name">${productofbuy.name}</h1>
                    <div class="btnforsize">
                        <button class="size-button">XS</button>
                        <button class="size-button">S</button>
                        <button class="size-button">M</button>
                        <button class="size-button">L</button>
                    </div>
                    <button class="decrease">-</button>
                    <input type="number" class="quantity" value="1" min="1" max="99">
                    <button class="increase">+</button>
                    <p class="product-price" id="product-price">${productofbuy.price}</p>
                    <i class="fas fa-trash" data-id="${productofbuy.id}"></i>
                </div>
            `;
        }).join('');

        const buycontainer = document.getElementById("buyingproduct");
        if (buycontainer) {
            buycontainer.innerHTML = buyingoutput;
            console.log('Buy section updated with products'); // Debugging log
        } else {
            console.error('Element with id "buyingproduct" not found.');
        }
    }
});
