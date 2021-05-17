//--------------------acesso à URL do Local---------------
const params = window.location.search
const searchParams = new URLSearchParams(params)
const id = searchParams.get('url')
const url = `${id}`;

//-----------------Acesso à API-----------------
const getLoc = (char) =>{
    return fetch(char)
    .then(response=>response.json())
    .then(json =>pageLoc(json))
}

//----------------Informações sobre o Local-------------
const pageLoc = (loc) => {
    let html = `<h2>Nome do lugar: ${loc.name}</h2>
                <h3>Dimenção: ${loc.dimension}</h3>
                <h3>Tipo do lugar: ${loc.type}</h3>`
    document.querySelector('#location').innerHTML = html

//-----------------Lista de personagens que moram no local --------------  
    loc.residents.forEach(x =>{
        let xhr = new XMLHttpRequest()
        xhr.open('GET',x); 
        xhr.addEventListener("load", function(){
            const lista = xhr.responseText;
            const char = JSON.parse(lista);
            let html = `<a href="char.html?url=${char.url}"><img class="miniImg" src='${char.image}'></a>`
            document.querySelector('#residents').innerHTML += html
      })
      xhr.send();
})
}
getLoc(url);

//-------------Ferramenta de Busca--------------

const botao = document.querySelector('#buscar')
botao.addEventListener("click",function(){
	event.preventDefault();
    let nome = document.querySelector('#name').value
    let sta = document.querySelector('#status').value
    let gen = document.querySelector('#genero').value
	const http = `?nome=${nome}&status=${sta}&genero=${gen}`
	const busca = `busca.html${http}`;
	location.href = busca
	})

const enter = document.querySelector('body')
enter.addEventListener("keydown",function(){
    event.keycode
    if(event.keyCode === 13){
    let nome = document.querySelector('#name').value
    let sta = document.querySelector('#status').value
    let gen = document.querySelector('#genero').value
    const http = `?nome=${nome}&status=${sta}&genero=${gen}`
    const busca = `busca.html${http}`;
    location.href = busca}
    })