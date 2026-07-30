/**
 * pokeDash Generator - critter roster + lookup helpers
 * Widget shows a single idle critter selected from this roster.
 * Kept as a plain JS module (no QML deps) so widget/settings just call into it.
 */

var PokeDashGenerator = {

  // ---- FILL THIS IN ----
  // Each entry describes one critter's sprite source + animation format.
  // sheet: local file path (file:///...) or remote URL to your own sprite asset.
  // frameW / frameH: pixel size of a single frame.
  // frames: frame count in a horizontal strip (ignored for animated GIF sources).
  // animated: true if `sheet` is a self-animating format (GIF) rather than a static strip.
  defaultRoster: [
    { name: "pikachu", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "bulbasaur", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "charmander", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/4.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "squirtle", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "mew", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/151.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "gengar", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/94.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "eevee", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/133.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "lucario", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/448.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "mimikyu", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/778.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "snorlax", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/143.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "lugia", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/249.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "moltres", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/146.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "zapdos", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/145.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "articuno", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/144.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "cyndaquil", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/155.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "dragonite", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/149.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "vulpix", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/37.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "abra", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/63.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "jigglypuff", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/39.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "psyduck", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/54.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "meowth", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/52.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "ditto", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/132.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "cubone", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/104.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    { name: "bellsprout", sheet: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/69.gif", frameW: 32, frameH: 32, frames: 1, animated: true },
    ],
  // -----------------------

  // Look up a single roster entry by name. Falls back to the first entry.
  getByName: function(name, roster) {
    var list = roster && roster.length ? roster : this.defaultRoster
    for (var i = 0; i < list.length; i++) {
      if (list[i].name === name) return list[i]
    }
    return list[0]
  },

  // Plain list of {label, value} for populating a selection setting.
  rosterOptions: function(roster) {
    var list = roster && roster.length ? roster : this.defaultRoster
    return list.map(function(entry) {
      return { label: entry.name, value: entry.name }
    })
  }
}
