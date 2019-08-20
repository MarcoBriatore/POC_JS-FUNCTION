/**
 * Array descriptor de los colores de los bloques
 * 
 * @type Array
 */
const rainbowColors = [
	'rgb(255,0,0)',
	'rgb(255,127,0)',
	'rgb(0,255,0)',
	'rgb(0,0,255)',
	'rgb(75,0,130)',
]


/**
 * Objeto descriptor de las direcciones
 * de movimiento
 * 
 * @type Object
 */
const Movement = {
	NONE : 0,
	LEFT : 1,
	RIGHT : 2,
	UP : 4,
	DOWN : 8
};

/**
 * Función constructora de la nave espacial
 * 
 * @param int x      Posición de la nave en el eje x
 * @param int y      Posición de la nave en el eje y
 * @param int width  Tamaño de la nave en el eje x
 * @param int height Tamaño de la nave en el eje y
 */
function Vaus(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};

/**
 * Función constructora del proyectil
 * 
 * @param int x      Posición del proyectil en el eje x
 * @param int y      Posición del proyectil en el eje y
 * @param int radius Radio del proyectil
 * @param int dir    Dirección de movimiento del proyectil
 */
function Bullet(x, y, radius, dir) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dir = Movement.NONE;
	this.speed = 5
}

/**
 * Función constructora del bloque
 * 
 * @param int x      Posición del bloque en el eje x
 * @param int y      Posición del bloque en el eje y
 * @param int width  Tamaño del bloque en el eje x
 * @param int height Tamaño del bloque en el eje y
 */
function Block(x,y,width,height)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = rainbowColors[Math.floor((Math.random() * 5) + 1)];
	
}

/**
 * Función constructora del juego
 * 
 * @param Canvas canvas  Canvas donde se dibujará el juego
 */
function Arkanoid(canvas) {
	const VAUS_WIDTH = 60;
	const VAUS_HEIGHT = 10;
	const BULLET_SIZE = 3;
	const BULLET_MAX_SPEED = 13;
	let blocks = []
	let points;

	this.init = function() {
		if(!canvas.getContext)
		{
			console.warn('Tu navegador no soporta canvas');
			return;
		}

		
		this.context = canvas.getContext('2d');
		this.pause = false;
		this.lifes = 3;
		this.points = 0
		this.createElements();
		setInterval(() => {
			this.update();
			this.checkBlocksCollision();
			this.fullDraw();
		}, 30);
	}
	
	this.createBullet = function()
	{
		this.bullet = new Bullet(canvas.width / 2, canvas.height / 2, BULLET_SIZE, Movement.NONE);
	}
	this.createPlayer = function()
	{
		this.vaus = new Vaus(canvas.width / 2 - VAUS_WIDTH / 2, canvas.height - 20, VAUS_WIDTH, VAUS_HEIGHT);
	}
	this.createBlocks = function()
	{
		for (let x = VAUS_WIDTH*2; x < VAUS_WIDTH*12 ; x+=VAUS_WIDTH) {
			for (let y = VAUS_HEIGHT*5; y < VAUS_HEIGHT*15; y+=VAUS_HEIGHT) {
				this.block = new Block(x + 0.5 ,y +0.5, VAUS_WIDTH, VAUS_HEIGHT)
				blocks.push(this.block)
			}
			
		}
	}
	this.createElements = function() {
		this.createBullet();
		this.createPlayer();
		this.createBlocks();
	}

	this.drawBullet = function() {
		this.context.beginPath();
		this.context.arc(this.bullet.x, this.bullet.y, this.bullet.radius, 0, 2 * Math.PI, false);
		this.context.fillStyle = 'yellow';
		this.context.fill();
	}

	this.drawVaus = function() {
		this.context.fillStyle = 'rgb(155,110,5)';
		this.context.fillRect(this.vaus.x, this.vaus.y, this.vaus.width, this.vaus.height);
		
	}

	this.drawblocks = function(){
		for(let i = 0; i < blocks.length; i++){
			this.context.save();
			this.context.fillStyle = blocks[i].color;
			this.context.fillRect(blocks[i].x,blocks[i].y,blocks[i].width,blocks[i].height);
			this.context.restore();	
		}
	}

	this.checkBlocksCollision = function(){
		var ax1 = this.bullet.x - this.bullet.radius;
		var ay1 = this.bullet.y - this.bullet.radius;
		var ax2 = this.bullet.x + this.bullet.radius;
		var ay2 = this.bullet.y + this.bullet.radius;
		var bx1;
		var bx2;
		var bx2;
		var by2;
		for(var i = 0; i < blocks.length; i++){
			bx1 = blocks[i].x;
			by1 = blocks[i].y;
			bx2 = blocks[i].x + blocks[i].width;
			by2 = blocks[i].y + blocks[i].height;
			if(!(ax2 <= bx1 || bx2 <= ax1 || ay2 <= by1 || by2 <= ay1)){
				let prevX = this.bullet.x - this.bullet.dir - this.bullet.radius;
				let prevY = this.bullet.y - this.bullet.dir - this.bullet.radius;
				if((prevX > bx2 && prevX < bx1) || (prevY >= by1 && prevY <= by2)){
					this.bullet.dir = -(this.bullet.dir);
				} else {
					this.bullet.dir = -(this.bullet.dir);
				}
				this.updateSpeedBullet()
				this.points++;	
				blocks.splice(i,1);
				return ;
			}
		}
	}

	this.gameText = function ()
	{
		this.context.fillStyle = "red";
		this.context.font = 'bold 15px Arial';
		this.context.fillText('Lifes = ' + this.lifes ,1,15);
		this.context.fillStyle = "red";
		this.context.font = 'bold 15px Arial';
		this.context.fillText('Speed = ' + this.bullet.speed ,canvas.width-100,15);
		this.context.fillStyle = "red";
		this.context.font = 'bold 15px Arial';
		this.context.fillText('Points = ' + this.points ,canvas.width/2,15);
	
	}

	this.fullDraw = function() {
		
		this.context.clearRect(0, 0, canvas.width, canvas.height);

		canvas.style.cursor = "none";
		this.context.fillStyle = 'rgb(50,50,50)';
		this.context.fillRect(0, 0, canvas.width, canvas.height);
		this.gameText()
		this.drawBullet();
		this.drawVaus();
		this.drawblocks();
		if(this.lifes == 0){
			this.writeText("Game Over. Press 'R' to restart");
			document.onkeydown = function(e){
				if(e.keyCode === 82){
					arkanoid.init();
				}
			}
		}
	}

	

	this.update = function() {
		if (this.pause || this.lifes == 0) 
			return;

		if (this.bullet.dir & Movement.RIGHT) 
			this.bullet.x += this.bullet.speed;
		else if (this.bullet.dir & Movement.LEFT) 
			this.bullet.x -= this.bullet.speed;

		if (this.bullet.dir & Movement.UP)
			this.bullet.y -= this.bullet.speed;
		else if (this.bullet.dir & Movement.DOWN) 
			this.bullet.y += this.bullet.speed;

		if ((this.bullet.x + this.bullet.radius > this.vaus.x && this.bullet.x - this.bullet.radius < this.vaus.x + this.vaus.width) &&
			(this.bullet.y + this.bullet.radius > this.vaus.y)) {
			this.updateSpeedBullet()
			if (this.bullet.dir & Movement.DOWN) {
				this.bullet.dir = this.bullet.dir - Movement.DOWN + Movement.UP;
			} else if (this.bullet.dir & Movement.UP) {
			 	this.bullet.dir = this.bullet.dir - Movement.UP + Movement.DOWN;
			}
		}

		if (this.bullet.x - this.bullet.radius < 0 ) {
			this.bullet.x = this.bullet.radius;
			this.bullet.dir = this.bullet.dir - Movement.LEFT + Movement.RIGHT;
		}
		if (this.bullet.x + this.bullet.radius > canvas.width) {
			this.bullet.x = canvas.width - this.bullet.radius;
			this.bullet.dir = this.bullet.dir - Movement.RIGHT + Movement.LEFT;
		}
		if (this.bullet.y - this.bullet.radius < 0) {
			this.bullet.y = this.bullet.radius;
			this.bullet.dir = this.bullet.dir - Movement.UP + Movement.DOWN;
		}

		if (this.bullet.y + this.bullet.radius > canvas.height) {
			this.bullet.speed = 3;
			this.lifes -= 1;
			this.createBullet();
			this.createPlayer();
			
		}

		if (this.bullet.dir == Movement.NONE) {
			this.bullet.x = this.vaus.x + this.vaus.width / 2;
			this.bullet.y = this.vaus.y - this.bullet.radius * 2;
		}
	}

	this.writeText = function(text) {
		this.context.fillStyle = 'rgb(255,255,0)';
		this.context.font = 'bold 20px Arial';
		this.context.fillText(text, canvas.width / 2 , canvas.height / 2);
	}

	this.startGame = function() {
		if (this.bullet.dir == Movement.NONE) {
			this.bullet.dir = Movement.RIGHT + Movement.UP;
		}
	}

	this.setVausPosition = function(x) {
		if (this.pause || this.lifes == 0) return;
		if (x < 0) x = 0;
		if (x > canvas.width - this.vaus.width) x = canvas.width - this.vaus.width;
		this.vaus.x = x;
	}

	this.updateSpeedBullet = function()
	{
		if (this.bullet.speed < BULLET_MAX_SPEED)
			this.bullet.speed += 0.07;
	}

	document.addEventListener('mousemove', (event) => {
		this.setVausPosition(event.pageX);
	});

	document.addEventListener('click', () => {
		this.startGame();
	});
};
