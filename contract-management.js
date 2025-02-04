document.addEventListener("DOMContentLoaded", function () {
    fetchContracts();
});

function fetchContracts() {
    fetch("http://127.0.0.1:5001/contracts")
        .then(response => response.json())
        .then(data => {
            let contractsTable = document.getElementById("contractsTable");
            contractsTable.innerHTML = "";

            if (data.length === 0) {
                contractsTable.innerHTML = "<tr><td colspan='6'>No contracts found.</td></tr>";
                return;
            }

            data.forEach(contract => {
                let row = `
                    <tr>
                        <td>${contract.id}</td>
                        <td>${contract.supplier_id}</td>
                        <td>${contract.contract_details}</td>
                        <td>${contract.start_date}</td>
                        <td>${contract.end_date}</td>
                        <td>
                            <button class="renew-btn" onclick="renewContract(${contract.id})">Renew</button>
                        </td>
                    </tr>
                `;
                contractsTable.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching contracts:", error));
}

function renewContract(contractId) {
    fetch(`http://127.0.0.1:5001/contracts/${contractId}/renew`, { method: "PUT" })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchContracts();
        })
        .catch(error => console.error("Error renewing contract:", error));
}
