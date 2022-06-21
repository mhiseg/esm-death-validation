import { Tile } from "carbon-components-react";
import React from "react";
import styles from "./info-card.scss"


export interface InfoCardProps {
    title: string;
    info: any;
    className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, info,className }) => {
    return (
        <Tile light={true} className={styles.card}>
            <h5>
                {title}
            </h5>
            <p>
                {info}
            </p>
        </Tile>
    );
}

export default InfoCard;