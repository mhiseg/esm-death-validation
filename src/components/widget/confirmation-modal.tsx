import React from "react";
import { useTranslation } from "react-i18next";
import { BasicModal } from "./basic-modal/basic-modal";


export interface ConfirmationModalProps {
    confirmModal: any;
    closeModal: any;
    modalState: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ confirmModal, closeModal,modalState }) => {
    const { t } = useTranslation();

    return (
        <>
            <BasicModal
                onConfirmModal={confirmModal}
                state={modalState}
                onClose={closeModal}
                title={t("validationModal", "Validation de décès")}
                body={t("messageModalValidation", "Vous êtes sur le point de valider un décès. Voulez-vous continuer?")}
                primaryButtonName={t("confirmModalButton", "Valider")}
                secondaryButtonName={t("cancelButton", "Annuler")}
                modalType="confirmation"
            />
        </>
    );
}