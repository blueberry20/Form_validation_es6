export default class formValidation {
    constructor(optionsObj){
        this.options = {
            req_fields: optionsObj.req_fields,
            first_name: optionsObj.first_name,
            last_name: optionsObj.last_name,
            company: optionsObj.company,
            country: optionsObj.country,
            email: optionsObj.email,
            role_label: optionsObj.role_label,
            role_radio: optionsObj.role_radio,
            submit_button: optionsObj.submit_button
          };
          this.valid_form = false;
          this.validObj = {
            firstNameInput: false,
            lastNameInput: false,
            companyInput: false,
            countryInput: false,
            emailInput: false,
            role: false
          };
    }

    init() {
        this.bindSubmitEvent();
    };

    bindSubmitEvent() {
      document.querySelector(this.options.submit_button).addEventListener("click", this.validateForm.bind(this));
    };

    bindChangeFieldEvent() {
      let reqFields = document.querySelectorAll(this.options.req_fields);
      //reqFields = Array.prototype.slice.call(reqFields);
      reqFields = Array.from(reqFields);

      reqFields.forEach(item => { //text fields
        if (item.nodeName == "INPUT"){
          item.addEventListener("keyup", this.validateFields.bind(this));
        }
        else { //select
          item.addEventListener("change", this.validateFields.bind(this));
        }
      });

      let radioFields = document.querySelectorAll(this.options.role_radio);
      // radioFields = Array.prototype.slice.call(radioFields);
      radioFields = Array.from(radioFields);
      radioFields.forEach( item => {
        item.addEventListener("change", this.validateRole.bind(this));
      });
      
    };

    validateForm(){
      this.bindChangeFieldEvent();
      this.validateFields();
      this.validateRole();
  
      // //check if at least one value in validObj is false
      // //support ie11
      let answersArray = [];
      for (let key in this.validObj) {
        answersArray.push(this.validObj[key]);
      }
      if (answersArray.indexOf(false) >= 0) {
        this.valid_form = false;
      } else {
        this.valid_form = true;
      }
      //console.log('valid form '+this.valid_form);
      if (this.valid_form){
          this.submitForm();
      }
    };

    validateFields() {
      let self = this;
      let flds = document.querySelectorAll(this.options.req_fields);
      
      //convert list of nodes to array in case some browsers dont support iteration of dom nodes
      // flds = Array.prototype.slice.call(flds);
      flds = Array.from(flds);

      for (let fld of flds) {
        fld.classList.remove("invalid");
        //if empty fields
        if (!fld.value) {
          console.log("empty");
          fld.classList.add("invalid");
          self.validObj[fld.getAttribute("name")] = false;
        } //not empty
        else {
          if (fld.classList.contains("emailInput")){
              self.validateEmail(document.querySelector(self.options.email));
          }
          else {
            self.validObj[fld.getAttribute("name")] = true;
          }
        }
      }

      console.log(this.validObj);
    };

    validateEmail(email_input) {

      email_input.classList.remove("invalid");

      if (!this.emailValidation(email_input.value)){
        email_input.classList.add("invalid");
        this.validObj["emailInput"] = false;
      }
      else {
        this.validObj["emailInput"] = true;
      }
    };

    emailValidation(email) {
      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    };

    validateRole() {
      //get all role_labels, convert nodeList to array 
      let roleLabels = document.querySelectorAll(this.options.role_label);
      // roleLabels = Array.prototype.slice.call(roleLabels);
      roleLabels = Array.from(roleLabels);

      roleLabels.forEach(item => {
        item.classList.remove("invalidRadio");
      })

      if (document.querySelector(`${this.options.role_radio}:checked`)==null){
        roleLabels.forEach(item => {
            item.classList.add("invalidRadio");
        });
        this.validObj.role = false;
      }
      else {
        this.validObj.role = true;
      }

    };

    submitForm() {
      let user = {
        firstName: document.querySelector(this.options.first_name).value,
        lastName: document.querySelector(this.options.last_name).value,
        company: document.querySelector(this.options.company).value,
        country: document.querySelector(this.options.country).value,
        email: document.querySelector(this.options.email).value,
        role: document.querySelector(this.options.role_radio + ":checked").value
      };

      console.log(user);

      //this.handleSubmitConfirmation();

      fetch('https://httpbin.org/post', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }).then(res => res.json())
        .then(res => {
          console.log('success: ' + res);
          self.handleSubmitConfirmation();
        })
        .catch(function(res){ console.log(res) })

    }
}

