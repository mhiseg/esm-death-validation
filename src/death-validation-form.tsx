import React, { useState } from "react";
import styles from "./form.scss"
import * as Yup from 'yup';
import { Formik } from "formik";
import { Grid, Row, Column, Button, Form } from "carbon-components-react";
import { useTranslation } from "react-i18next";
import { PassField } from "./components/death-form/field/password/password";
import PatientCard from "./patient-card/patient-card";



const DeathValidation = () => {
    const { t } = useTranslation();
    const [initialV, setInitiatV] = useState({ endorsement: "" });

    const validationSchema = Yup.object().shape({
        password: Yup.string().required("You must endorse to validate"),
    })
    let patient = {
        id: 1,
        identify: 12,
        No_dossier: '44545dsd',
        firstName: 'chilem',
        lastName: 'exantus',
        birth: '28-07-99',
        residence: 'ouest',
        habitat: 'rural',
        phoneNumber: '31282122',
        gender: 'F',
        birthplace: 'ouest',
        dead: false,
        occupation: 'programmeur',
        matrimonial: 'celibataire',
        deathDate: '20-09-99',
        relationship:[]
    }


    return (
        <>
            <PatientCard Patient={patient} />
            <Formik
                initialValues={initialV}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    console.log(values)
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
                                <Row>
                                    <Column>
                                        <span>Date</span>
                                    </Column>
                                    <Column><span>Time</span></Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <span>Lieu de décès</span>
                                    </Column>
                                    <Column>
                                        <span>Cause principale</span>
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

export default DeathValidation;