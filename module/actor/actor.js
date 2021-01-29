/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class MicroliteActor extends Actor {

  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags;

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    if (actorData.type === 'character') this._prepareCharacterData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    const data = actorData.data;

    // Make modifications to data here. For example:

    // Loop through ability scores, and add their modifiers to our sheet output.
    for (let [key, ability] of Object.entries(data.abilities)) {
      // Calculate the modifier, rounding down toward zero.
      ability.mod = Math.trunc((ability.value - 10) / 2);
    }

    if (data.wounds.max == null) {
      data.wounds.max = data.abilities.str.value;
    }
    if (data.health.max == null) {
      data.health.max = data.abilities.str.value + data.level.value * 6;
    }

    data.health.value = data.health.max - data.fatigue.value - data.magic.value;
  }

}