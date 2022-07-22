
import { NavigateOptions, navigate } from "@openmrs/esm-framework";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { deathDeclareValue, deathValidatedUuid, deathValidatedValue } from "./components/constants";
import { usePatient } from "./components/usePatient";
import DeathValidationForm from "./death-validation-form";


const DeathValidation: React.FC = () => {
    const { t } = useTranslation();
    const param: {   patientUuid?: string
    } = useParams();
    const  { isLoading: isLoadingPatient,  patient: patientSearch, relationships: relationshipsToEdit, obs: obs } = usePatient(param?.patientUuid);
    const to: NavigateOptions = { to: window.spaBase + "/death/list-unvalidate" };


    const toSearchPatient = (patient) => {
        const isValidate = patient?.identifiers.find((identifier) => identifier.identifierType.uuid === deathValidatedUuid)?.identifier;
        if (!patient || patient?.person.dead !== true || isValidate !== deathDeclareValue)
            navigate(to);
    }


    const getFormPatient = () => {
        toSearchPatient(patientSearch?.data)
        return (
            <>
                <>
                    <h4 className={`title-page`}>{t('validationDeathTitle', 'Validate a death')}</h4>
                    <div className={`mhiseg-main-content `}>
                        <DeathValidationForm patient={patientSearch.data} obs={obs} />
                    </div>
                </>
            </>
        );
    }
    return <> {isLoadingPatient === false && getFormPatient()} </>
}
export default DeathValidation;
