import {test} from './test';
import FormValidation from './form-validation';
import './styles/main.scss';

let userRegistration = new FormValidation({
    req_fields: ".abl--registration-form .required",
    first_name: "#firstNameInputForm",
    last_name: "#lastNameInputForm",
    company: "#companyInputForm",
    country: "#countryInputForm",
    email: "#emailInputForm",
    role_label: ".abl--registration-form .input-field-radio-label",
    role_radio: ".abl--registration-form input[name=investorRadio]",
    submit_button: "#submitRegFormBtn"
});
userRegistration.init();

