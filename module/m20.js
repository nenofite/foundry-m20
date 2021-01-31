// Import Modules
import { MicroliteActor } from "./actor/actor.js";
import { MicroliteActorSheet } from "./actor/actor-sheet.js";
import { MicroliteItem } from "./item/item.js";
import { MicroliteItemSheet } from "./item/item-sheet.js";
import { registerAllSettings } from "./settings.js";

Hooks.once('init', async function () {

  game.m20 = {
    MicroliteActor,
    MicroliteItem
  };

  registerAllSettings();

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
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
    if (quantity != null && quantity !== 1) {
      return `${quantity}x`;
    } else {
      return null;
    }
  })
});