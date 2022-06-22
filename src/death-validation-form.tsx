import React, {useEffect, useState } from "react";
import styles from "./form.scss"
import * as Yup from 'yup';
import { Formik } from "formik";
import { Grid, Row, Column, Button, Form } from "carbon-components-react";
import { useTranslation } from "react-i18next";
import { PassField } from "./components/death-form/field/password/password";
import { Icon } from '@iconify/react';
import InfoCard from "./components/info-card/info-card";
import PatientCard from "./patient-card/patient-card";
import FormatCardCell from "./patient-card/patient-cardCell";
import { getCurrentUser, openmrsFetch } from "@openmrs/esm-framework";
import { formatPatient, performLogin } from "./components/patient-registration.ressources";


const DeathValidationForm = ({ patient }) => {
    const [[user, password], setUser] = useState(['',''])
    const { t } = useTranslation();
    const [initialV, setInitiatV] = useState({ endorsement: "" });
    const [userValidation, setUserValidation] = useState(null);

    const validationSchema = Yup.object().shape({
        password: Yup.string().required("You must endorse to validate"),
    })


    useEffect(() => {
        const subscription = getCurrentUser().subscribe(
            user => {
                setUser([user.username, ''])
            }
        )

        return () => {
            subscription;
        };
    }, []);

    useEffect(() => {
        if (password !== '' && password !== undefined)
            performLogin(user, password).then((data) => {
                setUserValidation(data);
            })
    }, [password])

        console.log(userValidation)
    return (
        <>
            <PatientCard Patient={formatPatient(patient)} />
            <Formik
                initialValues={initialV}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    setUser([user, values['password']]);
                    
                    resetForm();
                }}

            >
                {(formik) => {
                    const {
                        handleSubmit,
                        isValid,
                        dirty,
                    } = formik;
                    return (
                        <Form name="form" className={styles.cardForm} onSubmit={handleSubmit}>
                            <Grid fullWidth={true} className={styles.p0}>
                                <Column className={styles.separator}>
                                    <h4 className={styles.title}>{t("cardValidationTitle", "Résumé du décès")}</h4>
                                </Column>

                                <Column className={styles.main}>
                                    <Row >
                                        <FormatCardCell
                                            icon="fa-solid:hospital"
                                            label="Notre Dame S.A"
                                        />
                                    </Row>
                                    <Row>
                                        <FormatCardCell
                                            icon="bxs:time-five"
                                            label="23h45"
                                        />
                                    </Row>
                                    <Row>
                                        <FormatCardCell
                                            icon="clarity:date-solid"
                                            label="12/01/2010"
                                        />
                                    </Row>
                                    <Row>
                                        <FormatCardCell
                                            icon="fa-solid:sticky-note"
                                            label="Projectile"
                                        />
                                    </Row>
                                </Column>

                                <Row className={styles.infoCard}>
                                    <Column>
                                        <InfoCard title={t("causeIntermLabel", "Cause intermediaire")} info="weruhgruhuiogirgbierbeivseiuefhvbisersrae" />
                                    </Column>
                                    <Column>
                                        <InfoCard title={t("causeInitLabel", "Cause initiale")} info="weruhgruhuiogirgbierbeivseiuefhvbisersrae" />
                                    </Column>
                                </Row>

                                <Row>
                                    <Column>
                                        <PassField />
                                    </Column>


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
                                                    >
                                                        {t("cancelButton", "Annuler")}
                                                    </Button>
                                                    <Button
                                                        className={styles.buttonStyle1}
                                                        kind="tertiary"
                                                        type="submit"
                                                        size="sm"
                                                        isSelected={true}
                                                        disabled={!(dirty && isValid)}
                                                    >
                                                        {t("confirmButton", "Enregistrer")}
                                                    </Button>
                                                </div>
                                            </Column>
                                        </Row>
                                    </Column>
                                </Row>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
}

export default DeathValidationForm;