const nameBox = document.getElementById("nameBox")
const contentBox = document.getElementById("contentBox")
const dateBox = document.getElementById("dateBox")
const containerDiv = document.getElementById("containerDiv")

let allNotes = [];

function AddNote() {
    if(!validation())return;
    const dateTime = formatDateTime(dateBox.value);
    const name = nameBox.value
    const content = contentBox.value
    const note = {
        name,
        content,
        dateTime
    };
    allNotes.push(note);
    displayNotes(allNotes)
    saveNotes()

}

function displayNotes(arr) {
    let html = "";
    if (arr.length === 0) {
        containerDiv.innerHTML = "";
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        const note = arr[i];
        html += `<div class="card note p-3 mb-3">
                    <h5>${note.name}</h5>
                    <p>${note.content}</p>
                    <small>${note.dateTime}</small>
                    <button onclick="clearNote(${i})" class="btn btn-white btn-sm mt-2" id = "deleteButton">🗑️</button>
                 </div>`;
    }
    containerDiv.innerHTML = html;
}

function clearNote(index) {
    const sure = confirm("are you sure you want to delete the note? ");
    if (!sure) return;

    allNotes.splice(index, 1)
    displayNotes(allNotes)

}

function resetForm() {
    nameBox.value = ""
    contentBox.value = ""
    dateBox.value = ""
}

function validation(){
    if(!nameBox.value){
        alert("enter the name of the task!")
        nameBox.focus();
        return false
    }
    if(!contentBox.value){
        alert("enter the task!")
        contentBox.focus();
        return false
    }
    if(!dateBox.value){
        alert("enter the deadline of the task!")
        dateBox.focus();
        return false
    }
    return true;
}

function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString("en-GB"); 
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }); 
  
    return `${formattedDate} , ${formattedTime}`;
}
  

function saveNotes() {
    const json = JSON.stringify(allNotes);
    localStorage.setItem("allNotes", json);
}

function loadNotes() {
    const json = localStorage.getItem("allNotes");
    if (!json) return;
    allNotes = JSON.parse(json)
    displayNotes(allNotes)
}