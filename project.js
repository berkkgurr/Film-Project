const form=document.getElementById("film-form");
const titleElement=document.getElementById("title");
const directorElement=document.getElementById("director");
const urlElement=document.getElementById("url");
const secondCardBody=document.querySelectorAll(".card-body")[1];
const clear=document.getElementById("clear-films");

//Tüm event ler için fonksiyon
eventListeners();
function eventListeners() {
    form.addEventListener("submit",addFilm); //film girdisi
    document.addEventListener("DOMContentLoaded",function () { //filmleri sayfa yüklendiğinde ekleme
        let films=Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });
    secondCardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}
function addFilm(e) {
    const title=titleElement.value;
    const director=directorElement.value;
    const url=urlElement.value;
    if(title==="" || director==="" || url===""){ //hata mesajı
        UI.displayMessages("Eksik bilgi girdiniz..","danger");
    }
    else{ //film oluşturma
        const newFilm= new Film(title,director,url);
        UI.addFilmToUI(newFilm); //arayüze film ekleme
        UI.clearInputs(titleElement,directorElement,urlElement);
        Storage.addFilmToStorage(newFilm); //storage a film ekleme
        UI.displayMessages("Film Eklendi..","success")
    }
    e.preventDefault();
}
function deleteFilm(e) {
    if(e.target.id==="delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("Silme işlemi başarılı..","success");
    }
}
function clearAllFilms() {
    if(confirm("Emin misiniz?")){
    UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
    }
}