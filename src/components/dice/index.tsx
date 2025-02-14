import React, { useState } from "react";

interface DiceProps {
    onRoll: (sum: number) => void;
}

const Dice: React.FC<DiceProps> = ({ onRoll }) => {
    const [dice, setDice] = useState({ die1: 1, die2: 1 });
    const [rolling, setRolling] = useState(false);

    const rollDice = () => {
        setRolling(true);

        let animationTime = 1000;
        let frameCount = 0;
        let interval = setInterval(() => {
            const newDie1 = Math.floor(Math.random() * 6) + 1;
            const newDie2 = Math.floor(Math.random() * 6) + 1;

            setDice({ die1: newDie1, die2: newDie2 });

            frameCount++;
            if (frameCount > animationTime / 100) {
                clearInterval(interval);
                setRolling(false);

                onRoll(newDie1 + newDie2);
            }
        }, 100);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "10px", position: "absolute", top: "20em", left: "55%" }}>
            {/*<div style={{ fontSize: "24px", marginBottom: "10px" }}>🎲 Бросаем кубики!</div>*/}
            <div style={{ fontSize: "36px", fontWeight: "bold", display: "flex", justifyContent: "center", gap: "20px" }}>
                <div style={{ transform: rolling ? "rotate(360deg)" : "none", transition: "transform 0.5s ease-in-out" }}>
                    🎲 {dice.die1}
                </div>
                <div style={{ transform: rolling ? "rotate(-360deg)" : "none", transition: "transform 0.5s ease-in-out" }}>
                    🎲 {dice.die2}
                </div>
            </div>
            <button onClick={rollDice} disabled={rolling} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "18px" }}>
                Бросить кубики
            </button>
        </div>
    );
};

export default Dice;
