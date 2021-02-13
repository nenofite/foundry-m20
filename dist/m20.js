/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your system, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your system
 */
// Import TypeScript modules
import { registerAllSettings } from './module/settings.js';
import { preloadTemplates } from './module/preloadTemplates.js';
import { MicroliteActor } from "./actor/actor.js";
import { MicroliteActorSheet } from "./actor/actor-sheet.js";
import { MicroliteItem } from "./item/item.js";
import { MicroliteItemSheet } from "./item/item-sheet.js";
/* ------------------------------------ */
/* Initialize system					*/
/* ------------------------------------ */
Hooks.once('init', async function () {
    console.log('m20 | Initializing m20');
    // Assign custom classes and constants here
    // Register custom system settings
    registerAllSettings();
    // Preload Handlebars templates
    await preloadTemplates();
    // Register custom sheets (if any)
    game.m20 = {
        MicroliteActor,
        MicroliteItem
    };
    registerAllSettings();
    CONFIG.Combat.initiative = {
        formula: "1d20 + @abilities.agi.mod + @combat.init.value",
        decimals: 2
    };
    // Define custom Entity classes
    CONFIG.Actor.entityClass = MicroliteActor;
    CONFIG.Item.entityClass = MicroliteItem;
    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("m20", MicroliteActorSheet, { makeDefault: true });
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("m20", MicroliteItemSheet, { makeDefault: true });
    // If you need to add Handlebars helpers, here are a few useful examples:
    Handlebars.registerHelper('concat', function () {
        var outStr = '';
        for (var arg in arguments) {
            if (typeof arguments[arg] != 'object') {
                outStr += arguments[arg];
            }
        }
        return outStr;
    });
    Handlebars.registerHelper('toLowerCase', function (str) {
        return str.toLowerCase();
    });
    Handlebars.registerHelper('toUpperCase', function (str) {
        return str.toUpperCase();
    });
    Handlebars.registerHelper('showQuantity', function (quantity) {
        if (typeof quantity === 'number' && quantity !== 1) {
            return `${quantity}x`;
        }
        else {
            return null;
        }
    });
});
/* ------------------------------------ */
/* Setup system							*/
/* ------------------------------------ */
Hooks.once('setup', function () {
    // Do anything after initialization but before
    // ready
});
/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once('ready', function () {
    // Do anything once the system is ready
});
// Add any additional hooks if necessary
