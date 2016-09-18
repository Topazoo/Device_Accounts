
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);

            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    }
});

$(document).ready(function() {
	$("#set-btn").click( function(event) {
		name = localStorage.getItem("TI_name");
		if (name == null || name == "null" || name == ""){
			name = prompt("Please enter a name");
			localStorage.setItem("TI_name", name);
		
		}
		
		else {
			alert("This device has already been named: " + name);
		}
	}); 

	$("#clr-btn").click( function(event) {
		localStorage.removeItem('TI_name')
		alert ('Cleared name!')
	});

	$("#clr-msg").click( function(event) {
		key = localStorage.getItem('TI_key')
		access = localStorage.getItem('TI_access')
		
		if (access != null || access != "null" || access != "") {
					
			$.ajax({
					"type": "POST",
					"dataType": "json",
					"url": 'remove_obj',
					"data": {'access': access, 'key': key},
					"success": function(response){
						if (response.code == "success") {
							localStorage.removeItem('TI_access');
							localStorage.removeItem('TI_key');
							alert("Cleared browser and database!");
						}
						
						else {
							localStorage.removeItem('TI_access');
							localStorage.removeItem('TI_key');
							alert("Cleared browser but not database!");
						}
					},
					"fail": function(response){
						localStorage.removeItem('TI_access');
						localStorage.removeItem('TI_key');
						alert("Failed");
					},
			});
		}
		
		else {
			alert("No message set!")
		}
	});

	$("#get-btn").click( function(event) {
		name = localStorage.getItem("TI_name");
		if (name == null || name == "null" || name == ""){
			alert("No name assigned!");
		} 
		
		else {
			alert ("Retreived name: " + name);
		} 
	});
	
	$("#get-btn-py").click( function(event) {
		name = localStorage.getItem("TI_name");
		if (name == null || name == "null" || name == ""){
			alert("No name assigned!");
		} 
		
		else {
			alert ("Retreived name: " + name);
		} 
	});
	
    $("#set-btn-py").click(function() {
		name = localStorage.getItem("TI_name");
        var data = {
            'name': 'irrelevent'
        }
		
		if (name == null || name == "null" || name == "") {
			$.ajax({
				"type": "POST",
				"dataType": "json",
				"url": 'update_name',
				"data": data,
				"success": function(response) {
					if(response.code == 'success') { 
						alert('Your simply encrypted name is ' + response.name); 
						localStorage.setItem("TI_name", response.name);
					}
						
					else { 
						alert('FAILED'); 
					}
				},
				"error": function(response) {
					alert ('FAILED');
				},
			});
		}
		else {
			alert("This device has already been named: " + name);
		}
	});

    $("#set-btn-kp").click(function() {
		access = localStorage.getItem("TI_access");
		
		if (access == null || access == "null" || access == "") {
			access = prompt("Please enter a message");
			$.ajax({
				"type": "POST",
				"dataType": "json",
				"url": 'pair_device',
				"data": {'access': access},
				"success": function(response) {
					if(response.code == 'success') { 
						localStorage.setItem('TI_key', response.key);
						localStorage.setItem('TI_access', response.access);
						alert('Your message has been saved'); 
					}
						
					else { 
						alert('FAILED'); 
					}
				},
				"error": function(response) {
					alert ('FAILED');
				},
			});
		}
		else {
			alert('This device already has a secret message');
		}
	});

    $("#get-btn-kp").click(function() {
		access = localStorage.getItem("TI_access");
		public_key = localStorage.getItem("TI_key")
		
		if (access == null || access == "null" || access == "") {
			alert('No message set!');
		}
		
		else {			
			$.ajax({
				"type": "POST",
				"dataType": "json",
				"url": 'get_device_message',
				"data": {'access': access, 'key': public_key},
				"success": function(response) {
					if(response.code == 'success') { 
						alert("Your message is: " + response.message); 
					}
						
					else { 
						alert('FAILED'); 
					}
				},
				"error": function(response) {
					alert ('ERROR');
				},
			});
		}
	});
});