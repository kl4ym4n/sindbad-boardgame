import React from "react";
import { FieldConfig } from "../../game/fieldConfig";
import { Player } from "../../game/player";
import { goods } from "../../game/goodsConfig";

interface FieldPopupProps {
    field: FieldConfig | null;
    player: Player | null;
    onClose: () => void;
    onBuy: (goodId: string) => void;
    onSell: (goodId: string) => void;
    onCompleteTurn: () => void;
}

const FieldPopup: React.FC<FieldPopupProps> = ({ field, player, onClose, onBuy, onSell, onCompleteTurn }) => {
    if (!field || !player) return null;

    return (
        <div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                minWidth: "300px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                zIndex: 1000,
            }}
        >
            <h3 style={{ marginBottom: "10px" }}>{field.name}</h3>
            <img src={field.image} alt={field.name} width={120} style={{ borderRadius: "8px" }} />

            {field.type === "city" && player.cityPrices && (
                <div style={{ marginTop: "15px" }}>
                    <h4 style={{ marginBottom: "8px" }}>Товары в этом городе:</h4>
                    {goods.map((good) => (
                        <div key={good.id} style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            margin: "6px 0",
                            padding: "6px",
                            backgroundColor: "#f4f4f4",
                            borderRadius: "6px"
                        }}>
                            <img src={good.image} alt={good.name} width={35} />
                            <span style={{ flex: 1, textAlign: "left", marginLeft: "10px" }}>{good.name}</span>
                            <span>💰 {player.cityPrices[good.id]}</span>
                            <button
                                onClick={() => onBuy(good.id)}
                                style={{ marginLeft: "6px", cursor: "pointer", background: "#4CAF50", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px" }}>
                                Купить
                            </button>
                            <button
                                onClick={() => onSell(good.id)}
                                disabled={player.items[good.id] === 0}
                                style={{ marginLeft: "6px", cursor: player.items[good.id] > 0 ? "pointer" : "not-allowed", background: "#E74C3C", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px" }}>
                                Продать
                            </button>
                        </div>
                    ))}
                </div>
            )}


            <div style={{marginTop: "20px", display: "flex", justifyContent: "space-around"}}>
                <button onClick={onClose} style={{
                    padding: "8px 15px",
                    background: "#555",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                }}>
                    Закрыть
                </button>

                <button onClick={onCompleteTurn} style={{
                    padding: "8px 15px",
                    background: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                }}>
                    Закончить ход
                </button>
            </div>
        </div>
    );
};

export default FieldPopup;
