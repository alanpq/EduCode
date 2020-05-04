/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/modals/Errors.ts":
/*!******************************!*\
  !*** ./src/modals/Errors.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ConnError;
(function (ConnError) {
    ConnError[ConnError["UNKNOWN"] = 0] = "UNKNOWN";
    ConnError[ConnError["UNAUTHORIZED"] = 1025] = "UNAUTHORIZED";
    ConnError[ConnError["ROOM_NOT_FOUND"] = 16449] = "ROOM_NOT_FOUND";
    ConnError[ConnError["ROOM_MAX_CAPACITY"] = 16433] = "ROOM_MAX_CAPACITY";
})(ConnError = exports.ConnError || (exports.ConnError = {}));


/***/ }),

/***/ "./src/server/index.ts":
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
exports.__esModule = true;
var express = __webpack_require__(/*! express */ "express");
var path = __webpack_require__(/*! path */ "path");
var http_1 = __webpack_require__(/*! http */ "http");
var socketio = __webpack_require__(/*! socket.io */ "socket.io");
var logger_1 = __webpack_require__(/*! ./util/logger */ "./src/server/util/logger.ts");
var roomEvents_1 = __webpack_require__(/*! ./modules/roomEvents */ "./src/server/modules/roomEvents.ts");
var app = express();
var _a = process.env.PORT, PORT = _a === void 0 ? 3000 : _a;
var http = http_1.createServer(app);
var io = socketio(http, {
    serveClient: false
});
// FIXME: major security vuln with client id handling - STOP HANDING THEM OUT
io.on('connection', function (client) {
    client.on('subscribeToRoom', function (e) { roomEvents_1.onSubscribe(io, client, e); });
    client.on('createRoom', function (e) { roomEvents_1.onCreate(io, client, e); });
    client.on('disconnect', function (e) { roomEvents_1.onDisconnect(io, client, e); });
});
var publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.get('*client.js', function (req, res) {
    res.sendFile(path.join(__dirname, "client.js"));
});
app.get('/api/rooms', function (req, res) {
    res.json(JSON.stringify(roomEvents_1.rooms));
});
app.get('*', function (req, res) {
    res.sendFile(publicPath + '/index.html');
});
if (__webpack_require__.c[__webpack_require__.s] === module) {
    http.listen(PORT, function () {
        logger_1.logger.info('Server started at http://localhost:' + PORT);
    });
}
exports["default"] = app;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/server/modules/room/onCreate.ts":
/*!*********************************************!*\
  !*** ./src/server/modules/room/onCreate.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var uuid_1 = __webpack_require__(/*! uuid */ "uuid");
var logger_1 = __webpack_require__(/*! ../../util/logger */ "./src/server/util/logger.ts");
var roomEvents_1 = __webpack_require__(/*! ../roomEvents */ "./src/server/modules/roomEvents.ts");
exports.onCreate = function (io, client, options) {
    var id = uuid_1.v4();
    logger_1.logger.info("Creating room " + options.name + " with pwd " + options.password + " @ size " + options.capacity);
    roomEvents_1.rooms[id] = {
        id: id,
        capacity: options.capacity,
        name: options.name,
        password: options.password,
        connections: [],
        host: undefined,
    };
    client.emit('res', id);
};


/***/ }),

/***/ "./src/server/modules/room/onDisconnect.ts":
/*!*************************************************!*\
  !*** ./src/server/modules/room/onDisconnect.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var logger_1 = __webpack_require__(/*! ../../util/logger */ "./src/server/util/logger.ts");
var roomEvents_1 = __webpack_require__(/*! ../roomEvents */ "./src/server/modules/roomEvents.ts");
exports.onDisconnect = function (io, client, reason) {
    var _a;
    var roomID = roomEvents_1.subscribed[client.id];
    if (!roomEvents_1.rooms[roomID])
        return; // room not found
    var room = roomEvents_1.rooms[roomID];
    logger_1.logger.info("Client disconnected from " + room.name + " (" + room.id + ")");
    var conns = room.connections;
    conns.splice(conns.findIndex(function (v, i, o) { return v.id == roomID; }));
    if (room.host == client.id)
        room.host = (_a = conns[0]) === null || _a === void 0 ? void 0 : _a.id;
    if (conns.length == 0) { // room is empty
        // create room destruction timer
        setTimeout(function () {
            if (roomEvents_1.rooms[roomID].connections.length == 0)
                delete roomEvents_1.rooms[roomID];
        }, 5000);
    }
    else {
        io.to(roomID).emit('roomState', room);
    }
};


/***/ }),

/***/ "./src/server/modules/room/onSubscribe.ts":
/*!************************************************!*\
  !*** ./src/server/modules/room/onSubscribe.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var name_gen_1 = __webpack_require__(/*! ../../util/name-gen */ "./src/server/util/name-gen.ts");
var logger_1 = __webpack_require__(/*! ../../util/logger */ "./src/server/util/logger.ts");
var Errors_1 = __webpack_require__(/*! ../../../modals/Errors */ "./src/modals/Errors.ts");
var roomEvents_1 = __webpack_require__(/*! ../roomEvents */ "./src/server/modules/roomEvents.ts");
exports.onSubscribe = function (io, client, options) {
    var _a, _b;
    logger_1.logger.info("Client wishes to Subscribe to room " + options.roomID);
    var room = roomEvents_1.rooms[options.roomID];
    if (room === undefined)
        return client.emit('err', Errors_1.ConnError.ROOM_NOT_FOUND);
    logger_1.logger.info(room.password);
    logger_1.logger.info(options.password);
    if (room.password != '' && room.password != options.password)
        return client.emit('err', Errors_1.ConnError.UNAUTHORIZED);
    if (((_a = room.connections) === null || _a === void 0 ? void 0 : _a.length) >= room.capacity)
        return client.emit('err', Errors_1.ConnError.ROOM_MAX_CAPACITY);
    logger_1.logger.info("Client subscribed to room " + room.name + " (" + options.roomID + ")");
    if (room.host == undefined)
        roomEvents_1.rooms[options.roomID].host = client.id;
    roomEvents_1.rooms[options.roomID].connections.push({
        id: client.id,
        displayName: ((_b = options.user) === null || _b === void 0 ? void 0 : _b.displayName) || name_gen_1.generateName(2)
    });
    roomEvents_1.subscribed[client.id] = options.roomID;
    client.join(options.roomID);
    io.to(options.roomID).emit('roomState', room);
};


/***/ }),

/***/ "./src/server/modules/roomEvents.ts":
/*!******************************************!*\
  !*** ./src/server/modules/roomEvents.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var onCreate_1 = __webpack_require__(/*! ./room/onCreate */ "./src/server/modules/room/onCreate.ts");
exports.onCreate = onCreate_1.onCreate;
var onDisconnect_1 = __webpack_require__(/*! ./room/onDisconnect */ "./src/server/modules/room/onDisconnect.ts");
exports.onDisconnect = onDisconnect_1.onDisconnect;
var onSubscribe_1 = __webpack_require__(/*! ./room/onSubscribe */ "./src/server/modules/room/onSubscribe.ts");
exports.onSubscribe = onSubscribe_1.onSubscribe;
// TODO: move room data (integrate with DB)
exports.rooms = {};
exports.subscribed = {};


/***/ }),

/***/ "./src/server/util/logger.ts":
/*!***********************************!*\
  !*** ./src/server/util/logger.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var winston = __webpack_require__(/*! winston */ "winston");
exports.logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'server' },
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});
if (true) { // print log to console if not in prod
    exports.logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}


/***/ }),

/***/ "./src/server/util/name-gen.ts":
/*!*************************************!*\
  !*** ./src/server/util/name-gen.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var random_1 = __webpack_require__(/*! ./random */ "./src/server/util/random.ts");
exports.generateName = function (length) {
    if (length < 1)
        return "";
    var string = random_1.pickRandom(NOUN);
    for (var i = 0; i < length - 1; i++) {
        string = random_1.pickRandom(ADJ) + string;
    }
    return string;
};
var ADJ = [
    "Defiant",
    "Homeless",
    "Adorable",
    "Delightful",
    "Homely",
    "Quaint",
    "Adventurous",
    "Depressed",
    "Horrible",
    "Aggressive",
    "Determined",
    "Hungry",
    "Real",
    "Agreeable",
    "Different",
    "Hurt",
    "Relieved",
    "Alert",
    "Difficult",
    "Repulsive",
    "Alive",
    "Disgusted",
    "Ill",
    "Rich",
    "Amused",
    "Distinct",
    "Important",
    "Angry",
    "Disturbed",
    "Impossible",
    "Scary",
    "Annoyed",
    "Dizzy",
    "Inexpensive",
    "Selfish",
    "Annoying",
    "Doubtful",
    "Innocent",
    "Shiny",
    "Anxious",
    "Drab",
    "Inquisitive",
    "Shy",
    "Arrogant",
    "Dull",
    "Itchy",
    "Silly",
    "Ashamed",
    "Sleepy",
    "Attractive",
    "Eager",
    "Jealous",
    "Smiling",
    "Average",
    "Easy",
    "Jittery",
    "Smoggy",
    "Awful",
    "Elated",
    "Jolly",
    "Sore",
    "Elegant",
    "Joyous",
    "Sparkling",
    "Bad",
    "Embarrassed",
    "Splendid",
    "Beautiful",
    "Enchanting",
    "Kind",
    "Spotless",
    "Better",
    "Encouraging",
    "Stormy",
    "Bewildered",
    "Energetic",
    "Lazy",
    "Strange",
    "Black",
    "Enthusiastic",
    "Light",
    "Stupid",
    "Bloody",
    "Envious",
    "Lively",
    "Successful",
    "Blue",
    "Evil",
    "Lonely",
    "Super",
    "Excited",
    "Long",
    "Blushing",
    "Expensive",
    "Lovely",
    "Talented",
    "Bored",
    "Exuberant",
    "Lucky",
    "Tame",
    "Brainy",
    "Tender",
    "Brave",
    "Fair",
    "Magnificent",
    "Tense",
    "Breakable",
    "Faithful",
    "Misty",
    "Terrible",
    "Bright",
    "Famous",
    "Modern",
    "Tasty",
    "Busy",
    "Fancy",
    "Motionless",
    "Thankful",
    "Fantastic",
    "Muddy",
    "Thoughtful",
    "Calm",
    "Fierce",
    "Mushy",
    "Thoughtless",
    "Careful",
    "Filthy",
    "Mysterious",
    "Tired",
    "Cautious",
    "Fine",
    "Tough",
    "Charming",
    "Foolish",
    "Nasty",
    "Troubled",
    "Cheerful",
    "Fragile",
    "Naughty",
    "Clean",
    "Frail",
    "Nervous",
    "Ugliest",
    "Clear",
    "Frantic",
    "Nice",
    "Ugly",
    "Clever",
    "Friendly",
    "Nutty",
    "Uninterested",
    "Cloudy",
    "Frightened",
    "Unsightly",
    "Clumsy",
    "Funny",
    "Obedient",
    "Unusual",
    "Colorful",
    "Obnoxious",
    "Upset",
    "Combative",
    "Gentle",
    "Odd",
    "Uptight",
    "Comfortable",
    "Gifted",
    "Concerned",
    "Glamorous",
    "Open",
    "Vast",
    "Condemned",
    "Gleaming",
    "Outrageous",
    "Victorious",
    "Confused",
    "Glorious",
    "Outstanding",
    "Vivacious",
    "Cooperative",
    "Good",
    "Courageous",
    "Gorgeous",
    "Panicky",
    "Wandering",
    "Crazy",
    "Graceful",
    "Perfect",
    "Weary",
    "Creepy",
    "Grieving",
    "Plain",
    "Wicked",
    "Crowded",
    "Grotesque",
    "Pleasant",
    "Cruel",
    "Grumpy",
    "Poised",
    "Wild",
    "Curious",
    "Poor",
    "Witty",
    "Cute",
    "Handsome",
    "Powerful",
    "Worrisome",
    "Happy",
    "Precious",
    "Worried",
    "Dangerous",
    "Healthy",
    "Prickly",
    "Wrong",
    "Dark",
    "Helpful",
    "Proud",
    "Dead",
    "Helpless",
    "Putrid",
    "Zany",
    "Defeated",
    "Hilarious",
    "Puzzled",
    "Zealous",
];
var NOUN = [
    "Yak",
    "Sheep",
    "Voice",
    "Planes",
    "Harmony",
    "Station",
    "Statement",
    "Blood",
    "Stitch",
    "War",
    "Society",
    "Bubble",
    "Ray",
    "Sink",
    "Territory",
    "Scissors",
    "Roof",
    "Watch",
    "Mark",
    "Respect",
    "Afternoon",
    "Bear",
    "Wealth",
    "Collar",
    "Sand",
    "Impulse",
    "Dust",
    "Rainstorm",
    "Shape",
    "Knife",
    "Pipe",
    "Boat",
    "Bulb",
    "Space",
    "Fish",
    "Quiet",
    "Children",
    "Taste",
    "Form",
    "Calendar",
    "Pin",
    "Plastic",
    "Jar",
    "Gate",
    "Sheet",
    "Parcel",
    "Suggestion",
    "Haircut",
    "Pancake",
    "Health",
    "Vein",
    "Oil",
    "Chalk",
    "Rings",
    "Harbor",
    "Play",
    "Boy",
    "Discussion",
    "Vase",
    "Dime",
    "Tree",
    "Rose",
    "Snakes",
    "Office",
    "Doll",
    "Argument",
    "Debt",
    "Experience",
    "Kitty",
    "Hair",
    "Crime",
    "Sleep",
    "Industry",
    "Rest",
    "Rice",
    "House",
    "Relation",
    "Question",
    "Test",
    "Finger",
    "Machine",
    "Pizzas",
    "Stocking",
    "Store",
    "Duck",
    "Structure",
    "Giraffe",
    "Quartz",
    "Attraction",
    "Sticks",
    "Bikes",
    "Number",
    "Fly",
    "Growth",
    "Selection",
    "Way",
    "Value",
    "Hands",
    "Sign",
    "Lock",
];


/***/ }),

/***/ "./src/server/util/random.ts":
/*!***********************************!*\
  !*** ./src/server/util/random.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.rand = function (min, max) {
    return min + (Math.random() * (max - min));
};
exports.randInt = function (min, max) {
    return Math.floor(exports.rand(min, max));
};
exports.pickRandom = function (arr) {
    return arr[exports.randInt(0, arr.length)];
};


/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kYWxzL0Vycm9ycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kdWxlcy9yb29tL29uQ3JlYXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kdWxlcy9yb29tL29uRGlzY29ubmVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZHVsZXMvcm9vbS9vblN1YnNjcmliZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZHVsZXMvcm9vbUV2ZW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3V0aWwvbG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbC9uYW1lLWdlbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3V0aWwvcmFuZG9tLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInV1aWRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5zdG9uXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNB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QUFXLEVBQUUsR0FBVztJQUMzQyxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBRVksZUFBTyxHQUFHLFVBQUMsR0FBVyxFQUFFLEdBQVc7SUFDOUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUVZLGtCQUFVLEdBQUcsVUFBQyxHQUFVO0lBQ25DLE9BQU8sR0FBRyxDQUFDLGVBQU8sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3BDLENBQUM7Ozs7Ozs7Ozs7OztBQ1ZELG9DOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLG9DIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc2VydmVyL2luZGV4LnRzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwiZXhwb3J0IGVudW0gQ29ubkVycm9yIHtcclxuICBVTktOT1dOID0gMHgwMCxcclxuICBVTkFVVEhPUklaRUQgPSAweDQwMSxcclxuICBST09NX05PVF9GT1VORCA9IDB4NDA0MSxcclxuICBST09NX01BWF9DQVBBQ0lUWSA9IDB4NDAzMSxcclxufSIsImltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcydcclxuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJ1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnXHJcblxyXG5pbXBvcnQgeyBjcmVhdGVTZXJ2ZXIgfSBmcm9tICdodHRwJ1xyXG5pbXBvcnQgKiBhcyBzb2NrZXRpbyBmcm9tICdzb2NrZXQuaW8nXHJcblxyXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuL3V0aWwvbG9nZ2VyJ1xyXG5pbXBvcnQgeyBvblN1YnNjcmliZSwgb25DcmVhdGUsIG9uRGlzY29ubmVjdCwgcm9vbXMgfSBmcm9tICcuL21vZHVsZXMvcm9vbUV2ZW50cydcclxuXHJcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcclxuY29uc3Qge1xyXG4gIFBPUlQgPSAzMDAwXHJcbn0gPSBwcm9jZXNzLmVudjtcclxuXHJcbmNvbnN0IGh0dHAgPSBjcmVhdGVTZXJ2ZXIoYXBwKVxyXG5jb25zdCBpbyA9IHNvY2tldGlvKGh0dHAsIHtcclxuICBzZXJ2ZUNsaWVudDogZmFsc2VcclxufSlcclxuXHJcblxyXG4vLyBGSVhNRTogbWFqb3Igc2VjdXJpdHkgdnVsbiB3aXRoIGNsaWVudCBpZCBoYW5kbGluZyAtIFNUT1AgSEFORElORyBUSEVNIE9VVFxyXG5pby5vbignY29ubmVjdGlvbicsIChjbGllbnQpID0+IHtcclxuICBjbGllbnQub24oJ3N1YnNjcmliZVRvUm9vbScsIChlKSA9PiB7IG9uU3Vic2NyaWJlKGlvLCBjbGllbnQsIGUpIH0pO1xyXG4gIGNsaWVudC5vbignY3JlYXRlUm9vbScsIChlKSA9PiB7IG9uQ3JlYXRlKGlvLCBjbGllbnQsIGUpIH0pXHJcblxyXG4gIGNsaWVudC5vbignZGlzY29ubmVjdCcsIChlKSA9PiB7IG9uRGlzY29ubmVjdChpbywgY2xpZW50LCBlKSB9KTtcclxufSk7XHJcblxyXG5cclxuY29uc3QgcHVibGljUGF0aCA9IHBhdGguam9pbihfX2Rpcm5hbWUsICdwdWJsaWMnKVxyXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHB1YmxpY1BhdGgpKVxyXG5cclxuYXBwLmdldCgnKmNsaWVudC5qcycsIChyZXE6IGFueSwgcmVzOiBhbnkpID0+IHtcclxuICByZXMuc2VuZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgXCJjbGllbnQuanNcIikpXHJcbn0pXHJcblxyXG5hcHAuZ2V0KCcvYXBpL3Jvb21zJywgKHJlcTogYW55LCByZXM6IGFueSkgPT4ge1xyXG4gIHJlcy5qc29uKEpTT04uc3RyaW5naWZ5KHJvb21zKSk7XHJcbn0pXHJcblxyXG5hcHAuZ2V0KCcqJywgKHJlcTogUmVxdWVzdCwgcmVzOiBhbnkpID0+IHtcclxuICByZXMuc2VuZEZpbGUocHVibGljUGF0aCArICcvaW5kZXguaHRtbCcpXHJcbn0pO1xyXG5cclxuaWYgKHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlKSB7XHJcbiAgaHR0cC5saXN0ZW4oUE9SVCwgKCkgPT4ge1xyXG4gICAgbG9nZ2VyLmluZm8oJ1NlcnZlciBzdGFydGVkIGF0IGh0dHA6Ly9sb2NhbGhvc3Q6JyArIFBPUlQpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhcHA7IiwiaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnXHJcblxyXG5pbXBvcnQgeyBSb29tQ29ubmVjdGlvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9jbGllbnQvbW9kdWxlcy9Sb29tJztcclxuXHJcbmltcG9ydCB7IGdlbmVyYXRlTmFtZSB9IGZyb20gJy4uLy4uL3V0aWwvbmFtZS1nZW4nXHJcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uLy4uL3V0aWwvbG9nZ2VyJ1xyXG5cclxuaW1wb3J0IHsgQ29ubkVycm9yIH0gZnJvbSAnLi4vLi4vLi4vbW9kYWxzL0Vycm9ycydcclxuaW1wb3J0IHsgSVJvb20gfSBmcm9tICcuLi8uLi9tb2RhbHMvSVJvb20nO1xyXG5cclxuaW1wb3J0IHsgcm9vbXMsIHN1YnNjcmliZWQgfSBmcm9tICcuLi9yb29tRXZlbnRzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IG9uQ3JlYXRlID0gKGlvOiBTb2NrZXRJTy5TZXJ2ZXIsIGNsaWVudDogU29ja2V0SU8uU29ja2V0LCBvcHRpb25zOiBJUm9vbSkgPT4ge1xyXG4gIGNvbnN0IGlkID0gdXVpZCgpO1xyXG4gIGxvZ2dlci5pbmZvKGBDcmVhdGluZyByb29tICR7b3B0aW9ucy5uYW1lfSB3aXRoIHB3ZCAke29wdGlvbnMucGFzc3dvcmR9IEAgc2l6ZSAke29wdGlvbnMuY2FwYWNpdHl9YClcclxuICByb29tc1tpZF0gPSB7XHJcbiAgICBpZDogaWQsXHJcbiAgICBjYXBhY2l0eTogb3B0aW9ucy5jYXBhY2l0eSxcclxuICAgIG5hbWU6IG9wdGlvbnMubmFtZSxcclxuICAgIHBhc3N3b3JkOiBvcHRpb25zLnBhc3N3b3JkLFxyXG4gICAgY29ubmVjdGlvbnM6IFtdLFxyXG4gICAgaG9zdDogdW5kZWZpbmVkLFxyXG4gIH07XHJcbiAgY2xpZW50LmVtaXQoJ3JlcycsIGlkKVxyXG59IiwiaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnXHJcblxyXG5pbXBvcnQgeyBSb29tQ29ubmVjdGlvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9jbGllbnQvbW9kdWxlcy9Sb29tJztcclxuXHJcbmltcG9ydCB7IGdlbmVyYXRlTmFtZSB9IGZyb20gJy4uLy4uL3V0aWwvbmFtZS1nZW4nXHJcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uLy4uL3V0aWwvbG9nZ2VyJ1xyXG5cclxuaW1wb3J0IHsgQ29ubkVycm9yIH0gZnJvbSAnLi4vLi4vLi4vbW9kYWxzL0Vycm9ycydcclxuaW1wb3J0IHsgSVJvb20gfSBmcm9tICcuLi8uLi9tb2RhbHMvSVJvb20nO1xyXG5cclxuaW1wb3J0IHsgcm9vbXMsIHN1YnNjcmliZWQgfSBmcm9tICcuLi9yb29tRXZlbnRzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IG9uRGlzY29ubmVjdCA9IChpbzogU29ja2V0SU8uU2VydmVyLCBjbGllbnQ6IFNvY2tldElPLlNvY2tldCwgcmVhc29uKSA9PiB7XHJcbiAgY29uc3Qgcm9vbUlEID0gc3Vic2NyaWJlZFtjbGllbnQuaWRdO1xyXG4gIGlmICghcm9vbXNbcm9vbUlEXSkgcmV0dXJuOyAvLyByb29tIG5vdCBmb3VuZFxyXG4gIGNvbnN0IHJvb20gPSByb29tc1tyb29tSURdO1xyXG5cclxuICBsb2dnZXIuaW5mbyhgQ2xpZW50IGRpc2Nvbm5lY3RlZCBmcm9tICR7cm9vbS5uYW1lfSAoJHtyb29tLmlkfSlgKVxyXG5cclxuICBjb25zdCBjb25ucyA9IHJvb20uY29ubmVjdGlvbnM7XHJcbiAgY29ubnMuc3BsaWNlKGNvbm5zLmZpbmRJbmRleCgodiwgaSwgbykgPT4geyByZXR1cm4gdi5pZCA9PSByb29tSUQgfSkpO1xyXG5cclxuICBpZiAocm9vbS5ob3N0ID09IGNsaWVudC5pZCkgcm9vbS5ob3N0ID0gY29ubnNbMF0/LmlkO1xyXG5cclxuICBpZiAoY29ubnMubGVuZ3RoID09IDApIHsgLy8gcm9vbSBpcyBlbXB0eVxyXG4gICAgLy8gY3JlYXRlIHJvb20gZGVzdHJ1Y3Rpb24gdGltZXJcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAocm9vbXNbcm9vbUlEXS5jb25uZWN0aW9ucy5sZW5ndGggPT0gMClcclxuICAgICAgICBkZWxldGUgcm9vbXNbcm9vbUlEXTtcclxuICAgIH0sIDUwMDApO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgaW8udG8ocm9vbUlEKS5lbWl0KCdyb29tU3RhdGUnLCByb29tKVxyXG4gIH1cclxufSIsImltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJ1xyXG5cclxuaW1wb3J0IHsgUm9vbUNvbm5lY3Rpb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vY2xpZW50L21vZHVsZXMvUm9vbSc7XHJcblxyXG5pbXBvcnQgeyBnZW5lcmF0ZU5hbWUgfSBmcm9tICcuLi8uLi91dGlsL25hbWUtZ2VuJ1xyXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi8uLi91dGlsL2xvZ2dlcidcclxuXHJcbmltcG9ydCB7IENvbm5FcnJvciB9IGZyb20gJy4uLy4uLy4uL21vZGFscy9FcnJvcnMnXHJcbmltcG9ydCB7IElSb29tIH0gZnJvbSAnLi4vLi4vbW9kYWxzL0lSb29tJztcclxuXHJcbmltcG9ydCB7IHJvb21zLCBzdWJzY3JpYmVkIH0gZnJvbSAnLi4vcm9vbUV2ZW50cydcclxuXHJcbmV4cG9ydCBjb25zdCBvblN1YnNjcmliZSA9IChpbzogU29ja2V0SU8uU2VydmVyLCBjbGllbnQ6IFNvY2tldElPLlNvY2tldCwgb3B0aW9uczogUm9vbUNvbm5lY3Rpb25PcHRpb25zKSA9PiB7XHJcbiAgbG9nZ2VyLmluZm8oYENsaWVudCB3aXNoZXMgdG8gU3Vic2NyaWJlIHRvIHJvb20gJHtvcHRpb25zLnJvb21JRH1gKTtcclxuICBjb25zdCByb29tOiBJUm9vbSA9IHJvb21zW29wdGlvbnMucm9vbUlEXTtcclxuXHJcbiAgaWYgKHJvb20gPT09IHVuZGVmaW5lZClcclxuICAgIHJldHVybiBjbGllbnQuZW1pdCgnZXJyJywgQ29ubkVycm9yLlJPT01fTk9UX0ZPVU5EKVxyXG4gIGxvZ2dlci5pbmZvKHJvb20ucGFzc3dvcmQpXHJcbiAgbG9nZ2VyLmluZm8ob3B0aW9ucy5wYXNzd29yZClcclxuICBpZiAocm9vbS5wYXNzd29yZCAhPSAnJyAmJiByb29tLnBhc3N3b3JkICE9IG9wdGlvbnMucGFzc3dvcmQpXHJcbiAgICByZXR1cm4gY2xpZW50LmVtaXQoJ2VycicsIENvbm5FcnJvci5VTkFVVEhPUklaRUQpXHJcblxyXG4gIGlmIChyb29tLmNvbm5lY3Rpb25zPy5sZW5ndGggPj0gcm9vbS5jYXBhY2l0eSlcclxuICAgIHJldHVybiBjbGllbnQuZW1pdCgnZXJyJywgQ29ubkVycm9yLlJPT01fTUFYX0NBUEFDSVRZKVxyXG5cclxuICBsb2dnZXIuaW5mbyhgQ2xpZW50IHN1YnNjcmliZWQgdG8gcm9vbSAke3Jvb20ubmFtZX0gKCR7b3B0aW9ucy5yb29tSUR9KWApXHJcblxyXG4gIGlmIChyb29tLmhvc3QgPT0gdW5kZWZpbmVkKVxyXG4gICAgcm9vbXNbb3B0aW9ucy5yb29tSURdLmhvc3QgPSBjbGllbnQuaWRcclxuXHJcbiAgcm9vbXNbb3B0aW9ucy5yb29tSURdLmNvbm5lY3Rpb25zLnB1c2goe1xyXG4gICAgaWQ6IGNsaWVudC5pZCxcclxuICAgIGRpc3BsYXlOYW1lOiBvcHRpb25zLnVzZXI/LmRpc3BsYXlOYW1lIHx8IGdlbmVyYXRlTmFtZSgyKVxyXG4gIH0pXHJcblxyXG4gIHN1YnNjcmliZWRbY2xpZW50LmlkXSA9IG9wdGlvbnMucm9vbUlEXHJcblxyXG4gIGNsaWVudC5qb2luKG9wdGlvbnMucm9vbUlEKVxyXG4gIGlvLnRvKG9wdGlvbnMucm9vbUlEKS5lbWl0KCdyb29tU3RhdGUnLCByb29tKVxyXG59IiwiXHJcbmltcG9ydCB7IElSb29tIH0gZnJvbSAnLi4vbW9kYWxzL0lSb29tJ1xyXG5cclxuaW1wb3J0IHsgb25DcmVhdGUgfSBmcm9tICcuL3Jvb20vb25DcmVhdGUnO1xyXG5pbXBvcnQgeyBvbkRpc2Nvbm5lY3QgfSBmcm9tICcuL3Jvb20vb25EaXNjb25uZWN0JztcclxuaW1wb3J0IHsgb25TdWJzY3JpYmUgfSBmcm9tICcuL3Jvb20vb25TdWJzY3JpYmUnO1xyXG5cclxuLy8gVE9ETzogbW92ZSByb29tIGRhdGEgKGludGVncmF0ZSB3aXRoIERCKVxyXG5leHBvcnQgY29uc3Qgcm9vbXM6IHsgW2lkOiBzdHJpbmddOiBJUm9vbSB9ID0ge307XHJcbmV4cG9ydCBjb25zdCBzdWJzY3JpYmVkOiB7IFtjb25uSUQ6IHN0cmluZ106IHN0cmluZyB9ID0ge307XHJcblxyXG5leHBvcnQgeyBvbkNyZWF0ZSwgb25EaXNjb25uZWN0LCBvblN1YnNjcmliZSB9IiwiaW1wb3J0ICogYXMgd2luc3RvbiBmcm9tICd3aW5zdG9uJ1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvZ2dlciA9IHdpbnN0b24uY3JlYXRlTG9nZ2VyKHtcclxuICBsZXZlbDogJ2luZm8nLFxyXG4gIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuanNvbigpLFxyXG4gIGRlZmF1bHRNZXRhOiB7IHNlcnZpY2U6ICdzZXJ2ZXInIH0sXHJcbiAgdHJhbnNwb3J0czogW1xyXG4gICAgLy9cclxuICAgIC8vIC0gV3JpdGUgdG8gYWxsIGxvZ3Mgd2l0aCBsZXZlbCBgaW5mb2AgYW5kIGJlbG93IHRvIGBjb21iaW5lZC5sb2dgIFxyXG4gICAgLy8gLSBXcml0ZSBhbGwgbG9ncyBlcnJvciAoYW5kIGJlbG93KSB0byBgZXJyb3IubG9nYC5cclxuICAgIC8vXHJcbiAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkZpbGUoeyBmaWxlbmFtZTogJ2Vycm9yLmxvZycsIGxldmVsOiAnZXJyb3InIH0pLFxyXG4gICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5GaWxlKHsgZmlsZW5hbWU6ICdjb21iaW5lZC5sb2cnIH0pXHJcbiAgXVxyXG59KTtcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7IC8vIHByaW50IGxvZyB0byBjb25zb2xlIGlmIG5vdCBpbiBwcm9kXHJcbiAgbG9nZ2VyLmFkZChuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoe1xyXG4gICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5zaW1wbGUoKVxyXG4gIH0pKTtcclxufSIsImltcG9ydCB7IHBpY2tSYW5kb20gfSBmcm9tIFwiLi9yYW5kb21cIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnZW5lcmF0ZU5hbWUgPSAobGVuZ3RoOiBudW1iZXIpID0+IHtcclxuICBpZiAobGVuZ3RoIDwgMSkgcmV0dXJuIFwiXCI7XHJcbiAgbGV0IHN0cmluZyA9IHBpY2tSYW5kb20oTk9VTik7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcclxuICAgIHN0cmluZyA9IHBpY2tSYW5kb20oQURKKSArIHN0cmluZztcclxuICB9XHJcbiAgcmV0dXJuIHN0cmluZztcclxufVxyXG5cclxuY29uc3QgQURKID0gW1xyXG4gIFwiRGVmaWFudFwiLFxyXG4gIFwiSG9tZWxlc3NcIixcclxuICBcIkFkb3JhYmxlXCIsXHJcbiAgXCJEZWxpZ2h0ZnVsXCIsXHJcbiAgXCJIb21lbHlcIixcclxuICBcIlF1YWludFwiLFxyXG4gIFwiQWR2ZW50dXJvdXNcIixcclxuICBcIkRlcHJlc3NlZFwiLFxyXG4gIFwiSG9ycmlibGVcIixcclxuICBcIkFnZ3Jlc3NpdmVcIixcclxuICBcIkRldGVybWluZWRcIixcclxuICBcIkh1bmdyeVwiLFxyXG4gIFwiUmVhbFwiLFxyXG4gIFwiQWdyZWVhYmxlXCIsXHJcbiAgXCJEaWZmZXJlbnRcIixcclxuICBcIkh1cnRcIixcclxuICBcIlJlbGlldmVkXCIsXHJcbiAgXCJBbGVydFwiLFxyXG4gIFwiRGlmZmljdWx0XCIsXHJcbiAgXCJSZXB1bHNpdmVcIixcclxuICBcIkFsaXZlXCIsXHJcbiAgXCJEaXNndXN0ZWRcIixcclxuICBcIklsbFwiLFxyXG4gIFwiUmljaFwiLFxyXG4gIFwiQW11c2VkXCIsXHJcbiAgXCJEaXN0aW5jdFwiLFxyXG4gIFwiSW1wb3J0YW50XCIsXHJcbiAgXCJBbmdyeVwiLFxyXG4gIFwiRGlzdHVyYmVkXCIsXHJcbiAgXCJJbXBvc3NpYmxlXCIsXHJcbiAgXCJTY2FyeVwiLFxyXG4gIFwiQW5ub3llZFwiLFxyXG4gIFwiRGl6enlcIixcclxuICBcIkluZXhwZW5zaXZlXCIsXHJcbiAgXCJTZWxmaXNoXCIsXHJcbiAgXCJBbm5veWluZ1wiLFxyXG4gIFwiRG91YnRmdWxcIixcclxuICBcIklubm9jZW50XCIsXHJcbiAgXCJTaGlueVwiLFxyXG4gIFwiQW54aW91c1wiLFxyXG4gIFwiRHJhYlwiLFxyXG4gIFwiSW5xdWlzaXRpdmVcIixcclxuICBcIlNoeVwiLFxyXG4gIFwiQXJyb2dhbnRcIixcclxuICBcIkR1bGxcIixcclxuICBcIkl0Y2h5XCIsXHJcbiAgXCJTaWxseVwiLFxyXG4gIFwiQXNoYW1lZFwiLFxyXG4gIFwiU2xlZXB5XCIsXHJcbiAgXCJBdHRyYWN0aXZlXCIsXHJcbiAgXCJFYWdlclwiLFxyXG4gIFwiSmVhbG91c1wiLFxyXG4gIFwiU21pbGluZ1wiLFxyXG4gIFwiQXZlcmFnZVwiLFxyXG4gIFwiRWFzeVwiLFxyXG4gIFwiSml0dGVyeVwiLFxyXG4gIFwiU21vZ2d5XCIsXHJcbiAgXCJBd2Z1bFwiLFxyXG4gIFwiRWxhdGVkXCIsXHJcbiAgXCJKb2xseVwiLFxyXG4gIFwiU29yZVwiLFxyXG4gIFwiRWxlZ2FudFwiLFxyXG4gIFwiSm95b3VzXCIsXHJcbiAgXCJTcGFya2xpbmdcIixcclxuICBcIkJhZFwiLFxyXG4gIFwiRW1iYXJyYXNzZWRcIixcclxuICBcIlNwbGVuZGlkXCIsXHJcbiAgXCJCZWF1dGlmdWxcIixcclxuICBcIkVuY2hhbnRpbmdcIixcclxuICBcIktpbmRcIixcclxuICBcIlNwb3RsZXNzXCIsXHJcbiAgXCJCZXR0ZXJcIixcclxuICBcIkVuY291cmFnaW5nXCIsXHJcbiAgXCJTdG9ybXlcIixcclxuICBcIkJld2lsZGVyZWRcIixcclxuICBcIkVuZXJnZXRpY1wiLFxyXG4gIFwiTGF6eVwiLFxyXG4gIFwiU3RyYW5nZVwiLFxyXG4gIFwiQmxhY2tcIixcclxuICBcIkVudGh1c2lhc3RpY1wiLFxyXG4gIFwiTGlnaHRcIixcclxuICBcIlN0dXBpZFwiLFxyXG4gIFwiQmxvb2R5XCIsXHJcbiAgXCJFbnZpb3VzXCIsXHJcbiAgXCJMaXZlbHlcIixcclxuICBcIlN1Y2Nlc3NmdWxcIixcclxuICBcIkJsdWVcIixcclxuICBcIkV2aWxcIixcclxuICBcIkxvbmVseVwiLFxyXG4gIFwiU3VwZXJcIixcclxuICBcIkV4Y2l0ZWRcIixcclxuICBcIkxvbmdcIixcclxuICBcIkJsdXNoaW5nXCIsXHJcbiAgXCJFeHBlbnNpdmVcIixcclxuICBcIkxvdmVseVwiLFxyXG4gIFwiVGFsZW50ZWRcIixcclxuICBcIkJvcmVkXCIsXHJcbiAgXCJFeHViZXJhbnRcIixcclxuICBcIkx1Y2t5XCIsXHJcbiAgXCJUYW1lXCIsXHJcbiAgXCJCcmFpbnlcIixcclxuICBcIlRlbmRlclwiLFxyXG4gIFwiQnJhdmVcIixcclxuICBcIkZhaXJcIixcclxuICBcIk1hZ25pZmljZW50XCIsXHJcbiAgXCJUZW5zZVwiLFxyXG4gIFwiQnJlYWthYmxlXCIsXHJcbiAgXCJGYWl0aGZ1bFwiLFxyXG4gIFwiTWlzdHlcIixcclxuICBcIlRlcnJpYmxlXCIsXHJcbiAgXCJCcmlnaHRcIixcclxuICBcIkZhbW91c1wiLFxyXG4gIFwiTW9kZXJuXCIsXHJcbiAgXCJUYXN0eVwiLFxyXG4gIFwiQnVzeVwiLFxyXG4gIFwiRmFuY3lcIixcclxuICBcIk1vdGlvbmxlc3NcIixcclxuICBcIlRoYW5rZnVsXCIsXHJcbiAgXCJGYW50YXN0aWNcIixcclxuICBcIk11ZGR5XCIsXHJcbiAgXCJUaG91Z2h0ZnVsXCIsXHJcbiAgXCJDYWxtXCIsXHJcbiAgXCJGaWVyY2VcIixcclxuICBcIk11c2h5XCIsXHJcbiAgXCJUaG91Z2h0bGVzc1wiLFxyXG4gIFwiQ2FyZWZ1bFwiLFxyXG4gIFwiRmlsdGh5XCIsXHJcbiAgXCJNeXN0ZXJpb3VzXCIsXHJcbiAgXCJUaXJlZFwiLFxyXG4gIFwiQ2F1dGlvdXNcIixcclxuICBcIkZpbmVcIixcclxuICBcIlRvdWdoXCIsXHJcbiAgXCJDaGFybWluZ1wiLFxyXG4gIFwiRm9vbGlzaFwiLFxyXG4gIFwiTmFzdHlcIixcclxuICBcIlRyb3VibGVkXCIsXHJcbiAgXCJDaGVlcmZ1bFwiLFxyXG4gIFwiRnJhZ2lsZVwiLFxyXG4gIFwiTmF1Z2h0eVwiLFxyXG4gIFwiQ2xlYW5cIixcclxuICBcIkZyYWlsXCIsXHJcbiAgXCJOZXJ2b3VzXCIsXHJcbiAgXCJVZ2xpZXN0XCIsXHJcbiAgXCJDbGVhclwiLFxyXG4gIFwiRnJhbnRpY1wiLFxyXG4gIFwiTmljZVwiLFxyXG4gIFwiVWdseVwiLFxyXG4gIFwiQ2xldmVyXCIsXHJcbiAgXCJGcmllbmRseVwiLFxyXG4gIFwiTnV0dHlcIixcclxuICBcIlVuaW50ZXJlc3RlZFwiLFxyXG4gIFwiQ2xvdWR5XCIsXHJcbiAgXCJGcmlnaHRlbmVkXCIsXHJcbiAgXCJVbnNpZ2h0bHlcIixcclxuICBcIkNsdW1zeVwiLFxyXG4gIFwiRnVubnlcIixcclxuICBcIk9iZWRpZW50XCIsXHJcbiAgXCJVbnVzdWFsXCIsXHJcbiAgXCJDb2xvcmZ1bFwiLFxyXG4gIFwiT2Jub3hpb3VzXCIsXHJcbiAgXCJVcHNldFwiLFxyXG4gIFwiQ29tYmF0aXZlXCIsXHJcbiAgXCJHZW50bGVcIixcclxuICBcIk9kZFwiLFxyXG4gIFwiVXB0aWdodFwiLFxyXG4gIFwiQ29tZm9ydGFibGVcIixcclxuICBcIkdpZnRlZFwiLFxyXG4gIFwiQ29uY2VybmVkXCIsXHJcbiAgXCJHbGFtb3JvdXNcIixcclxuICBcIk9wZW5cIixcclxuICBcIlZhc3RcIixcclxuICBcIkNvbmRlbW5lZFwiLFxyXG4gIFwiR2xlYW1pbmdcIixcclxuICBcIk91dHJhZ2VvdXNcIixcclxuICBcIlZpY3RvcmlvdXNcIixcclxuICBcIkNvbmZ1c2VkXCIsXHJcbiAgXCJHbG9yaW91c1wiLFxyXG4gIFwiT3V0c3RhbmRpbmdcIixcclxuICBcIlZpdmFjaW91c1wiLFxyXG4gIFwiQ29vcGVyYXRpdmVcIixcclxuICBcIkdvb2RcIixcclxuICBcIkNvdXJhZ2VvdXNcIixcclxuICBcIkdvcmdlb3VzXCIsXHJcbiAgXCJQYW5pY2t5XCIsXHJcbiAgXCJXYW5kZXJpbmdcIixcclxuICBcIkNyYXp5XCIsXHJcbiAgXCJHcmFjZWZ1bFwiLFxyXG4gIFwiUGVyZmVjdFwiLFxyXG4gIFwiV2VhcnlcIixcclxuICBcIkNyZWVweVwiLFxyXG4gIFwiR3JpZXZpbmdcIixcclxuICBcIlBsYWluXCIsXHJcbiAgXCJXaWNrZWRcIixcclxuICBcIkNyb3dkZWRcIixcclxuICBcIkdyb3Rlc3F1ZVwiLFxyXG4gIFwiUGxlYXNhbnRcIixcclxuICBcIkNydWVsXCIsXHJcbiAgXCJHcnVtcHlcIixcclxuICBcIlBvaXNlZFwiLFxyXG4gIFwiV2lsZFwiLFxyXG4gIFwiQ3VyaW91c1wiLFxyXG4gIFwiUG9vclwiLFxyXG4gIFwiV2l0dHlcIixcclxuICBcIkN1dGVcIixcclxuICBcIkhhbmRzb21lXCIsXHJcbiAgXCJQb3dlcmZ1bFwiLFxyXG4gIFwiV29ycmlzb21lXCIsXHJcbiAgXCJIYXBweVwiLFxyXG4gIFwiUHJlY2lvdXNcIixcclxuICBcIldvcnJpZWRcIixcclxuICBcIkRhbmdlcm91c1wiLFxyXG4gIFwiSGVhbHRoeVwiLFxyXG4gIFwiUHJpY2tseVwiLFxyXG4gIFwiV3JvbmdcIixcclxuICBcIkRhcmtcIixcclxuICBcIkhlbHBmdWxcIixcclxuICBcIlByb3VkXCIsXHJcbiAgXCJEZWFkXCIsXHJcbiAgXCJIZWxwbGVzc1wiLFxyXG4gIFwiUHV0cmlkXCIsXHJcbiAgXCJaYW55XCIsXHJcbiAgXCJEZWZlYXRlZFwiLFxyXG4gIFwiSGlsYXJpb3VzXCIsXHJcbiAgXCJQdXp6bGVkXCIsXHJcbiAgXCJaZWFsb3VzXCIsXHJcbl1cclxuXHJcbmNvbnN0IE5PVU4gPSBbXHJcbiAgXCJZYWtcIixcclxuICBcIlNoZWVwXCIsXHJcbiAgXCJWb2ljZVwiLFxyXG4gIFwiUGxhbmVzXCIsXHJcbiAgXCJIYXJtb255XCIsXHJcbiAgXCJTdGF0aW9uXCIsXHJcbiAgXCJTdGF0ZW1lbnRcIixcclxuICBcIkJsb29kXCIsXHJcbiAgXCJTdGl0Y2hcIixcclxuICBcIldhclwiLFxyXG4gIFwiU29jaWV0eVwiLFxyXG4gIFwiQnViYmxlXCIsXHJcbiAgXCJSYXlcIixcclxuICBcIlNpbmtcIixcclxuICBcIlRlcnJpdG9yeVwiLFxyXG4gIFwiU2Npc3NvcnNcIixcclxuICBcIlJvb2ZcIixcclxuICBcIldhdGNoXCIsXHJcbiAgXCJNYXJrXCIsXHJcbiAgXCJSZXNwZWN0XCIsXHJcbiAgXCJBZnRlcm5vb25cIixcclxuICBcIkJlYXJcIixcclxuICBcIldlYWx0aFwiLFxyXG4gIFwiQ29sbGFyXCIsXHJcbiAgXCJTYW5kXCIsXHJcbiAgXCJJbXB1bHNlXCIsXHJcbiAgXCJEdXN0XCIsXHJcbiAgXCJSYWluc3Rvcm1cIixcclxuICBcIlNoYXBlXCIsXHJcbiAgXCJLbmlmZVwiLFxyXG4gIFwiUGlwZVwiLFxyXG4gIFwiQm9hdFwiLFxyXG4gIFwiQnVsYlwiLFxyXG4gIFwiU3BhY2VcIixcclxuICBcIkZpc2hcIixcclxuICBcIlF1aWV0XCIsXHJcbiAgXCJDaGlsZHJlblwiLFxyXG4gIFwiVGFzdGVcIixcclxuICBcIkZvcm1cIixcclxuICBcIkNhbGVuZGFyXCIsXHJcbiAgXCJQaW5cIixcclxuICBcIlBsYXN0aWNcIixcclxuICBcIkphclwiLFxyXG4gIFwiR2F0ZVwiLFxyXG4gIFwiU2hlZXRcIixcclxuICBcIlBhcmNlbFwiLFxyXG4gIFwiU3VnZ2VzdGlvblwiLFxyXG4gIFwiSGFpcmN1dFwiLFxyXG4gIFwiUGFuY2FrZVwiLFxyXG4gIFwiSGVhbHRoXCIsXHJcbiAgXCJWZWluXCIsXHJcbiAgXCJPaWxcIixcclxuICBcIkNoYWxrXCIsXHJcbiAgXCJSaW5nc1wiLFxyXG4gIFwiSGFyYm9yXCIsXHJcbiAgXCJQbGF5XCIsXHJcbiAgXCJCb3lcIixcclxuICBcIkRpc2N1c3Npb25cIixcclxuICBcIlZhc2VcIixcclxuICBcIkRpbWVcIixcclxuICBcIlRyZWVcIixcclxuICBcIlJvc2VcIixcclxuICBcIlNuYWtlc1wiLFxyXG4gIFwiT2ZmaWNlXCIsXHJcbiAgXCJEb2xsXCIsXHJcbiAgXCJBcmd1bWVudFwiLFxyXG4gIFwiRGVidFwiLFxyXG4gIFwiRXhwZXJpZW5jZVwiLFxyXG4gIFwiS2l0dHlcIixcclxuICBcIkhhaXJcIixcclxuICBcIkNyaW1lXCIsXHJcbiAgXCJTbGVlcFwiLFxyXG4gIFwiSW5kdXN0cnlcIixcclxuICBcIlJlc3RcIixcclxuICBcIlJpY2VcIixcclxuICBcIkhvdXNlXCIsXHJcbiAgXCJSZWxhdGlvblwiLFxyXG4gIFwiUXVlc3Rpb25cIixcclxuICBcIlRlc3RcIixcclxuICBcIkZpbmdlclwiLFxyXG4gIFwiTWFjaGluZVwiLFxyXG4gIFwiUGl6emFzXCIsXHJcbiAgXCJTdG9ja2luZ1wiLFxyXG4gIFwiU3RvcmVcIixcclxuICBcIkR1Y2tcIixcclxuICBcIlN0cnVjdHVyZVwiLFxyXG4gIFwiR2lyYWZmZVwiLFxyXG4gIFwiUXVhcnR6XCIsXHJcbiAgXCJBdHRyYWN0aW9uXCIsXHJcbiAgXCJTdGlja3NcIixcclxuICBcIkJpa2VzXCIsXHJcbiAgXCJOdW1iZXJcIixcclxuICBcIkZseVwiLFxyXG4gIFwiR3Jvd3RoXCIsXHJcbiAgXCJTZWxlY3Rpb25cIixcclxuICBcIldheVwiLFxyXG4gIFwiVmFsdWVcIixcclxuICBcIkhhbmRzXCIsXHJcbiAgXCJTaWduXCIsXHJcbiAgXCJMb2NrXCIsXHJcbl0iLCJleHBvcnQgY29uc3QgcmFuZCA9IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpID0+IHtcclxuICByZXR1cm4gbWluICsgKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJhbmRJbnQgPSAobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSA9PiB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IocmFuZChtaW4sIG1heCkpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwaWNrUmFuZG9tID0gKGFycjogYW55W10pID0+IHtcclxuICByZXR1cm4gYXJyW3JhbmRJbnQoMCwgYXJyLmxlbmd0aCldXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXVpZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=