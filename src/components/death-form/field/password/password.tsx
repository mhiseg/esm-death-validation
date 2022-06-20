import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../input/basic-input/input/input.component';
import styles from '../field.scss';


export const PassField: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Input
        className={styles.maxSize_field}
        id="password"
        name="password"
        labelText={"password"}
        light={true}
        placeholder={t("passLabelText","Endorcement")}
        hideLabel={true}
      />
    </>
  );
};
