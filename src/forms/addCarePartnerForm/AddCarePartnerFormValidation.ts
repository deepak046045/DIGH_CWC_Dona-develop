import { copyTexts } from '@/constants/copyTexts';
import * as Yup from 'yup';

export const AddCarePartnerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required(copyTexts.AddCarePartnerModal.formValidation.requiredField)
    .max(50, copyTexts.AddCarePartnerModal.formValidation.nameLength),
  emailAddress: Yup.string()
    .email(copyTexts.AddCarePartnerModal.formValidation.invalidEmail)
    .required(copyTexts.AddCarePartnerModal.formValidation.requiredField)
    .max(80, copyTexts.AddCarePartnerModal.formValidation.emailLength),
});
