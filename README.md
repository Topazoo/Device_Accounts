# Device Accounts
### Encrypted key exchange between client and server

## This Django site can temporarily pair to devices
This allows for content specifically tailored for that device via HTML 5 local storage. The advantages of this method are fourfold:
* First, unlike cookies, local storage data has no expiration date and can only be cleared on command. 
* Second, cookies are limited to 4,096b of storage space while local storage can store up to 5mb. 
* Third, cookies stored by a server are sent on every request to that server via HTTP header, local storage data is sent only when explicitly requested.
* Fourth, some users or browsers may have cookies disabled, but will still allow for local storage access.

## But isn't local storage vulnerable to XSS attacks or JavaScript access?
Yeah, it probably is, meaning the encryption is redundant right now. Even with CSRF token validation it's likely that another domain could maliciously impersonate others. Then they could store the information of any site using this method from any visiting user. This means only non-sensitive information should be stored with this method for now.

### On the front end
Certain elements of the website initiate jQuery AJAX requests that allow client-server communication.

A number of jQuery AJAX requests can be found in /testapp/base/static/js/rango-jquery.js
- Clicking an element with the set-btn/get-btn id will prompt a popup where the user can assign the device a name or retrieve its name
- Clicking an element with the set-btn-py/get-btn-py id will generate a simply encrypted name or retrieve that name
- Clicking an element with the set-btn-kp/get-btn-kp id will allow you to store and retrieve a message

### On the back end
Data from the jQuery requests is used to store or retrieve data.

Each jQuery request calls a Python function in /testapp/base/views.py
All encryption is done in Python on the back end
- Clicking an element with the set-btn-py/get-btn-py id runs a basic encryption on a name passed via AJAX request
- Clicking an element with the set-btn-kp/get-btn-kp id generates an encrypted key pair between the client and server. The Python back end generates a private key and stores it in the database with a randomly generated access key for lookup. The back end also generates a public key, and sends it to the front end where it is stored with the access key in local storage. To retrieve the message, the public key and ID are sent to the back end where the private key is located. The private key is then decrypted to access the message.
