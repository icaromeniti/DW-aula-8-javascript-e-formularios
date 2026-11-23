/*
Descricao: DW-aula-8-javascript-e-formularios
nome_arquivo: script.js
nome_exercicio: formulário e javascript - tudo o que foi passado em aula
nome_aluno: Diego Augusto Ângelo
email_aluno: diego.angelo@aluno.cps.sp.gov.br
turma: WEBI-ISW028-A
*/

const comentarioInput = document.getElementById("comentario");
const contadorEl = document.getElementById("contador");
const btnEnviarComentario = document.getElementById("btn-enviar-comentario");
const LIMITE_COMENTARIO = 140;

comentarioInput.addEventListener("input", () => {
  const restantes = LIMITE_COMENTARIO - comentarioInput.value.length;
  contadorEl.textContent = restantes;

  if (restantes <= 0) {
    contadorEl.classList.add("limite-zero");
    btnEnviarComentario.disabled = true;
  } else {
    contadorEl.classList.remove("limite-zero");
    btnEnviarComentario.disabled = false;
  }
});

const senhaInput = document.getElementById("senha");
const confirmaSenhaInput = document.getElementById("confirma-senha");
const msgSenha = document.getElementById("msg-senha");
const btnCadastrar = document.getElementById("btn-cadastrar");

function validarSenhas() {
  const senha = senhaInput.value;
  const confirma = confirmaSenhaInput.value;

  if (!confirma) {
    msgSenha.textContent = "";
    msgSenha.className = "feedback";
    btnCadastrar.disabled = true;
    return;
  }

  if (senha === confirma) {
    msgSenha.textContent = "As senhas coincidem";
    msgSenha.className = "feedback sucesso";
    btnCadastrar.disabled = false;
  } else {
    msgSenha.textContent = "As senhas são diferentes";
    msgSenha.className = "feedback erro";
    btnCadastrar.disabled = true;
  }
}

senhaInput.addEventListener("input", validarSenhas);
confirmaSenhaInput.addEventListener("input", validarSenhas);

const produtoSelect = document.getElementById("produto-pedido");
const quantidadeInput = document.getElementById("quantidade");
const totalPedidoEl = document.getElementById("total-pedido");

function atualizarTotal() {
  const preco = Number(produtoSelect.value) || 0;
  const qtd = Math.max(0, Number(quantidadeInput.value) || 0);
  const total = preco * qtd;

  totalPedidoEl.textContent = `Total: ${total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}`;
}

produtoSelect.addEventListener("change", atualizarTotal);
quantidadeInput.addEventListener("input", atualizarTotal);
atualizarTotal();

const formProduto = document.getElementById("form-produto");
const resultadoJson = document.getElementById("resultado-json");

formProduto.addEventListener("submit", (event) => {
  event.preventDefault();

  const produto = {
    nome: document.getElementById("prod-nome").value.trim(),
    categoria: document.getElementById("prod-categoria").value.trim(),
    preco: Number(document.getElementById("prod-preco").value),
  };

  const jsonFormatado = JSON.stringify(produto, null, 2);
  console.log(jsonFormatado);
  resultadoJson.textContent = jsonFormatado;
});

const telefoneInput = document.getElementById("telefone");

telefoneInput.addEventListener("keyup", () => {
  // Remove tudo que não for dígito e limita a 11 números
  let digitos = telefoneInput.value.replace(/\D/g, "").slice(0, 11);

  if (digitos.length > 6) {
    digitos = digitos.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  } else if (digitos.length > 2) {
    digitos = digitos.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  } else if (digitos.length > 0) {
    digitos = digitos.replace(/^(\d{0,2})/, "($1");
  }

  telefoneInput.value = digitos;
});

const departamentoSelect = document.getElementById("departamento");
const funcionarioSelect = document.getElementById("funcionario");

const funcionariosPorDepto = {
  TI: ["Allan", "Beatriz", "Carlos"],
  RH: ["Daniela", "Eduardo"],
};

departamentoSelect.addEventListener("change", () => {
  const depto = departamentoSelect.value;
  funcionarioSelect.innerHTML = "";

  if (!depto || !funcionariosPorDepto[depto]) {
    funcionarioSelect.disabled = true;
    const optPadrao = document.createElement("option");
    optPadrao.value = "";
    optPadrao.textContent = "Escolha um departamento primeiro";
    funcionarioSelect.appendChild(optPadrao);
    return;
  }

  funcionarioSelect.disabled = false;
  funcionariosPorDepto[depto].forEach((nome) => {
    const option = document.createElement("option");
    option.value = nome;
    option.textContent = nome;
    funcionarioSelect.appendChild(option);
  });
});

const inputHabilidade = document.getElementById("input-habilidade");
const btnAddHabilidade = document.getElementById("btn-add-habilidade");
const listaHabilidades = document.getElementById("lista-habilidades");

function adicionarHabilidade() {
  const texto = inputHabilidade.value.trim();
  if (!texto) return;

  const badge = document.createElement("span");
  badge.className = "badge";

  const textoSpan = document.createElement("span");
  textoSpan.textContent = texto;

  const btnRemover = document.createElement("button");
  btnRemover.type = "button";
  btnRemover.textContent = "X";
  btnRemover.title = "Remover";
  btnRemover.addEventListener("click", () => {
    badge.remove();
  });

  badge.appendChild(textoSpan);
  badge.appendChild(btnRemover);
  listaHabilidades.appendChild(badge);

  inputHabilidade.value = "";
  inputHabilidade.focus();
}

btnAddHabilidade.addEventListener("click", adicionarHabilidade);
inputHabilidade.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    adicionarHabilidade();
  }
});

const dataNascimentoInput = document.getElementById("data-nascimento");
const avisoIdade = document.getElementById("aviso-idade");
const btnFinalizar = document.getElementById("btn-finalizar");

function calcularIdade(dataString) {
  const hoje = new Date();
  const nascimento = new Date(dataString + "T00:00:00");

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const diferencaMes = hoje.getMonth() - nascimento.getMonth();

  if (
    diferencaMes < 0 ||
    (diferencaMes === 0 && hoje.getDate() < nascimento.getDate())
  ) {
    idade--;
  }

  return idade;
}

dataNascimentoInput.addEventListener("change", () => {
  if (!dataNascimentoInput.value) {
    avisoIdade.textContent = "";
    btnFinalizar.disabled = true;
    return;
  }

  const idade = calcularIdade(dataNascimentoInput.value);

  if (idade >= 18) {
    avisoIdade.textContent = `Cadastro liberado (${idade} anos).`;
    avisoIdade.className = "feedback sucesso";
    btnFinalizar.disabled = false;
  } else {
    avisoIdade.textContent = "Apenas para maiores de idade";
    avisoIdade.className = "feedback erro";
    btnFinalizar.disabled = true;
  }
});

const selecionarTodos = document.getElementById("selecionar-todos");
const itensCheck = document.querySelectorAll(".item-check");

selecionarTodos.addEventListener("change", () => {
  itensCheck.forEach((checkbox) => {
    checkbox.checked = selecionarTodos.checked;
  });
});

itensCheck.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const todosMarcados = Array.from(itensCheck).every((item) => item.checked);
    selecionarTodos.checked = todosMarcados;
  });
});

const toggleDark = document.getElementById("toggle-dark");
const CHAVE_TEMA = "tema_dark_ativo";

function aplicarTema(ativo) {
  document.body.classList.toggle("dark-theme", ativo);
  toggleDark.checked = ativo;
}

const temaSalvo = localStorage.getItem(CHAVE_TEMA) === "true";
aplicarTema(temaSalvo);

toggleDark.addEventListener("change", () => {
  const estaAtivo = toggleDark.checked;
  aplicarTema(estaAtivo);
  localStorage.setItem(CHAVE_TEMA, String(estaAtivo));
});