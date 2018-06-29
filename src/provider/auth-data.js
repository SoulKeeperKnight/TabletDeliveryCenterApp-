var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//***********  Facebook **************/
import { Facebook } from '@ionic-native/facebook';
//***********  Google plus **************/
import { GooglePlus } from '@ionic-native/google-plus';
var AuthData = /** @class */ (function () {
    function AuthData(afAuth, facebook, googleplus) {
        this.afAuth = afAuth;
        this.facebook = facebook;
        this.googleplus = googleplus;
    }
    AuthData.prototype.signInWithPopupFacebook = function () {
        return this.afAuth.auth
            .signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then(function (res) { return console.log(res); });
    };
    AuthData.prototype.signInWithFacebook = function () {
        return this.facebook.login(['email', 'public_profile']).then(function (res) {
            var facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
            return firebase.auth().signInWithCredential(facebookCredential);
        });
    };
    AuthData.prototype.signInWithGoogle = function () {
        return this.googleplus.login({
            // ***** Don't forgot to change webClientId ******//
            'webClientId': '134053776757-rj2vajjm340t2bilpencqq4hh1j76sv5.apps.googleusercontent.com',
            'offline': true
        }).then(function (res) {
            return firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
        });
    };
    AuthData.prototype.updateUserProfile = function (uid, displayName, email, photo, phone) {
        firebase.database().ref('/userProfile').child(uid).once('value', function (snapshot) {
            var exists = (snapshot.val() !== null);
            if (exists) {
                console.log('user ' + uid + ' exists!');
                firebase.database().ref('userProfile/' + uid).update({
                    name: displayName,
                    email: email,
                    photo: photo,
                    phone: phone
                });
            }
            else {
                console.log('user ' + uid + ' does not exist!');
                firebase.database().ref('/userProfile').child(uid).set({
                    name: displayName,
                    email: email,
                    photo: photo,
                    phone: phone
                });
            }
        });
    };
    AuthData.prototype.loginUser = function (newEmail, newPassword) {
        return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
    };
    AuthData.prototype.resetPassword = function (email) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    };
    AuthData.prototype.logoutUser = function () {
        return this.afAuth.auth.signOut();
    };
    AuthData.prototype.registerUser = function (name, email, password, phone) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(function (newUser) {
            firebase.database().ref('/userProfile').child(newUser.uid).set({
                email: email,
                name: name,
                phone: phone
            });
        });
    };
    AuthData = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AngularFireAuth, Facebook, GooglePlus])
    ], AuthData);
    return AuthData;
}());
export { AuthData };
//# sourceMappingURL=auth-data.js.map