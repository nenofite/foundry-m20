/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class MicroliteItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    this.data.img = this.data.img || this.defaultImg;
    super.prepareData();


    switch (this.data.type) {
      case 'weapon':
        this._prepareWeaponData();
        break;
      default:
        break;
    }
  }

  get defaultImg() {
    switch (this.data.type) {
      case 'skill':
        return "icons/svg/upgrade.svg";
      case 'weapon':
        return "icons/svg/sword.svg";
      default:
        return null;
    }
  }

  get rolls() {
    switch (this.data.type) {
      case 'skill':
        return this._skillRolls;
      case 'weapon':
        return this._weaponRolls;
      default:
        return null;
    }
  }

  get _skillRolls() {
    return ['str', 'agi', 'mind'].map(key => ({
      roll: `d20+${this.data.data.mod}+@abilities.${key}.mod`,
      label: `${this.name} and ${key.toUpperCase()}`,
      button: key.toUpperCase()
    }));
  }

  get _weaponRolls() {
    return [
      { roll: this.data.data.attackRoll, label: `attack with ${this.name}`, button: "attack" },
      { roll: this.data.data.damageRoll, label: `damage of ${this.name}`, button: "damage" },
    ];
  }

  _prepareWeaponData() {
    const data = this.data.data;

    const attackRoll = [data.attack.die || '1d20'];
    if (data.attack.stat) {
      attackRoll.push(`@abilities.${data.attack.stat}.mod`);
    }
    if (data.attack.bonus) {
      attackRoll.push(data.attack.bonus);
    }
    data.attackRoll = attackRoll.join(' + ');

    const damageRoll = [data.damage.die];
    if (data.damage.stat) {
      damageRoll.push(`@abilities.${data.damage.stat}.mod`);
    }
    if (data.damage.bonus) {
      damageRoll.push(data.damage.bonus);
    }
    data.damageRoll = damageRoll.join(' + ');
  }
}
