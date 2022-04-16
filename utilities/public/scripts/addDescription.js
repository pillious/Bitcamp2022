let changeUpdateBtn;
let changeAddBtn;
let changeDeleteBtn;

let existingCommonNameInput;
let commonNameInput;
let scientificNameInput;
let descriptionInput;
let citationsInput;

let submitAddBtn;
let submitUpdateBtn;
let submitDeleteBtn;

window.onload = () => {
    changeUpdateBtn = document.getElementById("change_update");
    changeAddBtn = document.getElementById("change_add");
    changeDeleteBtn = document.getElementById("change_delete");

    existingCommonNameInput = document.getElementById("existing_common_name");
    commonNameInput = document.getElementById("common_name");
    scientificNameInput = document.getElementById("scientific_name");
    descriptionInput = document.getElementById("description");
    citationsInput = document.getElementById("citations");

    submitAddBtn = document.getElementById("submit_add");
    submitUpdateBtn = document.getElementById("submit_update");
    submitDeleteBtn = document.getElementById("submit_delete");

    changeAddBtn.addEventListener("click", addAction);
    changeUpdateBtn.addEventListener("click", updateAction);
    changeDeleteBtn.addEventListener("click", deleteAction);

    hideAll();
};

const hideAll = () => {
    existingCommonNameInput.style.display = "none";
    commonNameInput.style.display = "none";
    scientificNameInput.style.display = "none";
    descriptionInput.style.display = "none";
    citationsInput.style.display = "none";
    submitAddBtn.style.display = "none";
    submitUpdateBtn.style.display = "none";
    submitDeleteBtn.style.display = "none";
};

const addAction = () => {
    hideAll();
    commonNameInput.style.display = "inline-block";
    scientificNameInput.style.display = "inline-block";
    descriptionInput.style.display = "inline-block";
    citationsInput.style.display = "inline-block";
    submitAddBtn.style.display = "inline-block";
}

const updateAction = () => {
    hideAll();
    existingCommonNameInput.style.display = "inline-block";
    commonNameInput.style.display = "inline-block";
    scientificNameInput.style.display = "inline-block";
    descriptionInput.style.display = "inline-block";
    citationsInput.style.display = "inline-block";
    submitUpdateBtn.style.display = "inline-block";
}

const deleteAction = () => {
    hideAll();
    commonNameInput.style.display = "inline-block";
    submitDeleteBtn.style.display = "inline-block";
}
