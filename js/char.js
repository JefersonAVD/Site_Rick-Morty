//----------------acesso à URL do Personagem---------------
const params = window.location.search
const searchParams = new URLSearchParams(params)
const id = searchParams.get('url')
const url = id
//----------------acesso à API---------------
const getChar = (char) =>{
    return fetch(char)
    .then(response=>response.json())
    .then(json =>pageChar(json))
}
//----------------Ficha completa dos Personagens---------------
const pageChar = (char) => {
    let disable = '';
	if(char.origin.url == '') disable = 'disable';
    let html = `<img class="cardImg alignTop" src='${char.image}'>
                <div class="alignTop">
                    <h1>Nome: ${char.name}</h1>
                    <h2>Status: ${char.status}</h2>
                    <h2>Gênero: ${char.gender}</h2>
                    <h2>Origem: <a class='default ${disable}' href="local.html?url=${char.origin.url}">${char.origin.name}</a></h2>
                    <h2>Último planeta que habitou: <a class='default ${disable}' href="local.html?url=${char.location.url}"> ${char.location.name}</a></h2>
                </div>`
    document.querySelector('#charBox').innerHTML = html
    
//---------------- Lista de episódios ---------------
    char.episode.forEach(x =>{ 
    let xhr = new XMLHttpRequest()
    xhr.open('GET',x);  
    xhr.addEventListener("load", function(){
        const lista = xhr.responseText;
        const epi = JSON.parse(lista);
        let html = `<div class="epiBox">
                        <h3>${epi.name}</h3>
                        <h4>data de lançamento: ${epi.air_date}</h4>
                        <h4>Episódio: ${epi.episode}</h4>
                    </div>`
        document.querySelector('#charEpisodes').innerHTML += html;
    });

    xhr.send();
    })        
}
//-------------Ferramenta de busca---------
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

const botEnter = document.querySelector('body')
botEnter.addEventListener("keydown",function(){
    event.keycode
    if(event.keyCode === 13){
    let nome = document.querySelector('#name').value
    let sta = document.querySelector('#status').value
    let gen = document.querySelector('#genero').value
    const http = `?nome=${nome}&status=${sta}&genero=${gen}`
    const busca = `busca.html${http}`;
    location.href = busca}
    })
getChar(url);