var json = "";
var champion = "";

var goSlide = false;
var slideIndex = 1;
var automatic = false;

var skins = "";
var changeSkills = true;
var spells = [];
var passive = "";

var size1 = "width: 64px";
var size2 = "width: 75px";

var attr = {};
var attr2 = {};
var goResponsive = true;

//**********************************************************************************************************************************
//                                              Manipulação das requisições
//**********************************************************************************************************************************

// Requisição para carregar todos os campeões
fetch("https://ddragon.leagueoflegends.com/cdn/10.18.1/data/pt_BR/champion.json").then(res => res.json()).then(xhr => {
	json = xhr;
	document.getElementById("champions").innerHTML += "<option hidden selected>Escolha o seu campeão!</option>";
	
	for(prop in json.data){    
    	document.getElementById("champions").innerHTML += "<option value='"+ prop +"'>"+ prop +"</option>";
    }
});

// Evento para carregar informações sobre o campeão selecionado
document.getElementById("champions").addEventListener("change", () => {
	champion = document.getElementById("champions").value;
  
    fetch("https://ddragon.leagueoflegends.com/cdn/10.18.1/data/pt_BR/champion/"+ champion + ".json").then(res => res.json()).then(xhr => {
		json = xhr;
		let size = window.innerWidth;
		
		changeSkills = true;
      
		saveSkins();
		saveSpells();
		saveSkills();
		
		clearInterval(automatic);
    	
    	if(size <= 1024){
	    	size1 = "width: 44px";
		    size2 = "width: 55px";
		    
    		document.getElementById("champ").innerHTML = "<br><table width='100%' style='background: rgba(9, 9, 9, 0.55); border-radius: 20px; padding: 15px;'><tr><td align='center'><h2>"+ json.data[champion].name + ", " + json.data[champion].title +"</h2></td></tr><tr><td>"+ skins +"</td></tr><tr><td align='justify'>"+ json.data[champion].lore +"</td></tr><tr><td colspan='2'><h3>Habilidades</h3>"+ showSpells() +"</td></tr><tr><td align='center'><table width='100%' style='padding: 15px; text-align: justify;'><tr><td align='center'><h3>Atributos - Nível <input type='text' size='1' style='text-align: center' value='1' onchange='changeLevel(this)'></h3></td></tr><tr><td id='skills' width='100%'></td></tr><tr><td align='center'><a href='https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+ champion +"_0.jpg' target='_blank'><img src='https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+ champion +"_0.jpg' width='100%' style='border-radius: 10px; width: 60%;'></a></td></tr></table>";
    	}
    	
    	else{		    
	   		document.getElementById("champ").innerHTML = "<br><table width='100%' style='background: rgba(9, 9, 9, 0.55); border-radius: 20px; padding: 15px;'><tr><td rowspan='3'>"+ skins +"</td><td align='center'><h2>"+ json.data[champion].name + ", " + json.data[champion].title +"</h2></td></tr><tr><td align='justify'>"+ json.data[champion].lore +"</td></tr><tr><td><h3>Habilidades</h3>"+ showSpells() +"</td></tr><tr><td align='center' colspan='2'><table width='100%' style='padding: 15px; text-align: justify;'><tr><td align='center' colspan='3'><h3>Atributos - Nível <input type='number' min='1' max='18' value='1' onchange='changeLevel(this)'></h3></td></tr><tr><td width='26%'></td><td id='skills' width='48%'></td><td width='26%'></td></tr><tr><td colspan='3' align='center'><a href='https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+ champion +"_0.jpg' target='_blank'><img src='https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+ champion +"_0.jpg' width='100%' style='border-radius: 10px; width: 60%;'></a></td></tr></table>";
		}
		
		slideIndex = 1;
		showSlides(slideIndex);
		showSkills();

        automatic = setInterval(() => {
        	showSlides(slideIndex += 1);
        }, 4000);
    });
});

//**********************************************************************************************************************************
//                                             Funções para armazenamento de dados
//**********************************************************************************************************************************

// Função para salvar as skins do campeão
function saveSkins(){
	skins = "<div class='slideshow-container'>";

	for(let i = 0; i < json.data[champion].skins.length; i++){
    	let atual = { nome: json.data[champion].skins[i].name, imagem: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+ champion +"_"+ json.data[champion].skins[i].num +".jpg" };
    
    	if(i == 0) atual.nome = champion;
    
		skins += "<div class='mySlides fade'><div class='numbertext'>"+ (i + 1) +"/"+ (json.data[champion].skins.length)+"</div><img src='"+ atual.imagem +"' class='skins'><div class='text'>"+ atual.nome +"</div></div>";
	}

	skins += "<a class='prev' onclick='showSlides(slideIndex += -1)'>&#10094;</a><a class='next' onclick='showSlides(slideIndex += 1)'>&#10095;</a></div>";
  
	goSlide = true;
}

// Função para salvar as habilidades do campeão
function saveSpells(){
	spells = [];

	for(let i = 0; i < json.data[champion].spells.length; i++){
    	let atual = { nome: json.data[champion].spells[i].name, descricao: json.data[champion].spells[i].description, imagem: "https://ddragon.leagueoflegends.com/cdn/10.18.1/img/spell/"+ json.data[champion].spells[i].image.full };
    
    	spells.push(atual);
	}
  
	passive = { nome: json.data[champion].passive.name, descricao: json.data[champion].passive.description, imagem: "https://ddragon.leagueoflegends.com/cdn/10.18.1/img/passive/"+ json.data[champion].passive.image.full };
}

// Função para salvar os atributos do campeão
function saveSkills(){
	attr = { 
    	hp: json.data[champion].stats.hp, hpup: json.data[champion].stats.hpperlevel, 
    	mp: json.data[champion].stats.mp, mpup: json.data[champion].stats.mpperlevel, 
	    speed: json.data[champion].stats.movespeed, 
	    armor: json.data[champion].stats.armor, armorup: json.data[champion].stats.armorperlevel, 
	    splblock: json.data[champion].stats.spellblock, splblockup: json.data[champion].stats.spellblockperlevel, 
    	atkrng: json.data[champion].stats.attackrange, 
	    hpreg: json.data[champion].stats.hpregen, hpregup: json.data[champion].stats.hpregenperlevel, 
    	mpreg: json.data[champion].stats.mpregen, mpregup: json.data[champion].stats.mpregen, 
    	atkdmg: json.data[champion].stats.attackdamage, atkdmgup: json.data[champion].stats.attackdamageperlevel, 
    	atkspd: json.data[champion].stats.attackspeed, atkspdup: json.data[champion].stats.attackspeedperlevel
	  };
  
	  attr2 = { hp: attr.hp, mp: attr.mp, speed: attr.speed, armor: attr.armor, splblock: attr.splblock, atkrng: attr.atkrng,  hpreg: attr.hpreg,  mpreg: attr.mpreg,  atkdmg: attr.atkdmg, atkspd: attr.atkspd };
}

//**********************************************************************************************************************************
//                                               Funções para manipulação dos spells
//**********************************************************************************************************************************

// Função para exibir as habilidades
function showSpells(){
	let spell = "";
  
	for(let i = 0; i < spells.length; i++){
    	spell += "<img src='"+ spells[i].imagem +"' id='"+ spells[i].nome +"' title='"+ spells[i].nome +"' onclick='seeDetails(this)'>&nbsp;&nbsp;"
  	}
  
	return("<table width='100%'><tr><td class='spells'>"+ spell +"<img src='"+ passive.imagem +"'  id='"+ passive.nome +"' title='"+ passive.nome +"' onload='seeDetails(this)' onclick='seeDetails(this)'></td></tr><tr><td id='details'></td></tr></table>");
}

// Função para exibir detalhes da habilidade selecionada
function seeDetails(e){
	let who = false;
  
	for(let i = 0; i < spells.length; i++){
		document.getElementById(spells[i].nome).style = size1;
	}
  
	document.getElementById(passive.nome).style = size1;
	e.style = size2;
  
	if(e.id != passive.nome){
    	for(let i = 0; i < spells.length; i++){
      		if(spells[i].nome == e.id) who = i;
    	}
    	
    	document.getElementById('details').innerHTML = spells[who].descricao;
  	}
  
  	else document.getElementById('details').innerHTML = passive.descricao;
}

//**********************************************************************************************************************************
//                                                Função para manipulação das skins
//**********************************************************************************************************************************

function showSlides(n){
	if(goSlide == true){
    	let i;
    	let slides = document.getElementsByClassName("mySlides");
    
		if(n > slides.length) slideIndex = 1;
		if(n < 1) slideIndex = slides.length;
		
		for(i = 0; i < slides.length; i++){
			slides[i].style.display = "none";
		}
    
    	slides[slideIndex-1].style.display = "block";
	}
}

//**********************************************************************************************************************************
//                                               Funções para manipulação das skills
//**********************************************************************************************************************************

// Função para exibir os atributos
function showSkills(){
	if(changeSkills == true){
		attr2.hp = attr.hp + " <span style='color: lightgreen'>(+ " + (0).toFixed(2) + ")</span>";
		attr2.mp = attr.mp + " <span style='color: lightgreen'>(+ " + (0).toFixed(2) + ")</span>";
		attr2.armor = attr.armor + " <span style='color: lightgreen'>(+ " + (0).toFixed(2) + ")</span>";
		attr2.splblock = attr.splblock + " <span style='color: lightgreen'>(+ " + (0).toFixed(2) + ")</span>";
		attr2.hpreg = attr.hpreg + " <span style='color: lightgreen'>(+ " + (0).toFixed(2) + ")</span>";
		attr2.mpreg = attr.mpreg + " <span style='color: lightgreen'>(+ " + (0).toFixed(2) + ")</span>";
		attr2.atkdmg = attr.atkdmg + " <span style='color: lightgreen'>(+ " + (0).toFixed(2) + ")</span>";
		attr2.atkspd = attr.atkspd + " <span style='color: lightgreen'>(+ " + (0).toFixed(2) + ")</span>";
	}
	
	document.getElementById("skills").innerHTML = "<table width='100%'><tr><td>HP: "+ attr2.hp +" - HP Regen: "+ attr2.hpreg +"</td></tr><tr></td></tr><tr><td>MP: "+ attr2.mp +" - MP Regen: "+ attr2.mpreg +"</td></tr><tr><td>Velocidade de Movimento: "+ attr2.speed +"</td></tr><tr><td>Velocidade de Ataque: "+ attr2.atkspd +"</td></tr><tr><td>Armadura: "+ attr2.armor +"</td></tr><tr><td>Resistência Mágica: "+ attr2.splblock +"</td></tr><tr><td>Dano de Ataque: "+ attr2.atkdmg +"</td></tr><tr><td>À distância: "+ attr2.atkrng +"</td></tr></table>";
}

// Função para alterar os atributos
function changeLevel(e){
	if(e.value > 18) alert("O nível máximo é 18!");
	
	attr2.hp = attr.hp + " <span style='color: lightgreen'>(+ " + ((e.value - 1) * attr.hpup).toFixed(2) + ")</span>";
	attr2.mp = attr.mp + " <span style='color: lightgreen'>(+ " + ((e.value - 1) * attr.mpup).toFixed(2) + ")</span>";
	attr2.armor = attr.armor + " <span style='color: lightgreen'>(+ " + ((e.value - 1) * attr.armorup).toFixed(2) + ")</span>";
	attr2.splblock = attr.splblock + " <span style='color: lightgreen'>(+ " + ((e.value - 1) * attr.splblockup).toFixed(2) + ")</span>";
	attr2.hpreg = attr.hpreg + " <span style='color: lightgreen'>(+ " + ((e.value - 1) * attr.hpregup).toFixed(2) + ")</span>";
	attr2.mpreg = attr.mpreg + " <span style='color: lightgreen'>(+ " + ((e.value - 1) * attr.mpregup).toFixed(2) + ")</span>";
	attr2.atkdmg = attr.atkdmg + " <span style='color: lightgreen'>(+ " + ((e.value - 1) * attr.atkdmgup).toFixed(2) + ")</span>";
	attr2.atkspd = attr.atkspd + " <span style='color: lightgreen'>(+ " + (((e.value - 1) * attr.atkspdup) * 0.001).toFixed(2) + ")</span>";
	
	changeSkills = false;
	showSkills();
}