document.getElementById("createOrderForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const orderData = {
        order_number: document.getElementById("order_number").value.trim(),
        buyer_id: parseInt(document.getElementById("buyer_id").value), // Convert to integer
        supplier_id: parseInt(document.getElementById("supplier_id").value), // Convert to integer
        total_amount: parseFloat(document.getElementById("total_amount").value) // Convert to float
    };

    fetch("http://127.0.0.1:5001/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message || "Failed to create order"); });
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("responseMessage").textContent = data.message;
        document.getElementById("responseMessage").className = "success";
        document.getElementById("createOrderForm").reset();
    })
    .catch(error => {
        console.error("Error creating order:", error);
        document.getElementById("responseMessage").textContent = error.message || "Error creating order.";
        document.getElementById("responseMessage").className = "error";
    });
});
