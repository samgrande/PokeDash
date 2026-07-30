import QtQuick
import Quickshell
import qs.Common
import qs.Services
import qs.Modules.Plugins
import "PokeDashGenerator.js" as RoamGen

DesktopPluginComponent {
    id: root

    minWidth: 84
    minHeight: 84

    property real spriteScale: (pluginData.spriteScale ?? 100) / 100
    property string backgroundStyle: pluginData.backgroundStyle ?? "transparent"
    property string selectedCritter: pluginData.selectedCritter ?? RoamGen.PokeDashGenerator.defaultRoster[0].name

    readonly property color bgColor: {
        if (backgroundStyle === "dms") return Theme.surfaceContainer
        if (backgroundStyle === "glass") return Qt.rgba(0, 0, 0, 0.15)
        return "transparent"
    }

    readonly property var roster: RoamGen.PokeDashGenerator.defaultRoster
    readonly property var activeCritter: RoamGen.PokeDashGenerator.getByName(root.selectedCritter, root.roster)

    Rectangle {
        anchors.fill: parent
        radius: Theme.cornerRadius
        color: root.bgColor
        border.color: backgroundStyle === "glass" ? Qt.rgba(255, 255, 255, 0.1) : "transparent"
        border.width: backgroundStyle === "glass" ? 1 : 0
    }

    Item {
        id: stage
        anchors.fill: parent

        Item {
            id: critter
            anchors.centerIn: parent
            width: root.activeCritter.frameW * 2 * root.spriteScale
            height: root.activeCritter.frameH * 2 * root.spriteScale

            // --- Static single/multi-frame sprite sheet, idle stance only ---
            Image {
                id: frameView
                anchors.fill: parent
                visible: !root.activeCritter.animated
                source: root.activeCritter.animated ? "" : root.activeCritter.sheet
                fillMode: Image.Pad
                sourceClipRect: Qt.rect(frameIndex * root.activeCritter.frameW, 0, root.activeCritter.frameW, root.activeCritter.frameH)
                property int frameIndex: 0
                SequentialAnimation on frameIndex {
                    loops: Animation.Infinite
                    running: !root.activeCritter.animated
                    PauseAnimation { duration: 200 }
                    ScriptAction { script: frameView.frameIndex = (frameView.frameIndex + 1) % Math.max(1, root.activeCritter.frames) }
                }
            }

            // --- Animated GIF source (idle/stance animation baked into the file) ---
            AnimatedImage {
                id: gifView
                anchors.fill: parent
                visible: root.activeCritter.animated
                source: root.activeCritter.animated ? root.activeCritter.sheet : ""
            }
        }
    }
}
