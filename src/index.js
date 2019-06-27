
import FormValidation from './form-validation';
import './styles/main.scss';

let userRegistration = new FormValidation({
    req_fields: ".abl--registration-form .required",
    first_name: "#firstNameInputForm",
    last_name: "#lastNameInputForm",
    company: "#companyInputForm",
    country: "#countryInputForm",
    email: "#emailInputForm",
    submit_button: "#submitRegFormBtn"
});
userRegistration.init();

