const myDiv = document.getElementById("myDiv");
console.log(myDiv);

const div = document.createElement("div");
div.classList = "myDiv my-4";

const input = document.createElement("input");
input.placeholder = "Enter your item";
input.classList = "form-control";

const label = document.createElement("label");
label.textContent = "Item Name";
label.classList = "form-label";

const submitButton = document.createElement("button");
submitButton.textContent = "Add Item";
submitButton.classList = "btn btn-info";

const list = document.createElement("ul");
submitButton.addEventListener("click",  () => {
    const item = input.value.trim();
    if (!item) {
        alert("Please enter an item name.");
        return;
    }
    const li= document.createElement("li");
    li.textContent = item;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList = "btn btn-danger p-2 m-2";
    deleteButton.addEventListener("click", () =>deleteitem(li)
    li.appendChild(deleteButton);
    list.appendChild(li);
    input.value = "";
});

div.appendChild(label);
div.appendChild(input);
div.appendChild(submitButton);
myDiv.appendChild(div);
myDiv.appendChild(list);
function deleteitem(li) {
    list.removeChild(li);
}