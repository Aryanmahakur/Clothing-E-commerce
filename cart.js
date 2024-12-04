document.addEventListener('DOMContentLoaded', () => {
    const producttotal = 0;
    console.log("DOM fully loaded and parsed"); // Debugging log
   
    
    // Select all cart items
    document.querySelectorAll(".cart-item").forEach(item => {
        // Select the decrease button, increase button, and quantity input within each item
        let decreasebtn = item.querySelector(".decrease");
        let increasebtn = item.querySelector(".increase");
        let quantityInput = item.querySelector(".quantity");

        console.log("Processing cart item:", item); // Debugging log

        if (decreasebtn && increasebtn && quantityInput) {
            console.log("Elements found for cart item:", decreasebtn, increasebtn, quantityInput); // Debugging log

            // Add event listener to the decrease button
            decreasebtn.addEventListener("click", () => {
                let value = parseInt(quantityInput.value, 10);
                if (value > 1) { // Ensure quantity doesn't go below 1
                    quantityInput.value = value - 1;
                }
                console.log("Decreased value to:", quantityInput.value); // Debugging log
            });

            // Add event listener to the increase button
            increasebtn.addEventListener("click", () => {
                let value = parseInt(quantityInput.value, 10);
                if (value < 99) { // Ensure quantity doesn't exceed 99
                    quantityInput.value = value + 1;
                }
                console.log("Increased value to:", quantityInput.value); // Debugging log
            });
        } else {
            console.error("Elements not found for cart item:", item); // Debugging log
        }
    });
 
   
        // Select all trash icons
        let trashIcons = document.querySelectorAll(".fas.fa-trash");
        if (trashIcons.length === 0) {
            console.log("No elements found with class 'fas fa-trash'"); // Debugging log
        } else {
            trashIcons.forEach(trashIcon => {
                console.log("Found trash icon:", trashIcon); // Debugging log
                trashIcon.addEventListener('click', () => {
                    const productId = trashIcon.getAttribute('data-id');
                    console.log(`Product with ID ${productId} will be removed`); // Debugging log
                    // Logic to remove the product from cart
                    let cartdata = JSON.parse(localStorage.getItem('cartProduct')) || [];
                    cartdata = cartdata.filter(product => product.id !== productId);
                    localStorage.setItem('cartProduct', JSON.stringify(cartdata));
                    // Optionally, remove the cart item element from the DOM
                    trashIcon.closest('.cart-item').remove();
                });
            });
        }

    

});
