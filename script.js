document.addEventListener("DOMContentLoaded", function() {
    let bodytabela = document.querySelector('#bodytabela');

    // Função para carregar os dados do JSON e preencher a tabela
    function loadJSONDataAndPopulateTable(startDate, endDate) {
        fetch("dados.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar os dados.');
                }
                return response.json();
            })
            .then(dados => {
                bodytabela.innerHTML = ''; // Limpa o conteúdo da tabela antes de preencher

                dados.itens.forEach(item => {
                    const dataLote = new Date(item.datalote);
                    const dataVenda = new Date(item.datavenda);

                    // Verifica se a data do lote ou a data da venda está dentro do intervalo especificado
                    if ((dataLote >= startDate && dataLote <= endDate) || (dataVenda >= startDate && dataVenda <= endDate)) {
                        bodytabela.innerHTML += `<tr>
                            <td>${item.id}</td>
                            <td>${item.item}</td>
                            <td>${item.quant}</td>
                            <td>${item.datalote}</td>
                            <td>${item.datavenda}</td>
                        </tr>`;
                    }
                });
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }

    // Adiciona um evento de clique ao botão "CONSULTAR"
    document.getElementById("btn").addEventListener("click", function() {
        const startDate = new Date(document.getElementById("start_date").value);
        const endDate = new Date(document.getElementById("end_date").value);

        loadJSONDataAndPopulateTable(startDate, endDate); // Quando o botão é clicado, carrega os dados do JSON e preenche a tabela
    });
});
