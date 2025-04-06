document.addEventListener("DOMContentLoaded", () => {
  const comprarButtons = document.querySelectorAll(".comprar");
  const fruitSelectionScreen = document.getElementById("fruit-selection-screen");
  const purchaseForm = document.querySelector("#fruit-selection-screen #purchaseDetails");
  const successMessage = document.getElementById("successMessage");
  const moreOptionsButton = document.getElementById("more-options");
  const fruits = document.querySelectorAll(".fruit");
  const cardBackground = document.getElementById("card-background");

  // Mostrar pantalla de selección de frutas
  comprarButtons.forEach(button => {
      button.addEventListener("click", () => {
          fruitSelectionScreen.style.display = "block";
          purchaseForm.style.display = "none";
          successMessage.style.display = "none";
          moreOptionsButton.textContent = "Más opciones";
      });
  });

  // Actualizar la vista previa con la fruta seleccionada
  fruits.forEach(fruit => {
      fruit.addEventListener("click", () => {
          const selectedFruit = fruit.getAttribute("data-fruit");

          // Cambiar la imagen de la tarjeta de vista previa según la fruta seleccionada
          cardBackground.src = `IMG/Tarjetas/${selectedFruit}.png`; // Asegúrate de que el nombre del archivo sea correcto y que exista en la carpeta

          // Añadir una clase para resaltar la fruta seleccionada
          fruits.forEach(f => f.classList.remove("selected"));
          fruit.classList.add("selected");
      });
  });

  // Mostrar/ocultar formulario de compra al hacer clic en el botón "Más opciones"
  moreOptionsButton.addEventListener("click", () => {
      if (purchaseForm.style.display === "block") {
          // Ocultar el formulario y cambiar el texto a "Más opciones"
          purchaseForm.style.display = "none";
          moreOptionsButton.textContent = "Más opciones";
      } else {
          // Mostrar el formulario y cambiar el texto a "Menos opciones"
          purchaseForm.style.display = "block";
          moreOptionsButton.textContent = "Menos opciones";
      }
  });

  // Procesar la compra
  purchaseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      fruitSelectionScreen.style.display = "none"; // Ocultar la selección de frutas
      purchaseForm.style.display = "none";
      successMessage.style.display = "block"; // Mostrar mensaje de éxito
  });
});
