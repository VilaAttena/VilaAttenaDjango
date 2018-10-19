$(document).ready(function() {
	alert("Converse e jogue com os personagens marcados com um quadrado vermelho :D");
	const canvas = $("#canvas");
	const ctx = canvas[0].getContext("2d");

	function Init() {
		Loop();
	}

	function Update() {
		if(!player.profile.isOn && !npc.dialogue.isOn && !puzzle.isOn) {
			player.searchNPC();
			cam.move();
			player.move();		
		}

		if(puzzle.isOn) {
			if(npc.array[player.searchNPC()].name == "Heloisa" && !puzzle.puzzlePong.intro && !puzzle.pause) {
				puzzle.puzzlePong.movePlayer();
				puzzle.puzzlePong.moveBall();
				puzzle.puzzlePong.colide();
			} else if(npc.array[player.searchNPC()].name == "Jorge" && !puzzle.puzzleFishing.intro && !puzzle.pause) {
				puzzle.puzzleFishing.movePlayer();
				puzzle.puzzleFishing.updateFish();
			} else if(npc.array[player.searchNPC()].name == "Sofia" && !puzzle.puzzleBreakout.intro && !puzzle.pause) {
				puzzle.puzzleBreakout.movePlayer();
				puzzle.puzzleBreakout.moveBall();
				puzzle.puzzleBreakout.ballColidePlayer();
				puzzle.puzzleBreakout.ballColideEnemy();
				puzzle.puzzleBreakout.ballColideWalls();	
			} else if(npc.array[player.searchNPC()].name == "Mario" && !puzzle.puzzleFlappyBird.intro && !puzzle.pause) {
				puzzle.puzzleFlappyBird.jump();
				puzzle.puzzleFlappyBird.gravity();
				puzzle.puzzleFlappyBird.movePillar();
				puzzle.puzzleFlappyBird.scoring();
				puzzle.puzzleFlappyBird.colide();
			} else if(npc.array[player.searchNPC()].name == "Bruno" && !puzzle.puzzleGuitarHero.intro && !puzzle.pause) {
				puzzle.puzzleGuitarHero.moveTiles();
				puzzle.puzzleGuitarHero.pressKey(); 				
			} else if(npc.array[player.searchNPC()].name == "Ronaldo" && !puzzle.puzzleMaze.intro && !puzzle.pause) {
				puzzle.puzzleMaze.movePlayer();				
			}
		}		
	}

	function Render() {
		if(!player.profile.isOn && !npc.dialogue.isOn) {			
			ctx.save();
			ctx.translate(-cam.x, -cam.y);
			cam.x = Math.max(0,Math.min(scenario.width - cam.width,cam.x));
			cam.y = Math.max(0,Math.min(scenario.height - cam.height,cam.y));					
			scenario.drawTiles();
			npc.draw();	
			player.draw();
			npc.signalNPC.draw();
			ctx.restore();
			if(!puzzle.isOn) {
				npc.infoNPC.draw();			
			}	
		} 
		if(puzzle.isOn) {
			if(npc.array[player.searchNPC()].name == "Jorge") {				
				puzzle.puzzleFishing.draw();
				puzzle.puzzleFishing.drawFish();
				if(puzzle.pause) {
					ctx.font = "40px Cursive";
					ctx.fillStyle = "Red";
					ctx.fillText("Pause", 450, 120);
					ctx.font = "30px Cursive";
					ctx.fillText("Pressione ESC para sair", 330, 170);					
				}					
			} else if(npc.array[player.searchNPC()].name == "Heloisa") {
				puzzle.puzzlePong.draw();
				if(puzzle.pause) {
					ctx.font = "40px Cursive";
					ctx.fillStyle = "Red";
					ctx.fillText("Pause", 450, 100);
					ctx.font = "30px Cursive";
					ctx.fillText("Pressione ESC para sair", 330, 150);					
				}					
			} else if(npc.array[player.searchNPC()].name == "Mario") {
				puzzle.puzzleFlappyBird.draw();
				if(puzzle.pause) {
					ctx.font = "40px Cursive";
					ctx.fillStyle = "Red";
					ctx.fillText("Pause", 450, 60);
					ctx.font = "30px Cursive";
					ctx.fillText("Pressione ESC para sair", 330, 110);					
				}					
			} else if(npc.array[player.searchNPC()].name == "Sofia") {
				puzzle.puzzleBreakout.draw();
				if(puzzle.pause) {
					ctx.font = "40px Cursive";
					ctx.fillStyle = "Red";
					ctx.fillText("Pause", 450, 300);
					ctx.font = "30px Cursive";
					ctx.fillText("Pressione ESC para sair", 330, 350);					
				}									
			} else if(npc.array[player.searchNPC()].name == "Bruno") {
				puzzle.puzzleGuitarHero.draw();
				if(puzzle.pause) {
					ctx.font = "40px Cursive";
					ctx.fillStyle = "Red";
					ctx.fillText("Pause", 450, 100);
					ctx.font = "30px Cursive";
					ctx.fillText("Pressione ESC para sair", 330, 150);					
				}								
			} else if(npc.array[player.searchNPC()].name == "Ronaldo") {
				puzzle.puzzleMaze.draw();
				if(puzzle.pause) {
					ctx.font = "40px Cursive";
					ctx.fillStyle = "Red";
					ctx.fillText("Pause", 740, 120);
					ctx.font = "30px Cursive";
					ctx.fillText("Pressione ESC para sair", 630, 170);					
				}					
			}
		}		
		if(player.profile.isOn) {
			player.profile.draw();
		} 
		if(npc.dialogue.isOn) {
			npc.dialogue.draw();
		}
	}

	function Loop() {
		window.requestAnimationFrame(Loop, canvas);
		Update();
		Render();
	}

	function DrawRect(color, x, y, width, height) {
		ctx.fillStyle = color;
		ctx.fillRect(x, y, width, height);
	}

	function RenderImage(image, x, y, width, height) {		
		ctx.drawImage(image ,x, y, width, height);
	}	

	function LoadImages() {
		//Imagens do personagem principal feminino
		this.femaleCharacter_front1 = new Image();
		this.femaleCharacter_front1.src = imgFemaleCharacter_front1;
		this.femaleCharacter_front2 = new Image();
		this.femaleCharacter_front2.src = imgFemaleCharacter_front2;
		this.femaleCharacter_front3 = new Image();
		this.femaleCharacter_front3.src = imgFemaleCharacter_front3;
		this.femaleCharacter_back1 = new Image();
		this.femaleCharacter_back1.src = imgFemaleCharacter_back1;
		this.femaleCharacter_back2 = new Image();
		this.femaleCharacter_back2.src = imgFemaleCharacter_back2;
		this.femaleCharacter_back3 = new Image();
		this.femaleCharacter_back3.src = imgFemaleCharacter_back3;
		this.femaleCharacter_left1 = new Image();
		this.femaleCharacter_left1.src = imgFemaleCharacter_left1;
		this.femaleCharacter_left2 = new Image();
		this.femaleCharacter_left2.src = imgFemaleCharacter_left2;
		this.femaleCharacter_left3 = new Image();
		this.femaleCharacter_left3.src = imgFemaleCharacter_left3;
		this.femaleCharacter_right1 = new Image();
		this.femaleCharacter_right1.src = imgFemaleCharacter_right1;
		this.femaleCharacter_right2 = new Image();
		this.femaleCharacter_right2.src = imgFemaleCharacter_right2;
		this.femaleCharacter_right3 = new Image();
		this.femaleCharacter_right3.src = imgFemaleCharacter_right3;
		this.femaleCharacter_face = new Image();
		this.femaleCharacter_face.src = imgFemaleCharacter_face;			

		//Imagens do personagem principal Masculíno
		this.maleCharacter_front1 = new Image();
		this.maleCharacter_front1.src = imgMaleCharacter_front1;
		this.maleCharacter_front2 = new Image();
		this.maleCharacter_front2.src = imgMaleCharacter_front2;
		this.maleCharacter_front3 = new Image();
		this.maleCharacter_front3.src = imgMaleCharacter_front3;
		this.maleCharacter_back1 = new Image();
		this.maleCharacter_back1.src = imgMaleCharacter_back1;
		this.maleCharacter_back2 = new Image();
		this.maleCharacter_back2.src = imgMaleCharacter_back2;
		this.maleCharacter_back3 = new Image();
		this.maleCharacter_back3.src = imgMaleCharacter_back3;
		this.maleCharacter_left1 = new Image();
		this.maleCharacter_left1.src = imgMaleCharacter_left1;
		this.maleCharacter_left2 = new Image();
		this.maleCharacter_left2.src = imgMaleCharacter_left2;
		this.maleCharacter_left3 = new Image();
		this.maleCharacter_left3.src = imgMaleCharacter_left3;
		this.maleCharacter_right1 = new Image();
		this.maleCharacter_right1.src = imgMaleCharacter_right1;
		this.maleCharacter_right2 = new Image();
		this.maleCharacter_right2.src = imgMaleCharacter_right2;
		this.maleCharacter_right3 = new Image();
		this.maleCharacter_right3.src = imgMaleCharacter_right3;
		this.maleCharacter_face = new Image();
		this.maleCharacter_face.src = imgMaleCharacter_face;

		//Imagens para os Puzzle
		this.ball_puzzle = new Image();
		this.ball_puzzle.src = imgBall_puzzle;
		this.blue_puzzle_player_horizontal = new Image();
		this.blue_puzzle_player_horizontal.src = imgBlue_puzzle_player_horizontal;
		this.blue_puzzle_player_vertical = new Image();
		this.blue_puzzle_player_vertical.src = imgBlue_puzzle_player_vertical;
		this.red_puzzle_player_horizontal = new Image();
		this.red_puzzle_player_horizontal.src = imgRed_puzzle_player_horizontal;
		this.red_puzzle_player_vertical = new Image();
		this.red_puzzle_player_vertical.src = imgRed_puzzle_player_vertical;			

		//Imagens dos NPCs masculinos sem puzzle
		this.male_NPC1 = new Image();
		this.male_NPC1.src = imgMaleNPC_1;
		this.male_NPC2 = new Image();
		this.male_NPC2.src = imgMaleNPC_2;
		this.male_NPC3 = new Image();
		this.male_NPC3.src = imgMaleNPC_3;
		this.male_NPC4 = new Image();
		this.male_NPC4.src = imgMaleNPC_4;						

		//Imagens dos NPCs femininos sem puzzle
		this.female_NPC1 = new Image();
		this.female_NPC1.src = imgFemaleNPC_1;
		this.female_NPC2 = new Image();
		this.female_NPC2.src = imgFemaleNPC_2;

		//Container de diálogos..etc
		this.dialogue_background = new Image();
		this.dialogue_background.src = imgDialogueBackground;

		//Grama		
		this.grass_solo = new Image();
		this.grass_solo.src = imgGrassSolo;
		this.strong_grass_solo = new Image();
		this.strong_grass_solo.src = imgStrongGrassSolo;

		//Terra	
		this.land_solo = new Image();
		this.land_solo.src = imgLandSolo;

		//Água
		this.strong_water_solo = new Image();
		this.strong_water_solo.src = imgStrongWaterSolo;		
		this.water_solo = new Image();
		this.water_solo.src = imgWaterSolo;
		this.water_diag_left = new Image();
		this.water_diag_left.src = imgWaterDiagLeft;
		this.water_diag_right = new Image();
		this.water_diag_right.src = imgWaterDiagRight;

		//Plantas comuns e aquáticas
		this.flower = new Image();
		this.flower.src = imgFlower;
		this.flower2 = new Image();
		this.flower2.src = imgFlower2;
		this.flower3 = new Image();
		this.flower3.src = imgFlower3;
		this.waterPlant = new Image();
		this.waterPlant.src = imgWaterPlant;
		this.waterPlant2 = new Image();
		this.waterPlant2.src = imgWaterPlant2;

		//Cerca								
		this.fence_left = new Image();
		this.fence_left.src = imgFenceLeft;
		this.fence_solo = new Image();
		this.fence_solo.src = imgFenceSolo;
		this.fence_vertical = new Image();
		this.fence_vertical.src = imgFenceVertical;

		//NPCs com Puzzle		
		this.mario = new Image();
		this.mario.src = imgMario;
		this.marioBody = new Image();
		this.marioBody.src = imgMarioBody;
		this.sofia = new Image();		
		this.sofia.src = imgSofia;
		this.sofiaBody = new Image();		
		this.sofiaBody.src = imgSofiaBody;		
		this.bruno = new Image();
		this.bruno.src = imgBruno;
		this.brunoBody = new Image();
		this.brunoBody.src = imgBrunoBody;		
		this.heloisa = new Image();
		this.heloisa.src = imgHeloisa;
		this.heloisaBody = new Image();
		this.heloisaBody.src = imgHeloisaBody;		
		this.jorge = new Image();
		this.jorge.src = imgJorge;
		this.jorgeBody = new Image();
		this.jorgeBody.src = imgJorgeBody;
		this.ronaldo = new Image();
		this.ronaldo.src = imgRonaldo;
		this.ronaldoBody = new Image();
		this.ronaldoBody.src = imgRonaldoBody;

		//Casa				
		this.house_solo = new Image();
		this.house_solo.src = imgHouseSolo;
		this.window = new Image();
		this.window.src = imgWindow;
		this.door1 = new Image();
		this.door1.src = imgDoor1;
		this.door2 = new Image();
		this.door2.src = imgDoor2;
		this.roof_bottom = new Image();
		this.roof_bottom.src = imgRoofBottom;
		this.roof_top = new Image();
		this.roof_top.src = imgRoofTop;
		this.roof_left = new Image();
		this.roof_left.src = imgRoofLeft;
		this.roof_right = new Image();
		this.roof_right.src = imgRoofRight;
		this.roof_bottom_left = new Image();
		this.roof_bottom_left.src = imgRoofBottomLeft;
		this.roof_bottom_right = new Image();
		this.roof_bottom_right.src = imgRoofBottomRight;
		this.roof_top_left = new Image();
		this.roof_top_left.src = imgRoofTopLeft;
		this.roof_top_right = new Image();
		this.roof_top_right.src = imgRoofTopRight;

		//Ponte
		this.bridge_top_left = new Image();
		this.bridge_top_left.src = imgBridgeTopLeft;
		this.bridge_top_center = new Image();
		this.bridge_top_center.src = imgBridgeTopCenter;
		this.bridge_top_right = new Image();
		this.bridge_top_right.src = imgBridgeTopRight;
		this.bridge_left_bottom = new Image();
		this.bridge_left_bottom.src = imgBridgeLeftBottom;
		this.bridge_left_center = new Image();
		this.bridge_left_center.src = imgBridgeLeftCenter;
		this.bridge_left_top = new Image();
		this.bridge_left_top.src = imgBridgeLeftTop;								

		//Ávores e moitas
		this.tree = new Image();
		this.tree.src = imgTree;

		//Animais
		this.sheep_front = new Image();
		this.sheep_front.src = imgSheepFront;
		this.sheep_right = new Image();
		this.sheep_right.src = imgSheepRight;
		this.sheep_left = new Image();
		this.sheep_left.src = imgSheepLeft;
		this.chick_front = new Image();
		this.chick_front.src = imgChickFront;
		this.chick_left = new Image();
		this.chick_left.src = imgChickLeft;
		this.chick_right = new Image();
		this.chick_right.src = imgChickRight;		
	}

	$(document).keydown(function(e){
		switch(e.which) {
			case 37:				
			player.moveLeft = true;
			if(puzzle.isOn) {
				puzzle.playerMoveLeft = true;
				break;
			}				
			break;
			case 38:				
			player.moveUp = true;
			if(puzzle.isOn) {
				if(!puzzle.upIsDown) {
					puzzle.puzzleFlappyBird.playerJumping = true;
				}
				puzzle.playerMoveUp = true;				
				break;
			}	

			break;
			case 39:				
			player.moveRight = true;
			if(puzzle.isOn) {
				puzzle.playerMoveRight = true;
				break;
			}								
			break;
			case 40:				
			player.moveDown = true;
			if(puzzle.isOn) {
				puzzle.playerMoveDown = true;
				break;
			}				
			break;

			case 13:
			if(puzzle.puzzlePong.intro && !puzzle.pause) {
				puzzle.puzzlePong.intro = false;
			}	else if(puzzle.puzzleFishing.intro && !puzzle.pause) {
				puzzle.puzzleFishing.intro = false;
				puzzle.puzzleFishing.addFish();
				puzzle.puzzleFishing.time();					
			}	else if(puzzle.puzzleBreakout.intro && !puzzle.pause) {
				puzzle.puzzleBreakout.intro = false;
				puzzle.puzzleBreakout.addEnemies();			
			}	else if(puzzle.puzzleFlappyBird.intro && !puzzle.pause) {
				puzzle.puzzleFlappyBird.intro = false;
				puzzle.puzzleFlappyBird.addPillars();			
			}	else if(puzzle.puzzleGuitarHero.intro && !puzzle.pause) {
				puzzle.puzzleGuitarHero.intro = false;
				puzzle.puzzleGuitarHero.addControllers();
				puzzle.puzzleGuitarHero.addTiles();
			}	else if(puzzle.puzzleMaze.intro && !puzzle.pause) {
				puzzle.puzzleMaze.intro = false;
				puzzle.puzzleMaze.time();				}
				if(!player.profile.isOn && !npc.dialogue.isOn && !puzzle.isOn) {
					player.profile.isOn = true;
					alert(player.x + " " + player.y);
					saveGame();
					break;
				} else {
					player.profile.isOn = false;
					break;
				}

				case 80:
				if(!puzzle.pause && puzzle.isOn) {
					if(!puzzle.puzzlePong.intro &&
						!puzzle.puzzlePong.outro &&
						!puzzle.puzzleFishing.intro && 
						!puzzle.puzzleFishing.outro &&
						!puzzle.puzzleBreakout.intro &&
						!puzzle.puzzleBreakout.outro &&
						!puzzle.puzzleFlappyBird.intro &&
						!puzzle.puzzleFlappyBird.outro &&
						!puzzle.puzzleGuitarHero.intro &&
						!puzzle.puzzleGuitarHero.outro &&
						!puzzle.puzzleMaze.intro &&
						!puzzle.puzzleMaze.outro) {
						puzzle.pause = true;
				}
			} else {
				puzzle.pause = false;
			}

			case (!puzzle.isOn):
			case 81:
			if(!npc.dialogue.isOn && !player.profile.isOn && !puzzle.isOn && npc.array[player.searchNPC()] != null) {
				if(!player.moveLeft && !player.moveUp && !player.moveRight && !player.moveDown) {
					npc.dialogue.isOn = true;
					break;
				}
			} 
			if(npc.dialogue.isOn) {
				npc.dialogue.isOn = false;
				break;
			}	
			break;			

			case 83:
			if(npc.array[player.searchNPC()] != null && npc.array[player.searchNPC()].name == "Heloisa" && !puzzle.isOn) {
				puzzle.puzzlePong.intro = true;
			} else if(npc.array[player.searchNPC()] != null && npc.array[player.searchNPC()].name == "Jorge" && !puzzle.isOn) {
				puzzle.puzzleFishing.intro = true;
			} else if(npc.array[player.searchNPC()] != null && npc.array[player.searchNPC()].name == "Sofia" && !puzzle.isOn) {
				puzzle.puzzleBreakout.intro = true;
			} else if(npc.array[player.searchNPC()] != null && npc.array[player.searchNPC()].name == "Mario" && !puzzle.isOn) {
				puzzle.puzzleFlappyBird.intro = true;
			} else if(npc.array[player.searchNPC()] != null && npc.array[player.searchNPC()].name == "Bruno" && !puzzle.isOn) {
				puzzle.puzzleGuitarHero.intro = true;
			} else if(npc.array[player.searchNPC()] != null && npc.array[player.searchNPC()].name == "Ronaldo" && !puzzle.isOn) {
				puzzle.puzzleMaze.intro = true;
			}
			if(npc.dialogue.isOn && npc.array[player.searchNPC()].hasPuzzle) {
				puzzle.isOn = true;
				npc.dialogue.isOn = false;
				break;
			}
			break;

			case (!puzzle.isOn):
			case 78:
			if(npc.dialogue.isOn && npc.array[player.searchNPC()].hasPuzzle) {
				npc.dialogue.isOn = false;
				break;
			}
			break;

			case 90:
			if(!puzzle.zIsDown) {
				puzzle.controlRed = true;
				puzzle.zIsDown = true;
			}
			break;
			case 88:
			if(!puzzle.xIsDown) {
				puzzle.controlBlue = true;
				puzzle.xIsDown = true;
			}
			break;
			case 67:
			if(!puzzle.cIsDown) {
				puzzle.controlGreen = true;
				puzzle.cIsDown = true;
			}
			break;
			case 86:
			if(!puzzle.vIsDown) {
				puzzle.controlPurple = true;
				puzzle.vIsDown = true;
			}
			break;

			case 27:
			if(puzzle.puzzlePong.intro) {
				puzzle.isOn = false;
			} else if(puzzle.puzzleFishing.intro) {
				puzzle.isOn = false;
			} else if(puzzle.puzzleBreakout.intro) {
				puzzle.isOn = false;
			} else if(puzzle.puzzleFlappyBird.intro) {
				puzzle.isOn = false;
			} else if(puzzle.puzzleGuitarHero.intro) {
				puzzle.isOn = false;
			} else if(puzzle.puzzleMaze.intro) {
				puzzle.isOn = false;
			}
			if(puzzle.puzzlePong.outro) {
				puzzle.puzzlePong.exit();
				puzzle.puzzlePong.outro = false;
			} 
			if(puzzle.puzzleFishing.outro) {
				puzzle.puzzleFishing.gameOver();
				puzzle.puzzleFishing.exit();					
				puzzle.puzzleFishing.outro = false;
			} 
			if(puzzle.puzzleFlappyBird.outro) {
				puzzle.puzzleFlappyBird.gameOver();
				puzzle.puzzleFlappyBird.exit();					
				puzzle.puzzleFlappyBird.outro = false;
			} 
			if(puzzle.puzzleBreakout.outro) {
				puzzle.puzzleBreakout.exit();					
				puzzle.puzzleBreakout.outro = false;
			} 
			if(puzzle.puzzleGuitarHero.outro) {
				puzzle.puzzleGuitarHero.gameOver();
				puzzle.puzzleGuitarHero.exit();					
				puzzle.puzzleGuitarHero.outro = false;
			} 
			if(puzzle.puzzleMaze.outro) {
				puzzle.puzzleMaze.gameOver();
				puzzle.puzzleMaze.exit();					
				puzzle.puzzleMaze.outro = false;
			}	
			if(puzzle.pause && npc.array[player.searchNPC()].name == "Heloisa") {
				puzzle.puzzlePong.gameOver();
				puzzle.pause = false;
			} 
			if(puzzle.pause && npc.array[player.searchNPC()].name == "Jorge") {
				puzzle.pause = false;
				puzzle.puzzleFishing.gameOver();
			} 
			if(puzzle.pause && npc.array[player.searchNPC()].name == "Sofia") {
				puzzle.puzzleBreakout.gameOver();
				puzzle.pause = false;
			} 
			if(puzzle.pause && npc.array[player.searchNPC()].name == "Mario") {
				puzzle.puzzleFlappyBird.gameOver();
				puzzle.pause = false;
			} 
			if(puzzle.pause && npc.array[player.searchNPC()].name == "Bruno") {
				puzzle.puzzleGuitarHero.gameOver();
				puzzle.pause = false;
			} 
			if(puzzle.pause && npc.array[player.searchNPC()].name == "Ronaldo") {
				puzzle.puzzleMaze.gameOver();
				puzzle.pause = false;
			}
		}
	})

$(document).keyup(function(e){
	switch(e.which) {
		case 37:
		player.moveLeft = false;
		if(puzzle.isOn) {
			puzzle.playerMoveLeft = false;
			break;
		}					
		break;
		case 38:
		player.moveUp = false;
		if(puzzle.isOn) {
			puzzle.playerMoveUp = false;
			puzzle.upIsDown = false;
			break;
		}				
		break;
		case 39:
		player.moveRight = false;
		if(puzzle.isOn) {
			puzzle.playerMoveRight = false;
			break;
		}					
		break;
		case 40:
		player.moveDown = false;
		if(puzzle.isOn) {
			puzzle.playerMoveDown = false;
			break;
		}				
		break;

		case 90:
		puzzle.zIsDown = false;
		break;
		case 88:
		puzzle.xIsDown = false;
		break;
		case 67:
		puzzle.cIsDown = false;
		break;
		case 86:
		puzzle.vIsDown = false;
		break;				
	}
})	

class Player {
	constructor() {
		this.name = characterName;
		this.gender = characterGender;
		this.x = 1485;
		this.y = 280;
		this.width = 20;
		this.height = 30;
		this.level = 0;
		this.actualXp = 0;
		this.xpCalc = 0;
		this.storageXp = 0;
		this.speed = 15;
		this.moveLeft = this.moveUp = this.moveRight = this.moveDown = false;					
		this.talking = false;
		this.animateCount = 1;
	}

	draw() {
		if(this.gender == "Feminino") {
			if(!this.moveLeft && !this.moveUp && !this.moveRight && !this.moveDown) {
				RenderImage(img.femaleCharacter_front1, this.x, this.y, this.width, this.height);
			} else if(this.moveLeft) {
				if(this.animateCount == 1) {
					RenderImage(img.femaleCharacter_left1, this.x, this.y, this.width, this.height);
					setTimeout(function() {;
						player.animateCount = 2;
					}, 300)					
				} else if(this.animateCount == 2) {
					RenderImage(img.femaleCharacter_left2, this.x, this.y, this.width, this.height);
					setTimeout(function() {
						player.animateCount = 3;
					}, 300)				
				} else if(this.animateCount == 3) {
					RenderImage(img.femaleCharacter_left3, this.x, this.y, this.width, this.height);
					setTimeout(function() {
						player.animateCount = 1;
					}, 300)				
				}
			} else if(this.moveUp) {
				if(this.animateCount == 1) {
					RenderImage(img.femaleCharacter_back2, this.x, this.y, this.width, this.height);
					setTimeout(function() {
						player.animateCount = 2;
					}, 300)					
				} else if(this.animateCount >= 2) {
					RenderImage(img.femaleCharacter_back3, this.x, this.y, this.width, this.height);
					setTimeout(function() {
						player.animateCount = 1;
					}, 300)				
				}
			} else if(this.moveRight) {
				if(this.animateCount == 1) {
					RenderImage(img.femaleCharacter_right1, this.x, this.y, this.width, this.height);
					setTimeout(function() {
						player.animateCount = 2;
					}, 300)					
				} else if(this.animateCount == 2) {
					RenderImage(img.femaleCharacter_right2, this.x, this.y, this.width, this.height);
					setTimeout(function() {
						player.animateCount = 3;
					}, 300)				
				} else if(this.animateCount == 3) {
					RenderImage(img.femaleCharacter_right3, this.x, this.y, this.width, this.height);
					setTimeout(function() {
						player.animateCount = 1;
					}, 300)				
				}
			} else if(this.moveDown) {
				if(this.animateCount == 1) {
					RenderImage(img.femaleCharacter_front2, this.x, this.y, this.width, this.height);
					setTimeout(function() {
						player.animateCount = 2;
					}, 300)					
				} else if(this.animateCount >= 2) {
					RenderImage(img.femaleCharacter_front3, this.x, this.y, this.width, this.height);
					setTimeout(function() {
						player.animateCount = 1;
					}, 300)				
				}
			}

		} else if(this.gender == "Masculino") {
			if(!this.moveLeft && !this.moveUp && !this.moveRight && !this.moveDown) {
				RenderImage(img.maleCharacter_front1, this.x, this.y, this.width, this.height);
			} else if(this.moveLeft) {
				if(this.animateCount == 1) {
					RenderImage(img.maleCharacter_left1, this.x, this.y, this.width, this.height);
					setTimeout(function() {;
						player.animateCount = 2;
					}, 300)					
				} else if(this.animateCount == 2) {
					RenderImage(img.maleCharacter_left2, this.x, this.y, this.width, this.height);
					setTimeout(function() {
						player.animateCount = 3;
					}, 300)				
				} else if(this.animateCount == 3) {
					RenderImage(img.maleCharacter_left3, this.x, this.y, this.width, this.height);
					setTimeout(function() {
						player.animateCount = 1;
					}, 300)				
				}
			} else if(this.moveUp) {
				if(this.animateCount == 1) {
					RenderImage(img.maleCharacter_back2, this.x, this.y, this.width, this.height);
					setTimeout(function() {
						player.animateCount = 2;
					}, 300)					
				} else if(this.animateCount >= 2) {
					RenderImage(img.maleCharacter_back3, this.x, this.y, this.width, this.height);
					setTimeout(function() {
						player.animateCount = 1;
					}, 300)				
				}
			} else if(this.moveRight) {
				if(this.animateCount == 1) {
					RenderImage(img.maleCharacter_right1, this.x, this.y, this.width, this.height);
					setTimeout(function() {
						player.animateCount = 2;
					}, 300)					
				} else if(this.animateCount == 2) {
					RenderImage(img.maleCharacter_right2, this.x, this.y, this.width, this.height);
					setTimeout(function() {
						player.animateCount = 3;
					}, 300)				
				} else if(this.animateCount == 3) {
					RenderImage(img.maleCharacter_right3, this.x, this.y, this.width, this.height);
					setTimeout(function() {
						player.animateCount = 1;
					}, 300)				
				}
			} else if(this.moveDown) {
				if(this.animateCount == 1) {
					RenderImage(img.maleCharacter_front2, this.x, this.y, this.width, this.height);
					setTimeout(function() {
						player.animateCount = 2;
					}, 300)					
				} else if(this.animateCount >= 2) {
					RenderImage(img.maleCharacter_front3, this.x, this.y, this.width, this.height);
					setTimeout(function() {
						player.animateCount = 1;
					}, 300)				
				}
			}			
		}
	}

	move() {
		if(this.moveLeft && this.x >= 0) {
			this.x -= this.speed;
		}
		else if(this.moveUp && this.y >= 0) {
			this.y -= this.speed;
		}
		else if(this.moveRight && this.x + this.width <= scenario.width) {
			this.x += this.speed;
		}
		else if(this.moveDown && this.y + this.height <= scenario.height) {
			this.y += this.speed;
		}
	}

	levelUp(score) {
		if(score >= 100 && score < 200) {
			this.storageXp = score - 100;
			this.actualXp = this.storageXp;
			this.level += 1;
		} else if(score >= 200) {
			this.storageXp = score - 200;
			this.actualXp = this.storageXp;
			this.level += 2;
		} else if(this.actualXp + score < 100) {
			this.actualXp += score;
		} else if(this.actualXp + score >= 100 && this.actualXp + score < 200) {
			this.xpCalc = (this.actualXp + score) - 100;
			this.actualXp = this.xpCalc;
			this.level += 1;
		} else if(this.actualXp + score >= 200) {
			this.xpCalc = (this.actualXp + score) - 200;
			this.actualXp = this.xpCalc;
			this.level += 2;
		}	
	}

	searchNPC() {
		for(var i = 0; i < npc.array.length; i++) {
			this.currentNPC = npc.array[i];
			if(this.x + this.width + 10 >= this.currentNPC.x &&
				this.x - 10 <= this.currentNPC.x + this.currentNPC.width &&
				this.y + this.height + 10 >= this.currentNPC.y &&
				this.y - 10 <= this.currentNPC.y + this.currentNPC.height) {																					
				return [npc.array.indexOf(this.currentNPC)];
		}
	}
}
}

class Profile {
	constructor() {
		this.width = 600;
		this.height = 500;
		this.x = canvas.width() / 2 - this.width / 2;
		this.y = canvas.height() / 2 - this.height / 2;
		this.bgColor = "#CAE1FF";
		this.isOn = false;
	}

	draw() {
		ctx.fillStyle = this.bgColor;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		//Cor das bordas das divs
		ctx.fillStyle = "Black";		
		//Desenhando div que mostrará a foto do personagem
		ctx.strokeRect(this.x + 5, this.y + 5, 100, 100);
		if(player.gender == "Feminino") {
			RenderImage(img.femaleCharacter_face, this.x + 5, this.y + 5, 100, 100);
		} else if(player.gender == "Masculino") {
			RenderImage(img.maleCharacter_face, this.x + 5, this.y + 5, 100, 100);
		}
		//Desenhando a div da lista de conhecimentos
		ctx.strokeRect(this.x + 5, this.y + 110, 590, 385);
		ctx.font = "30px Cursive";
		ctx.fillText("Maiores pontuações", this.x + 160, this.y + 140);
		ctx.font = "25px Cursive";
		ctx.fillText("Pong: " + puzzle.highestScorePong, this.x + 20, this.y + 180);
		ctx.fillText("Pescaria: " + puzzle.highestScoreFishing, this.x + 20, this.y + 210);
		ctx.fillText("Flappy Bird: " + puzzle.highestScoreFlappyBird, this.x + 20, this.y + 240);
		ctx.fillText("Breakout: " + puzzle.highestScoreBreakout, this.x + 20, this.y + 270);
		ctx.fillText("Guitar Hero: " + puzzle.highestScoreGuitarHero, this.x + 20, this.y + 300);
		ctx.fillText("Labirinto: " + puzzle.highestScoreMaze, this.x + 20, this.y + 330);
		//Desenhando a div das informações do personagem
		ctx.strokeRect(this.x + 110, this.y + 5, 485, 100);
		ctx.font = "30px Cursive";
		ctx.fillText(player.name, this.x + 120, this.y + 40);
		ctx.fillText("Nível", this.x + 120, this.y + 90);
		ctx.fillText(player.level, this.x + 200, this.y + 90);
		ctx.fillText("XP: ", this.x + 370, this.y + 90);
		ctx.fillText(Math.floor(player.actualXp), this.x + 420, this.y + 90);			
		}			
	}

	class NPC {
		constructor(name ,message, body, x, y, width, height, img, profession, hasPuzzle) {
			this.name = name;
			this.message = message;
			this.body = body;
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.img = img;
			this.profession = profession;
			this.hasPuzzle = hasPuzzle;
			this.array = [];
		}

		add() {
				//Nome
				//Mensagem
				//Cor
				//Posição em X
				//Posição em Y
				//Largura
				//Altura
				//Imagem
				//Profissão
				//Nível de amizade
				//Possui puzzle?

			//NPCs com puzzle
			this.array.push(new NPC(
				"Heloisa", 
				"Oi, " + player.name + ", quer brincar comigo?", 
				img.heloisaBody, 
				1815, 
				250, 
				25, 
				33, 
				img.heloisa,
				"Comerciante",
				true
				));

			this.array.push(new NPC(
				"Mario", 
				"Eu amo os animais! Você quer brincar, " + player.name + " ?", 
				img.marioBody, 
				663, 
				1198, 
				25, 
				33, 
				img.mario,
				"Agricultor",
				true
				));				

			this.array.push(new NPC(
				"Sofia", 
				"Que linda floresta, ela me deixa tão animada! Você quer brincar, " + player.name + "?", 
				img.sofiaBody, 
				1095, 
				2200, 
				25, 
				33, 
				img.sofia,
				"Comerciante",
				true
				));

			this.array.push(new NPC(
				"Bruno", 
				"Bom dia " + player.name + "? Quer praticar um pouco de violão?",
				img.brunoBody,
				240, 
				200, 
				25, 
				33, 
				img.bruno,
				"Músico",
				true
				));

			this.array.push(new NPC(
				"Jorge", 
				"Bom dia, " + player.name + "! Gostaria de me ajudar a pescar?",
				img.jorgeBody, 
				2275, 
				2040, 
				25, 
				33, 
				img.jorge,
				"Pescador",
				true
				));

			this.array.push(new NPC(
				"Ronaldo", 
				"Eae, " + player.name + "! Tenho um desafio para você, quer jogar?",
				img.ronaldoBody, 
				2865, 
				2205, 
				25, 
				33, 
				img.ronaldo,
				"Explorador",
				true
				));	

			//NPCs sem puzzle
			this.array.push(new NPC(
				"Ricardo", 
				"O maior desafio é sempre o último!", 
				img.marioBody, 
				2825, 
				553, 
				25, 
				33, 
				img.mario,
				"Vendedor",
				false
				));

			this.array.push(new NPC(
				"Maicon", 
				"É um belo jardim, não acha?", 
				img.male_NPC1, 
				2675, 
				1905, 
				25, 
				33, 
				img.mario,
				"Caçador",
				false
				));

			this.array.push(new NPC(
				"Renan", 
				"Eu amo essa vila! Me sinto tão bem aqui", 
				img.male_NPC2, 
				1200, 
				315, 
				25, 
				33, 
				img.mario,
				"Alquimista",
				false
				));

			this.array.push(new NPC(
				"Gandalf", 
				"Você não passará!!!", 
				img.male_NPC3, 
				224, 
				1344, 
				25, 
				33, 
				img.mario,
				"Feiticeiro",
				false
				));

			this.array.push(new NPC(
				"Erick", 
				"O maior erro que se pode cometer em uma aprendizagem é nunca errar!", 
				img.male_NPC3, 
				1190, 
				1575, 
				25, 
				33, 
				img.mario,
				"Aventureiro",
				false
				));								

			this.array.push(new NPC(
				"Mateus", 
				"O novato pergunta sem ler, e o veterano lê sem perguntar!", 
				img.male_NPC4, 
				111, 
				1999, 
				25, 
				33, 
				img.mario,
				"Guarda-costas",
				false
				));			

			this.array.push(new NPC(
				"Michele", 
				"Veja, o rio está lindo hoje!", 
				img.female_NPC1, 
				2024, 
				2068, 
				25, 
				33, 
				img.mario,
				"Comerciante",
				false
				));

			this.array.push(new NPC(
				"Raquel", 
				"Nossa Vila Attena cresce a cada dia!", 
				img.female_NPC2, 
				845, 
				2170, 
				25, 
				33, 
				img.mario,
				"Fazendeira",
				false
				));														
		}

		draw() {
			for (var i = 0; i < this.array.length; i++) {
				var currentNPC = this.array[i];
				RenderImage(currentNPC.body, currentNPC.x, currentNPC.y, currentNPC.width, currentNPC.height);
				scenario.blockRectangle(player, currentNPC.x, currentNPC.y, currentNPC.width, currentNPC.height);
			}
		}
	}	

	class Dialogue {
		constructor() {
			this.width = 800;
			this.height = 200;
			this.x = canvas.width() / 2 - this.width / 2;
			this.y = canvas.height() - this.height - 10;
			this.img = img.dialogue_background;
			this.isOn = false;	
		}

		answer() {
			ctx.font = "30px Cursive";
			ctx.fillStyle = "Green";
			ctx.fillText("Sim (Pressione S)", 115, 510);
			ctx.fillStyle = "Red";
			ctx.fillText("Não (Pressione N)", 115, 550);
		}				

		draw() {
			if(player.searchNPC() != null) {
				RenderImage(this.img, this.x, this.y, this.width, this.height);
				ctx.fillStyle = "White";
				ctx.shadowColor = "Black";
				ctx.shadowBlur = 3;						
				ctx.font = "28px Arial";
				ctx.textAlign = "left";
				ctx.fillText(npc.array[player.searchNPC()].name, this.x + 20, this.y + 40);
				ctx.font = "23px Cursive";
				ctx.fillText(npc.array[player.searchNPC()].message, this.x + 15, this.y + 70);
				ctx.shadowBlur = 0;
				if(npc.array[player.searchNPC()].hasPuzzle) {
					this.answer();					
				}
			}
		}
	}

	class InfoNPC {
		constructor() {
			this.width = 400;
			this.height = 150;
			this.x = canvas.width() / 2 - this.width / 2;
			this.y = 440;
			this.img = img.dialogue_background;	
		}

		draw() {
			if(player.searchNPC() != null) {
				RenderImage(this.img, this.x, this.y, this.width, this.height);
				ctx.fillStyle = "White";
				ctx.shadowColor = "Black";
				ctx.shadowBlur = 3;
				ctx.font = "20px Arial";
				ctx.textAlign = "left";
				ctx.fillText(npc.array[player.searchNPC()].name, this.x + 10, this.y + 28);
				ctx.shadowBlur = 0;
				if(npc.array[player.searchNPC()].hasPuzzle) {
					RenderImage(npc.array[player.searchNPC()].img, this.x + 10, this.y + 35, this.width / 5, this.height - 45);
				}
				ctx.font = "18px Cursive";
				ctx.shadowBlur = 3;
				if(npc.array[player.searchNPC()].profession != "") {
					ctx.fillText("Profissão: " + npc.array[player.searchNPC()].profession, 395, 495);
				}
				ctx.fillStyle = "Red";
				ctx.shadowBlur = 0;
				ctx.fillText("Pressione Q para conversar", 460, 576);
			}		
		}
	}

	class SignalNPC {
		constructor() {
			this.width = 15;
			this.height = 15;
			this.color = "Red";
		}

		draw() {
			for(var i = 0; i < npc.array.length; i++) {
				this.currentNPC = npc.array[i];
				if(this.currentNPC.hasPuzzle) {
					DrawRect(this.color, this.currentNPC.x + 5, this.currentNPC.y - 15, this.width, this.height);
					ctx.font = "15px Cursive";
					ctx.fillStyle = "White";
					ctx.fillText("?", this.currentNPC.x + 9, this.currentNPC.y - 3);
				}
			}	
		}
	}	

	class Scenario {
		constructor() {
			this.tileSize = 25;			
			this.map = [
			[11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
			[11,18,43,43,43,43,43,43,43,18,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,27,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,27,10,10,10,10,10,48,48,48,64,64,64,64,64,64,47,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,11],
			[11,18,18,18,18,18,18,18,18,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,27,26,26,26,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,26,26,26,26,26,26,26,26,26,27,10,10,10,10,10,10,48,48,48,64,64,64,64,64,47,64,47,47,47,64,64,64,46,64,64,64,47,64,64,64,64,64,64,64,47,64,64,64,64,64,64,64,64,64,64,47,64,64,64,11],
			[11,53,33,30,30,30,30,30,36,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,27,43,44,33,30,30,30,30,30,36,43,10,10,44,33,30,30,30,30,30,36,44,10,10,43,33,30,30,30,30,30,36,43,18,20,44,44,20,18,43,27,10,10,10,10,10,10,10,45,45,45,64,64,64,64,64,64,47,47,47,47,47,64,46,64,47,47,47,64,64,64,64,64,64,64,47,47,47,47,47,64,64,64,64,64,47,47,64,64,64,11],
			[11,53,31,17,17,17,17,17,32,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,27,43,44,31,17,17,17,17,17,32,43,10,10,44,31,17,17,17,17,17,32,44,10,10,43,31,17,17,17,17,17,32,43,20,20,20,20,20,20,43,27,10,10,10,10,10,10,10,10,45,45,45,64,64,64,64,64,64,64,47,47,47,64,46,46,64,47,47,64,64,64,64,64,64,64,64,47,47,64,64,64,64,64,64,47,47,47,64,64,64,11],
			[11,53,34,29,29,29,29,29,35,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,27,43,44,34,29,29,29,29,29,35,43,10,10,44,34,29,29,29,29,29,35,44,10,10,43,34,29,29,29,29,29,35,43,20,20,20,20,20,18,43,27,10,10,10,10,10,10,10,10,10,45,45,48,48,48,48,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,47,47,47,64,64,64,64,11],
			[11,53,14,14,14,14,14,14,14,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,27,43,44,14,14,14,14,14,14,14,43,10,10,44,14,14,14,14,14,14,14,44,10,10,43,14,14,14,14,14,14,14,43,10,20,20,20,20,20,43,27,10,10,10,10,10,10,10,10,10,10,45,45,45,45,45,45,64,64,64,64,64,64,64,64,64,64,64,64,64,64,47,64,64,64,64,64,64,64,64,64,64,64,47,47,47,64,64,64,64,11],
			[11,53,14,16,14,14,14,16,14,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,27,43,44,14,16,14,14,14,16,14,43,10,10,44,14,16,14,14,14,16,14,44,10,10,43,14,16,14,14,14,16,14,10,20,20,20,20,20,20,10,27,10,10,10,10,10,10,10,10,10,10,10,45,45,45,45,45,45,48,48,48,64,64,64,64,64,64,64,64,64,64,47,47,47,64,64,64,64,64,46,64,64,64,64,64,64,64,46,46,64,11],
			[11,53,14,14,14,28,14,14,14,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,27,43,44,14,14,14,28,14,14,14,43,10,10,44,14,14,14,28,14,14,14,44,10,10,43,14,14,14,28,14,14,14,10,10,20,20,20,20,10,10,27,10,10,10,10,10,10,10,10,10,10,10,10,45,48,45,45,45,45,45,48,48,64,64,64,64,46,64,64,64,64,47,47,47,64,64,64,64,64,46,46,64,64,64,64,64,64,46,46,64,11],
			[11,53,14,14,14,15,14,14,14,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,27,43,44,14,14,14,15,14,14,14,43,10,10,44,14,14,14,15,14,14,14,44,10,10,43,14,14,14,15,14,14,14,10,10,10,20,20,10,10,44,27,10,10,10,10,10,10,10,10,10,10,10,10,10,45,48,45,45,45,45,45,45,45,64,64,64,46,46,64,64,64,47,64,47,64,64,64,64,64,46,46,64,64,64,64,64,64,64,64,64,11],
			[11,44,44,44,18,10,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,27,44,44,44,44,10,10,10,44,44,44,10,10,43,43,43,10,10,10,43,43,43,10,10,44,44,10,10,10,44,44,44,44,44,10,10,10,10,18,44,27,10,10,10,10,10,10,10,10,10,10,10,10,10,10,45,48,45,45,45,45,45,45,45,64,64,46,46,64,64,64,64,64,64,64,64,64,64,64,46,46,46,64,64,64,64,64,64,48,48,11],
			[11,25,25,25,27,10,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,27,44,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,44,27,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,45,45,45,45,45,45,48,48,64,64,46,64,64,64,64,64,64,64,64,64,64,64,64,64,46,46,64,64,64,64,64,45,48,48,11],
			[11,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,27,44,10,10,18,10,10,10,18,18,18,18,18,18,18,18,10,10,10,18,18,18,18,18,18,18,10,10,10,18,18,18,18,18,18,18,18,18,18,44,27,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,45,48,45,45,45,48,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,46,64,64,64,64,45,45,45,45,48,11],
			[20,20,20,20,20,20,20,20,20,20,20,20,20,20,57,58,59,20,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,27,44,10,10,18,18,18,18,18,18,18,18,18,18,18,18,10,10,10,18,18,18,18,18,18,18,10,10,10,18,18,18,18,18,18,18,18,18,18,44,27,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,48,48,45,45,48,64,64,64,64,64,64,64,64,64,64,46,46,46,64,64,64,64,64,64,64,64,64,48,48,45,10,10,11],
			[20,20,20,20,20,20,20,20,20,20,20,20,20,20,57,58,59,20,20,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,27,44,10,10,26,26,26,26,26,26,26,26,26,26,26,26,10,10,10,26,26,26,26,26,26,26,10,10,10,26,26,26,26,26,26,26,26,26,26,26,27,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,45,45,45,45,64,64,64,46,64,64,64,64,64,64,46,46,46,64,64,64,64,64,64,64,45,45,48,10,10,10,10,11],
			[20,20,20,20,20,20,20,20,20,20,20,20,20,20,57,58,59,20,20,20,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,27,18,10,10,25,25,25,25,25,25,25,25,25,25,25,25,10,10,10,25,25,25,25,25,25,25,10,10,10,25,25,25,25,25,25,25,25,25,25,25,27,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,45,45,45,45,64,64,46,46,64,64,64,64,64,64,46,46,64,64,64,64,64,48,48,45,45,10,10,10,10,10,11],
			[20,20,20,20,20,20,20,20,20,20,20,20,20,20,57,58,59,20,20,20,20,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,45,45,45,45,64,64,46,46,64,64,64,64,64,64,46,46,64,64,64,64,45,48,45,45,10,10,10,10,10,10,11],
			[11,48,48,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,45,45,45,64,64,64,64,64,64,64,64,64,64,64,64,64,45,45,45,45,45,10,10,10,10,10,10,10,10,11],
			[11,48,48,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,45,45,64,64,64,64,64,64,64,64,64,64,64,45,45,45,45,45,45,45,10,10,10,10,10,10,10,10,10,11],
			[11,48,48,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,45,45,64,64,64,64,48,48,64,64,64,64,45,45,45,45,45,48,48,48,10,10,10,10,10,10,10,10,10,11],
			[11,64,64,45,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,45,45,45,64,64,45,45,48,48,45,64,64,45,45,45,45,45,48,48,10,10,10,10,10,10,10,10,10,10,11],
			[11,64,64,64,45,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,10,45,45,10,10,10,10,10,10,10,10,10,10,11],
			[11,64,64,46,64,45,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,45,45,45,45,45,45,45,45,45,48,48,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,46,46,46,64,64,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,45,45,45,45,45,45,45,48,48,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,46,46,46,46,64,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,45,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,64,64,64,64,64,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,47,47,64,64,64,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,47,47,64,64,64,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,47,47,64,64,64,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,47,47,64,64,64,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,47,64,64,64,64,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,64,64,64,46,64,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,64,64,64,46,64,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,46,46,64,64,64,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,46,46,64,64,45,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,46,46,64,45,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,64,64,45,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,48,48,45,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,48,48,45,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,48,48,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,27,18,18,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,52,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,52,18,18,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,52,18,54,18,18,18,18,18,56,18,18,18,18,18,56,18,18,18,18,18,18,18,18,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,25,25,25,25,25,25,25,25,25,27,10,10,10,10,18,18,52,18,18,18,18,18,18,18,18,18,18,56,18,18,18,18,55,18,18,54,18,18,18,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,18,18,18,18,18,18,18,18,18,52,10,10,10,10,18,18,52,18,55,18,18,55,18,18,56,18,18,18,18,18,18,18,18,18,18,18,52,18,18,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,18,49,18,51,18,18,51,18,18,52,10,10,10,10,18,18,52,18,18,54,18,18,18,18,18,18,18,18,56,18,18,18,18,18,18,18,52,18,18,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,18,18,18,18,18,50,18,50,18,52,10,10,10,10,18,18,52,18,18,18,18,18,55,18,18,18,18,18,18,18,18,18,18,56,18,18,52,18,18,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,18,18,49,18,18,18,18,18,18,52,10,10,10,10,18,18,52,55,18,18,18,18,18,18,18,18,18,18,18,54,18,18,18,18,18,18,52,18,18,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,18,49,18,18,50,18,49,18,18,52,10,10,10,10,18,18,52,18,18,54,18,18,18,56,18,18,18,18,18,18,18,18,55,18,18,18,52,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,18,18,18,18,18,18,18,18,18,52,10,10,10,10,18,18,18,18,18,18,18,18,18,18,18,18,55,18,18,18,54,18,18,18,18,18,52,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,43,33,30,30,30,30,30,36,18,52,10,10,10,10,18,18,18,55,18,18,18,18,18,18,56,18,18,54,18,18,18,18,18,18,18,18,52,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,39,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,43,31,17,17,17,17,17,32,18,52,10,10,10,10,18,18,52,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,52,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,60,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,43,34,29,29,29,29,29,35,18,52,10,10,10,10,18,18,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,27,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,43,14,14,14,14,14,14,14,18,52,10,10,10,10,10,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,44,14,16,14,14,14,16,14,18,52,10,10,10,10,10,10,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,44,14,14,14,28,14,14,14,18,52,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,44,14,14,14,15,14,14,14,18,52,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,44,18,18,18,18,18,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11],
			[11,44,18,18,18,18,18,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,10,10,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,57,58,59,20,20,20,20,20,20],
			[11,44,18,18,18,18,18,18,18,18,52,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,10,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,20,57,58,59,20,20,20,20,20,20],
			[11,44,18,18,18,18,18,18,18,18,52,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,27,18,18,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,20,20,57,58,59,20,20,20,20,20,20],
			[11,25,25,25,25,25,25,25,25,25,27,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,52,18,18,18,18,18,18,18,18,18,18,51,18,18,18,18,18,18,18,18,52,18,18,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,20,20,20,57,58,59,20,20,20,20,20,20],
			[11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,52,49,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,51,18,18,18,18,18,10,10,10,10,10,10,10,10,63,63,63,63,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,26,44,18,18,18,18,18,18,18,18,18,26,11],
			[11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,52,18,18,18,49,18,18,18,49,18,18,18,49,18,18,18,18,18,18,18,18,18,18,10,10,10,10,10,10,10,10,62,62,62,62,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,26,43,44,18,18,18,18,18,18,18,18,26,26,11],
			[11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,52,18,18,18,18,18,18,18,18,18,18,18,18,18,18,50,18,18,18,18,52,18,18,10,10,10,10,10,10,10,10,61,61,61,61,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,26,26,43,18,18,18,18,18,18,18,53,26,26,64,11],
			[11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,52,50,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,51,52,18,18,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,44,43,43,18,18,18,18,18,18,18,18,53,64,64,64,11],
			[11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,52,18,18,18,18,18,18,18,18,18,18,18,18,50,18,18,18,18,18,18,52,18,18,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,44,44,43,18,18,18,18,18,18,18,18,53,64,64,46,64,11],
			[11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,52,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,52,18,18,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,43,53,43,18,18,18,18,18,18,18,18,18,53,53,64,46,64,11],
			[11,25,25,25,25,25,25,25,25,25,27,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,52,18,18,18,51,18,18,18,18,18,18,18,49,18,18,18,18,18,18,18,52,18,18,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,43,53,53,18,18,18,18,18,18,18,18,18,53,53,64,46,47,64,11],
			[11,53,53,53,53,53,53,53,53,53,18,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,52,18,18,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,43,53,53,18,18,18,18,18,18,18,18,18,44,44,64,64,64,47,64,11],
			[11,26,33,30,30,30,30,30,36,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,18,18,18,18,18,50,18,18,18,50,18,18,18,18,18,18,49,18,18,18,18,51,52,18,18,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,44,26,53,18,18,18,18,18,18,18,18,18,18,43,64,64,64,47,47,64,11],
			[11,26,31,17,17,17,17,17,32,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,18,18,52,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,52,18,18,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,44,26,26,18,18,18,18,18,18,18,18,18,18,43,43,64,64,64,64,64,64,11],
			[11,26,34,29,29,29,29,29,35,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,18,18,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,27,18,18,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,26,44,44,18,18,18,18,18,18,18,18,18,18,18,44,64,64,47,64,64,64,64,11],
			[11,26,14,14,14,14,14,14,14,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,10,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,20,20,26,43,44,18,18,18,18,18,18,18,18,18,18,18,18,43,64,64,47,64,64,64,64,11],
			[11,26,14,16,14,14,14,16,14,18,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,10,10,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,57,58,59,20,20,20,20,20,20,20,20,20,20,26,43,18,18,18,18,18,18,18,18,18,18,18,18,18,18,43,44,64,64,46,46,64,64,11],
			[11,26,14,14,14,28,14,14,14,18,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,57,58,59,20,20,20,20,20,20,20,20,20,43,44,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,43,43,26,64,46,64,64,64,11],
			[11,26,14,14,14,15,14,14,14,18,18,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,57,58,59,20,20,20,20,20,20,20,20,44,26,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,26,26,64,64,46,64,64,64,11],
			[11,26,18,18,18,18,18,18,18,18,18,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,57,58,59,20,20,20,20,20,20,20,43,26,26,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,26,64,64,46,46,64,64,11],
			[11,26,18,18,18,18,18,18,18,18,18,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,57,58,59,20,20,20,20,20,20,43,26,26,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,26,26,26,64,64,46,64,64,64,11],
			[11,26,18,18,18,18,18,18,18,18,18,18,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,53,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,57,58,59,20,20,20,20,20,20,43,26,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,26,26,64,64,64,64,64,64,64,64,11],
			[11,26,18,18,18,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,53,10,10,10,10,10,10,10,10,10,10,10,10,53,53,53,10,10,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,20,57,58,59,20,20,20,20,20,20,43,53,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,44,44,64,64,64,64,47,47,47,64,64,11],
			[11,26,18,18,18,18,18,18,18,10,18,18,18,18,18,18,18,10,10,10,10,10,10,10,10,10,10,10,10,53,53,53,53,53,10,10,10,10,10,10,53,53,53,53,53,53,53,53,10,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,20,57,58,59,20,20,20,20,20,20,43,53,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,26,64,64,64,64,64,64,64,47,47,64,11],
			[11,25,25,25,25,25,25,25,38,10,25,25,25,25,25,25,25,27,10,10,10,10,10,10,10,10,10,10,53,53,53,53,53,53,53,53,53,10,10,10,53,53,53,53,26,26,53,53,53,10,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,43,53,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,26,64,64,64,64,64,64,47,64,64,11],
			[11,26,33,30,30,30,30,30,36,10,33,30,30,30,30,30,36,43,10,10,10,10,10,10,10,10,10,10,53,53,43,53,26,53,26,53,53,10,10,18,18,18,18,53,44,44,43,53,53,53,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,44,53,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,26,64,64,64,64,64,64,64,64,11],
			[11,26,31,17,17,17,17,17,32,10,31,17,17,17,17,17,32,43,53,10,10,10,10,10,10,10,10,53,53,43,44,43,43,44,44,18,18,18,18,18,18,18,18,18,44,43,43,53,53,53,10,10,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,20,20,20,20,20,20,20,44,53,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,26,26,26,64,64,64,64,64,64,11],
			[11,26,34,29,29,29,29,29,35,10,34,29,29,29,29,29,35,43,53,10,10,10,10,10,10,10,10,53,53,53,43,43,44,18,18,18,18,18,18,18,18,18,18,18,18,44,43,53,53,53,10,53,10,10,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,20,20,20,20,20,26,43,43,18,18,18,18,26,26,26,43,18,18,18,18,18,18,18,18,18,18,43,43,43,26,64,64,64,64,64,11],
			[11,26,14,14,14,14,14,14,14,10,14,14,14,14,14,14,14,43,53,10,10,10,10,10,10,10,10,53,53,44,43,44,18,18,18,18,18,18,18,18,18,18,18,18,18,18,44,44,53,53,53,53,53,53,10,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,20,20,20,26,43,43,18,18,18,18,18,26,64,44,43,18,18,18,18,18,18,18,18,18,18,18,44,43,53,53,64,46,64,64,11],
			[11,26,14,16,14,14,14,16,14,10,14,16,14,14,14,16,14,43,53,10,10,10,10,10,10,10,10,53,53,44,26,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,43,44,53,53,53,53,53,53,53,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,20,20,20,20,20,26,44,43,18,18,18,18,53,53,64,46,64,44,43,43,43,43,18,18,18,18,18,18,18,44,43,53,64,46,46,64,64,11],
			[11,26,14,14,14,28,14,14,14,10,14,14,14,28,14,14,14,43,53,10,10,10,10,10,10,10,53,53,53,26,26,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,44,53,44,53,44,53,53,53,10,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,20,26,26,43,44,18,18,18,18,53,64,64,64,46,64,64,43,44,26,43,18,18,18,18,18,18,18,44,53,53,64,64,64,64,64,11],
			[11,26,14,14,14,15,14,14,14,10,14,14,14,15,14,14,14,43,53,10,10,10,10,10,10,10,53,53,53,53,43,18,18,64,64,64,18,18,64,64,64,64,64,18,18,18,18,26,44,43,26,44,26,26,53,53,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,43,44,18,18,18,18,53,64,64,64,64,64,64,64,64,44,64,26,43,18,18,18,18,18,18,44,44,64,64,64,64,64,64,11],
			[11,53,53,53,10,10,10,18,18,10,18,18,10,10,10,18,18,18,18,10,10,10,10,10,10,53,53,53,53,53,43,44,43,64,64,64,64,64,64,46,64,64,64,64,18,18,44,44,26,43,26,43,26,53,53,53,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,18,18,18,18,18,18,53,64,64,46,64,64,47,64,64,46,64,64,26,43,18,18,18,18,43,43,64,46,64,64,64,64,64,11],
			[11,53,53,53,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,53,53,53,53,26,44,44,64,64,47,64,64,64,46,46,64,64,64,46,64,26,26,43,43,44,43,44,53,53,53,53,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,18,18,18,18,18,53,64,46,46,64,47,47,64,64,46,47,64,64,26,43,18,18,44,44,43,64,46,46,47,64,64,64,11],
			[11,53,53,53,10,10,10,18,18,10,18,18,10,10,10,43,43,43,43,10,10,10,10,10,10,53,53,53,53,26,43,44,64,47,47,47,64,46,46,46,64,46,46,46,64,47,64,43,43,43,43,44,53,53,53,53,10,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,18,18,18,53,53,64,64,46,64,64,47,47,64,64,64,47,64,64,44,44,43,43,44,43,43,64,64,47,47,47,64,64,11],
			[11,53,53,53,44,44,44,44,44,10,43,43,43,43,43,44,44,44,44,10,10,10,10,10,53,53,53,53,44,44,43,64,47,47,47,47,64,46,46,46,64,64,64,64,64,47,47,64,26,26,44,53,53,53,53,53,53,20,20,20,20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,18,18,53,53,64,47,64,64,64,64,47,64,64,64,64,64,47,64,64,26,26,26,26,26,64,64,64,64,64,64,64,64,11],
			[11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,20,20,20,20,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11]];

			this.height = this.map.length * this.tileSize;
			this.width = this.map[0].length * this.tileSize;
		}


		blockRectangle(objA, x, y, width, height) {
			this.distX = (objA.x + objA.width/2) - (x + width/2);
			this.distY = (objA.y + objA.height/2) - (y + height/2);
			
			this.sumWidth = (objA.width + width)/2;
			this.sumHeight = (objA.height + height)/2;
			
			if(Math.abs(this.distX) < this.sumWidth && Math.abs(this.distY) < this.sumHeight){
				this.overlapX = this.sumWidth - Math.abs(this.distX);
				this.overlapY = this.sumHeight - Math.abs(this.distY);
				
				if(this.overlapX > this.overlapY){
					objA.y = this.distY > 0 ? objA.y + this.overlapY : objA.y - this.overlapY;
				} else {
					objA.x = this.distX > 0 ? objA.x + this.overlapX : objA.x - this.overlapX;
				}
			}
		}

		drawTiles() {
			for(this.row in this.map) {
				for(this.col in this.map[this.row]) {
					this.x = this.col * this.tileSize;
					this.y = this.row * this.tileSize;
					this.tile = this.map[this.row][this.col];
					if(this.tile == 10) {
						//Terra					
						DrawRect("#e9d8b1", this.x, this.y, this.tileSize, this.tileSize);
					} else if(this.tile == 11) {
						//Barreiras nas margens						
						DrawRect("#2E8B57", this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);								
					} else if(this.tile == 12) {
						//Estradas
						DrawRect("#ffd966", this.x, this.y, this.tileSize, this.tileSize);
					} else if(this.tile == 13) {
						//Telhados das casas								
						DrawRect("lightgray", this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);
					} else if(this.tile == 14) {
						//Paredes das casas									
						RenderImage(img.house_solo, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);
					} else if(this.tile == 15) {
						//Portas das casas											
						RenderImage(img.door1, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);
					} else if(this.tile == 16) {
						//Janelas das casas						
						RenderImage(img.window, this.x, this.y, this.tileSize, this.tileSize);										
					} else if(this.tile == 17) {
						//Telhados superiores das casas						
						DrawRect("gray", this.x, this.y, this.tileSize, this.tileSize);
					} else if(this.tile == 18) {
						//Grama						
						RenderImage(img.grass_solo, this.x, this.y, this.tileSize, this.tileSize);
					} else if(this.tile == 19) {
						//Cercas						
						DrawRect("#ffcc00", this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);
					} else if(this.tile == 20) {
						//Água						
						RenderImage(img.water_solo, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);
					} else if(this.tile == 21) {
						//Grama						
						RenderImage(img.grama2, this.x, this.y, this.tileSize, this.tileSize);						
					} else if(this.tile == 22) {
						//Grama						
						RenderImage(img.grama3, this.x, this.y, this.tileSize, this.tileSize);						
					} else if(this.tile == 23) {
						//Grama						
						RenderImage(img.grama4, this.x, this.y, this.tileSize, this.tileSize);						
					} else if(this.tile == 24) {
						//Grama						
						RenderImage(img.grama5, this.x, this.y, this.tileSize, this.tileSize);						
					} else if(this.tile == 25) {
						//Grama						
						RenderImage(img.grass_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.fence_left, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);	
					} else if(this.tile == 26) {
						//Planta						
						RenderImage(img.grass_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.flower, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);					
					} else if(this.tile == 27) {
						//Cerca com terra						
						RenderImage(img.grass_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.fence_solo, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x - 13, this.y, this.tileSize, this.tileSize);					
					} else if(this.tile == 28) {
						//Porta											
						RenderImage(img.door2, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);					
					} else if(this.tile == 29) {
						//Telhado inferior												
						RenderImage(img.roof_bottom, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);					
					} else if(this.tile == 30) {
						//Telhado superior												
						RenderImage(img.roof_top, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);					
					} else if(this.tile == 31) {
						//Telhado lateral esquerda												
						RenderImage(img.roof_left, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);					
					} else if(this.tile == 32) {
						//Telhado lateral direita			
						RenderImage(img.roof_right, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);					
					} else if(this.tile == 33) {
						//Telhado superior esquerda				
						RenderImage(img.roof_top_left, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);					
					} else if(this.tile == 34) {
						//Telhado inferior esquerda			
						RenderImage(img.roof_bottom_left, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);					
					} else if(this.tile == 35) {
						//Telhado inferior direita			
						RenderImage(img.roof_bottom_right, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);					
					} else if(this.tile == 36) {
						//Telhado superior direta												
						RenderImage(img.roof_top_right, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);					
					} else if(this.tile == 37) {			
					} else if(this.tile == 38) {
						//Cerca com grama solo												
						RenderImage(img.grass_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.fence_solo, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x - 13, this.y, this.tileSize, this.tileSize);				
					} else if(this.tile == 39) {
						//Agua diagonal esquerda												
						RenderImage(img.water_diag_left, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize - 5, this.tileSize);				
					} else if(this.tile == 42) {
						//Ávore											
						RenderImage(img.strong_grass_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.tree, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);				
					} else if(this.tile == 43) {
						//Flor2											
						RenderImage(img.grass_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.flower2, this.x, this.y, 20, 20);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);				
					} else if(this.tile == 44) {
						//Flor3											
						RenderImage(img.grass_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.flower3, this.x, this.y, 20, 20);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);				
					} else if(this.tile == 45) {
						//Grama escura											
						RenderImage(img.strong_grass_solo, this.x, this.y, this.tileSize, this.tileSize);		
					} else if(this.tile == 46) {
						//Planta da água
						RenderImage(img.strong_water_solo, this.x, this.y, this.tileSize, this.tileSize);											
						RenderImage(img.waterPlant, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);								
					} else if(this.tile == 47) {
						//Planta da água menor
						RenderImage(img.strong_water_solo, this.x, this.y, this.tileSize, this.tileSize);											
						RenderImage(img.waterPlant2, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);								
					} else if(this.tile == 48) {
						//Flor com fundo escuro
						RenderImage(img.strong_grass_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.flower, this.x, this.y, 20, 20); 
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);								
					} else if(this.tile == 49) {
						//Ovelha frente
						RenderImage(img.grass_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.sheep_front, this.x, this.y, 20, 20); 
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);								
					} else if(this.tile == 50) {
						//Ovelha esquerda
						RenderImage(img.grass_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.sheep_left, this.x, this.y, 20, 20); 
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);								
					} else if(this.tile == 51) {
						//Ovelha direita
						RenderImage(img.grass_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.sheep_right, this.x, this.y, 20, 20); 
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);								
					} else if(this.tile == 52) {
						//Cerca vertical
						RenderImage(img.grass_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.fence_vertical, this.x, this.y, this.tileSize, this.tileSize); 
						this.blockRectangle(player, this.x, this.y, this.tileSize - 13, this.tileSize);								
					} else if(this.tile == 53) {
						//Árvore com grama clara
						RenderImage(img.grass_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.tree, this.x, this.y, this.tileSize, this.tileSize); 
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);								
					} else if(this.tile == 54) {
						//Galinha frente
						RenderImage(img.grass_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.chick_front, this.x, this.y, 15, 15); 
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);								
					} else if(this.tile == 55) {
						//Galinha esquerda
						RenderImage(img.grass_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.chick_left, this.x, this.y, 15, 15); 
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);								
					} else if(this.tile == 56) {
						//Galinha direita
						RenderImage(img.grass_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.chick_right, this.x, this.y, 15, 15); 
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);								
					} else if(this.tile == 57) {
						//Ponte topo esquerda
						RenderImage(img.water_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.bridge_top_left, this.x, this.y, this.tileSize, this.tileSize);				
					} else if(this.tile == 58) {
						//Ponte topo centro
						RenderImage(img.water_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.bridge_top_center, this.x, this.y, this.tileSize, this.tileSize); 					
					} else if(this.tile == 59) {
						//Ponte topo direita
						RenderImage(img.water_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.bridge_top_right, this.x, this.y, this.tileSize, this.tileSize); 							
					} else if(this.tile == 60) {
						//Água diagonal direita
						RenderImage(img.water_diag_right, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize + 5, this.tileSize);						
					} else if(this.tile == 61) {
						//Ponte esquerda inferior
						RenderImage(img.water_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.bridge_left_bottom, this.x, this.y, this.tileSize, this.tileSize);					
					} else if(this.tile == 62) {
						//Ponte esquerda centro
						RenderImage(img.water_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.bridge_left_center, this.x, this.y, this.tileSize, this.tileSize);				
					} else if(this.tile == 63) {
						//Ponte esquerda topo
						RenderImage(img.water_solo, this.x, this.y, this.tileSize, this.tileSize);
						RenderImage(img.bridge_left_top, this.x, this.y, this.tileSize, this.tileSize);						
					} else if(this.tile == 64) {
						//Água escura
						RenderImage(img.strong_water_solo, this.x, this.y, this.tileSize, this.tileSize);
						this.blockRectangle(player, this.x, this.y, this.tileSize, this.tileSize);					
					}        
				}
			}			
		}
	}

	class Puzzle {
		constructor() {			
			this.isOn = false;
			this.pause = false;
			this.playerMoveLeft = this.playerMoveUp = this.playerMoveDown = this.playerMoveRight = this.upIsDown = false;
			this.controlRed = this.controlBlue = this.controlGreen = this.controlPurple = false;
			this.zIsDown = this.xIsDown = this.cIsDown = this.vIsDown = false;
			this.highestScorePong = this.highestScoreFishing = this.highestScoreFlappyBird = this.highestScoreBreakout = this.highestScoreGuitarHero = this.highestScoreMaze = 0;			
		}
	}

	class PuzzleFishing {
		constructor(fishX, fishY, fishWidth, fishHeight, fishSpeed, fishColor) {
			this.width = 600;
			this.height = 500;
			this.x = canvas.width() / 2 - this.width / 2;
			this.y = canvas.height() / 2 - this.height / 2;
			this.bgColor = "White";
			this.timer = 30;
			this.intro = false;
			this.outro = false;
			this.highestScore = 0;
			this.loopSpeed = 200;
			this.timerSpeed = 1000;

			this.playerWidth = 80;
			this.playerHeight = 30;
			this.playerX = canvas.width() / 2 - this.playerWidth / 2;
			this.playerY = 515;
			this.playerSpeed = 12;
			this.playerColor = "Black";
			this.playerScore = 0;

			this.fishWidth = fishWidth;
			this.fishHeight = fishHeight;
			this.fishX = fishX;
			this.fishY = fishY;
			this.fishSpeed = fishSpeed;
			this.fishColor = fishColor;	
			this.fishs = [];
		}

		addFish() {
			setTimeout(function loop(){
				this.random = Math.floor(Math.random() * 7);
				switch(this.random) {
					case 0:
					if(!puzzle.pause) {
						puzzle.puzzleFishing.fishs.push(new PuzzleFishing(Math.floor((Math.random() * 500) + 200), 50, 25, 25, 5, "Green"));
					}
					break;
					case 1:
					if(!puzzle.pause) {
						puzzle.puzzleFishing.fishs.push(new PuzzleFishing(Math.floor((Math.random() * 500) + 200), 50, 25, 25, 5, "Red"));
					}
					break;
					case 2:
					if(!puzzle.pause) {
						puzzle.puzzleFishing.fishs.push(new PuzzleFishing(Math.floor((Math.random() * 500) + 200), 50, 25, 25, 5, "Blue"));							
					}
					break;
					case 3:
					if(!puzzle.pause) {
						puzzle.puzzleFishing.fishs.push(new PuzzleFishing(Math.floor((Math.random() * 500) + 200), 50, 25, 25, 5, "Pink"));							
					}
					break;
					case 4:
					if(!puzzle.pause) {
						puzzle.puzzleFishing.fishs.push(new PuzzleFishing(Math.floor((Math.random() * 500) + 200), 50, 25, 25, 5, "Orange"));							
					}
					break;
					case 5:
					if(!puzzle.pause) {
						puzzle.puzzleFishing.fishs.push(new PuzzleFishing(Math.floor((Math.random() * 500) + 200), 50, 25, 25, 5, "Purple"));							
					}
					break;
					case 6:
					if(!puzzle.pause) {
						puzzle.puzzleFishing.fishs.push(new PuzzleFishing(Math.floor((Math.random() * 500) + 200), 50, 25, 25, 5, "Silver"));
					}
					break;
					case 7:
					if(!puzzle.pause) {
						puzzle.puzzleFishing.fishs.push(new PuzzleFishing(Math.floor((Math.random() * 500) + 200), 50, 25, 25, 5, "Gray"));
					}
					break;						
				}
				setTimeout(loop, puzzle.puzzleFishing.loopSpeed);
			}, puzzle.puzzleFishing.loopSpeed)
		}

		movePlayer() {
			if(puzzle.playerMoveLeft && this.playerX >= 215) {
				this.playerX -= this.playerSpeed;
			} else if(puzzle.playerMoveRight && this.playerX <= 700) {
				this.playerX += this.playerSpeed;
			}
		}

		updateFish() {
			for(var i = 0; i < this.fishs.length; i++) {
				this.currentFish = this.fishs[i];
				this.currentFish.fishY += this.currentFish.fishSpeed;

				if(this.currentFish.fishY + this.currentFish.fishHeight >= this.playerY &&
					this.currentFish.fishY <= this.playerY + this.playerHeight &&
					this.currentFish.fishX + this.currentFish.fishWidth >= this.playerX &&
					this.currentFish.fishX <= this.playerX + this.playerWidth) {
					this.playerScore += 10;
				this.fishs.splice(this.fishs.indexOf(this.currentFish), 1);				
			}

			if(this.currentFish.fishY + this.currentFish.fishHeight >= 550) {
				this.fishs.splice(this.fishs.indexOf(this.currentFish), 1);
			}
		}
	}

	time() {
		setTimeout(function interval(){
			if(!puzzle.pause) {
				puzzle.puzzleFishing.timer -= 1;
			}
			if(puzzle.puzzleFishing.timer <= 0) {
				puzzle.puzzleFishing.gameOver();
			}
			setTimeout(interval, puzzle.puzzleFishing.timerSpeed);
		}, puzzle.puzzleFishing.timerSpeed)
	}

	gameOver() {
		if(this.playerScore > puzzle.highestScoreFishing) {
			puzzle.highestScoreFishing = this.playerScore;
		}
		this.fishs = [];
		this.outro = true;
		this.loopSpeed = 6000000;
		this.timerSpeed = 6000000;
	}

	exit() {
		puzzle.puzzleFishing = new PuzzleFishing();
		npc.array[4].message = "Obrigado, " + player.name + "! Pegamos muitos peixes hoje. Vamos continuar?";
		player.levelUp(Math.floor(this.playerScore / 10));
		puzzle.isOn = false;
	}  				

	draw() {
		DrawRect(this.bgColor, this.x, this.y, this.width, this.height);
		if(this.intro) {
			ctx.fillStyle = "Red";
			ctx.font = "50px Cursive";
			ctx.textAlign = "center";
			ctx.fillText("Pegue os peixes!", canvas.width() / 2, 100);
			ctx.fillStyle = "Black";
			ctx.font = "30px Cursive";
			ctx.fillText("Pegue o maior número de peixes", canvas.width() / 2, 170);
			ctx.fillText("possível antes que o tempo termine", canvas.width() / 2, 210);
			ctx.fillText("bloqueando-os com o bloco inferior", canvas.width() / 2, 250);
			ctx.fillStyle = "Red";
			ctx.font = "40px Cursive";
			ctx.fillText("Comandos", canvas.width() / 2, 330);
			ctx.font = "28px Cursive";
			ctx.fillStyle = "Black";
			ctx.fillText("Movimentação: seta esquerda e seta direita", canvas.width() / 2, 370);			
			ctx.fillStyle = "Red";
			ctx.fillText("Pressione P para pausar o jogo", canvas.width() / 2, 400);
			ctx.font = "40px Cursive";
			ctx.fillText("Deseja jogar?", canvas.width() / 2, 450);
			ctx.fillStyle = "Green";
			ctx.font = "30px Cursive";
			ctx.fillText("Sim (ENTER)", canvas.width() / 2, 500);
			ctx.fillStyle = "Red";
			ctx.font = "30px Cursive";				
			ctx.fillText("Não (ESC)", canvas.width() / 2, 540);
			ctx.textAlign = "start";				
		} else if(this.outro) {
			ctx.fillStyle = "Red";
			ctx.font = "40px Cursive";
			ctx.textAlign = "center";
			ctx.fillStyle = "Red";
			ctx.fillText("Pressione ESC para sair", canvas.width() / 2, 500);
			if(this.playerScore > puzzle.highestScoreFishing) {
				ctx.fillStyle = "Red";
				ctx.fillText("Parabéns!!!", canvas.width() / 2, 100);
				ctx.fillText("Você quebrou seu recorde!", canvas.width() / 2, 150);
				ctx.fillStyle = "Black"
				ctx.fillText("Pontuação final: " + this.playerScore, canvas.width() / 2, 200);
				ctx.font = "30px Cursive";
				ctx.fillStyle = "Green";
				ctx.fillText("Seu novo recorde: " + this.playerScore, 360, 300);
				ctx.fillText("Você recebeu " + this.playerScore / 10 + " pontos de experiência", 480, 340);
			} else {
				ctx.fillStyle = "Red";
				ctx.fillText("Pontuação final: " + this.playerScore, canvas.width() / 2, 100);
				ctx.fillStyle = "Black";
				ctx.font = "30px Cursive";
				ctx.fillText("Seu recorde atual é: " + puzzle.highestScoreFishing, 390, 200);
				ctx.fillStyle = "Green";
				ctx.fillText("Você recebeu " + this.playerScore / 10 + " pontos de experiência", 490, 240);					
			}	
		} else {			
			ctx.fillStyle = "Black";
			ctx.font = "30px Cursive";
			ctx.fillStyle = "Red";
			ctx.fillText("Tempo: " + this.timer, 210, this.y + 30);	
			ctx.fillStyle = "Black";
			ctx.fillText("Pontos: " + this.playerScore, 210, this.y + 70);					
			DrawRect(this.playerColor, this.playerX, this.playerY, this.playerWidth, this.playerHeight);
		}
	}

	drawFish() {
		for(var i = 0; i < this.fishs.length; i++) {
			this.currentFish = this.fishs[i];
			if(!this.outro) {
				DrawRect(this.currentFish.fishColor, this.currentFish.fishX, this.currentFish.fishY, this.currentFish.fishWidth, this.currentFish.fishHeight);
			}
		}			
	}
}

class PuzzlePong {
	constructor() {
		this.width = 600;
		this.height = 500;
		this.x = canvas.width() / 2 - this.width / 2;
		this.y = canvas.height() / 2 - this.height / 2;
		this.bgColor = "White";
		this.intro = false;
		this.outro = false;

		this.playerWidth = 30;
		this.playerHeight = 80;
		this.playerX = 205;
		this.playerY = canvas.height() / 2 - this.playerHeight / 2;
		this.playerSpeed = 19;			
		this.playerScore = 0;

		this.ballSize = 20;
		this.ballX = canvas.width() / 2 - this.ballSize / 2;
		this.ballY = canvas.height() / 2 - this.ballSize / 2;
		this.ballColor = "Black";			
		this.ballSpeedX = 5;
		this.ballSpeedY = 5;
		this.ballDirectionX = Math.floor(Math.random() * 2);
		this.ballDirectionY = Math.floor(Math.random() * 2);

		this.enemyWidth = 40;
		this.enemyHeight = 500;
		this.enemyX = 765;
		this.enemyY = 50;
	}

	movePlayer() {
		if(puzzle.playerMoveUp && this.playerY >= 60) {
			this.playerY -= this.playerSpeed;
		} else if(puzzle.playerMoveDown && this.playerY + this.playerHeight <= 540) {
			this.playerY += this.playerSpeed;
		}
	}

	moveBall() {
		if(this.ballDirectionX == 0) {
			this.ballX -= this.ballSpeedX;				
		} else {
			this.ballX += this.ballSpeedX;				
		}
		if(this.ballDirectionY == 0) {
			this.ballY -= this.ballSpeedY;
		} else {
			this.ballY += this.ballSpeedY;
		}
	}

	colide() {
		if(this.ballY <= 50) {
			this.ballDirectionY = 1;
		} else if(this.ballY + this.ballSize >= 550) {
			this.ballDirectionY = 0;
		}

		if(this.ballX <= this.playerX + this.playerWidth &&
			this.ballX + this.ballSize >= this.playerX &&
			this.ballY <= this.playerY + this.playerHeight &&
			this.ballY + this.ballSize >= this.playerY) {
			this.ballDirectionX = 1;
		this.ballDirectionY = Math.floor(Math.random() * 2);
		this.ballSpeedY = Math.floor(Math.random() * 10);		
		this.ballSpeedX += 2;
		this.playerScore += 10;
	} 
	if(this.ballX <= this.enemyX + this.enemyWidth &&
		this.ballX + this.ballSize >= this.enemyX &&
		this.ballY <= this.enemyY + this.enemyHeight &&
		this.ballY + this.ballSize >= this.enemyY) {
		this.ballDirectionX = 0;
		this.ballDirectionY = Math.floor(Math.random() * 2);
		this.ballSpeedY = Math.floor(Math.random() * 10);
}
if(this.ballX <= 205) {		
	this.gameOver();
}			
}

gameOver() {
	this.outro = true;
}

exit() {
	if(this.playerScore > puzzle.highestScorePong) {
		puzzle.highestScorePong = this.playerScore;
	}				
	puzzle.isOn = false;			
	npc.array[0].message = "Valeu, " + player.name + "! Foi muito divertido. Quer jogar de novo?";
	player.levelUp(Math.floor(this.playerScore / 2));
	puzzle.puzzlePong = new PuzzlePong();
}

draw() {
	DrawRect(this.bgColor, this.x, this.y, this.width, this.height);
	if(this.intro) {
		ctx.fillStyle = "Red";
		ctx.font = "50px Cursive";
		ctx.textAlign = "center";
		ctx.fillText("Partida de Ping Pong", canvas.width() / 2, 100);
		ctx.fillStyle = "Black";
		ctx.font = "30px Cursive";
		ctx.fillText("Evite que com que a bola alcance", canvas.width() / 2, 170);
		ctx.fillText("a margem esquerda do quadro branco", canvas.width() / 2, 210);
		ctx.fillText("bloqueando-a com o bloco da esquerda", canvas.width() / 2, 250);
		ctx.fillStyle = "Red";
		ctx.font = "40px Cursive";
		ctx.fillText("Comandos", canvas.width() / 2, 330);
		ctx.font = "30px Cursive";
		ctx.fillStyle = "Black";
		ctx.fillText("Movimentação: seta cima e seta baixo", canvas.width() / 2, 370);
		ctx.fillStyle = "Red";
		ctx.fillText("Pressione P para pausar o jogo", canvas.width() / 2, 400);
		ctx.font = "40px Cursive";
		ctx.fillText("Deseja jogar?", canvas.width() / 2, 450);
		ctx.fillStyle = "Green";
		ctx.font = "30px Cursive";
		ctx.fillText("Sim (ENTER)", canvas.width() / 2, 500);
		ctx.fillStyle = "Red";
		ctx.font = "30px Cursive";				
		ctx.fillText("Não (ESC)", canvas.width() / 2, 540);
		ctx.textAlign = "start";
	} else if(this.outro) {
		ctx.fillStyle = "Red";
		ctx.font = "40px Cursive";
		ctx.textAlign = "center";
		ctx.fillStyle = "Red";
		ctx.fillText("Pressione ESC para sair", canvas.width() / 2, 500);
		if(this.playerScore > puzzle.highestScorePong) {
			ctx.fillStyle = "Red";
			ctx.fillText("Parabéns!!!", canvas.width() / 2, 100);
			ctx.fillText("Você quebrou seu recorde!", canvas.width() / 2, 150);
			ctx.fillStyle = "Black"
			ctx.fillText("Pontuação final: " + this.playerScore, canvas.width() / 2, 200);
			ctx.font = "30px Cursive";
			ctx.fillStyle = "Green";
			ctx.fillText("Seu novo recorde: " + this.playerScore, 360, 300);
			ctx.fillText("Você recebeu " + this.playerScore / 2 + " pontos de experiência", 480, 340);
		} else {
			ctx.fillStyle = "Red";
			ctx.fillText("Pontuação final: " + this.playerScore, canvas.width() / 2, 100);
			ctx.fillStyle = "Black";
			ctx.font = "30px Cursive";
			ctx.fillText("Seu recorde atual é: " + puzzle.highestScorePong, 370, 200);
			ctx.fillStyle = "Green";
			ctx.fillText("Você recebeu " + this.playerScore / 2 + " pontos de experiência", 470, 240);					
		}
	} else {
		ctx.fillStyle = "Black";
		ctx.font = "30px Cursive";
		ctx.fillText("Pontos: " + this.playerScore, 250, this.y + 30);
		RenderImage(img.blue_puzzle_player_vertical,this.playerX, this.playerY, this.playerWidth, this.playerHeight);
		RenderImage(img.ball_puzzle, this.ballX, this.ballY, this.ballSize, this.ballSize);
		RenderImage(img.red_puzzle_player_vertical, this.enemyX, this.enemyY, this.enemyWidth, this.enemyHeight);
	}
}			
}

class PuzzleFlappyBird {
	constructor(pillarColor, pillarX, pillarY, pillarWidth, pillarHeight) {
		this.width = 1000;
		this.height = 600;
		this.x = canvas.width() / 2 - this.width / 2;
		this.y = canvas.height() / 2 - this.height / 2;
		this.bgColor = "White";
		this.intro = false;
		this.outro = false;
		this.spawnSpeed = 300;

		this.playerColor = "Black";
		this.playerSize = 15;
		this.playerX = 150;
		this.playerY = canvas.height() / 2 - this.playerSize / 2;
		this.playerGravityForce = 0.4;
		this.playerLift = -17;
		this.playerSpeed = 0;
		this.playerJumping = false;
		this.playerScore = 0;

		this.pillarSpeed = 5;
		this.pillarColor = pillarColor;
		this.pillarX = pillarX;
		this.pillarY = pillarY;
		this.pillarWidth = pillarWidth;
		this.pillarHeight = pillarHeight;
		this.pillars = [];
	}

	draw() {
		DrawRect(this.bgColor, this.x, this.y, this.width, this.height);
		if(this.intro) {
			ctx.fillStyle = "Red";
			ctx.font = "50px Cursive";
			ctx.textAlign = "center";
			ctx.fillText("Jogar Flappy Bird", canvas.width() / 2, 100);
			ctx.fillStyle = "Black";
			ctx.font = "30px Cursive";
			ctx.fillText("Pressione a seta para cima constantemente", canvas.width() / 2, 170);
			ctx.fillText("fazendo o passáro pular e não tocar nos pilares", canvas.width() / 2, 210);
			ctx.fillText("caso ele toque em algum pilar você perde!", canvas.width() / 2, 250);
			ctx.fillStyle = "Red";
			ctx.font = "40px Cursive";
			ctx.fillText("Comandos", canvas.width() / 2, 330);
			ctx.font = "28px Cursive";
			ctx.fillStyle = "Black";
			ctx.fillText("Pular: seta para cima", canvas.width() / 2, 370);
			ctx.fillStyle = "Red";
			ctx.fillText("Pressione P para pausar o jogo", canvas.width() / 2, 400);
			ctx.font = "40px Cursive";
			ctx.fillText("Deseja jogar?", canvas.width() / 2, 450);
			ctx.fillStyle = "Green";
			ctx.font = "30px Cursive";
			ctx.fillText("Sim (ENTER)", canvas.width() / 2, 500);
			ctx.fillStyle = "Red";
			ctx.font = "30px Cursive";				
			ctx.fillText("Não (ESC)", canvas.width() / 2, 540);
			ctx.textAlign = "start";
		} else if(this.outro) {
			ctx.fillStyle = "Red";
			ctx.font = "40px Cursive";
			ctx.textAlign = "center";
			ctx.fillStyle = "Red";
			ctx.fillText("Pressione ESC para sair", canvas.width() / 2, 500);
			if(this.playerScore > puzzle.highestScoreFlappyBird) {
				ctx.fillStyle = "Red";
				ctx.fillText("Parabéns!!!", canvas.width() / 2, 100);
				ctx.fillText("Você quebrou seu recorde!", canvas.width() / 2, 150);
				ctx.fillStyle = "Black"
				ctx.fillText("Pontuação final: " + Math.floor(this.playerScore), canvas.width() / 2, 200);
				ctx.font = "30px Cursive";
				ctx.fillStyle = "Green";
				ctx.fillText("Seu novo recorde: " + Math.floor(this.playerScore), 360, 300);
				ctx.fillText("Você recebeu " + Math.floor(this.playerScore / 2) + " pontos de experiência", 480, 340);
			} else {
				ctx.fillStyle = "Red";
				ctx.fillText("Pontuação final: " + Math.floor(this.playerScore), canvas.width() / 2, 100);
				ctx.fillStyle = "Black";
				ctx.font = "30px Cursive";
				ctx.fillText("Seu recorde atual é: " + Math.floor(puzzle.highestScoreFlappyBird), 370, 200);
				ctx.fillStyle = "Green";
				ctx.fillText("Você recebeu " + Math.floor(this.playerScore / 3) + " pontos de experiência", 470, 240);					
			}
		} else {			
			DrawRect(this.playerColor, this.playerX, this.playerY, this.playerSize, this.playerSize);
			for(var i = 0; i < this.pillars.length; i++) {
				this.currentPillar = this.pillars[i];
				DrawRect(this.currentPillar.pillarColor, this.currentPillar.pillarX, this.currentPillar.pillarY, this.currentPillar.pillarWidth, this.currentPillar.pillarHeight);
			}
			ctx.font = "30px Cursive";
			ctx.fillStyle = "Red";
			ctx.fillText("Pontos: " + Math.floor(this.playerScore), 20, 40);
		}
	}

	scoring() {
		if(!this.outro && !puzzle.pause) {
			this.playerScore += 0.1;
		}
	}

	jump() {
		if(this.playerJumping && this.playerY >= 43) {
			this.playerSpeed += this.playerLift;
			this.playerSpeed *= 0.3;
		}
		this.playerJumping = false;
	}

	gravity() {
		if(this.playerY + this.playerSize) {
			this.playerSpeed += this.playerGravityForce;
			this.playerY += this.playerSpeed;
		}
	}

	colide() {
		if(this.playerY + this.playerSize >= canvas.height()) {
			this.playerY = canvas.height() - this.playerSize;
		}

		for(var i = 0; i < this.pillars.length; i++) {
			this.currentPillar = this.pillars[i];
			if(this.playerX + this.playerSize >= this.currentPillar.pillarX &&
				this.playerX <= this.currentPillar.pillarX + this.currentPillar.pillarWidth &&
				this.playerY + this.playerSize >= this.currentPillar.pillarY &&
				this.playerY <= this.currentPillar.pillarY + this.currentPillar.pillarHeight) {
				this.gameOver();		
		}
	}
}		

addPillars() {
	setTimeout(function interval(){
		if(!puzzle.pause) {
			puzzle.puzzleFlappyBird.pillars.push(new PuzzleFlappyBird("Black", canvas.width(), 0, 50, puzzle.puzzleFlappyBird.randomNumber(260, 220)));
			puzzle.puzzleFlappyBird.pillars.push(new PuzzleFlappyBird("Black", canvas.width(), puzzle.puzzleFlappyBird.randomNumber(320, 360), 50, 600));
		}
		setTimeout(interval, puzzle.puzzleFlappyBird.spawnSpeed);			
	}, puzzle.puzzleFlappyBird.spawnSpeed)
}

movePillar() {
	for(var i = 0; i < this.pillars.length; i++) {
		this.currentPillar = this.pillars[i];
		this.currentPillar.pillarX -= this.pillarSpeed;
	}
}

randomNumber(max, min) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

gameOver() {
	this.pillars = [];
	this.outro = true;
	this.spawnSpeed = 6000000;	
}	

exit() {
	if(this.playerScore > puzzle.highestScoreFlappyBird) {
		puzzle.highestScoreFlappyBird = Math.floor(this.playerScore);
	}
	puzzle.puzzleFlappyBird = new PuzzleFlappyBird();
	puzzle.isOn = false;
	npc.array[1].message = "Valeu, " + player.name + "! Foi muito divertido.";
	player.levelUp(Math.floor(this.playerScore / 3));
}
}

class PuzzleBreakout {
	constructor(enemyX, enemyY, enemyWidth, enemyHeight) {
		this.width = 800;
		this.height = 500;
		this.x = canvas.width() / 2 - this.width / 2;
		this.y = canvas.height() / 2 - this.height / 2;
		this.bgColor = "White";
		this.intro = false;
		this.outro = false;

		this.playerWidth = 80;
		this.playerHeight = 30;
		this.playerX = canvas.width() / 2 - this.playerWidth / 2;
		this.playerY = 510;
		this.playerColor = "Black";			
		this.playerSpeed = 12;
		this.playerScore = 0;

		this.enemyWidth = enemyWidth;
		this.enemyHeight = enemyHeight;
		this.enemyX = enemyX;
		this.enemyY = enemyY;
		this.enemies = [];	

		this.ballWidth = 13;
		this.ballHeight = 13;
		this.ballX = canvas.width() / 2 - this.ballWidth / 2;
		this.ballY = 350;
		this.ballSpeedY = 5;
		this.ballSpeedX = 3;
		this.ballColor = "Black";
		this.ballDirectionX = null;
		this.ballDirectionY = 1;				
	}

	draw() {
		DrawRect(this.bgColor, this.x, this.y, this.width, this.height);
		if(this.intro) {
			ctx.fillStyle = "Red";
			ctx.font = "50px Cursive";
			ctx.textAlign = "center";
			ctx.fillText("Jogar Breakout", canvas.width() / 2, 100);
			ctx.fillStyle = "Black";
			ctx.font = "30px Cursive";
			ctx.fillText("Evite com que a bola colida com a margem inferior", canvas.width() / 2, 170);
			ctx.fillText("bloqueando-a com seu bloco e ao mesmo tempo", canvas.width() / 2, 210);
			ctx.fillText("quebre todos os blocos", canvas.width() / 2, 250);
			ctx.fillStyle = "Red";
			ctx.font = "40px Cursive";
			ctx.fillText("Comandos", canvas.width() / 2, 330);
			ctx.font = "28px Cursive";
			ctx.fillStyle = "Black";
			ctx.fillText("Movimentação: seta esquerda e seta direita", canvas.width() / 2, 370);
			ctx.fillStyle = "Red";
			ctx.fillText("Pressione P para pausar o jogo", canvas.width() / 2, 400);
			ctx.font = "40px Cursive";
			ctx.fillText("Deseja jogar?", canvas.width() / 2, 450);
			ctx.fillStyle = "Green";
			ctx.font = "30px Cursive";
			ctx.fillText("Sim (ENTER)", canvas.width() / 2, 500);
			ctx.fillStyle = "Red";
			ctx.font = "30px Cursive";				
			ctx.fillText("Não (ESC)", canvas.width() / 2, 540);
			ctx.textAlign = "start";
		} else if(this.outro) { 
			ctx.fillStyle = "Red";
			ctx.font = "40px Cursive";
			ctx.textAlign = "center";
			ctx.fillStyle = "Red";
			ctx.fillText("Pressione ESC para sair", canvas.width() / 2, 500);
			if(this.playerScore > puzzle.highestScoreBreakout) {
				ctx.fillStyle = "Red";
				ctx.fillText("Parabéns!!!", canvas.width() / 2, 100);
				ctx.fillText("Você quebrou seu recorde!", canvas.width() / 2, 150);
				ctx.fillStyle = "Black"
				ctx.fillText("Pontuação final: " + this.playerScore, canvas.width() / 2, 200);
				ctx.font = "30px Cursive";
				ctx.fillStyle = "Green";
				ctx.fillText("Seu novo recorde: " + this.playerScore, 360, 300);
				ctx.fillText("Você recebeu " + Math.floor(this.playerScore / 3) + " pontos de experiência", 480, 340);
			} else {
				ctx.fillStyle = "Red";
				ctx.fillText("Pontuação final: " + this.playerScore, canvas.width() / 2, 100);
				ctx.fillStyle = "Black";
				ctx.font = "30px Cursive";
				ctx.fillText("Seu recorde atual é: " + puzzle.highestScoreBreakout, 390, 200);
				ctx.fillStyle = "Green";
				ctx.fillText("Você recebeu " + this.playerScore / 10 + " pontos de experiência", 490, 240);					
			}				
		} else {
			ctx.font = "25px Cursive";
			ctx.fillStyle = "Red";
			ctx.fillText("Pontos: " + this.playerScore, 110, 80);
			RenderImage(img.blue_puzzle_player_horizontal, this.playerX, this.playerY, this.playerWidth, this.playerHeight);
			RenderImage(img.ball_puzzle, this.ballX, this.ballY, this.ballWidth, this.ballHeight);
			for(var i = 0; i < this.enemies.length; i++) {
				this.currentEnemy = this.enemies[i];
				RenderImage(img.red_puzzle_player_horizontal,this.currentEnemy.enemyX, this.currentEnemy.enemyY, this.currentEnemy.enemyWidth, this.currentEnemy.enemyHeight);
			}
		}
	}

	movePlayer() {
		if(puzzle.playerMoveLeft && this.playerX >= 110) {
			this.playerX -= this.playerSpeed;
		} else if(puzzle.playerMoveRight && this.playerX <= 810) {
			this.playerX += this.playerSpeed;
		}
	}

	moveBall() {
		if(this.ballDirectionY == 1) {
			this.ballY += this.ballSpeedY;
		} else {
			this.ballY -= this.ballSpeedY;
		}

		if(this.ballDirectionX == 1) {
			this.ballX += this.ballSpeedX;
		} else if(this.ballDirectionX == 0) {
			this.ballX -= this.ballSpeedX;
		}
	}

	ballColidePlayer() {
		if(this.ballY + this.ballHeight >= this.playerY &&
			this.ballY <= this.playerY + this.playerHeight &&
			this.ballX + this.ballWidth >= this.playerX &&
			this.ballX <= this.playerX + this.playerWidth) {
			this.ballDirectionY = 0;
		if(this.ballDirectionX == null) {
			this.ballDirectionX = Math.floor(Math.random() * 2);
		}
	}
}

ballColideEnemy() {
	for(var i = 0; i < this.enemies.length; i++) {
		this.currentEnemy = this.enemies[i];

		if(this.ballY <= this.currentEnemy.enemyY + this.currentEnemy.enemyHeight &&
			this.ballY + this.ballHeight >= this.currentEnemy.enemyY &&
			this.ballX <= this.currentEnemy.enemyX + this.currentEnemy.enemyWidth &&
			this.ballX + this.ballWidth >= this.currentEnemy.enemyX) {
			this.enemies.splice(this.enemies.indexOf(this.currentEnemy), 1);
		if(this.enemies.length <= 0) {
			this.gameOver();
		}
		this.playerScore += 10;
		this.ballSpeedY += Math.floor((Math.random() * 5) + 2) * 10 / 100;
		this.ballSpeedX += Math.floor((Math.random() * 3) + 2) * 10 / 100;
		if(this.ballY < this.currentEnemy.enemyY) {
			this.ballDirectionY = 0;
		} else if(this.ballY > this.currentEnemy.enemyY) {
			this.ballDirectionY = 1;
		}				
	}
}
}

ballColideWalls() {
	if(this.ballX <= 100) {
		this.ballDirectionX = 1;
	} else if(this.ballX + this.ballWidth >= 900) {
		this.ballDirectionX = 0;
	}

	if(this.ballY <= 55) {
		this.ballDirectionY = 1;
	}

	if(this.ballY + this.ballHeight >= 550) {
		this.gameOver();
	}
}		

addEnemies() {
	for(var i = 0; i < 28; i++) {			
		if(i <= 6) {
			this.enemies.push(new PuzzleBreakout(100 * (i + 1) + 60, 100, 80, 30));
		} else if(i > 6 && i <= 13) {
			this.enemies.push(new PuzzleBreakout(100 * (i - 7 + 1) + 60, 140, 80, 30));
		} else if(i > 13 && i <= 20) {
			this.enemies.push(new PuzzleBreakout(100 * (i - 14 + 1) + 60, 180, 80, 30));
		} else {
			this.enemies.push(new PuzzleBreakout(100 * (i - 21 + 1) + 60, 220, 80, 30));
		}
	}
}

gameOver() {
	this.outro = true;			
}

exit() {
	if(this.playerScore > puzzle.highestScoreBreakout) {
		puzzle.highestScoreBreakout = this.playerScore;
	}			
	puzzle.isOn = false;
	npc.array[1].message = "Valeu, " + player.name + "! Foi muito divertido.";
	player.levelUp(Math.floor(this.playerScore / 3));
	puzzle.puzzleBreakout = new PuzzleBreakout();
}		
}

class PuzzleGuitarHero {
	constructor(playerColor, playerX, tileColor, tileX, tileY) {
		this.width = 800;
		this.height = 600;
		this.x = canvas.width() / 2 - this.width / 2;
		this.y = canvas.height() / 2 - this.height / 2;
		this.bgColor = "White";
		this.intro = false;
		this.outro = false;

		this.playerX = playerX;
		this.playerY = 500;
		this.playerWidth = 50;
		this.playerHeight = 50;
		this.playerColor = playerColor;
		this.playerScore = 0;

		this.tileHeight = 50;
		this.tileWidth = 50;
		this.tileX = tileX;
		this.tileY = tileY;
		this.tileColor = tileColor;
		this.tilesArray = [];
		this.tileSpeed = 5;
		this.tilesQuantity = 50;
		this.spawnSpeed = 400;		

		this.controllers = [];
		this.controlRed = this.controlBlue = this.controlGreen = this.controlPurple = false;
		this.qIsDown = this.wIsDown = this.eIsDown = this.rIsDown = false;						
	}

	addControllers() {
		this.controllers.push(new PuzzleGuitarHero("Red", 325));
		this.controllers.push(new PuzzleGuitarHero("Blue", 425));
		this.controllers.push(new PuzzleGuitarHero("Green", 525));
		this.controllers.push(new PuzzleGuitarHero("Purple", 625));
	}

	pressKey() {
		for(var i = 0; i < this.tilesArray.length; i++) {
			this.currentTile = this.tilesArray[i];

			for(var j = 0; j < this.controllers.length; j++) {
				this.currentController = this.controllers[j];

				if(this.currentTile.tileY + this.tileHeight >= this.playerY &&
					this.currentTile.tileY <= this.playerY + this.playerHeight) {

					if(this.currentController.playerColor == "Red" && 
						puzzle.controlRed &&
						this.currentTile.tileColor == "Red") {
						this.playerScore += 5;
					this.tilesArray.splice(this.tilesArray.indexOf(this.currentTile), 1);						
				} else if(this.currentController.playerColor == "Blue" && 
					puzzle.controlBlue &&
					this.currentTile.tileColor == "Blue") {
					this.playerScore += 5;
					this.tilesArray.splice(this.tilesArray.indexOf(this.currentTile), 1);
				} else if(this.currentController.playerColor == "Green" && 
					puzzle.controlGreen &&
					this.currentTile.tileColor == "Green") {
					this.playerScore += 5;
					this.tilesArray.splice(this.tilesArray.indexOf(this.currentTile), 1);
				} else if(this.currentController.playerColor == "Purple" && 
					puzzle.controlPurple &&
					this.currentTile.tileColor == "Purple") {
					this.playerScore += 5;
					this.tilesArray.splice(this.tilesArray.indexOf(this.currentTile), 1);
				}
			}
		}			
	}
	puzzle.controlRed = false;
	puzzle.controlBlue = false;
	puzzle.controlGreen = false;
	puzzle.controlPurple = false;
}		

addTiles() {
	setTimeout(function interval() {
		this.random = Math.floor((Math.random() * 4) + 1);
		switch(random) {
			case 1:
			if(!puzzle.pause) {
				puzzle.puzzleGuitarHero.tilesArray.push(new PuzzleGuitarHero(null, null, "Red", 325, 0));
			}
			break;
			case 2:
			if(!puzzle.pause) {
				puzzle.puzzleGuitarHero.tilesArray.push(new PuzzleGuitarHero(null, null, "Blue", 425, 0));
			}					
			break;
			case 3:
			if(!puzzle.pause) {
				puzzle.puzzleGuitarHero.tilesArray.push(new PuzzleGuitarHero(null, null, "Green", 525, 0));
			}					
			break;
			case 4:
			if(!puzzle.pause) {
				puzzle.puzzleGuitarHero.tilesArray.push(new PuzzleGuitarHero(null, null, "Purple", 625, 0)); 
			}
			break;
		}
		if(!puzzle.pause) {
			puzzle.puzzleGuitarHero.tilesQuantity--;
		}
		if(puzzle.puzzleGuitarHero.tilesQuantity <= 0) {
			puzzle.puzzleGuitarHero.gameOver();
		}
		setTimeout(interval, puzzle.puzzleGuitarHero.spawnSpeed);
	}, puzzle.puzzleGuitarHero.spawnSpeed)
}

moveTiles() {
	for(var i = 0; i < this.tilesArray.length; i++) {
		this.currentTile = this.tilesArray[i];
		this.currentTile.tileY += this.tileSpeed;
		if(this.currentTile.tileY >= 560) {					
			this.tilesArray.splice(this.tilesArray.indexOf(this.currentTile), 1);
		}
	}
}		

gameOver() {
	this.tilesArray = [];
	this.outro = true;
	this.spawnSpeed = 6000000;
}

exit() {
	if(this.playerScore > puzzle.highestScoreGuitarHero) {
		puzzle.highestScoreGuitarHero = this.playerScore;
	}
	puzzle.isOn = false;
	npc.array[4].message = "Valeu, " + player.name + "! Quer praticar mais um pouco?";
	player.levelUp(Math.floor(this.playerScore / 2));
	puzzle.puzzleGuitarHero = new PuzzleGuitarHero();				
}		

draw() {
	DrawRect(this.bgColor, this.x, this.y, this.width, this.height);
	if(this.intro) {
		ctx.fillStyle = "Red";
		ctx.font = "50px Cursive";
		ctx.textAlign = "center";
		ctx.fillText("Praticando violão!", canvas.width() / 2, 100);
		ctx.fillStyle = "Black";
		ctx.font = "30px Cursive";
		ctx.fillText("Evite com que os blocos alcancem a margem inferior,", canvas.width() / 2, 170);
		ctx.fillText("pressionando a tecla correspondente quando os blocos", canvas.width() / 2, 210);
		ctx.fillText("em movimento estiverem acima dos blocos inferiores", canvas.width() / 2, 250);
		ctx.fillStyle = "Red";
		ctx.font = "40px Cursive";
		ctx.fillText("Comandos", canvas.width() / 2, 330);
		ctx.font = "28px Cursive";
		ctx.fillStyle = "Black";
		ctx.fillText("Ações: Z para o bloco Vermelho, X para o bloco Azul,", canvas.width() / 2, 360);
		ctx.fillText("C para o bloco Verde e V para o bloco Roxo", canvas.width() / 2, 390);
		ctx.fillStyle = "Red";
		ctx.fillText("Pressione P para pausar o jogo", canvas.width() / 2, 420);
		ctx.font = "40px Cursive";
		ctx.fillText("Deseja jogar?", canvas.width() / 2, 490);
		ctx.fillStyle = "Green";
		ctx.font = "30px Cursive";
		ctx.fillText("Sim (ENTER)", canvas.width() / 2, 540);
		ctx.fillStyle = "Red";
		ctx.font = "30px Cursive";				
		ctx.fillText("Não (ESC)", canvas.width() / 2, 580);
		ctx.textAlign = "start";
	} else if(this.outro) {
		ctx.fillStyle = "Red";
		ctx.font = "40px Cursive";
		ctx.textAlign = "center";
		ctx.fillStyle = "Red";
		ctx.fillText("Pressione ESC para sair", canvas.width() / 2, 500);
		if(this.playerScore > puzzle.highestScoreGuitarHero) {
			ctx.fillStyle = "Red";
			ctx.fillText("Parabéns!!!", canvas.width() / 2, 100);
			ctx.fillText("Você quebrou seu recorde!", canvas.width() / 2, 150);
			ctx.fillStyle = "Black"
			ctx.fillText("Pontuação final: " + Math.floor(this.playerScore), canvas.width() / 2, 200);
			ctx.font = "30px Cursive";
			ctx.fillStyle = "Green";
			ctx.fillText("Seu novo recorde: " + Math.floor(this.playerScore), 360, 300);
			ctx.fillText("Você recebeu " + Math.floor(this.playerScore / 2) + " pontos de experiência", 480, 340);
		} else {
			ctx.fillStyle = "Red";
			ctx.fillText("Pontuação final: " + Math.floor(this.playerScore), canvas.width() / 2, 100);
			ctx.fillStyle = "Black";
			ctx.font = "30px Cursive";
			ctx.fillText("Seu recorde atual é: " + Math.floor(puzzle.highestScoreGuitarHero), 370, 200);
			ctx.fillStyle = "Green";
			ctx.fillText("Você recebeu " + Math.floor(this.playerScore / 2) + " pontos de experiência", 470, 240);					
		}
	} else {
		ctx.font = "30px Cursive";
		ctx.fillStyle = "Red";
		ctx.fillText("Pontos: " + this.playerScore, 200, 30);
		ctx.fillText("Notas restantes: " + this.tilesQuantity, 600, 30);
		ctx.beginPath();
		ctx.moveTo(350, 0);
		ctx.lineTo(350, 600);
		ctx.moveTo(450, 0);
		ctx.lineTo(450, 600);
		ctx.moveTo(550, 0);
		ctx.lineTo(550, 600);
		ctx.moveTo(650, 0);
		ctx.lineTo(650, 600);				
		ctx.stroke();
		for(var i = 0; i < this.controllers.length; i++) {
			this.currentController = this.controllers[i];
			ctx.fillStyle = this.currentController.playerColor;
			ctx.fillRect(this.currentController.playerX, this.playerY, this.playerWidth, this.playerHeight);
			if(this.currentController.playerColor == "Red") {
				ctx.font = "40px Cursive";
				ctx.fillStyle = "White";
				ctx.fillText("Z", this.currentController.playerX + 10, this.currentController.playerY + 40);
			} else if(this.currentController.playerColor == "Blue") {
				ctx.font = "40px Cursive";
				ctx.fillStyle = "White";
				ctx.fillText("X", this.currentController.playerX + 10, this.currentController.playerY + 40);
			} else if(this.currentController.playerColor == "Green") {
				ctx.font = "40px Cursive";
				ctx.fillStyle = "White";
				ctx.fillText("C", this.currentController.playerX + 10, this.currentController.playerY + 40);
			} else if(this.currentController.playerColor == "Purple") {
				ctx.font = "40px Cursive";
				ctx.fillStyle = "White";
				ctx.fillText("V", this.currentController.playerX + 10, this.currentController.playerY + 40);
			}
		}
		for(var j = 0; j < this.tilesArray.length; j++) {
			this.currentTile = this.tilesArray[j];
			ctx.fillStyle = this.currentTile.tileColor;
			ctx.fillRect(this.currentTile.tileX, this.currentTile.tileY, this.tileWidth, this.tileHeight);
			ctx.font = "40px Cursive";
			ctx.fillStyle = "White";
			ctx.fillText("♫", this.currentTile.tileX + 10, this.currentTile.tileY + 40);
		}				
	}
}
}

class PuzzleMaze {
	constructor() {
		this.width = canvas.width();
		this.height = canvas.height();
		this.x = canvas.width() / 2 - this.width / 2;
		this.y = canvas.height() / 2 - this.height / 2;
		this.bgColor = "White";
		this.intro = false;
		this.timerSpeed = 1000;
		this.timer = 50;

		this.playerSize = 10;
		this.playerX = 10;
		this.playerY = 130;
		this.playerColor = "Red";
		this.playerScore = 1000;
		this.playerSpeed = 3;

		this.tileSize = 23;
		this.map = [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0],
		[0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0],
		[0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1,1,1,1,1,0],
		[1,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,0,0,0,0],
		[1,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0],
		[1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0],
		[0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0],
		[0,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,0,0,1,1,1,1,1,0],
		[0,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,1,1,0,0,0,0,0,1,0],
		[0,1,1,0,1,1,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,1,1,1,0],
		[0,1,0,0,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,0,0,0,0,0,1,0],
		[0,1,1,1,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0],
		[0,0,0,0,0,0,1,0,1,0,1,1,1,0,1,0,1,0,0,0,0,0,1,0,1,0],
		[0,1,1,1,1,1,1,0,1,0,1,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0],
		[0,1,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0],
		[0,1,0,1,1,1,1,1,1,0,1,0,0,0,0,0,1,0,1,1,1,1,1,0,1,0],
		[0,1,0,1,0,0,0,1,0,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1,0],
		[0,1,0,1,1,1,0,1,1,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,0],
		[0,1,0,0,0,1,0,0,1,1,1,0,1,1,1,1,1,0,1,0,0,0,1,0,0,0],
		[0,1,1,1,0,1,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0],
		[0,1,0,1,0,0,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,1],
		[0,1,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1],
		[0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

		this.mapHeight = this.map.length * this.tileSize;
		this.mapWidth = this.map[0].length * this.tileSize;					 
	}

	movePlayer() {
		if(puzzle.playerMoveLeft) {
			this.playerX -= this.playerSpeed;
		} else if(puzzle.playerMoveUp) {
			this.playerY -= this.playerSpeed;
		} else if(puzzle.playerMoveRight) {
			this.playerX += this.playerSpeed;
		} else if(puzzle.playerMoveDown) {
			this.playerY += this.playerSpeed;
		}
		if(this.playerX + this.playerSize >= this.mapWidth + this.playerSize) {
			this.gameOver();
		}
	}

	time() {
		setTimeout(function interval(){
			if(!puzzle.pause) {
				puzzle.puzzleMaze.timer -= 1;
			}				
			if(puzzle.puzzleMaze.playerScore > 150 && !puzzle.pause) {
				puzzle.puzzleMaze.playerScore -= 20;
			}
			if(puzzle.puzzleMaze.timer <= 0) {
				puzzle.puzzleMaze.gameOver();
			}
			setTimeout(interval, puzzle.puzzleMaze.timerSpeed);
		}, puzzle.puzzleMaze.timerSpeed)
	}				

	blockRectangle(tileX, tileY, tileSize) {
		this.distX = (this.playerX + this.playerSize/2) - (tileX + tileSize/2);
		this.distY = (this.playerY + this.playerSize/2) - (tileY + tileSize/2);

		this.sumWidth = (this.playerSize + tileSize)/2;
		this.sumHeight = (this.playerSize + tileSize)/2;

		if(Math.abs(this.distX) < this.sumWidth && Math.abs(this.distY) < this.sumHeight){
			this.overlapX = this.sumWidth - Math.abs(this.distX);
			this.overlapY = this.sumHeight - Math.abs(this.distY);

			if(this.overlapX > this.overlapY){				
				this.playerY = this.distY > 0 ? this.playerY + this.overlapY : this.playerY - this.overlapY;
			} else {
				this.playerX = this.distX > 0 ? this.playerX + this.overlapX : this.playerX - this.overlapX;
			}
		}
	}		

	gameOver() {
		this.map = [];
		this.outro = true;
		this.timerSpeed = 6000000;
		if(this.playerX + this.playerSize < this.mapWidth) {
			this.playerScore = 0;
		}
	}

	exit() {
		if(this.playerScore > puzzle.highestScoreMaze) {
			puzzle.highestScoreMaze = this.playerScore;
		}
		puzzle.isOn = false;
		npc.array[5].message = "Valeu, " + player.name + "! Vamos jogar de novo?";
		player.levelUp(Math.floor(this.playerScore / 15));
		puzzle.puzzleMaze = new PuzzleMaze();				
	}		

	draw() {			
		DrawRect(this.bgColor, this.x, this.y, this.width, this.height);
		if(this.intro) {
			ctx.fillStyle = "Red";
			ctx.font = "50px Cursive";
			ctx.textAlign = "center";
			ctx.fillText("Fuja do labirinto!", canvas.width() / 2, 100);
			ctx.fillStyle = "Black";
			ctx.font = "30px Cursive";
			ctx.fillText("Mova seu personagem e escape do labirinto", canvas.width() / 2, 170);
			ctx.fillText("antes que o tempo acabe, quanto mais rápido", canvas.width() / 2, 210);
			ctx.fillText("você sair, mais pontos receberá", canvas.width() / 2, 250);
			ctx.fillStyle = "Red";
			ctx.font = "40px Cursive";
			ctx.fillText("Comandos", canvas.width() / 2, 330);
			ctx.font = "28px Cursive";
			ctx.fillStyle = "Black";
			ctx.fillText("Movimentação: seta esquerda, cima, direita e baixo", canvas.width() / 2, 370);
			ctx.fillStyle = "Red";
			ctx.fillText("Pressione P para pausar o jogo", canvas.width() / 2, 400);
			ctx.font = "40px Cursive";
			ctx.fillText("Deseja jogar?", canvas.width() / 2, 450);
			ctx.fillStyle = "Green";
			ctx.font = "30px Cursive";
			ctx.fillText("Sim (ENTER)", canvas.width() / 2, 500);
			ctx.fillStyle = "Red";
			ctx.font = "30px Cursive";				
			ctx.fillText("Não (ESC)", canvas.width() / 2, 540);
			ctx.textAlign = "start";				
		} else if(this.outro) {
			ctx.fillStyle = "Red";
			ctx.font = "40px Cursive";
			ctx.textAlign = "center";
			ctx.fillStyle = "Red";
			ctx.fillText("Pressione ESC para sair", canvas.width() / 2, 500);
			if(this.playerScore > puzzle.highestScoreMaze) {
				ctx.fillStyle = "Red";
				ctx.fillText("Parabéns!!!", canvas.width() / 2, 100);
				ctx.fillText("Você quebrou seu recorde!", canvas.width() / 2, 150);
				ctx.fillStyle = "Black"
				ctx.fillText("Pontuação final: " + Math.floor(this.playerScore), canvas.width() / 2, 200);
				ctx.font = "30px Cursive";
				ctx.fillStyle = "Green";
				ctx.fillText("Seu novo recorde: " + Math.floor(this.playerScore), 360, 300);
				ctx.fillText("Você recebeu " + Math.floor(this.playerScore / 15) + " pontos de experiência", 480, 340);
			} else {
				ctx.fillStyle = "Red";
				ctx.fillText("Pontuação final: " + Math.floor(this.playerScore), canvas.width() / 2, 100);
				ctx.fillStyle = "Black";
				ctx.font = "30px Cursive";
				ctx.fillText("Seu recorde atual é: " + Math.floor(puzzle.highestScoreMaze), 370, 200);
				ctx.fillStyle = "Green";
				ctx.fillText("Você recebeu " + Math.floor(this.playerScore / 15) + " pontos de experiência", 470, 240);					
			}
		} else {
			for(this.row in this.map) {
				for(this.col in this.map[this.row]) {
					this.tileX = this.col * this.tileSize;
					this.tileY = this.row * this.tileSize;
					this.tile = this.map[this.row][this.col];
					if(this.tile == 1) {
						ctx.fillStyle = "White";
						ctx.fillRect(this.tileX, this.tileY, this.tileSize, this.tileSize);
					} else if(this.tile == 0) {
						ctx.fillStyle = "Black";
						ctx.fillRect(this.tileX, this.tileY, this.tileSize, this.tileSize);
						this.blockRectangle(this.tileX, this.tileY, this.tileSize);				
					}
				}
			}
			DrawRect(this.playerColor, this.playerX, this.playerY, this.playerSize, this.playerSize);
			ctx.font = "40px Cursive";
			ctx.fillStyle = "Red";
			ctx.fillText("Tempo: " + this.timer, 650, 40);
			ctx.fillText("Pontos: " + this.playerScore, 650, 80);
		}
	}	
}

class Cam {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.width = canvas.width();
		this.height = canvas.height();
	}

	leftEdge() {
		return this.x + (this.width * 1.0);
	}

	rightEdge() {
		return this.x + (this.width * 0.50);	
	}

	topEdge() {
		return this.y + (this.height * 1.0);
	}

	bottomEdge() {
		return this.y + (this.height * 0.50);
	}

	move() {
		if(player.x < this.leftEdge()) {
			this.x = player.x - (this.width * 1.0);
		}
		if(player.x + player.width > this.rightEdge()) {
			this.x = player.x + player.width - (this.width * 0.5);
		}
		if(player.y < this.topEdge()) {
			this.y = player.y - (this.height * 1.0);
		}
		if(player.y + player.height > this.bottomEdge()) {
			this.y = player.y + player.height - (this.height * 0.5);
		}
		if(this.x < 0) {
			this.x = 0
		}
		if(this.x + this.width > scenario.width) {
			this.x = scenario.width - this.width;
		}
		if(this.y < 0) {
			this.y = 0;
		}
		if(this.y + this.height > scenario.height) {
			this.y = scenario.height - this.height;
		}
	}		
}

let img = new LoadImages();
let cam = new Cam();
let player = new Player();
Player.prototype.profile = new Profile();
let npc = new NPC();
NPC.prototype.dialogue = new Dialogue();
NPC.prototype.infoNPC = new InfoNPC();
NPC.prototype.signalNPC = new SignalNPC();
let scenario = new Scenario();
let puzzle = new Puzzle();
Puzzle.prototype.puzzleFishing = new PuzzleFishing();
Puzzle.prototype.puzzlePong = new PuzzlePong();
Puzzle.prototype.puzzleFlappyBird = new PuzzleFlappyBird();
Puzzle.prototype.puzzleBreakout = new PuzzleBreakout();
Puzzle.prototype.puzzleGuitarHero = new PuzzleGuitarHero();
Puzzle.prototype.puzzleMaze = new PuzzleMaze();

npc.add();
Init();
})