import QtQuick
import qs.Common
import qs.Modules.Plugins
import "PokeDashGenerator.js" as RoamGen

PluginSettings {
    id: root
    pluginId: "pokeDash"

    SelectionSetting {
        settingKey: "selectedCritter"
        label: I18n.tr("Pokemon")
        // Mirrors pokeDashGenerator.defaultRoster — keep entries in sync if you
        // add/rename/remove critters in pokeDashGenerator.js.
        options: RoamGen.pokeDashGenerator.rosterOptions()
        defaultValue: RoamGen.pokeDashGenerator.defaultRoster[0].name
    }

    SelectionSetting {
        settingKey: "backgroundStyle"
        label: I18n.tr("Background Style")
        options: [
            { label: I18n.tr("Transparent"), value: "transparent" },
            { label: I18n.tr("DMS Theme"), value: "dms" },
            { label: I18n.tr("Glass/Frosted"), value: "glass" }
        ]
        defaultValue: "transparent"
    }

    SliderSetting {
        settingKey: "spriteScale"
        label: I18n.tr("Sprite Scale")
        defaultValue: 100
        minimum: 50
        maximum: 250
        unit: "%"
    }
}
