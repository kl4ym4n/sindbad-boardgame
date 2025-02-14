import React, {useEffect, useRef, useState} from "react";
import Phaser from "phaser";
import {Player} from "./game/player";
import PlayerHUD from "./components/playerHUD/index";
import FieldPopup from "./components/fieldPopup";
import {FieldConfig, fields} from "./game/fieldConfig";
import Dice from "./components/dice";

const Game: React.FC = () => {
    const gameRef = useRef<HTMLDivElement>(null);
    const phaserGame = useRef<Phaser.Game | null>(null);
    const [currentField, setCurrentField] = useState<FieldConfig | null>(null);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [players] = useState<Player[]>([
        new Player("Синдбад", "red"),
        new Player("Марко Поло", "blue"),
    ]);

    const colorMap = {
        "red": 0xff0000,
        "blue": 0x0000ff,
        "yellow": 0xffff00,
        "green": 0x00ff00,
        "cyan": 0xff00ff,
        "black": 0x000000
    }

    const [currentPlayer, setCurrentPlayer] = useState(players[0]);


    useEffect(() => {
        class GameScene extends Phaser.Scene {
            private path: { x: number; y: number }[] = [];
            private waterShader!: Phaser.GameObjects.Shader;
            private playerSprites: Phaser.GameObjects.Container[] = [];
            private setReactField!: React.Dispatch<React.SetStateAction<FieldConfig | null>>;

            constructor() {
                super({ key: "GameScene" });
            }

            init() {
                this.setReactField = this.registry.get("setReactField") as React.Dispatch<React.SetStateAction<FieldConfig | null>>;
            }

            preload() {
                this.load.glsl("waterShader", "/shaders/waterShader.glsl");

                fields.forEach((field) => {
                    // console.log(`Загрузка изображения: ${field.name} -> ${field.image}`);
                    this.load.image(field.name, field.image);
                });
                this.load.image('ship', '/assets/images/ship.png');
                this.load.image('water', '/assets/images/water_texture.jpg');
            }

            private createShip(x: number, y: number, color: string): Phaser.GameObjects.Container {
                const shipBase = this.add.image(0, 0, "ship").setScale(0.1).setTint(colorMap[color]);
                return this.add.container(x, y, [shipBase]);
            }

            create() {
                const waterImage = this.textures.get("waterTexture").getSourceImage();
                this.waterShader = this.add.shader('waterShader', 400, 300, 800, 600, [ 'water' ]);

                this.waterShader.setUniform("uTexture", waterImage);

                this.registry.set("updatePlayerSprites", (index: number) => this.updatePlayerSprites(index));
                this.registry.set("movePlayer", (steps: number) => this.movePlayer(steps));

                // Генерируем путь клеток
                this.generatePath();

                // Добавляем клетки на поле
                fields.forEach((field) => {
                    const pos = this.path[field.position]; // Берем координаты клетки
                    if (pos) {
                        this.add.image(pos.x, pos.y, field.name).setScale(0.1);
                        // console.log(`Добавлено поле: ${field.name} на позицию ${field.position}`);
                    }
                });

                players.forEach((player, index) => {
                    const ship = this.createShip(this.path[0].x, this.path[0].y, player.color);
                    this.playerSprites.push(ship);
                });

                // Устанавливаем активного первого игрока
                this.updatePlayerSprites(0);
            }

            update() {
            }

            // Генерация пути
            generatePath() {
                this.path = [
                    {x: 100, y: 500}, {x: 200, y: 500}, {x: 300, y: 500}, {x: 400, y: 500},
                    {x: 500, y: 500}, {x: 600, y: 500}, {x: 700, y: 500}, {x: 700, y: 400},
                    {x: 700, y: 300}, {x: 700, y: 200}, {x: 700, y: 100}, {x: 600, y: 100},
                    {x: 500, y: 100}, {x: 400, y: 100}, {x: 300, y: 100}, {x: 200, y: 100},
                    {x: 100, y: 100}, {x: 100, y: 200}, {x: 100, y: 300}, {x: 100, y: 400}
                ];
            }

            movePlayer(steps: number) {
                const activePlayerIndex = this.registry.get("currentPlayerIndex") || 0;
                const currentPlayer = players[activePlayerIndex];
                currentPlayer.move(steps, this.path.length);
                const newPosition = currentPlayer.position;

                this.tweens.add({
                    targets: this.playerSprites[activePlayerIndex],
                    x: this.path[newPosition].x,
                    y: this.path[newPosition].y,
                    duration: 500,
                    ease: "Power2",
                    onComplete: () => {
                        const field = fields.find(f => f.position === newPosition);
                        if (field) {
                            field.action(currentPlayer);
                            this.setReactField(field);
                        }
                    },
                });
            }

            updatePlayerSprites(activeIndex: number) {
                this.playerSprites.forEach((sprite, index) => {
                    sprite.setAlpha(index === activeIndex ? 1 : 0.5);
                });
            }
        }

        // Конфигурация Phaser
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.WEBGL,
            width: 800,
            height: 600,
            parent: gameRef.current || undefined,
            scene: GameScene,
            // backgroundColor: "#87CEEB",
        };

        phaserGame.current = new Phaser.Game(config);

        phaserGame.current.registry.set("setReactField", setCurrentField);
        phaserGame.current.scene.start("GameScene");

        return () => {
            phaserGame.current.destroy(true);
            phaserGame.current = null;
        };
    }, []);


    const completeTurn = () => {
        setCurrentField(null); // Закрываем окно

        setCurrentPlayerIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % players.length;
            setCurrentPlayer(players[newIndex]);


            if (phaserGame.current) {
                phaserGame.current.registry.set("currentPlayerIndex", newIndex);
                phaserGame.current.scene.getScene("GameScene").registry.get("updatePlayerSprites")(newIndex);
            }

            return newIndex;
        });
    };

    const handleDiceRoll = (sum: number) => {
        phaserGame.current?.scene.getScene("GameScene").registry.get("movePlayer")(sum);
    };


    return <div>
        <PlayerHUD player={currentPlayer}/>
        <FieldPopup
            field={currentField}
            player={currentPlayer}
            onClose={() => setCurrentField(null)}
            onBuy={(goodId) => currentPlayer?.buyItem(goodId)}
            onSell={(goodId) => currentPlayer?.sellItem(goodId)}
            onCompleteTurn={completeTurn}
        />
        <Dice onRoll={handleDiceRoll} />
        <div ref={gameRef}/>
    </div>
};

export default Game;
