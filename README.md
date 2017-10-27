# Device Accounts
### Encrypted key exchange between client and server

## This Django site can temporarily pair to devices
This allows the devices to access content specifically tailored for that device

## How it works

### On the front end
A number of jQuery AJAX requests can be found in /testapp/base/static/js/rango-jquery.js
- Clicking set-btn/get-btn will prompt a popup where the user can assign the device a name or retrieve its name
- Clicking set-btn-py/get-btn-py will generate a simply encrypted name or retrieve that name
- Clicking set-btn-kp/get-btn-kp will allow you to store and retrieve a message

### On the back end
Each jQuery request calls a Python function in /testapp/base/views.py
All encryption is done in Python on the back end
- Clicking set-btn-py/get-btn-py runs a basic encryption on a name passed via AJAX request
- Clicking set-btn-kp/get-btn-kp generates an encrypted key pair between the client and server. The Python back end generates a private key and stores it in the database with a randomly generated access key for lookup. The back end also generates a public key, and sends it to the front end where it is stored with the access key in local storage. To retrieve the message, the public key is sent to the back end where the private key is located with the access key stored in local storage. The private key is then decrypted to access the message. 


