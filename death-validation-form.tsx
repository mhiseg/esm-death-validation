import React, { useState } from "react";
import styles from "./form.scss"
import * as Yup from 'yup';
import { Formik } from "formik";
import { Grid, Row, Column, Button, Form } from "carbon-components-react";
import { useTranslation } from "react-i18next";



const DeathValidation = () => {
    const { t } = useTranslation();
    const [initialV, setInitiatV] = useState({ endorsement: "" });

    const validationSchema = Yup.object().shape({
        endorsement: Yup.string().required("You must endorse to validate"),
    })


    return (
        <Formik
            initialValues={initialV}
            validationSchema={validationSchema}
            onSubmit={() => { "" }}

        >
            {(formik) => {
                const {
                    values,
                    handleSubmit,
                    errors,
                    touched,
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
                                <Row>
                                    <Column>
                                        {/* {FieldForm("observation")} */}
                                    </Column>
                                </Row>

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
                                                    {t("cancelButton","Annuler")}
                                                </Button>
                                                <Button
                                                    className={styles.buttonStyle1}
                                                    kind="tertiary"
                                                    type="submit"
                                                    size="sm"
                                                    isSelected={true}
                                                    disabled={!(dirty && isValid)}
                                                >
                                                    {t("confirmButton","Enregistrer")}
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