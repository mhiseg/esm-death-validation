
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { usePatient } from "./components/usePatient";
import DeathValidationForm from "./death-validation-form";


const DeathValidation: React.FC = () => {
    const { t } = useTranslation();
    const param: {
        patientUuid?: string
    } = useParams();
    const { isLoading: isLoadingPatientToEdit, patient: patientSearch, obs: obsToEdit } = usePatient(param?.patientUuid);


    return (
        !isLoadingPatientToEdit &&
        <>
            <h4 className={`title-page`}>{t('validationDeathTitle', 'Validate a death')}</h4>
            <div className={`mhiseg-main-content `}>
                <DeathValidationForm patient={patientSearch.data} />
            </div>
        </>
    );
};
export default DeathValidation;



