document.addEventListener("DOMContentLoaded", function () {
    fetchIssues();
});

function fetchIssues() {
    fetch("http://127.0.0.1:5001/issues")
        .then(response => response.json())
        .then(data => {
            let issuesTable = document.getElementById("issuesTable");
            issuesTable.innerHTML = "";

            if (data.length === 0) {
                issuesTable.innerHTML = "<tr><td colspan='5'>No issues found.</td></tr>";
                return;
            }

            data.forEach(issue => {
                let row = `
                    <tr>
                        <td>${issue.id}</td>
                        <td>${issue.order_id}</td>
                        <td>${issue.reason}</td>
                        <td>${issue.status}</td>
                        <td>
                            <button class="resolve-btn" onclick="resolveIssue(${issue.id})">Resolve</button>
                        </td>
                    </tr>
                `;
                issuesTable.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching issues:", error));
}

function resolveIssue(issueId) {
    fetch(`http://127.0.0.1:5001/issues/${issueId}/resolve`, { method: "PUT" })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchIssues();
        })
        .catch(error => console.error("Error resolving issue:", error));
}
