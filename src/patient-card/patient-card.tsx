import React from "react";
import { Button, Column, Grid, Row, Tile } from "carbon-components-react";
import { Icon } from "@iconify/react";
import styles from "./patient-card.scss";
import FormatCardCell from "./patient-cardCell";
import RelationShipCard from "../relationShipCard/relationShiphCard";
import { navigate, NavigateOptions } from "@openmrs/esm-framework";
import { useTranslation } from "react-i18next";

const PatientCard = ({ Patient }) => {

  const { t } = useTranslation();

  return (
    <Tile
      className={styles.cardBox}
      light={true}
    >
      <Grid className={styles.pm0} fullWidth={true}>
        <Row className={styles.pm0}>
          <Column className={styles.pm0} lg={12}>
            <Grid className={styles.pm0} fullWidth={true}>
              <Column lg={12}>
                <Row className={styles.borderBottom}>
                  <Column className={styles.pm0}>

                    <h1 className={styles.name}>
                      {Patient.gender == "F" ? (
                        <Icon
                          icon="emojione-monotone:woman"
                          className={styles.iconHead}
                        />
                      ) : null}
                      {Patient.gender == "M" ? (
                        <Icon
                          icon="emojione-monotone:man"
                          className={styles.iconHead}
                        />
                      ) : null}
                      {Patient.firstName} <span>{Patient.lastName}</span>
                    </h1>
                    <h3 className={`${styles.pm0}`}>
                      <Icon icon="bxs:folder" className={styles.iconHead} />
                      {Patient.No_dossier}
                    </h3>
                  </Column>
                </Row>
              </Column>
              <Row>
                <Column lg={4}>
                  <FormatCardCell
                    icon="clarity:calendar-solid"
                    label={Patient.birth}
                  />

                  <FormatCardCell
                    icon="entypo:location-pin"
                    label={Patient.residence}
                  />
                  <FormatCardCell
                    icon="bxs:building"
                    label={Patient.habitat}
                  />
                </Column>

                <Column lg={3}>
                  <FormatCardCell
                    icon="ant-design:field-number-outlined"
                    label={Patient.identify}
                  />

                  <FormatCardCell
                    icon="carbon:user-multiple"
                    label={Patient.matrimonial}
                  />

                  <FormatCardCell
                    icon="ic:outline-work"
                    label={Patient.occupation}
                  />
                </Column>

                <Column lg={3}>
                  <FormatCardCell
                    icon="bxs:phone-call"
                    label={Patient.phoneNumber}
                  />
                  <FormatCardCell icon="ep:place" label={Patient.birthplace} />
                  <FormatCardCell
                    icon="akar-icons:link-chain"
                    label={
                      Patient?.relationship?.[0] != "" &&
                        Patient?.relationship?.[0] != null ? (
                        <RelationShipCard
                          relationshipName={Patient?.relationship?.[0]}
                          relationshipType={Patient?.relationship?.[1]}
                          relationshipPhone={Patient?.relationship?.[2]}
                        />
                      ) : null
                    }
                  />
                </Column>
              </Row>
            </Grid>
          </Column>
        </Row>
      </Grid>
    </Tile>
  );
};
export default PatientCard;
