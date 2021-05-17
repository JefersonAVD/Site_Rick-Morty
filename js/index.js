let API = `https://rickandmortyapi.com/api/character`

//-------------Base da aquisição dos dados---------//
const getPage = (page) =>{
	return fetch(page)
	.then(resp => resp.json())
	.then(json => {printList(json),Pagination(json.info)
		document.querySelector('#erro').textContent = ""})
	.catch(error => { document.querySelector('#erro').textContent = "Os filtros de busca não encontraram nenhum personagem. Procure novamente"})
}

//-------------Funcionamento da lista de personagens (informações, e hyperlink) ---------//
const printList = (char) =>{
	let html = '';
	char.results.forEach(x =>{
	html += `<article class="card">
				<a href="char.html?url=${x.url}"><img class="cardImg"src='${x.image}'></a>
				<h2>Nome: ${x.name}</h2>
				<h3>Status: ${x.status}</h3>
			</article>`	
	document.querySelector('#lista').innerHTML = html
	})
}
//-------------Funcionamento dos botões de Paginação---------//
const Pagination = (info) =>{ 

	document.querySelector('#prev').setAttribute('onclick',`getPage('${info.prev}')`)
	if(info.prev == null) document.querySelector('#prev').classList.add('disable')
	else{document.querySelector('#prev').classList.remove('disable')}
	
	document.querySelector('#next').setAttribute('onclick',`getPage('${info.next}')`)
	if(info.next == null) document.querySelector('#next').classList.add('disable')
	else document.querySelector('#next').classList.remove('disable')

	document.querySelector('#home').setAttribute('onclick',`getPage('${API}')`)
	
}	

//-------------Ferramenta de busca------------------

//-------------Busca com o botão Buscar------------------
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

//----------------buscar com o enter------------
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

getPage(API)