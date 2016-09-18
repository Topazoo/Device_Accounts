from django.shortcuts import render
from django.views.decorators.csrf import requires_csrf_token
import json 
from django.http import HttpResponse
import random
import string
from Crypto.PublicKey import RSA
from models import Private_Key
from fastecdsa import curve, ecdsa, keys
from hashlib import sha384

def eec_encrypt()
	private_key = keys.gen_private_key(curve.secp256k1)
	public_key = keys.get_public_key(private_key, curve.P256)

def basic_encrypt():
   ID = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for P in range(10))
   return ID

def key_pair(message_set):
    code = basic_encrypt()
    key = RSA.generate(2048)
    encrypted_key = key.exportKey(passphrase=code, pkcs=8,
                              protection="scryptAndAES128-CBC")
    public_key = key.publickey().exportKey()
    
    
    pair = Private_Key(private_key=encrypted_key, access_key=code, message=message_set)
    pair.save()
    return (public_key, code)
    
def decrypt(access, key):

    try:
        keyval = Private_Key.objects.get(access_key=access)
        pkey = RSA.import_key(keyval.private_key, passphrase=access)
    
    except:
        return "BA"
        
    if pkey.publickey().exportKey() == key:
        return keyval.message
    else:
        return "BA"
        
def remove_obj(request):

    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    if request.method == 'POST':
        if 'access' in request.POST:
            try:
                access = request.POST['access']
                key = request.POST['key']
                keyval = Private_Key.objects.get(access_key=access)
                pkey = RSA.import_key(keyval.private_key, passphrase=access)
    
                if pkey.publickey().exportKey() == key:
                    keyval.delete()
                    return HttpResponse(json.dumps({'code': 'success'}), content_type="application/json")
                
            except:
                pass
                
    return HttpResponse(json.dumps({'code': 'fail'}), content_type="application/json")
           

def get_device_message(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    if request.method == 'POST':
        if 'access' in request.POST:
            access = request.POST['access']
            key = request.POST['key']
            message = decrypt(access, key)
            if message != "BA":
                return HttpResponse(json.dumps({'code': 'success', 'message': message}), content_type="application/json")
            else:
                return HttpResponse(json.dumps({'code': 'fail'}))
    return HttpResponse('Your IP address is: ' + ip)
    
def pair_device(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    if request.method == 'POST':
        if 'access' in request.POST:
            access = request.POST['access']
            access = key_pair(access)
            return HttpResponse(json.dumps({'code': 'success', 'key': access[0], 'access': access[1]}), content_type="application/json")
    return HttpResponse('Your IP address is: ' + ip)    

def update_name(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    encr = basic_encrypt()
    if request.method == 'POST':
        if 'name' in request.POST:
            name = request.POST['name']
            return HttpResponse(json.dumps({'code': 'success', 'name': encr}), content_type="application/json")
    return HttpResponse('Your IP address is: ' + ip)

def base(request):
    req = request.META
    return render(request, 'base/home.html', {'req': req})
