import { Injectable } from '@angular/core'; 

@Injectable()
export class AuthSettings {
    CLIENT_ID = "yTgJmZg0hVGqzvcw9J2H8ABdcj3g8yFF";
    NAMESPACE = "brafton-tech-services.auth0.com";
    OPTIONS = {
        closable: false,
        rememberLastLogin: true,
        allowedConnections: ["auth0", "google-oauth2"],
        //allowLogin: true,
        allowSignUp: false,
        theme: {
            logo: "http://www.brafton.com/wp-content/themes/brafton/library/images/logos/full_logo.png",
            primaryColor: "black"
        },
        languageDictonary: {
            title: "Brafton"
        }
    };
    constructor() {

    }
}
