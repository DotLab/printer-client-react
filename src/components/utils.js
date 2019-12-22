export const TYPE_PRINTER = 'type3d';
export const TYPE_ART = 'typeArt';
export const TYPE_FASHION = 'typeFashion';
export const TYPE_GADGETS = 'typeGadgets';
export const TYPE_HOBBY = 'typeHobby';
export const TYPE_HOUSEHOLD = 'typeHousehold';
export const TYPE_LEARNING = 'typeLearning';
export const TYPE_MODEL = 'typeModel';
export const TYPE_GAME = 'typeGame';

export const PRINTING = 'Printing';
export const ART = 'Art';
export const FASHION = 'Fashion';
export const GADGETS = 'Gadgets';
export const HOBBY = 'Hobby';
export const HOUSEHOLD = 'Household';
export const LEARNING = 'Learning';
export const MODEL = 'Models';
export const GAME = 'Game';

export const DETAIL = 'details';
export const COMMENTS = 'comments';
export const MAKES = 'makes';
export const REMIXES = 'remixes';
export const LICENSE = 'license';

const PRINTER_ACCESSORIES = '3D printer accessories';
const PRINTER = '3D printers';
const PRINTER_EXTRUDERS = '3D printer extruders';
const PRINTER_PARTS = '3D printer parts';
const PRINTER_TESTS = '3D printer tests';

const ART_2D = '2D art';
const ART_TOOLS = 'Art tools';
const ART_BADES = 'Coins & Badges';
const ART_INTERACTIVE = 'Interactive art';
const ART_MATH = 'Math art';
const ART_SCAN = 'Scans & Replicas';
const ART_SCULPTURES = 'Sculptures';
const ART_LOGO = 'Logo';

const FASHION_ACCESSORIES = 'Accessories';
const FASHION_BRACELETS = 'Bracelets';
const FASHION_COSTUME = 'Costume';
const FASHION_EARRINGS = 'Earrings';
const FASHION_GLASSES = 'Glasses';
const FASHION_JEWELRY = 'Jewelry';
const FASHION_KEYCHAINS = 'Keychains';
const FASHION_RINGS = 'Rings';

const GADGETS_AUDIO = 'Audio';
const GADGETS_CAMERA = 'Camera';
const GADGETS_COMPUTER = 'Computer';
const GADGETS_MOBILE = 'Mobile phone';
const GADGETS_TABLET = 'Tablet';
const GADGETS_GAMES = 'Video game';

const HOBBY_AUTO = 'Automotive';
const HOBBY_DIY = 'DIY';
const HOBBY_ELECTRONICS = 'Electronics';
const HOBBY_MUSIC = 'Music';
const HOBBY_RC = 'RC vehicles';
const HOBBY_ROBOTICS = 'Robotics';
const HOBBY_SPORT = 'Sports';

const HOUSEHOLD_BATHROOM = 'Bathroom';
const HOUSEHOLD_CONTAINERS = 'Containers';
const HOUSEHOLD_DECOR = 'Decor';
const HOUSEHOLD_SUPPLY = 'Supply';
const HOUSEHOLD_DINING = 'Kitchen & Dining';
const HOUSEHOLD_OFFICE = 'Office';
const HOUSEHOLD_ORGANIZATION = 'Organization';
const HOUSEHOLD_OUTDOOR = 'Outdoor';
const HOUSEHOLD_PETS = 'Pets';

const LEARNING_BIO = 'Biology';
const LEARNING_ENG = 'Engineering';
const LEARNING_MATH = 'Math';
const LEARNING_PHYS = 'Physics';

const MODEL_ANIMAL = 'Animals';
const MODEL_BUILDING = 'Buildings';
const MODEL_CREATURES = 'Creatures';
const MODEL_FOOD = 'Food & drink';
const MODEL_FURNITURE = 'Model furniture';
const MODEL_ROBOTS = 'Model robots';
const MODEL_PEOPLE = 'People';
const MODEL_PROPS = 'Props';
const MODEL_VEHICLES = 'VEHICLES';

const GAME_CHESS = 'Chess';
const GAME_DICE = 'Dice';
const GAME_MECH = 'Mechanical toys';
const GAME_PLAYSETS = 'Playsets';
const GAME_PUZZLES = 'Puzzles';
const GAME_TOY = 'Toy & accessories';

const types = {
  'type3d': [PRINTER_ACCESSORIES, PRINTER, PRINTER_EXTRUDERS, PRINTER_PARTS, PRINTER_TESTS],
  'typeArt': [ART_2D, ART_TOOLS, ART_BADES, ART_INTERACTIVE, ART_MATH, ART_SCAN, ART_SCULPTURES, ART_LOGO],
  'typeFashion': [FASHION_ACCESSORIES, FASHION_BRACELETS, FASHION_COSTUME, FASHION_EARRINGS, FASHION_GLASSES,
    FASHION_JEWELRY, FASHION_KEYCHAINS, FASHION_RINGS],
  'typeGadgets': [GADGETS_AUDIO, GADGETS_CAMERA, GADGETS_COMPUTER, GADGETS_MOBILE, GADGETS_TABLET, GADGETS_GAMES],
  'typeHobby': [HOBBY_AUTO, HOBBY_DIY, HOBBY_ELECTRONICS, HOBBY_MUSIC, HOBBY_RC, HOBBY_ROBOTICS, HOBBY_SPORT],
  'typeHousehold': [HOUSEHOLD_BATHROOM, HOUSEHOLD_CONTAINERS, HOUSEHOLD_DECOR, HOUSEHOLD_DINING,
    HOUSEHOLD_SUPPLY, HOUSEHOLD_OFFICE, HOUSEHOLD_ORGANIZATION, HOUSEHOLD_OUTDOOR, HOUSEHOLD_PETS],
  'typeLearning': [LEARNING_BIO, LEARNING_ENG, LEARNING_MATH, LEARNING_PHYS],
  'typeModel': [MODEL_ANIMAL, MODEL_BUILDING, MODEL_CREATURES, MODEL_FOOD, MODEL_FURNITURE, MODEL_ROBOTS,
    MODEL_PEOPLE, MODEL_PROPS, MODEL_VEHICLES],
  'typeGame': [GAME_CHESS, GAME_DICE, GAME_MECH, GAME_PLAYSETS, GAME_PUZZLES, GAME_TOY],
};

export function lookupSubType(type) {
  return types[type];
}

export const CC_BY ='CC-BY';
export const CC_BY_SA ='CC-BY-SA';
export const CC_BY_ND ='CC-BY-ND';
export const CC_BY_NC ='CC-BY-NC';
export const CC_BY_NC_SA ='CC-BY-NC-SA';
export const CC_BY_NC_ND ='CC-BY-NC-ND';
export const CC_PD ='CC-PD';
export const GNU_GPL ='GNU-GPL';
export const GNU_LGPL ='GNU-LGPL';
export const BSD ='BSD';

export const LICENSE_CC_BY = 'Creative Commons - Attribution';
export const LICENSE_CC_BY_SA = 'Creative Commons - Attribution - Share Alike';
export const LICENSE_CC_BY_ND = 'Creative Commons - Attribution - No Derivatives';
export const LICENSE_CC_BY_NC = 'Creative Commons - Attribution - Non-Commercial';
export const LICENSE_CC_BY_NC_SA = 'Creative Commons - Attribution - Non-Commercial - Share Alike';
export const LICENSE_CC_BY_NC_ND = 'Creative Commons - Attribution - Non-Commercial - No Derivatives';
export const LICENSE_CC_PD = 'Creative Commons - Public Domain Dedication';
export const LICENSE_GNU_GPL = 'GNU - GPL';
export const LICENSE_GNU_LGPL = 'GNU - LGPL';
export const LICENSE_BSD = 'BSD';

export const ROUTE_NEW_THING = 'New thing';
export const ROUTE_NEW_CUSTOMIZABLE = 'New customizable';
export const ROUTE_PROFILE = 'profile';
export const ROUTE_BOOKMARK = 'bookmark';
export const ROUTE_MAKE = 'make';
export const ROUTE_THING = 'thing';
export const ROUTE_SETTINGS = 'settings';
export const ROUTE_LOGOUT = 'logout';
export const ROUTE_INVALID = 'invalid';

export const brands = ['Other',
  'MakerBot',
  'Afinia',
  'Airwolf 3D',
  'B9Creations',
  'CEL',
  'Deezmaker',
  'Deltaprintr',
  'Formalabs',
  'Hyrel 3D',
  'Leapfrog',
  'LulzBot',
  'MakerGear',
  'Printrbot',
  'RepRap',
  'Robo 3D',
  'SeeMeCNC',
  'Solidoodle',
  'Stratasys',
  'Tinkerine',
  'Type A Machines',
  'Ultimaker',
  'Up',
  '3D Systems',
  'Zortrax',
  'FlashForge',
  'BCN3D',
  'PowerSpec',
  'Prusa',
  'BoXZY',
  'Wanhao ',
  'Rostock',
  'AutoDesk',
  'DAGOMA',
  'MK3',
  'XYZprinting',
  'TEVO',
  'Creality',
  'H800',
  'eMotion Tech ',
  'Anycubic',
  'Monoprice',
  'Dremel Digilab',
  'Anet',
  'Sculpto',
  'Peopoly ',
  'Tiertime',
  'Zonestar',
  'Dagoma',
  'Velleman',
  'Raise3D '];
