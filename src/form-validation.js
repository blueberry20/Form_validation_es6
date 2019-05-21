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
        //this.bindChangeFieldEvent();
    };

    bindSubmitEvent() {
        document.querySelector(this.options.submit_button).addEventListener("click", this.validateForm.bind(this));
        if (this.valid_form){
            this.submitForm();
        }

      };

      validateForm(){
        this.validateFields(document.querySelectorAll(this.options.req_fields));

        // this.validateFields($(this.options.req_fields));
        // this.validateRole();
    
        // //check if at least one value in validObj is false
        // //support ie11
        // var answersArray = [];
        // for (var key in this.validObj) {
        //   answersArray.push(this.validObj[key]);
        // }
        // if (answersArray.indexOf(false) >= 0) {
        //   this.valid_form = false;
        // } else {
        //   this.valid_form = true;
        // }
      };

      validateFields(flds) {
        var self = this;
        console.log(flds);
        //convert list of nodes to array in case some browsers dont support iteration of dom nodes
        flds = Array.prototype.slice.call(flds);
        console.log(flds);
        
        //call will take each element in flds array and insert it into fld parameter in anonymous function
        //try rest parameters, try for of, try map
        Array.prototype.forEach.call(flds, function(fld){
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
        });

        console.log(this.validObj);
       };

       validateEmail(email_input) {
        $(email_input).removeClass("invalid");
        if (!this.emailValidation(email_input.val())) {
          $(email_input).addClass("invalid");
          this.validObj["emailInput"] = false;
        } else {
          this.validObj["emailInput"] = true;
        }
      };
      emailValidation(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
      };
}

