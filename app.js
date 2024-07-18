document.addEventListener("DOMContentLoaded", () => {
  const jobListContainer = document.getElementById("job-list");
  const companiesListContainer = document.getElementById("companies-list");
  const applicationForm = document.getElementById("application-form");
  const candidatesSection = document.getElementById("candidates");
  const jobTitleElement = document.getElementById("job-title");
  const jobIdInput = document.getElementById("job-id");
  const statusMessage = document.getElementById("status-message");

  // Carregar e exibir a lista de vagas
  function loadJobs() {
    fetch("https: jrvagas//.netlify.app/jobs")
      .then((response) => response.json())
      .then((data) => {
        const jobListHTML = data
          .map((job) => {
            return `<li data-id="${job.id}" data-title="${job.title}">
                          <h3>${job.title}</h3>
                          <p>${job.company} - ${job.location}</p>
                          <button class="select-btn">Selecionar</button>
                      </li>`;
          })
          .join("");
        jobListContainer.innerHTML = jobListHTML;

        // Adicionar evento de clique para o botão "Selecionar"
        const selectButtons = document.querySelectorAll(".select-btn");
        selectButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const jobId = button.parentElement.getAttribute("data-id");
            const jobTitle = button.parentElement.getAttribute("data-title");
            showApplicationForm(jobId, jobTitle);
          });
        });
      })
      .catch((error) =>
        console.error("Erro ao carregar lista de vagas:", error)
      );
  }

  // Carregar e exibir a lista de empresas
  function loadCompanies() {
    fetch("https: jrvagas//.netlify.app/companies")
      .then((response) => response.json())
      .then((data) => {
        const companiesListHTML = data
          .map((company) => {
            return `<li>
                          <h3>${company.company}</h3>
                          <p>${company.description} - ${company.location}</p>
                      </li>`;
          })
          .join("");
        companiesListContainer.innerHTML = companiesListHTML;
      })
      .catch((error) =>
        console.error("Erro ao carregar lista de empresas:", error)
      );
  }

  // Exibir o formulário de candidatura preenchido com a vaga selecionada
  function showApplicationForm(jobId, jobTitle) {
    jobTitleElement.textContent = jobTitle;
    jobIdInput.value = jobId;
    candidatesSection.style.display = "block"; // Mostrar a seção de candidatos
    statusMessage.textContent = ""; // Limpar mensagem de status ao mostrar o formulário
  }

  // Carregar lista de vagas e empresas ao carregar a página
  loadJobs();
  loadCompanies();

  // Lidar com o envio do formulário
  document.getElementById("apply-form").addEventListener("submit", (e) => {
    console.log("Formulário enviado!");
    e.preventDefault();
    const formData = new FormData(applicationForm);

    fetch("https: jrvagas//.netlify.app/apply", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Verificar o que está sendo recebido da API
        if (data.status === "success") {
          statusMessage.textContent =
            "Seu CV foi enviado com sucesso para revisão.";
          console.log("Status atualizado com sucesso:", data.status);
          // Atualizar lista de vagas e empresas após envio do currículo
          loadJobs();
          loadCompanies();
        } else if (data.status === "error") {
          statusMessage.textContent = "Ocorreu um erro ao enviar o CV.";
        } else {
          statusMessage.textContent = "Status desconhecido.";
        }
      })
      .catch((error) => {
        console.error("Erro ao enviar formulário:", error);
        statusMessage.textContent = "Ocorreu um erro ao enviar o formulário.";
      });
  });

  // Lidar com o envio do formulário de busca de vagas
  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const searchInput = document.getElementById("search-input").value.trim();
    if (searchInput === "") {
      loadJobs(); // Carregar todas as vagas se o campo de busca estiver vazio
    } else {
      searchJobs(searchInput); // Pesquisar vagas com base no termo digitado
    }
  });

  // Função para buscar vagas com base no termo de busca
  function searchJobs(searchTerm) {
    fetch(`https: jrvagas//.netlify.app/search?q=${encodeURIComponent(searchTerm)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar vagas");
        }
        return response.json();
      })
      .then((data) => {
        const jobListHTML = data
          .map((job) => {
            return `<li data-id="${job.id}" data-title="${job.title}">
                      <h3>${job.title}</h3>
                      <p>${job.company} - ${job.location}</p>
                      <button class="select-btn">Selecionar</button>
                  </li>`;
          })
          .join("");
        jobListContainer.innerHTML = jobListHTML;

        // Adicionar evento de clique para o botão "Selecionar"
        const selectButtons = document.querySelectorAll(".select-btn");
        selectButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const jobId = button.parentElement.getAttribute("data-id");
            const jobTitle = button.parentElement.getAttribute("data-title");
            showApplicationForm(jobId, jobTitle);
          });
        });
      })
      .catch((error) => console.error("Erro ao pesquisar vagas:", error));
  }
});
