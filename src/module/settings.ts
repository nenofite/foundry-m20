class M20Setting<T> {
    constructor(public name: string, public config: any) { }

    register() {
        return game.settings.register('m20', this.name, this.config);
    }

    get(): T {
        return game.settings.get('m20', this.name);
    }
}

export const useBackgrounds = new M20Setting<boolean>('useBackgrounds',
    {
        name: "Use backgrounds",
        hint: "Character sheets have Microlite2020's backgrounds instead of skills",
        scope: 'world',
        config: true,
        type: Boolean,
        default: false,
        onChange: _value => updateAllActors(),
    });

export const separateMagicFatigue = new M20Setting<boolean>('separateMagicFatigue', {
    name: "Separate magic points",
    hint: "Track magic and fatigue separately. Both are summed to calculate HP.",
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
    onChange: _value => updateAllActors(),
});

export function registerAllSettings() {
    useBackgrounds.register();
    separateMagicFatigue.register();
}

async function updateAllActors() {
    for (const a of game.actors) {
        a.render(false);
    }
}