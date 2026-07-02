/*
============================================================

 ChronoMate 2026
 Session Management

 Version : v0.4.0

 Author :
 Chris Bruce (CBDesignS)

 Developed with ChatGPT (OpenAI GPT-5.5)

============================================================
*/

"use strict";


//============================================================
// Storage Keys
//============================================================

const STORAGE_KEYS = {

    SESSION : "ChronoMateSession"

};


//============================================================
// Session Object
//============================================================

let chronoSession = {

    tester : "",

    chronograph : "",

    notes : "",

    sessionDate : "",

    sessionTime : "",

    rifle : {

        manufacturer : "",

        model : "",

        serial : "",

        configuration : "",

        calibre : ".177"

    }

};


//============================================================
// Create Session Timestamp
//============================================================

function createSessionTimestamp()
{

    const now = new Date();

    chronoSession.sessionDate =
        now.toLocaleDateString();

    chronoSession.sessionTime =
        now.toLocaleTimeString();

}


//============================================================
// Reset Session
//============================================================

function resetSession()
{

    chronoSession = {

        tester : "",

        chronograph : "",

        notes : "",

        sessionDate : "",

        sessionTime : "",

        rifle : {

            manufacturer : "",

            model : "",

            serial : "",

            configuration : "",

            calibre : ".177"

        }

    };

    createSessionTimestamp();

    saveSession();

}
