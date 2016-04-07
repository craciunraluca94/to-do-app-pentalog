var userIdentificationModule = {};

jQuery(document).ready(function(){
	var mainUser = null;
	var localStorageKey = "user";
	var avatarDomain = "https://robohash.org/";
	var userModalContainer = jQuery("#modal-main-container");
	var baseContainer = jQuery("#to-do-app-container");

	var targetUserInput = userModalContainer.find("#target-user-input");

	var displayUser = function() {
		if (mainUser) {
			var template = jQuery('<div></div>').html('<img width="50" /> <br /><div class="user-image-name-separator"></div>')
			template.find('img').attr('src', mainUser.avatar);
			template.append(mainUser.username);

			baseContainer.find('.user-image-background').html(template.html());

		}
		
								
	}

	var getUserFromLocalStorage = function() {
		var targetUserAsString = localStorage.getItem(localStorageKey);
		return typeof(targetUserAsString) != "undefined" ? JSON.parse(targetUserAsString) : null
	}

	var saveUserToLocalStorage = function(user) {
		localStorage.setItem(localStorageKey, JSON.stringify(user));
	}

	var constrcutUser = function(username) {
		return new User(username);
	}

	var User = function(username) {
		this.username = username;
		this.avatar = avatarDomain + username;
	}


	targetUserInput.on("keypress", function(e) {
		if (event.keyCode === 13 && validateInput(this.value)) { 
			saveUserToLocalStorage(new User(this.value));
		}
	});

	userIdentificationModule.handleUserIdentification= function() {
		user = getUserFromLocalStorage();
		if (!user) {
			userModalContainer.show();
		} else {
			mainUser = user;
		}
		displayUser();
	}

	var validateInput = function(input) {
		if (typeof(input) != "undefined" && input.trim().length > 0) {
			return true;
		}
		return false;
	}
});