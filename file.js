const dropdown = document.querySelector(".dropbtn");
const saveLink = document.getElementById("save-link");
const loadLink = document.getElementById("load-link");
const cleanLink = document.getElementById("clean-link");
const seleccionarArchivo = document.querySelector(".seleccionarArchivo");
const file = document.querySelector("#files");
const texto_editor = document.getElementById("editor");
const resultado = document.getElementById('resultado')


// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert("The File APIs are not fully supported in this browser.");
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

dropdown.addEventListener("click", () =>
  document.getElementById("myDropdown").classList.toggle("show")
);

/*Botones File */
/*Guardar archivo */
/*habilitar save si hay contenido en el textarea */
dropdown.addEventListener("click", () => {
  const texto = editor.value;
  if (texto) {
    saveLink.classList.remove("save-disabled");
  } else {
    if (!saveLink.classList.contains("save-disabled"))
      saveLink.classList.add("save-disabled");
    saveLink.href = "#";
  }
});
/*Realizar descarga del archivo */
saveLink.addEventListener("click", () => {
  if (!saveLink.classList.contains("save-disabled")) {
    const nombre = nombreArchivo();
    if (nombre) {
      saveLink.href = makeTextFile(editor.value);
      saveLink.download = nombre;
      setTimeout(() => {
        saveLink.removeAttribute("download");
        saveLink.href = "#";
      }, 1000);
    }
  }
});
/*pedirle al usuario el nombre del archivo a crear */
nombreArchivo = () => {
  const nombre = prompt("Como quieres que se llame tu archivo?");
  return nombre ? nombre + ".txt" : false;
};

/*Crear Url del txt*/
let textFile = null,
  makeTextFile = text => {
    let data = new Blob([text], { type: "text/plain" });

    //If we are replacing a previously generated file we need to
    //manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
  };

/*Cargar un archivo txt */
/*seleccionar archivo */
loadLink.addEventListener("click", () => {
  seleccionarArchivo.classList.add("show");
});

// Close the dropdown and seleccionarArchivo if the user clicks outside of it
window.onclick = e => {
  closeDropdown(e);
  closeSeleccionarArchivo(e);
};

closeDropdown = e => {
  if (!e.target.matches(".dropbtn")) {
    var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains("show")) {
      myDropdown.classList.remove("show");
    }
  }
};

closeSeleccionarArchivo = e => {
  if (
    !e.target.matches(".seleccionarArchivo") &&
    !e.target.matches("#load-link") &&
    !e.target.matches("#files") &&
    !e.target.matches("#dropZoneWrapper") &&
    !e.target.matches("#drop_zone") &&
    !e.target.matches("#list")
  ) {
    if (seleccionarArchivo.classList.contains("show")) {
      seleccionarArchivo.classList.remove("show");
    }
  }
};

/*Leer datos seleccionados */
file.addEventListener("change", () => {
  setTimeout(() => {
    seleccionarArchivo.classList.remove("show");
    if (confirm("Seguro que desea reemplazar el texto actual\nCon " + file.files[0].name)) {
      const reader = new FileReader();
      reader.readAsText(file.files[0]);
      reader.onload = () => {
        texto_editor.value = reader.result;
      }
    }
  }, 200);
}, false);

/*limpiar el editor */
cleanLink.addEventListener("click", () => {
  if (confirm("Seguro que desea limpiar el editor?")) {
    texto_editor.value = "";
    resultado.value = '';
  }
})

