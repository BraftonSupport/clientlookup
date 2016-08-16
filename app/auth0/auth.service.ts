import { Injectable, Inject }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthSettings }  from './auth.settings';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
    // Configure Auth0
    lock:any;
    private userProfile: Object;

    constructor( @Inject(AuthSettings) AuthSettings: AuthSettings) {
        
        this.lock = new Auth0Lock(AuthSettings.CLIENT_ID, AuthSettings.NAMESPACE, AuthSettings.OPTIONS);
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
        // Add callback for lock `authenticated` event
        this.lock.on("authenticated", (authResult) => {

            localStorage.setItem('id_token', authResult.idToken);

            //Move this function to a verifcation path so we don't have to actually reload the page but rather load the proper component view
            window.location.reload(); // will be router path in the end

            // Fetch profile information
            this.lock.getProfile(authResult.idToken, (error, profile) => {
                if (error) {
                    // Handle error
                    console.log(error);
                    return;
                }

                localStorage.setItem('profile', JSON.stringify(profile));
                this.userProfile = profile;
            });

        });
        
    }

    public login() {

        // Call the show method to display the widget.
        this.lock.show();
    };

    public authenticated() {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        return tokenNotExpired();
    };

    public logout() {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
    };

    public getUserProfile() {
        console.log(this.userProfile);
        return this.userProfile;
    }
}