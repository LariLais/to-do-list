// Variáveis
const tarefa_nova_adicionada = document.querySelector("#input_tarefa");
const btn_adicionar = document.querySelector("#btn_adicionar");
const container_tarefas = document.querySelector(".container_tarefas");

// Funções
function criarBlocoDeTarefas(tarefaNova, id) {
  let tarefa = document.createElement("div");
  tarefa.className = "tarefa";
  tarefa.dataset.id = id;

  let paragrafo = document.createElement("p");
  paragrafo.id = `tarefa-${id}`;
  paragrafo.className = "nome_tarefa";
  paragrafo.textContent = tarefaNova;

  let botoes = document.createElement("div");
  botoes.className = "btns";

  let botao_editar = document.createElement("button");
  botao_editar.id = `btn_editar-${id}`;
  botao_editar.title = "Editar";
  botao_editar.innerHTML = "&#9998;";
  botao_editar.className = "btn_editar";

  let botao_deletar = document.createElement("button");
  botao_deletar.id = `btn_deletar-${id}`;
  botao_deletar.title = "Apagar";
  botao_deletar.innerHTML = "&#10006;";
  botao_deletar.className = "btn_deletar";

  botoes.appendChild(botao_editar);
  botoes.appendChild(botao_deletar);

  tarefa.appendChild(paragrafo);
  tarefa.appendChild(botoes);

  container_tarefas.appendChild(tarefa);

  botao_editar.addEventListener("click", () => editarTarefa(id));
  botao_deletar.addEventListener("click", () => removerTarefa(id));
}

function editarTarefa(id) {
  const paragrafo = document.getElementById(`tarefa-${id}`);
  const novoValor = prompt(
    "Digite o novo valor da tarefa:",
    paragrafo.textContent
  );
  if (novoValor) {
    paragrafo.textContent = novoValor;
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const tarefaAtualizada = tarefas.find((tarefa) => tarefa.id === id);
    if (tarefaAtualizada) {
      tarefaAtualizada.texto = novoValor;
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
  }
}

function removerTarefa(id) {
  const tarefaParaRemover = document.querySelector(`[data-id="${id}"]`);
  tarefaParaRemover.remove();

  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionarNovaTarefaAoLayout() {
  let tarefaNova = tarefa_nova_adicionada.value;
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  let newId = tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 0;
  tarefas.push({ id: newId, texto: tarefaNova });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  criarBlocoDeTarefas(tarefaNova, newId);
}

function recuperarTarefasDoLocalStorage() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.forEach((tarefa) => {
    criarBlocoDeTarefas(tarefa.texto, tarefa.id);
  });
}

document.addEventListener("DOMContentLoaded", recuperarTarefasDoLocalStorage);

// Eventos
btn_adicionar.addEventListener("click", () => {
  adicionarNovaTarefaAoLayout();
});
