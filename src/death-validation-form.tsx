import React, { useState } from "react";
import styles from "./form.scss"
import * as Yup from 'yup';
import { Formik } from "formik";
import { Grid, Row, Column, Button, Form } from "carbon-components-react";
import { useTranslation } from "react-i18next";
import { PassField } from "./components/death-form/field/password/password";
import { Icon } from '@iconify/react';
import InfoCard from "./components/info-card/info-card";



const DeathValidation = () => {
    const { t } = useTranslation();
    const [initialV, setInitiatV] = useState({ endorsement: "" });

    const validationSchema = Yup.object().shape({
        password: Yup.string().required("You must endorse to validate"),
    })


    return (
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
                            <Column className={styles.separator}>
                                <h4 className={styles.title}>{t("cardValidationTitle","Résumé du décès")}</h4>
                            </Column>

                            <Column className={styles.main}>
                                <Row >
                                    <Column className={styles.column1} lg={1}><Icon icon="fa-solid:hospital" className={styles.icon} /></Column>
                                    <Column className={styles.column2} lg={11}><p className={styles.font}>Notre Dame S.A</p></Column>
                                </Row>
                                <Row>
                                    <Column className={styles.column1} lg={1}><Icon icon="bxs:time-five" className={styles.icon} /></Column>
                                    <Column className={styles.column2} lg={11}><p className={styles.font}>23h45</p></Column>
                                </Row>
                                <Row>
                                    <Column className={styles.column1} lg={1}><Icon icon="clarity:date-solid" className={styles.icon} /></Column>
                                    <Column className={styles.column2} lg={11}><p className={styles.font}>12/01/2010</p></Column>
                                </Row>
                                <Row>
                                    <Column className={styles.column1} lg={1}><Icon icon="fa-solid:sticky-note" className={styles.icon} /></Column>
                                    <Column className={styles.column2} lg={11}><p className={styles.font}>Projectile</p></Column>
                                </Row>
                            </Column>

                            <Row className={styles.infoCard}>
                                <Column>
                                    <InfoCard title={t("causeIntermLabel","Cause intermediaire")} info="weruhgruhuiogirgbierbeivseiuefhvbisersrae" />
                                </Column>
                                <Column>
                                    <InfoCard title={t("causeInitLabel","Cause initiale")} info="weruhgruhuiogirgbierbeivseiuefhvbisersrae" />
                                </Column>
                            </Row>

                            <Row>
                                <Column className={styles.padingBottom}>
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
    );
}

export default DeathValidation;