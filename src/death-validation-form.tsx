import React, { useState } from "react";
import styles from "./form.scss"
import * as Yup from 'yup';
import { Formik } from "formik";
import { Grid, Row, Column, Button, Form } from "carbon-components-react";
import { useTranslation } from "react-i18next";
import InfoCard from "./components/info-card/info-card";
import PatientCard from "./patient-card/patient-card";
import FormatCardCell from "./patient-card/patient-cardCell";
import { navigate, showToast } from "@openmrs/esm-framework";
import { formatPatient, validatePerson } from "./components/patient-registration.ressources";
import { ConfirmationModal } from "./components/widget/confirmation-modal";
import { deathValidated } from "./components/constants";



const DeathValidationForm = ({ patient, obs }) => {
    const [openModal, setOpenModal] = useState(false);
    const [initialValues, setInitialValues] = useState({
        uuid: patient?.uuid,
        confirmationCode: "",
        patient: formatPatient(patient, obs)
    });
    const { t } = useTranslation();
    const abortController = new AbortController();


    const validate = (values) => {
        validatePerson(abortController, { attributes: [{ attributeType: deathValidated, value: Boolean(true) }] }, values.uuid).then(results => {
            showToast({
                title: t('success', 'Successfully Validate'),
                kind: 'success',
                description: 'Death validated succesfully',
            })
            navigate({ to: window.spaBase + "/death/list-unvalidate" });

        })
            .catch(error => showToast({ description: error.message }))
    }

    return (
        <>
            <PatientCard Patient={initialValues.patient} />
            <Grid fullWidth={true} className={styles.cardForm}>
                <Column className={styles.separator}>
                    <h4 className={styles.title}>{t("cardValidationTitle", "Résumé du décès")}</h4>
                </Column>

                <Column className={styles.main}>
                    <Row>

                    </Row>
                    <Row>
                        <FormatCardCell
                            icon="clarity:date-solid"
                            label={(new Intl.DateTimeFormat(t("local", 'fr-FR'), { dateStyle: 'full' }).format(new Date(initialValues.patient.deathDate)))}
                        />
                    </Row>
                    <Row>
                        <FormatCardCell
                            icon="bxs:time-five"
                            label={(initialValues.patient.deathDate.substring(0, 19).split("T")[1])}
                        />
                    </Row>
                    <Row>
                        <FormatCardCell
                            icon="fa-solid:sticky-note"
                            label={initialValues.patient.causeOfDeath}
                        />
                    </Row>
                </Column>

                <Row className={styles.infoCard}>
                    <Column>
                        <InfoCard
                            title={t("causeSecondLabel", "Cause secondaire")}
                            info={initialValues.patient.secondaryCause} />
                    </Column>
                    <Column>
                        <InfoCard title={t("causeInitLabel", "Cause initiale")}
                            info={initialValues.patient.initialCause}
                        />
                    </Column>
                </Row>

                <Row>

                    <Column>
                        <Row>
                            <Column className={styles.marginTop} lg={12} >
                                <div className={styles.flexEnd}>
                                    <Button
                                        className={styles.buttonStyle}
                                        kind="danger--tertiary"
                                        type="reset"
                                        size="sm"
                                        isSelected={true}
                                        onClick={() => { navigate({ to: window.spaBase + "/death/list-unvalidate" }); }}
                                    >
                                        {t("cancelButton", "Annuler")}
                                    </Button>
                                    <Button
                                        className={styles.buttonStyle1}
                                        kind="tertiary"
                                        size="sm"
                                        isSelected={true}
                                        onClick={() => {
                                            setOpenModal(true);
                                        }}
                                    >
                                        {t("confirmButton", "Confirmer")}
                                    </Button>
                                    <ConfirmationModal
                                        confirmModal={() => { validate(initialValues); setOpenModal(false); }}
                                        closeModal={setOpenModal}
                                        modalState={openModal} />
                                </div>
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default DeathValidationForm;