import React from "react";
import { Player } from "../../game/player/index";
import { goods } from "../../game/goodsConfig";

interface PlayerHUDProps {
    player: Player | null;
}

const PlayerHUD: React.FC<PlayerHUDProps> = ({ player }) => {
    if (!player) return null;

    return (
        <div
            style={{
                position: "absolute",
                top: 10,
                left: "60%",
                transform: "translateX(-50%)",
                padding: "10px",
                backgroundColor: "#ffffffcc",
                borderRadius: "10px",
                textAlign: "center",
                minWidth: "250px",
                fontFamily: "Arial, sans-serif",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            <h3 style={{ color: player.color }}>{player.name}</h3>
            <p>💰 Деньги: {player.money} монет</p>
            <p>📦 Товары:</p>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {Object.entries(player.items).map(([key, value]) => {
                    const good = goods.find(g => g.id === key);
                    return (
                        <li key={key}>{good?.name || key}: {value}</li>
                    );
                })}
            </ul>
        </div>
    );
};

export default PlayerHUD;
