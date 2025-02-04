document.addEventListener("DOMContentLoaded", function () {
    fetchOrders();
});

function fetchOrders() {
    let statusFilter = document.getElementById("statusFilter").value;
    fetch("http://127.0.0.1:5001/orders")
        .then(response => response.json())
        .then(data => {
            let ordersTable = document.getElementById("ordersTable");
            ordersTable.innerHTML = "";
            
            let filteredOrders = data;
            if (statusFilter !== "all") {
                filteredOrders = data.filter(order => order.status === statusFilter);
            }
            
            if (filteredOrders.length === 0) {
                ordersTable.innerHTML = "<tr><td colspan='7'>No orders found.</td></tr>";
                return;
            }
            
            filteredOrders.forEach(order => {
                let row = `
                    <tr>
                        <td>${order.id}</td>
                        <td>${order.order_number}</td>
                        <td>${order.buyer_id}</td>
                        <td>${order.supplier_id}</td>
                        <td>${order.total_amount} USD</td>
                        <td>${order.status}</td>
                        <td>
                            <button class="approve-btn" onclick="updateOrderStatus(${order.id}, 'approved')">Approve</button>
                            <button class="reject-btn" onclick="updateOrderStatus(${order.id}, 'rejected')">Reject</button>
                            <button class="delete-btn" onclick="deleteOrder(${order.id})">Delete</button>
                        </td>
                    </tr>
                `;
                ordersTable.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching orders:", error));
}

function updateOrderStatus(orderId, status) {
    fetch(`http://127.0.0.1:5001/orders/${orderId}/${status}`, { method: "PUT" })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchOrders();
        })
        .catch(error => console.error("Error updating order:", error));
}

function deleteOrder(orderId) {
    if (confirm("Are you sure you want to delete this order?")) {
        fetch(`http://127.0.0.1:5001/orders/${orderId}`, { method: "DELETE" })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                fetchOrders();
            })
            .catch(error => console.error("Error deleting order:", error));
    }
}
