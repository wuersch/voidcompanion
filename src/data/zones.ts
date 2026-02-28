/**
 * Static curated zone/chapter/quest data for Midnight campaign tracking.
 * Quest IDs and names sourced from Wowhead (2026-02-28).
 */

import eversongImg from '../../assets/zones/eversong-woods.jpg'
import zulamanImg from '../../assets/zones/zulaman.jpg'
import harandarImg from '../../assets/zones/harandar.jpg'
import silvermoonImg from '../../assets/zones/silvermoon.jpg'
import voidstormImg from '../../assets/zones/voidstorm.jpg'

export type QuestDef = {
  questId: number
  questName: string
}

export type ChapterDef = {
  name: string
  quests: QuestDef[]
}

export type ZoneDef = {
  zoneId: string
  zoneName: string
  achievementId: number
  achievementName: string
  color: string // CSS variable value, e.g. 'var(--color-zone-eversong)'
  image: string // Vite-resolved import path
  chapters: ChapterDef[]
}

export const ZONES: ZoneDef[] = [
  {
    zoneId: 'eversong-woods',
    zoneName: 'Eversong Woods',
    achievementId: 41802,
    achievementName: 'Eversong In Reprise',
    color: 'var(--color-zone-eversong)',
    image: eversongImg,
    chapters: [
      {
        name: 'Chapter 1: Whispers in the Twilight',
        quests: [
          { questId: 86733, questName: 'Silvermoon Negotiations' },
          { questId: 86734, questName: 'Diplomacy' },
          { questId: 86735, questName: 'Paved in Ash' },
          { questId: 86736, questName: 'Paved in Ash' },
          { questId: 86737, questName: 'Fair Breeze, Light Bloom' },
          { questId: 86738, questName: 'Sharpmaw' },
          { questId: 86739, questName: 'Fairbreeze Favors' },
          { questId: 86740, questName: 'Displaced Denizens' },
          { questId: 86741, questName: 'Lightbloom Looming' },
          { questId: 86742, questName: 'Curious Cultivation' },
          { questId: 86743, questName: 'Trimming the Lightbloom' },
          { questId: 86744, questName: 'Seeking Truth' },
          { questId: 86745, questName: 'Silvermoon Must Know' },
        ],
      },
      {
        name: 'Chapter 2: Ripple Effects',
        quests: [
          { questId: 86637, questName: 'Anything but Reprieve' },
          { questId: 86638, questName: 'Choking Tendrils' },
          { questId: 86639, questName: "What's Left" },
          { questId: 86640, questName: 'Premonition' },
          { questId: 86641, questName: 'Old Scars' },
          { questId: 86642, questName: 'A Foe Unseen' },
          { questId: 86643, questName: 'Following the Root' },
          { questId: 86644, questName: 'Gods Before Us' },
          { questId: 86646, questName: 'An Impasse' },
          { questId: 86647, questName: 'Beat of Blood' },
          { questId: 86648, questName: 'Light Guide Us' },
          { questId: 86649, questName: 'Past Redemption' },
          { questId: 86650, questName: 'Fractured' },
        ],
      },
      {
        name: 'Chapter 3: Shadowfall',
        quests: [
          { questId: 86621, questName: 'The Wayward Magister' },
          { questId: 86623, questName: 'Appeal to the Void' },
          { questId: 86624, questName: 'Rational Explanation' },
          { questId: 90907, questName: 'The First to Know' },
          { questId: 86622, questName: 'Chance Meeting' },
          { questId: 86626, questName: 'The Ransacked Lab' },
          { questId: 86632, questName: 'The Battle for Tranquillien' },
          { questId: 90493, questName: 'The Heart of Tranquillien' },
          { questId: 90509, questName: 'The Traitors of Tranquillien' },
          { questId: 90494, questName: 'The Missing Magister' },
          { questId: 86781, questName: 'Face the Past' },
          { questId: 86634, questName: 'The Past Keeps Watch' },
          { questId: 86633, questName: 'Comprehend the Void' },
          { questId: 86635, questName: 'To Deatholme' },
          { questId: 86636, questName: 'Void Walk With Me' },
        ],
      },
    ],
  },
  {
    zoneId: 'zulaman',
    zoneName: "Zul'Aman",
    achievementId: 41803,
    achievementName: "For Zul'Aman!",
    color: 'var(--color-zone-zulaman)',
    image: zulamanImg,
    chapters: [
      {
        name: 'Chapter 1: Dis Was Our Land',
        quests: [
          { questId: 86708, questName: "The Gates of Zul'Aman" },
          { questId: 86710, questName: 'The Line Must be Drawn Here' },
          { questId: 90749, questName: 'Our Mutual Enemy' },
          { questId: 86711, questName: 'Amani Clarion Call' },
          { questId: 86868, questName: 'Goodwill Tour' },
          { questId: 86719, questName: 'Important Amani' },
          { questId: 86717, questName: 'Show Us Your Worth' },
          { questId: 86716, questName: 'Armed by Light' },
          { questId: 86721, questName: 'Everything We Worked For' },
          { questId: 86718, questName: 'Twilight Bled' },
          { questId: 86715, questName: 'Rituals Cut Short' },
          { questId: 86712, questName: 'The Amani Stand Strong' },
          { questId: 86720, questName: 'Break the Blade' },
          { questId: 86722, questName: 'Heart of the Amani' },
          { questId: 86723, questName: 'Isolation' },
          { questId: 86652, questName: 'Left in the Shadows' },
        ],
      },
      {
        name: 'Chapter 2: Where War Slumbers',
        quests: [
          { questId: 86681, questName: 'Den of Nalorakk: A Taste of Vengeance' },
          { questId: 86682, questName: 'Den of Nalorakk: Waking de Bear' },
          { questId: 91958, questName: 'Den of Nalorakk: Unforgiven' },
        ],
      },
      {
        name: "Chapter 3: Path of de Hash'ey",
        quests: [
          { questId: 86653, questName: 'The Path of the Amani' },
          { questId: 86654, questName: 'Gnarldin Bashing' },
          { questId: 86655, questName: 'De Ancient Path' },
          { questId: 89334, questName: 'Ahead of the Issue' },
          { questId: 86656, questName: 'Brutal Feast' },
          { questId: 86809, questName: 'Test of Conviction' },
          { questId: 86657, questName: 'Shadebasin Watch' },
          { questId: 86658, questName: 'The Crypt in the Mist' },
          { questId: 86660, questName: 'Rescue from the Shadows' },
          { questId: 86659, questName: 'Breaching the Mist' },
          { questId: 92084, questName: "Halazzi's Guile" },
          { questId: 86661, questName: 'Coals of a Dead Loa' },
          { questId: 86808, questName: 'The Riddled Speaker' },
          { questId: 86663, questName: 'Embers to a Flame' },
          { questId: 86664, questName: 'Seer or Sear' },
          { questId: 86665, questName: 'Face in the Fire' },
          { questId: 90772, questName: 'The Flames Rise Higher' },
          { questId: 86666, questName: 'In the Shadow of Rebirth' },
        ],
      },
      {
        name: 'Chapter 4: De Amani Never Die',
        quests: [
          { questId: 86683, questName: "Hash'ey Away" },
          { questId: 86684, questName: "The Blade's Edge" },
          { questId: 86685, questName: 'Chip and Shatter' },
          { questId: 86686, questName: 'Light Indiscriminate' },
          { questId: 86687, questName: 'Conduit Crisis' },
          { questId: 91001, questName: 'Clear de Way' },
          { questId: 86692, questName: 'Blade Shattered' },
          { questId: 86693, questName: "De Legend of de Hash'ey" },
          { questId: 91062, questName: 'Broken Bridges' },
        ],
      },
    ],
  },
  {
    zoneId: 'harandar',
    zoneName: 'Harandar',
    achievementId: 41804,
    achievementName: 'One Does Not Simply Walk Into Harandar',
    color: 'var(--color-zone-harandar)',
    image: harandarImg,
    chapters: [
      {
        name: 'Chapter 1: Of Caves and Cradles',
        quests: [
          { questId: 89402, questName: 'Harandar' },
          { questId: 86899, questName: 'The Root Cause' },
          { questId: 86900, questName: "To Har'athir" },
          { questId: 86901, questName: 'The Rift and the Den' },
          { questId: 86907, questName: 'The Den of Echoes' },
          { questId: 86910, questName: "Koozat's Trample" },
          { questId: 86911, questName: 'Echoes and Memories' },
          { questId: 90094, questName: 'Echo of the Hunt' },
          { questId: 90095, questName: 'Echo of the Call' },
          { questId: 86912, questName: 'Down the Rootways' },
          { questId: 86913, questName: "A Hut in Har'mara" },
          { questId: 86914, questName: "Tending to Har'mara" },
          { questId: 86929, questName: 'The Council Assembles' },
          { questId: 86930, questName: 'To Sow the Seed' },
          { questId: 89034, questName: 'Burning Bitterblooms' },
          { questId: 86973, questName: "Halting Harm in Har'mara" },
          { questId: 86942, questName: 'Culling the Spread' },
          { questId: 86944, questName: 'Seeds of the Rift' },
          { questId: 86956, questName: 'The Traveling Flowers' },
        ],
      },
      {
        name: 'Chapter 2: Emergence',
        quests: [
          { questId: 86883, questName: 'The Frenzied March' },
          { questId: 86884, questName: 'Cull and Burn' },
          { questId: 86885, questName: 'Stem the Tides' },
          { questId: 86887, questName: 'Expeditious Retreat' },
          { questId: 86891, questName: 'A Last Resort' },
          { questId: 86892, questName: 'Survive' },
          { questId: 86894, questName: "The Gift of Aln'hara" },
          { questId: 86896, questName: 'Light Finds a Way' },
          { questId: 86897, questName: 'Quelling the Frenzy' },
          { questId: 86898, questName: 'Rise of the Haranir' },
        ],
      },
      {
        name: 'Chapter 3: Call of the Goddess',
        quests: [
          { questId: 86864, questName: 'Watch the Den' },
          { questId: 86836, questName: 'The Hunter Awaits' },
          { questId: 86851, questName: 'The Foundation of Aln' },
          { questId: 86855, questName: 'Consequences of Our Duty' },
          { questId: 86856, questName: 'Dampening the Call' },
          { questId: 86857, questName: 'Descent into the Rift' },
          { questId: 86858, questName: 'The Madness Roots Deep' },
          { questId: 86859, questName: 'Grinding Out a Solution' },
          { questId: 86860, questName: 'Before They Grow' },
          { questId: 86861, questName: 'Herding Manifestations' },
          { questId: 86862, questName: 'The Greater They Aln' },
          { questId: 86865, questName: 'In Search of the Problem' },
          { questId: 94677, questName: 'The Missing Rootwarden' },
          { questId: 86866, questName: 'Can We Heal This?' },
          { questId: 86882, questName: 'Alndust in Right Hands' },
          { questId: 86877, questName: 'Righteous Pruning' },
          { questId: 86880, questName: 'Our Beloved, Returned' },
          { questId: 86881, questName: 'At the Root' },
          { questId: 86867, questName: 'Into the Lightbloom' },
          { questId: 86890, questName: 'Tell the People What You Have Seen' },
          { questId: 86874, questName: 'Culling the Light' },
        ],
      },
    ],
  },
  {
    zoneId: 'silvermoon',
    zoneName: "Silvermoon / Arator",
    achievementId: 41805,
    achievementName: "Arator's Journey",
    color: 'var(--color-zone-silvermoon)',
    image: silvermoonImg,
    chapters: [
      {
        name: 'Chapter 1: The Path of Light',
        quests: [
          { questId: 89193, questName: 'Arator' },
          { questId: 86837, questName: 'Meet at the Sunwell' },
          { questId: 86838, questName: 'Renewal for the Weary' },
          { questId: 86839, questName: "Relics of Light's Hope" },
          { questId: 86840, questName: 'Flickering Hope' },
          { questId: 86841, questName: 'Relics of Paladins Past' },
          { questId: 86842, questName: 'Scarlet Power' },
          { questId: 86843, questName: 'Light Miswielded' },
          { questId: 86844, questName: 'Light Repurposed' },
          { questId: 92136, questName: 'Infusion of Hope' },
          { questId: 86902, questName: 'Relinquishing Relics' },
          { questId: 86845, questName: 'The Sunwalker Path' },
          { questId: 91000, questName: 'A Humble Servant' },
          { questId: 86846, questName: 'Resupplying Our Suppliers' },
          { questId: 89338, questName: 'Gathering Plowshares' },
        ],
      },
      {
        name: 'Chapter 2: Regrets of the Past',
        quests: [
          { questId: 86822, questName: 'One Final Relic' },
          { questId: 86823, questName: 'The Dark Horde' },
          { questId: 86824, questName: 'None Left Standing' },
          { questId: 86825, questName: 'Faithful Servant, Faithless Cause' },
          { questId: 91391, questName: 'Still Scouting' },
          { questId: 86827, questName: 'Due Recognition' },
          { questId: 86826, questName: 'Nagosh the Scarred' },
          { questId: 91842, questName: 'Disarm the Dark Horde' },
          { questId: 86828, questName: "Not Just a Troll's Bane" },
          { questId: 86831, questName: 'Warriors Without a Warlord' },
          { questId: 86830, questName: 'A True Horde of Dark Horde' },
          { questId: 86829, questName: 'A Landmark Moment' },
          { questId: 91726, questName: 'Unstoppable Force' },
          { questId: 86832, questName: 'A Worthy Forge' },
          { questId: 86833, questName: 'A Bulwark Remade' },
          { questId: 86903, questName: 'The Arcantina' },
          { questId: 91787, questName: 'The Journey Ends' },
        ],
      },
    ],
  },
  {
    zoneId: 'voidstorm',
    zoneName: 'Voidstorm',
    achievementId: 41806,
    achievementName: 'Breaching the Voidstorm',
    color: 'var(--color-zone-voidstorm)',
    image: voidstormImg,
    chapters: [
      {
        name: 'Chapter 1: Into the Abyss',
        quests: [
          { questId: 89388, questName: 'Voidstorm' },
          { questId: 92061, questName: 'Rising Storm' },
          { questId: 86543, questName: "Magisters' Terrace: Homecoming" },
          { questId: 86549, questName: 'No Fear of the Dark' },
          { questId: 86557, questName: 'A Matter of Strife and Death' },
          { questId: 86558, questName: 'Save a Piece of Mind' },
          { questId: 86559, questName: 'The Far, Far Frontier' },
          { questId: 86561, questName: 'A Strange, Different World' },
          { questId: 86562, questName: 'Dancing with Death' },
          { questId: 86565, questName: 'No Prayer for the Wicked' },
        ],
      },
      {
        name: 'Chapter 2: Dawn of Reckoning',
        quests: [
          { questId: 86509, questName: 'Friend or Fiend' },
          { questId: 86510, questName: 'Domus Penumbra' },
          { questId: 90571, questName: 'The Lay of the Beast' },
          { questId: 86511, questName: 'Edge of the Abyss' },
          { questId: 86512, questName: 'The Harvest' },
          { questId: 86513, questName: 'Face the Tide' },
          { questId: 86514, questName: 'Lady of the Pit' },
          { questId: 86515, questName: 'Hollow Hunger' },
          { questId: 86516, questName: 'All Become Prey' },
          { questId: 86517, questName: 'Vanished in the Void' },
          { questId: 86518, questName: 'The Mantle of Predation' },
          { questId: 86519, questName: 'Abyssus, Abyssum' },
          { questId: 86520, questName: 'Hunt the Light' },
          { questId: 86521, questName: 'Nexus-Point Xenas: Eclipse' },
          { questId: 86522, questName: 'Daylight is Breaking' },
        ],
      },
      {
        name: "Chapter 3: The Night's Veil",
        quests: [
          { questId: 86536, questName: 'Reliable Enemies' },
          { questId: 89249, questName: 'Overwhelmed' },
          { questId: 86531, questName: 'Work Disruption' },
          { questId: 86530, questName: 'First, The Shells' },
          { questId: 86528, questName: 'A Cracked Holokey' },
          { questId: 86538, questName: 'Second, The Fuel' },
          { questId: 86537, questName: 'Network Insecurity' },
          { questId: 88768, questName: 'Agents of Darkness' },
          { questId: 86540, questName: 'Third, Blow It Up' },
          { questId: 86541, questName: 'Just In Case...' },
          { questId: 86542, questName: 'Flicker in the Dark' },
          { questId: 86544, questName: 'Post-Mortem' },
          { questId: 86545, questName: "The Light's Brand" },
          { questId: 86539, questName: 'A Naaru!' },
        ],
      },
    ],
  },
]
