document.getElementById("onboardSupplierForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const supplierData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value
    };

    fetch("http://127.0.0.1:5001/suppliers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(supplierData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("responseMessage").textContent = data.message;
        document.getElementById("responseMessage").className = "success";
        document.getElementById("onboardSupplierForm").reset();
    })
    .catch(error => {
        console.error("Error onboarding supplier:", error);
        document.getElementById("responseMessage").textContent = "Error onboarding supplier.";
        document.getElementById("responseMessage").className = "error";
    });
});
