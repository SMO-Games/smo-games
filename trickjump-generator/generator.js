const trickjumpText = document.getElementById("trickjumpName");
const trickjumpDifficultyText = document.getElementById("trickjumpDifficulty");


const restrictions = [
    "Relaxless", "MWless", "TTless", "Spinless"
]

const jumpVariant = [
    "", "", "", "",
    "True", "Truer", "Truest",
    "Vault",
    "Left", "Lefter", "Right", "Righter",
    "Reverse", "Upper"
];

const kingdoms = [
    "Cap", "Cascade", "Sand",
    "Lake", "Wooded", "Cloud", "Lost",
    "Metro", "Snow", "Seaside", "Luncheon",
    "Ruined", "Bowser's", "Moon",
    "Mushroom", "Dark Side", "Darker"
];

const adjectives = [
    "Fruity", "Misogynistic", "Homophobic", "Transphobic",
    "Captureless",
    "Prehistoric", "Grassy", "Broken", "Ancient", "Archaic", "Rocky", "Final", "Triassic",
    "Riveting", "Rampageous",
    "Floral", "Frozen", "Snowy", "Dusty", "Sunny", "Botanic",
    "Sandy", "Antique", "Sinking", "Toxic",
    "Breezy",
    "Frantic", "Industrial", "Rusty",
    "Cloudy", "Lethal",
    "Metallic", "Mini", "Airborne", "Resplendent",
    "Cosmic", "Galactic", 
    "Dimensional", "Oddity", "Abyssal",
    "Royal",
    "Silent", "Tranquil", 
]

const nouns = [
    // i swear they've used these it's not just me being weird...
    "Cancer",
    "Misogyny", "Homophobia", "Transphobia",
    "Church",
    "Garden", "Fountain", "Well", "Forest", "Castle", "Catastrophe", "Valley", "Treetops",
    "Block", "Rail", "Ship", "Odyssey",
    "Trampoline", "Fall", "Passageway",
    "Entrance", "Conquest", "Piercer", "Voyage", "Cliffside", "Icicle", "Heist", "Cacti", "Caveman", "Desert", "Moon", "Step", "Neighbourhood", "Brickwork",
    "Flower", "Bruncheon", "Zipline", "Ledge", "Visitor",
    "Road", "Flight", "Shortcut", "Edge", "Poison", "Cloud", "Balance", "Wood", "Vines", "Labyrinth",
    "Stairs", "Nimbus",
    "Meme", "Tree", "Incision", "Tumble", "Headache", "Burns", "Plunge", "Paradise",
    "Car", "Festival", "Dumpster", "Clash", "Construction", "Crusade", "Jaywalker", "Gold", "Disturber", "Intersection", "Towers", "A.C.", "Catwalk", "Girder", "Storm",
    "Frostbite", "Terror", "Frost", "Gambit", "Attack", "Fool",
    "Veggie", "Cliff", "Buffet", "Great Wall of", "Great Canal of", "Flash", "Punishment", "Animosity", "Volition",
    "Masochist", "Massacre", "Necrophobia", 
    "Summit", "Chasm", "Torch", "Jaunt", "Burnstile", "Collapse", "Domain", "Downfall", "Attack",
    "Table", "Wedding", "Interstellar", "Vertigo", "Bonker", "Kenophobia", 
    "Meltdown", "Fire"
]

const entities = [
    "Dog", "Toad", "Frog", "Eel", "Mermaid", "Peach", "Knucklotec", "Luigi", "Zipper", "Uproot", "Rocket", "Sherm", "Goomba", 
    "Sheep", "Beetle", "Klepto", "Amiibo", "Wiggler", "Banzai", "Ty-foo", "Scarecrow", "Gushen", "Fork", "Firebro", "Panbro",
    "Mummy", "Dragon", "Pokio", "Ogre", "Lakitu", "Jizo", "Bullet", "Glydon", "Taxi"
]

const jumpType = [
    "Dram", "Mard", "Gordon Dramsay", "Yellow Dram",
    "Leap", "Gap", "Crossing", 
    "Overpass", "Bypass", "Impasse", 
    "Ascent", "Descent",
    "Evader", "Hopper", "Escape",
    "Beans", "Roll", "Assault",
    "Legend", "God", "Impossible"
];

const difficulties = [
    "Beginner", "Intermediate", "Advanced", "Expert", "Master",
    "Low Elite", "Mid Elite", "High Elite", "Insanity", "God", "Hell"
]

let restriction;
let variant;
let type;
let kingdom;
let noun1;
let noun2;
let adjective;
let entity;
let difficulty;

let trickjumpName = "";

function generateTrickjump(){

    trickjumpName = "";

    restriction = restrictions[Math.floor(Math.random() * restrictions.length)];
    variant = jumpVariant[Math.floor(Math.random() * jumpVariant.length)];
    type = jumpType[Math.floor(Math.random() * jumpType.length)];
    kingdom = kingdoms[Math.floor(Math.random() * kingdoms.length)];
    noun1 = nouns[Math.floor(Math.random() * nouns.length)];
    noun2 = nouns[Math.floor(Math.random() * nouns.length)];
    adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    entity = entities[Math.floor(Math.random() * entities.length)];

    difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];

    // 1 in 10 chance of having a restriction
    if(Math.floor(Math.random()*10 + 1) === 1){
        trickjumpName += `${restriction} `;
    }

    trickjumpName += `${variant} `; // always has a variant

    // 1 in 8 chance of having a kingdom
    if(Math.floor(Math.random()*8 + 1) === 1){
        trickjumpName += `${kingdom} `;
    }

    trickjumpName += `${adjective} `; // always has an adjective
    trickjumpName += `${noun1} `; // always has at least one noun

    // 1 in 4 chance of having a second noun
    if(Math.floor(Math.random()*4 + 1) === 1){
        trickjumpName += `${noun2} `;
    }

    // 1 in 6 chance of having an entity
    if (Math.floor(Math.random()*6 + 1) === 1){
        trickjumpName += `${entity} `;
    }

    trickjumpName += `${type} `; // always has a jump type

    // 1 in 10 chance of being full landing
    if (Math.floor(Math.random()*6 + 1) === 1){
        trickjumpName += `Full Landing `;
    }


    trickjumpText.innerHTML = `${trickjumpName}`;
    trickjumpDifficultyText.innerHTML = `Difficulty: ${difficulty}`;
}