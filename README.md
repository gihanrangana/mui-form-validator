## Validation component for material-ui v1 forms

[![npm version](https://badge.fury.io/js/mui-form-validator.svg)](https://badge.fury.io/js/mui-form-validator)

### Installation

````
npm install --save mui-form-validator
````

### Versions
+ ^1.0.0 - supports material-ui >= ^1.4.x

Some rules can accept extra parameter, example:
````javascript
<MuiValidator 
        {..someProps}
        inputProps={{required: true}}/>
````

### Usage Example

````javascript

/*
 * Created by Gihan
 */
import React, { Component } from "react";
/* Material UI Components */
import { MuiForm, MuiValidator } from "mui-form-validator";

class AddMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            formData: {
                fname   : "",
                email   : "",
            },
            fields  : []
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
    }
    
    handleSubmit = (e) => {
        //Your submit handler
        //form data can get from state.fromData. you can change it as your own in handle change funcion
    };
    
    
    handleChange = (e) => {

        //setting form data to state.you can change it as your own.
        let formData = this.state.formData;
        formData[e.target.name] = e.target.value;
        this.setState({formData});
    };
    
    //register fields to validate (please add this function for register your form fields.this is required)
    register(field) {
        let s = this.state.fields;
        s.push(field);
        this.setState({fields: s});
    };
    
    render() {
        return (
            <MuiForm
                onSubmit={this.handleSubmit}
                noValidate>
                
                <MuiValidator placeholder={"First Name"} name={"fname"} type={"text"}
                                onChange={this.handleChange} value={this.state.formData.fname}
                                inputProps={{required: true}} onComponentMounted={this.register}
                                fullWidth={true}/>
            
                <MuiValidator placeholder={"Email"} name={"email"}
                                onChange={this.handleChange} value={this.state.formData.email}
                                inputProps={{required: true}} onComponentMounted={this.register}
                                fullWidth={true}/>
            
                <Button type={"submit"} variant={"raised"} color={"primary"}>Submit</Button>
                    
            </MuiForm>
        );
    }
    
}

````
+ onComponentMounted prop is required.please add it for MuiValidator component
