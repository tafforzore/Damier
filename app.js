class Damier{
	constructor(){

	}

	addPions(){
		let a = document.createElement('div')
		a.className = 'pions'
		return a
	}

	////////////////////
	positionnement(){
		let table = document.querySelector('table')
		// function addPions(){
		// 	let a = document.createElement('div')
		// 	a.className = 'pions'
		// 	return a
		// }

		//selectionne les lignes
		let linePlayer1 = [this.accesNode(table, 'tr', 1), this.accesNode(table, 'tr', 2), this.accesNode(table, 'tr', 3)]
		let linePlayer2 = [this.accesNode(table, 'tr', 8), this.accesNode(table, 'tr', 7), this.accesNode(table, 'tr', 6)]

		//mise  des pions dans les noeuds
		//jouer 1
		linePlayer1.forEach(line =>{
			//je met les pions tout les cases coloree

			for(let i=1; i<=8; i++){
				let td = this.accesNode(line, 'td', i)
				if(td.classList.contains('black') == true){
					let pions = this.addPions()
					td.append(pions)
				}
			}	
		})

		//jouer 2
		linePlayer2.forEach(line =>{
			//je met les pions tout les cases coloree

			for(let i=1; i<=8; i++){
				let td = this.accesNode(line, 'td', i)
				if(td.classList.contains('black') == true){
					let pions = this.addPions()
					pions.classList.add('color2')
					td.append(pions)
				}
			}	
		})
	}
	///////////////

	createDamier(){
		let table = document.querySelector('table')

		for(let i=1;i<=8;i++){
			let tr = document.createElement('tr')

			if(i%2 == 0){
				for(let i=1;i<=8;i++){
					let td= document.createElement('td')
					if(i%2 == 0){
						td.className = 'black'
					}
					tr.append(td)
				}
			}
			else{
				for(let i=1;i<=8;i++){
					let td= document.createElement('td')
					if(i%2 != 0){
						td.className = 'black'
					}
					tr.append(td)
				}
			}
			
			table.append(tr)
		}

		//on places les pions
		this.positionnement()

	}

	/////////////
	accesNode(varBaliseMere,baliseEnfant, positionnoeuds){
		//recupere tout les element de la balises mere
		return varBaliseMere.querySelector(`${baliseEnfant}:nth-child(${positionnoeuds})`)
	}

}

class Pions extends Damier{
	constructor(nomPions){
		super()
		this.color = 'black'
		this.nomPions = nomPions
		this.pos_x = 0
		this.pos_y = 0
		this.nodepositionList = []
		this.previousNodePositionList = null
	}

	getpreviousvalue(){
		this.previousNodePositionList = this.nodepositionList
	}

	getposition(){
		//recupere la position du pion X et Y
		let position = this.nomPions.parentNode.parentNode
		let x = this.nomPions.parentNode.children
		let y = this.nomPions.parentNode.parentNode.children
		let myPositionX, myPositionY

		for(let i=0; i<=position.children.length-1; i++){
			if(x==position.children[i].children){
				myPositionX = i
			}
		}

		for(let i=0; i<=position.parentNode.children.length-1; i++){
			if(y==position.parentNode.children[i].children){
				myPositionY = i
			}
		}

		this.pos_x = myPositionX
		this.pos_y = myPositionY
	}

	PreminitionValue(){
		let position = this.nomPions.parentNode.parentNode
		let newpositionx = position.parentNode.children[this.pos_y -1]

		//colorartions des valeur
		if(newpositionx.children[this.pos_x-1] == undefined){
			newpositionx = [newpositionx.children[this.pos_x+1]]
			if(newpositionx[0].children == undefined){
				console.log('vide', +newpositionx[0].children )
			}else{
				console.log('occuoer')
				newpositionx[0].classList.add('newposition')
				this.nodepositionList = newpositionx
			}
			
		}
		// if(newpositionx.children[this.pos_x+1] == undefined){
		// 	newpositionx = [newpositionx.children[this.pos_x+1]]
		// 	newpositionx[0].classList.add('newposition')
		// 	this.nodepositionList = newpositionx
		// }
		if( newpositionx.children[this.pos_x+1] == undefined){
			newpositionx = [newpositionx.children[this.pos_x-1]]
			newpositionx[0].classList.add('newposition')
			this.nodepositionList = newpositionx
		}
		else{
			newpositionx = [newpositionx.children[this.pos_x-1], newpositionx.children[this.pos_x+1]]
			console.log('occuoer', +newpositionx)
			if(newpositionx[0].children == undefined){
				console.log('vide', +newpositionx[0].children )
			}else{
				console.log('occuoer', +newpositionx)
				newpositionx[0].classList.add('newposition')
				this.nodepositionList = newpositionx
			}
			newpositionx[0].classList.add('newposition')
			newpositionx[1].classList.add('newposition')
			this.nodepositionList = newpositionx
		}
		
	}

	// premonitionValueOff(){
	// 	console.log(this.previousNodePositionList , this.nodepositionList)

	// 	if(this.previousNodePositionList == 0){
	// 		console.log('mouvement Non autoriser')
	// 	}else{
	// 		this.previousNodePositionList.forEach(value => function(){
	// 			value.classList.remove('newposition')
	// 		})
	// 	}

	// 	this.nodepositionList = []
	// }

	//nodePosiion c'est le noeud ou le pions vas etre
	selectPremonitionvalue(nodeposition){
		//on regarde si le nodeposition selectoinner se trouve dans  la liste de ses deplacement possible
		this.nodepositionList.forEach(element =>{
			if(element == nodeposition){
				return this.movePion(nodeposition)
			}else{
				element.classList.remove('newposition')
			}
		})
	}

	movePion(nodePosition){
		let nodePionActuel = this.nomPions.parentNode
		let pion = this.addPions()
		//j'enleves le pions
		console.log(this.nomPions,nodePionActuel)
		nodePionActuel.innerHTML = ''
	 	// je positionne dans le nouvelle emplacement
	 	nodePosition.append(pion)
	}
}

class Player extends Pions{
	constructor(nom, playerNumber,tour=false){
		super()
		this.nom = nom
		this.nombrePions = 12
		this.tour = tour
		this.playerNumber = playerNumber
		this.win = false
	}

	isMyturn(){

	}
}





let damier = new Damier()
damier.createDamier()

let mymove
let pions
let self = function(){
	document.querySelectorAll('.pions').forEach(element =>{
		var self = this
		element.addEventListener('mouseover', function(e){
			// if(document.querySelector('.pions.active') != null){
			// 	document.querySelector('.pions.active').remove('.active')
			// }
			pions = new Pions(element)
			mymove = pions.getposition()

			//j'enleves les pions coloree
			document.querySelectorAll('.active').forEach(value =>{
				value.classList.remove('active')
			})


			element.parentNode.parentNode.classList.add('myPositionY')
			element.classList.add('active')
			//si il clique sur le pion
			element.addEventListener('click' , function(){
				pions.getpreviousvalue()
				pions.PreminitionValue()

				//JE TESTE SI IL CLIQUE DANS LEA CASES DE PREMONITION VALUE
				pions.nodepositionList.forEach(value =>{
					value.addEventListener('click', function(){
							pions.selectPremonitionvalue(value)
							//j'enleve la colorations
							value.classList.remove('newposition')
							return self
					})

				})

			})
		})
	})

}

let player = [new Player('severin', 1), new Player('yannick', 2, true)]
do{
	player.forEach(plays =>{
		if(player[0].tour == true){
			self()
			player[1].tour=true
			player[0].tour=false
			console.log('player 1')
		}
		if(player[1].tour == true){
			self()
			player[0].tour = true
			player[1].tour = false
			console.log('player 2')
		}
	})

}while((player[0].win == true)||(player[1].win == true))