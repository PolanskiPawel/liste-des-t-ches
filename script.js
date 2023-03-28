// Récupération des éléments HTML
const form = document.querySelector('form');
const input = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

// Récupération des tâches depuis le stockage local
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Fonction pour afficher les tâches
function displayTasks() {
  // Réinitialisation de la liste des tâches
  taskList.innerHTML = '';
  // Boucle pour ajouter chaque tâche dans la liste
  tasks.forEach((task, index) => {
    // Création de l'élément li
    const li = document.createElement('li');
    // Ajout de la classe "completed" si la tâche est terminée
    if (task.completed) {
      li.classList.add('completed');
    }
    // Ajout de l'élément input pour la case à cocher
const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.checked = task.completed;
// Ajout de l'événement pour marquer la tâche comme terminée
checkbox.addEventListener('click', () => {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
});
li.appendChild(checkbox);
// Création de l'élément label pour le texte de la tâche
const label = document.createElement('label');
label.textContent = task.text;
  // Ajout de l'événement pour modifier la tâche
  label.addEventListener('dblclick', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = label.textContent;
    // Ajout de l'événement pour enregistrer le nouveau texte de la tâche
    input.addEventListener('blur', () => {
      task.text = input.value;
      saveTasks();
      displayTasks();
    });
    li.replaceChild(input, label);
    input.focus();
  });
  
li.appendChild(label);
// Création de l'élément button pour supprimer la tâche
const button = document.createElement('button');
button.textContent = 'Supprimer';
// Ajout de l'événement pour supprimer la tâche
button.addEventListener('click', () => {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
});
li.appendChild(button);
taskList.appendChild(li);
});
}

// Fonction pour ajouter une tâche
function addTask(event) {
event.preventDefault();
const text = input.value.trim();
if (text.length > 0) {
tasks.push({ text, completed: false });
saveTasks();
input.value = '';
displayTasks();
}
}

// Fonction pour sauvegarder les tâches dans le stockage local
function saveTasks() {
localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Ajout de l'événement pour ajouter une tâche
form.addEventListener('submit', addTask);