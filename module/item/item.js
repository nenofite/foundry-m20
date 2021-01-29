/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class MicroliteItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    // Get the Item's data
    const itemData = this.data;
    const actorData = this.actor ? this.actor.data : {};
    const data = itemData.data;
    itemData.img = itemData.img || "icons/svg/upgrade.svg";
  }
}
