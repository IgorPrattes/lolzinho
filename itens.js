var json = false;

fetch("https://ddragon.leagueoflegends.com/cdn/10.18.1/data/pt_BR/item.json").then(res => res.json()).then(xhr => {
	json = xhr;
	let i = 0;
	
	for(prop in xhr.data){
		if(i == 0){
			showDetails(prop)
			i++;
		}
		
		document.getElementById("todos").innerText = "Itens";
		
    	document.getElementById("todositens").innerHTML += "<div><img src='https://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/"+ json.data[prop].image.full +"' title='"+ json.data[prop].name +"' id='"+ prop +"' onclick='showDetails(this.id)' style='cursor: pointer'></div>";
    }
});

function showDetails(id){
	document.getElementById("titulo").innerText = json.data[id].name;
	document.getElementById("detalhes").innerHTML = "";
	
	document.getElementById("detalhes").innerHTML += "<center><img src='https://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/"+ json.data[id].image.full +"'></center><br>"+ json.data[id].description;

	document.getElementById("aprimoramentos").innerText = "";
	document.getElementById("apritens").innerHTML = "";
	
	try{
		if(json.data[id].into.length > 0) document.getElementById("aprimoramentos").innerText = "Aprimoramentos";
	
		for(let i = 0; i < json.data[id].into.length; i++){
			document.getElementById("apritens").innerHTML += "<div><img src='https://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/"+ json.data[id].into[i] +".png' title='"+ json.data[json.data[id].into[i]].name +"' id='"+ json.data[id].into[i] +"' onclick='showDetails(this.id)' style='cursor: pointer'></div>";
		}
	} catch(e){
		console.clear();
	}
	
	let links = document.getElementsByTagName("a");
	
	for(let i = 0; i < links.length; i++){
		if(i > 3) links[i].href = "#titulo";
	}
	
	let hrs = document.getElementsByTagName("hr");
	
	for(let i = 0; i < hrs.length; i++){
		hrs[i].remove();
	}
	
	window.location = "#titulo";
}