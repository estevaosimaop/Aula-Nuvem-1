let data = [];
document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("userForm");
    const userList = document.getElementById("userList");

    userForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        const user = {
            name: name,
            email: email,
        };
        data.push(user);
        localStorage.setItem("data", JSON.stringify(data));
        addUserToList(user);

        userForm.reset();
    });

    function addUserToList(user) {
        const li = document.createElement("li");
        li.innerHTML = `${user.name} - ${user.email} <button onclick= 'removerItem("${user.email}")'> Remover</button>`;

        userList.appendChild(li);
    }

    Object.keys(localStorage).forEach((key) => {
        console.log(key);
        const user = JSON.parse(localStorage.getItem(key));
        addUserToList(user);
    });
});

function removerItem(id) {
    alert(id);
    localStorage.removeItem(id);
    window.location.reload(true);
}

function loadData() {
    const url =
        "https://a45b8fd0-560e-457e-8382-84745213fafd-00-1r1aimao64pwu.spock.replit.dev";
    fetch(`${url}/load`)
        .then((response) => response.json())
        .then((data) => {
            const dataList = document.getElementById("dataList");
            dataList.innerHTML = ""; // Limpa a lista existente
            data.forEach((item) => {
                const li = document.createElement("li");
                li.textContent = `Chave: ${item.key}, Valor: ${item.value}`;

                // Botão para excluir o item
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Excluir";
                deleteButton.onclick = () => deleteData(item.key);

                li.appendChild(deleteButton);
                dataList.appendChild(li);
            });
        })
        .catch((error) => console.error("Erro ao carregar dados:", error));
}

loadData();
