document.addEventListener("DOMContentLoaded", function () {
    fetchInventory();
});

function fetchInventory() {
    fetch("http://127.0.0.1:5001/inventory")
        .then(response => response.json())
        .then(data => {
            let inventoryTable = document.getElementById("inventoryTable");
            inventoryTable.innerHTML = "";

            if (data.length === 0) {
                inventoryTable.innerHTML = "<tr><td colspan='6'>No inventory records found.</td></tr>";
                return;
            }

            data.forEach(item => {
                let row = `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.product_name}</td>
                        <td>${item.quantity}</td>
                        <td>${item.reorder_level}</td>
                        <td>${item.supplier_id}</td>
                        <td>
                            <button class="restock-btn" onclick="restockItem(${item.id})">Restock</button>
                        </td>
                    </tr>
                `;
                inventoryTable.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching inventory:", error));
}

function restockItem(itemId) {
    fetch(`http://127.0.0.1:5001/inventory/${itemId}/restock`, { method: "PUT" })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchInventory();
        })
        .catch(error => console.error("Error restocking item:", error));
}
