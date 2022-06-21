import styles from "./relationShipCard.scss";
import React from "react";
import { Column, Row, Grid } from 'carbon-components-react';
import PatientCardCell from "../patient-card/patient-cardCell";
import { Icon } from "@iconify/react";

const RelationShipCard = ({ relationshipName, relationshipType, relationshipPhone }) => {
    return (relationshipName != null && relationshipName !== undefined) && (
        <>
            <span className={styles.relationShipName}> {relationshipName} </span>
            <span className={styles.relationShipType}>
                {relationshipType}
            </span>
            {(relationshipPhone != null && relationshipPhone !== undefined) &&
                <span className={styles.relationshipPhone} >
                    <Icon className={styles.relationshipPhoneIcon} icon="bxs:phone-call" />{relationshipPhone} </span>
            }
        </>
    )
}
export default RelationShipCard;




    //     <Row className={styles.relationShipName}>
    //     {relationshipName}
    //     <Column sm={1} className={styles.relationShipType}>
    //         {relationshipType}
    //         <PatientCardCell
    //             icon="bxs:phone-call"
    //             label={relationshipPhone}
    //         />
    //     </Column>
    // </Row>