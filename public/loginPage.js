"use strict";
const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
	data => console.log(data);
	ApiConnector.login(data, response => {
		if(response.success){
			location.reload();
		} else {
			userForm.setLoginErrorMessage(response.error);
		}
	});
}

userForm.registerForm = (data) => {
	ApiConnector.register(data, response => {
		if(response.success){
			location.reload();
		} else {
			userForm.setRegisterErrorMessage(response.error);
		}
	});
}