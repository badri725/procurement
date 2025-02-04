document.addEventListener("DOMContentLoaded", function () {
    fetchApprovals();
});

function fetchApprovals() {
    fetch("http://127.0.0.1:5001/orders?status=pending")
        .then(response => response.json())
        .then(data => {
            let approvalsTable = document.getElementById("approvalsTable");
            approvalsTable.innerHTML = "";

            if (data.length === 0) {
                approvalsTable.innerHTML = "<tr><td colspan='6'>No pending approvals.</td></tr>";
                return;
            }

            data.forEach(order => {
                let row = `
                    <tr>
                        <td>${order.id}</td>
                        <td>${order.order_number}</td>
                        <td>${order.buyer_id}</td>
                        <td>${order.total_amount} USD</td>
                        <td>${order.status}</td>
                        <td>
                            <button class="approve-btn" onclick="updateOrderStatus(${order.id}, 'approved')">Approve</button>
                            <button class="reject-btn" onclick="updateOrderStatus(${order.id}, 'rejected')">Reject</button>
                        </td>
                    </tr>
                `;
                approvalsTable.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching approvals:", error));
}

function updateOrderStatus(orderId, status) {
    fetch(`http://127.0.0.1:5001/orders/${orderId}/${status}`, { method: "PUT" })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchApprovals();
        })
        .catch(error => console.error("Error updating approval status:", error));
}

