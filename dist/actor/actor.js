import { separateMagicFatigue } from "../module/settings.js";
const BASE_SKILLS = Object.freeze([
    {
        name: "Physical",
        type: "skill",
        img: "icons/svg/upgrade.svg",
        data: {}
    },
    {
        name: "Subterfuge",
        type: "skill",
        img: "icons/svg/upgrade.svg",
        data: {}
    },
    {
        name: "Knowledge",
        type: "skill",
        img: "icons/svg/upgrade.svg",
        data: {}
    },
    {
        name: "Communication",
        type: "skill",
        img: "icons/svg/upgrade.svg",
        data: {}
    },
]);
;
/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class MicroliteActor extends Actor {
    /**
     * Augment the basic actor data with additional dynamic data.
     */
    prepareBaseData() {
        super.prepareBaseData();
        // Make separate methods for each Actor type (character, npc, etc.) to keep
        // things organized.
        if (this.data.type === 'character')
            this._prepareCharacterData();
    }
    /**
     * Prepare Character type specific data
     */
    async _prepareCharacterData() {
        const data = this.data.data;
        // Loop through ability scores, and add their modifiers to our sheet output.
        for (let [key, ability] of Object.entries(data.abilities)) {
            // Calculate the modifier, rounding down toward zero.
            ability.mod = Math.trunc((ability.value - 10) / 2);
        }
        if (separateMagicFatigue.get()) {
            data.health.value = data.health.max - data.fatigue.value - data.magic.value;
        }
        else {
            data.fatigue.value = data.magic.value = 0;
        }
    }
    async addBaseSkills() {
        for (const skill of BASE_SKILLS) {
            await this.createOwnedItem(skill);
        }
    }
    async updateProtoToken() {
        const t = {
            name: this.data.name,
            img: this.data.img,
            actorLink: true,
            bar1: { attribute: 'health' },
            bar2: { attribute: 'wounds' },
            brightSight: 60,
            vision: true,
            displayBars: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
            displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
        };
        await this.update({
            token: t
        });
        for (const ta of this.getActiveTokens()) {
            await ta.update(t);
        }
    }
}
