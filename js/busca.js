//----------------acesso à URL da busca---------------
const params = window.location.search;
const searchParams = new URLSearchParams(params);
const filtoNome = searchParams.get('nome')
const filtroStatus = searchParams.get('status')
const filtroGenero = searchParams.get('genero')
const API = `https://rickandmortyapi.com/api/character/?name=${filtoNome}&status=${filtroStatus}&gender=${filtroGenero}`;

//----------------acesso à API---------------
const getBusc = (page) =>{
	return fetch(page)
	.then(resp => resp.json())
	.then(json => {pagination(json.info),printBusc(json)
		document.querySelector('#erro').textContent = ""})
	.catch(error => {
		document.querySelector('#erro').textContent = "Os filtros de busca não encontraram nenhum personagem. Procure novamente"; 
	})
}

//----------------Lista dos personagens buscados---------------
const printBusc = (char) =>{
	let html = '';
	const lista = document.querySelector('#lista')
	char.results.forEach(x=>{
		html += `<article class="card">
					<a href="char.html?url=${x.url}"><img class="cardImg" src='${x.image}'></a>
					<h2>Nome: ${x.name}</h2>
					<h3>Status: ${x.status}</h3>
				</article>`	
	lista.innerHTML = html
	})
}

//----------------Controle da Paginação---------------
const pagination = (info) =>{ 
	console.log(info)
	document.querySelector('#prev').setAttribute('onclick',`getBusc('${info.prev}')`)
	if(info.prev == null) document.querySelector('#prev').classList.add('disable')
	else{document.querySelector('#prev').classList.remove('disable')}
	
	document.querySelector('#next').setAttribute('onclick',`getBusc('${info.next}')`)
	if(info.next == null) document.querySelector('#next').classList.add('disable')
	else document.querySelector('#next').classList.remove('disable')
}	

getBusc(API)


//-----------------Ferramenta de busca-----------------


const botao = document.querySelector('#buscar')
botao.addEventListener("click",function(){
	let nome = document.querySelector('#name').value
	let sta = document.querySelector('#status').value
	let gen = document.querySelector('#genero').value
	location.href = 'busca.html?nome='+nome+'&status='+sta+'&genero='+gen;
	})

const enter = document.querySelector('body')
enter.addEventListener("keydown",function(){
	event.keycode
	if(event.keyCode === 13){
		let nome = document.querySelector('#name').value
		let sta = document.querySelector('#status').value
		let gen = document.querySelector('#genero').value
		location.href = 'busca.html?nome='+nome+'&status='+sta+'&genero='+gen;
	}
	})
