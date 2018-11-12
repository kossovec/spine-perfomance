function addButtonsListener() {
	let multiButton = document.body.querySelector('#multi')
	let singleButton = document.body.querySelector('#single')

	multiButton.addEventListener('click', createMultiAtlas)
	singleButton.addEventListener('click', createSingleAtlas)
}

addButtonsListener()

function createGame() {
	window.game = new PIXI.Application({width: 1920, height: 1080});
	document.body.appendChild(game.view);
	document.querySelector('#chooser').style.display = 'none'
}

function loadMultiAtlas() {
	game.loader
		.add({name: 'elephant', url: './img/elephant.json'})
		.add({name: 'carriage', url: './img/carriage.json'})
		.add({name: 'fortuneteller', url: './img/fortuneteller.json'})
		.add({name: 'bear', url: './img/bear.json'})
		.add({name: 'train', url: './img/train.json'})
		.load()
}

function loadSingleAtlas() {
	game.loader
		.add({name: 'allinone', url: './img/allinone.json'})
		.load(loadWithFakeAtlas)
}

function loadWithFakeAtlas() {
	let atlas1 = new PIXI.spine.core.TextureAtlas();
	let atlas2 = new PIXI.spine.core.TextureAtlas();
	let atlas3 = new PIXI.spine.core.TextureAtlas();
	let atlas4 = new PIXI.spine.core.TextureAtlas();
	let atlas5 = new PIXI.spine.core.TextureAtlas();

	let texture = game.loader.resources.allinone.textures

	atlas1.addTextureHash(texture, true);
	atlas2.addTextureHash(texture, true);
	atlas3.addTextureHash(texture, true);
	atlas4.addTextureHash(texture, true);
	atlas5.addTextureHash(texture, true);


	game.loader.add('bear', 'img/bear.json', {metadata: {spineAtlas: atlas1}})
	game.loader.add('elephant', 'img/elephant.json', {metadata: {spineAtlas: atlas2}})
	game.loader.add('fortuneteller', 'img/fortuneteller.json', {metadata: {spineAtlas: atlas3}})
	game.loader.add('train', 'img/train.json', {metadata: {spineAtlas: atlas4}})
	game.loader.add('carriage', 'img/carriage.json', {metadata: {spineAtlas: atlas5}})

	game.loader.load(createSpines)
}

function createMultiAtlas() {
	createGame()
	loadMultiAtlas()
}

function createSingleAtlas() {
	createGame()
	loadSingleAtlas()
}

function createSpines() {
	let amount = document.querySelector('#amount').value
	let names = [
		{name: 'bear', anim: 'idle'},
		{name: 'train', anim: 'idle'},
		{name: 'fortuneteller', anim: '1', scale: 0.3},
		{name: 'carriage', anim: 'a_idle'},
		{name: 'elephant', anim: 'idle'}
	]

	for(let i = 0; i < amount; i++) {
		for(let k = 0; k < names.length; k++) {
			let spine = new PIXI.spine.Spine(game.loader.resources[names[k].name].spineData)
			names[k].scale ? spine.scale.set(names[k].scale) : spine.scale.set(1)
			spine.state.setAnimation(0, names[k].anim, true)
			spine.x = game.view.width * i / amount + 100
			spine.y = game.view.height * (0.1 + 0.2 * k)

			game.stage.addChild(spine)
		}
	}
}
