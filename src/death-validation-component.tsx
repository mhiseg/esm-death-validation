import React from "react";
import { useTranslation } from "react-i18next";
import DeathFormValidation from "./death-validation-form";


const DeathValidation: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <h4 className={`title-page`}>{t('validationDeathTitle', 'Validate a death')}</h4>
            <div className={`mhiseg-main-content `}>
                <DeathFormValidation />
            </div>
        </>
    );
};
export default DeathValidation;



