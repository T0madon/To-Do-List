document
  .getElementById("input-new-task")
  .addEventListener("keypress", function (ev) {
    if (ev.key === "Enter") {
      newTask();
    }
  });

const localStorageKey = "to-do-list-elements";

function newTask() {
  let input = document.getElementById("input-new-task");

  //VERIFICA SE O INPUT ESTÁ VAZIO
  if (!input.value) {
    alert('Campo "Nova Task" vazio');
    input.focus();
  }
  //VERIFICA SE TEM UMA TASK COM O MESMO NOME
  else if (validaNovaTask(input.value)) {
    alert("A tag " + input.value + " já existe!");
    input.value = "";
    input.focus();
  }

  //ADICIONA NOVA TASK
  else {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    values.push({
      name: input.value,
    });
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();

    input.value = "";
    input.focus();
  }
}

function showValues() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let lista = document.getElementById("to-do-list");
  lista.innerHTML = "";

  for (let i = 0; i < values.length; i++) {
    lista.innerHTML += `<li>${values[i]["name"]}<button id='btn-ok' onclick='removeItem("${values[i]["name"]}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg></button></li>`;
  }
}

function removeItem(itemRemov) {
  let input = document.getElementById("input-new-task");
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let index = values.findIndex((x) => x.name == itemRemov);

  values.splice(index, 1);
  localStorage.setItem(localStorageKey, JSON.stringify(values));

  showValues();
  input.focus();
}

showValues();

function validaNovaTask(valor) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

  for (let i = 0; i < values.length; i++) {
    if (valor === values[i]["name"]) {
      return true;
    }
  }
  return false;
}
