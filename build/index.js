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
var roomEvents_1 = __webpack_require__(/*! ../roomEvents */ "./src/server/modules/roomEvents.ts");
exports.onCreate = function (io, client, options) {
    var id = uuid_1.v4();
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
    defaultMeta: { service: 'user-service' },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kYWxzL0Vycm9ycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kdWxlcy9yb29tL29uQ3JlYXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvbW9kdWxlcy9yb29tL29uRGlzY29ubmVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZHVsZXMvcm9vbS9vblN1YnNjcmliZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL21vZHVsZXMvcm9vbUV2ZW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3V0aWwvbG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbC9uYW1lLWdlbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3V0aWwvcmFuZG9tLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInV1aWRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5zdG9uXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNB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QyxDQUFDO0FBQ25DLENBQUM7QUFFWSxrQkFBVSxHQUFHLFVBQUMsR0FBVTtJQUNuQyxPQUFPLEdBQUcsQ0FBQyxlQUFPLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQyxDQUFDOzs7Ozs7Ozs7Ozs7QUNWRCxvQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxzQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxvQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NlcnZlci9pbmRleC50c1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsImV4cG9ydCBlbnVtIENvbm5FcnJvciB7XHJcbiAgVU5LTk9XTiA9IDB4MDAsXHJcbiAgVU5BVVRIT1JJWkVEID0gMHg0MDEsXHJcbiAgUk9PTV9OT1RfRk9VTkQgPSAweDQwNDEsXHJcbiAgUk9PTV9NQVhfQ0FQQUNJVFkgPSAweDQwMzEsXHJcbn0iLCJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnXHJcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcydcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuaW1wb3J0IHsgY3JlYXRlU2VydmVyIH0gZnJvbSAnaHR0cCdcclxuaW1wb3J0ICogYXMgc29ja2V0aW8gZnJvbSAnc29ja2V0LmlvJ1xyXG5cclxuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi91dGlsL2xvZ2dlcidcclxuaW1wb3J0IHsgb25TdWJzY3JpYmUsIG9uQ3JlYXRlLCBvbkRpc2Nvbm5lY3QsIHJvb21zIH0gZnJvbSAnLi9tb2R1bGVzL3Jvb21FdmVudHMnXHJcblxyXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XHJcbmNvbnN0IHtcclxuICBQT1JUID0gMzAwMFxyXG59ID0gcHJvY2Vzcy5lbnY7XHJcblxyXG5jb25zdCBodHRwID0gY3JlYXRlU2VydmVyKGFwcClcclxuY29uc3QgaW8gPSBzb2NrZXRpbyhodHRwLCB7XHJcbiAgc2VydmVDbGllbnQ6IGZhbHNlXHJcbn0pXHJcblxyXG5cclxuLy8gRklYTUU6IG1ham9yIHNlY3VyaXR5IHZ1bG4gd2l0aCBjbGllbnQgaWQgaGFuZGxpbmcgLSBTVE9QIEhBTkRJTkcgVEhFTSBPVVRcclxuaW8ub24oJ2Nvbm5lY3Rpb24nLCAoY2xpZW50KSA9PiB7XHJcbiAgY2xpZW50Lm9uKCdzdWJzY3JpYmVUb1Jvb20nLCAoZSkgPT4geyBvblN1YnNjcmliZShpbywgY2xpZW50LCBlKSB9KTtcclxuICBjbGllbnQub24oJ2NyZWF0ZVJvb20nLCAoZSkgPT4geyBvbkNyZWF0ZShpbywgY2xpZW50LCBlKSB9KVxyXG5cclxuICBjbGllbnQub24oJ2Rpc2Nvbm5lY3QnLCAoZSkgPT4geyBvbkRpc2Nvbm5lY3QoaW8sIGNsaWVudCwgZSkgfSk7XHJcbn0pO1xyXG5cclxuXHJcbmNvbnN0IHB1YmxpY1BhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAncHVibGljJylcclxuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwdWJsaWNQYXRoKSlcclxuXHJcbmFwcC5nZXQoJypjbGllbnQuanMnLCAocmVxOiBhbnksIHJlczogYW55KSA9PiB7XHJcbiAgcmVzLnNlbmRGaWxlKHBhdGguam9pbihfX2Rpcm5hbWUsIFwiY2xpZW50LmpzXCIpKVxyXG59KVxyXG5cclxuYXBwLmdldCgnL2FwaS9yb29tcycsIChyZXE6IGFueSwgcmVzOiBhbnkpID0+IHtcclxuICByZXMuanNvbihKU09OLnN0cmluZ2lmeShyb29tcykpO1xyXG59KVxyXG5cclxuYXBwLmdldCgnKicsIChyZXE6IFJlcXVlc3QsIHJlczogYW55KSA9PiB7XHJcbiAgcmVzLnNlbmRGaWxlKHB1YmxpY1BhdGggKyAnL2luZGV4Lmh0bWwnKVxyXG59KTtcclxuXHJcbmlmIChyZXF1aXJlLm1haW4gPT09IG1vZHVsZSkge1xyXG4gIGh0dHAubGlzdGVuKFBPUlQsICgpID0+IHtcclxuICAgIGxvZ2dlci5pbmZvKCdTZXJ2ZXIgc3RhcnRlZCBhdCBodHRwOi8vbG9jYWxob3N0OicgKyBQT1JUKTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBwOyIsImltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJ1xyXG5cclxuaW1wb3J0IHsgUm9vbUNvbm5lY3Rpb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vY2xpZW50L21vZHVsZXMvUm9vbSc7XHJcblxyXG5pbXBvcnQgeyBnZW5lcmF0ZU5hbWUgfSBmcm9tICcuLi8uLi91dGlsL25hbWUtZ2VuJ1xyXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi8uLi91dGlsL2xvZ2dlcidcclxuXHJcbmltcG9ydCB7IENvbm5FcnJvciB9IGZyb20gJy4uLy4uLy4uL21vZGFscy9FcnJvcnMnXHJcbmltcG9ydCB7IElSb29tIH0gZnJvbSAnLi4vLi4vbW9kYWxzL0lSb29tJztcclxuXHJcbmltcG9ydCB7IHJvb21zLCBzdWJzY3JpYmVkIH0gZnJvbSAnLi4vcm9vbUV2ZW50cydcclxuXHJcbmV4cG9ydCBjb25zdCBvbkNyZWF0ZSA9IChpbzogU29ja2V0SU8uU2VydmVyLCBjbGllbnQ6IFNvY2tldElPLlNvY2tldCwgb3B0aW9uczogSVJvb20pID0+IHtcclxuICBjb25zdCBpZCA9IHV1aWQoKTtcclxuICByb29tc1tpZF0gPSB7XHJcbiAgICBpZDogaWQsXHJcbiAgICBjYXBhY2l0eTogb3B0aW9ucy5jYXBhY2l0eSxcclxuICAgIG5hbWU6IG9wdGlvbnMubmFtZSxcclxuICAgIHBhc3N3b3JkOiBvcHRpb25zLnBhc3N3b3JkLFxyXG4gICAgY29ubmVjdGlvbnM6IFtdLFxyXG4gICAgaG9zdDogdW5kZWZpbmVkLFxyXG4gIH07XHJcbiAgY2xpZW50LmVtaXQoJ3JlcycsIGlkKVxyXG59IiwiaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnXHJcblxyXG5pbXBvcnQgeyBSb29tQ29ubmVjdGlvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9jbGllbnQvbW9kdWxlcy9Sb29tJztcclxuXHJcbmltcG9ydCB7IGdlbmVyYXRlTmFtZSB9IGZyb20gJy4uLy4uL3V0aWwvbmFtZS1nZW4nXHJcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uLy4uL3V0aWwvbG9nZ2VyJ1xyXG5cclxuaW1wb3J0IHsgQ29ubkVycm9yIH0gZnJvbSAnLi4vLi4vLi4vbW9kYWxzL0Vycm9ycydcclxuaW1wb3J0IHsgSVJvb20gfSBmcm9tICcuLi8uLi9tb2RhbHMvSVJvb20nO1xyXG5cclxuaW1wb3J0IHsgcm9vbXMsIHN1YnNjcmliZWQgfSBmcm9tICcuLi9yb29tRXZlbnRzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IG9uRGlzY29ubmVjdCA9IChpbzogU29ja2V0SU8uU2VydmVyLCBjbGllbnQ6IFNvY2tldElPLlNvY2tldCwgcmVhc29uKSA9PiB7XHJcbiAgY29uc3Qgcm9vbUlEID0gc3Vic2NyaWJlZFtjbGllbnQuaWRdO1xyXG4gIGlmICghcm9vbXNbcm9vbUlEXSkgcmV0dXJuOyAvLyByb29tIG5vdCBmb3VuZFxyXG4gIGNvbnN0IHJvb20gPSByb29tc1tyb29tSURdO1xyXG5cclxuICBsb2dnZXIuaW5mbyhgQ2xpZW50IGRpc2Nvbm5lY3RlZCBmcm9tICR7cm9vbS5uYW1lfSAoJHtyb29tLmlkfSlgKVxyXG5cclxuICBjb25zdCBjb25ucyA9IHJvb20uY29ubmVjdGlvbnM7XHJcbiAgY29ubnMuc3BsaWNlKGNvbm5zLmZpbmRJbmRleCgodiwgaSwgbykgPT4geyByZXR1cm4gdi5pZCA9PSByb29tSUQgfSkpO1xyXG5cclxuICBpZiAocm9vbS5ob3N0ID09IGNsaWVudC5pZCkgcm9vbS5ob3N0ID0gY29ubnNbMF0/LmlkO1xyXG5cclxuICBpZiAoY29ubnMubGVuZ3RoID09IDApIHsgLy8gcm9vbSBpcyBlbXB0eVxyXG4gICAgLy8gY3JlYXRlIHJvb20gZGVzdHJ1Y3Rpb24gdGltZXJcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAocm9vbXNbcm9vbUlEXS5jb25uZWN0aW9ucy5sZW5ndGggPT0gMClcclxuICAgICAgICBkZWxldGUgcm9vbXNbcm9vbUlEXTtcclxuICAgIH0sIDUwMDApO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgaW8udG8ocm9vbUlEKS5lbWl0KCdyb29tU3RhdGUnLCByb29tKVxyXG4gIH1cclxufSIsImltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJ1xyXG5cclxuaW1wb3J0IHsgUm9vbUNvbm5lY3Rpb25PcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vY2xpZW50L21vZHVsZXMvUm9vbSc7XHJcblxyXG5pbXBvcnQgeyBnZW5lcmF0ZU5hbWUgfSBmcm9tICcuLi8uLi91dGlsL25hbWUtZ2VuJ1xyXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi8uLi91dGlsL2xvZ2dlcidcclxuXHJcbmltcG9ydCB7IENvbm5FcnJvciB9IGZyb20gJy4uLy4uLy4uL21vZGFscy9FcnJvcnMnXHJcbmltcG9ydCB7IElSb29tIH0gZnJvbSAnLi4vLi4vbW9kYWxzL0lSb29tJztcclxuXHJcbmltcG9ydCB7IHJvb21zLCBzdWJzY3JpYmVkIH0gZnJvbSAnLi4vcm9vbUV2ZW50cydcclxuXHJcbmV4cG9ydCBjb25zdCBvblN1YnNjcmliZSA9IChpbzogU29ja2V0SU8uU2VydmVyLCBjbGllbnQ6IFNvY2tldElPLlNvY2tldCwgb3B0aW9uczogUm9vbUNvbm5lY3Rpb25PcHRpb25zKSA9PiB7XHJcbiAgbG9nZ2VyLmluZm8oYENsaWVudCB3aXNoZXMgdG8gU3Vic2NyaWJlIHRvIHJvb20gJHtvcHRpb25zLnJvb21JRH1gKTtcclxuICBjb25zdCByb29tOiBJUm9vbSA9IHJvb21zW29wdGlvbnMucm9vbUlEXTtcclxuXHJcbiAgaWYgKHJvb20gPT09IHVuZGVmaW5lZClcclxuICAgIHJldHVybiBjbGllbnQuZW1pdCgnZXJyJywgQ29ubkVycm9yLlJPT01fTk9UX0ZPVU5EKVxyXG5cclxuICBpZiAocm9vbS5wYXNzd29yZCAhPSAnJyAmJiByb29tLnBhc3N3b3JkICE9IG9wdGlvbnMucGFzc3dvcmQpXHJcbiAgICByZXR1cm4gY2xpZW50LmVtaXQoJ2VycicsIENvbm5FcnJvci5VTkFVVEhPUklaRUQpXHJcblxyXG4gIGlmIChyb29tLmNvbm5lY3Rpb25zPy5sZW5ndGggPj0gcm9vbS5jYXBhY2l0eSlcclxuICAgIHJldHVybiBjbGllbnQuZW1pdCgnZXJyJywgQ29ubkVycm9yLlJPT01fTUFYX0NBUEFDSVRZKVxyXG5cclxuICBsb2dnZXIuaW5mbyhgQ2xpZW50IHN1YnNjcmliZWQgdG8gcm9vbSAke3Jvb20ubmFtZX0gKCR7b3B0aW9ucy5yb29tSUR9KWApXHJcblxyXG4gIGlmIChyb29tLmhvc3QgPT0gdW5kZWZpbmVkKVxyXG4gICAgcm9vbXNbb3B0aW9ucy5yb29tSURdLmhvc3QgPSBjbGllbnQuaWRcclxuXHJcbiAgcm9vbXNbb3B0aW9ucy5yb29tSURdLmNvbm5lY3Rpb25zLnB1c2goe1xyXG4gICAgaWQ6IGNsaWVudC5pZCxcclxuICAgIGRpc3BsYXlOYW1lOiBvcHRpb25zLnVzZXI/LmRpc3BsYXlOYW1lIHx8IGdlbmVyYXRlTmFtZSgyKVxyXG4gIH0pXHJcblxyXG4gIHN1YnNjcmliZWRbY2xpZW50LmlkXSA9IG9wdGlvbnMucm9vbUlEXHJcblxyXG4gIGNsaWVudC5qb2luKG9wdGlvbnMucm9vbUlEKVxyXG4gIGlvLnRvKG9wdGlvbnMucm9vbUlEKS5lbWl0KCdyb29tU3RhdGUnLCByb29tKVxyXG59IiwiXHJcbmltcG9ydCB7IElSb29tIH0gZnJvbSAnLi4vbW9kYWxzL0lSb29tJ1xyXG5cclxuaW1wb3J0IHsgb25DcmVhdGUgfSBmcm9tICcuL3Jvb20vb25DcmVhdGUnO1xyXG5pbXBvcnQgeyBvbkRpc2Nvbm5lY3QgfSBmcm9tICcuL3Jvb20vb25EaXNjb25uZWN0JztcclxuaW1wb3J0IHsgb25TdWJzY3JpYmUgfSBmcm9tICcuL3Jvb20vb25TdWJzY3JpYmUnO1xyXG5cclxuLy8gVE9ETzogbW92ZSByb29tIGRhdGEgKGludGVncmF0ZSB3aXRoIERCKVxyXG5leHBvcnQgY29uc3Qgcm9vbXM6IHsgW2lkOiBzdHJpbmddOiBJUm9vbSB9ID0ge307XHJcbmV4cG9ydCBjb25zdCBzdWJzY3JpYmVkOiB7IFtjb25uSUQ6IHN0cmluZ106IHN0cmluZyB9ID0ge307XHJcblxyXG5leHBvcnQgeyBvbkNyZWF0ZSwgb25EaXNjb25uZWN0LCBvblN1YnNjcmliZSB9IiwiaW1wb3J0ICogYXMgd2luc3RvbiBmcm9tICd3aW5zdG9uJ1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvZ2dlciA9IHdpbnN0b24uY3JlYXRlTG9nZ2VyKHtcclxuICBsZXZlbDogJ2luZm8nLFxyXG4gIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuanNvbigpLFxyXG4gIGRlZmF1bHRNZXRhOiB7IHNlcnZpY2U6ICd1c2VyLXNlcnZpY2UnIH0sXHJcbiAgdHJhbnNwb3J0czogW1xyXG4gICAgLy9cclxuICAgIC8vIC0gV3JpdGUgdG8gYWxsIGxvZ3Mgd2l0aCBsZXZlbCBgaW5mb2AgYW5kIGJlbG93IHRvIGBjb21iaW5lZC5sb2dgIFxyXG4gICAgLy8gLSBXcml0ZSBhbGwgbG9ncyBlcnJvciAoYW5kIGJlbG93KSB0byBgZXJyb3IubG9nYC5cclxuICAgIC8vXHJcbiAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkZpbGUoeyBmaWxlbmFtZTogJ2Vycm9yLmxvZycsIGxldmVsOiAnZXJyb3InIH0pLFxyXG4gICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5GaWxlKHsgZmlsZW5hbWU6ICdjb21iaW5lZC5sb2cnIH0pXHJcbiAgXVxyXG59KTtcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7IC8vIHByaW50IGxvZyB0byBjb25zb2xlIGlmIG5vdCBpbiBwcm9kXHJcbiAgbG9nZ2VyLmFkZChuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoe1xyXG4gICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5zaW1wbGUoKVxyXG4gIH0pKTtcclxufSIsImltcG9ydCB7IHBpY2tSYW5kb20gfSBmcm9tIFwiLi9yYW5kb21cIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnZW5lcmF0ZU5hbWUgPSAobGVuZ3RoOiBudW1iZXIpID0+IHtcclxuICBpZiAobGVuZ3RoIDwgMSkgcmV0dXJuIFwiXCI7XHJcbiAgbGV0IHN0cmluZyA9IHBpY2tSYW5kb20oTk9VTik7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcclxuICAgIHN0cmluZyA9IHBpY2tSYW5kb20oQURKKSArIHN0cmluZztcclxuICB9XHJcbiAgcmV0dXJuIHN0cmluZztcclxufVxyXG5cclxuY29uc3QgQURKID0gW1xyXG4gIFwiRGVmaWFudFwiLFxyXG4gIFwiSG9tZWxlc3NcIixcclxuICBcIkFkb3JhYmxlXCIsXHJcbiAgXCJEZWxpZ2h0ZnVsXCIsXHJcbiAgXCJIb21lbHlcIixcclxuICBcIlF1YWludFwiLFxyXG4gIFwiQWR2ZW50dXJvdXNcIixcclxuICBcIkRlcHJlc3NlZFwiLFxyXG4gIFwiSG9ycmlibGVcIixcclxuICBcIkFnZ3Jlc3NpdmVcIixcclxuICBcIkRldGVybWluZWRcIixcclxuICBcIkh1bmdyeVwiLFxyXG4gIFwiUmVhbFwiLFxyXG4gIFwiQWdyZWVhYmxlXCIsXHJcbiAgXCJEaWZmZXJlbnRcIixcclxuICBcIkh1cnRcIixcclxuICBcIlJlbGlldmVkXCIsXHJcbiAgXCJBbGVydFwiLFxyXG4gIFwiRGlmZmljdWx0XCIsXHJcbiAgXCJSZXB1bHNpdmVcIixcclxuICBcIkFsaXZlXCIsXHJcbiAgXCJEaXNndXN0ZWRcIixcclxuICBcIklsbFwiLFxyXG4gIFwiUmljaFwiLFxyXG4gIFwiQW11c2VkXCIsXHJcbiAgXCJEaXN0aW5jdFwiLFxyXG4gIFwiSW1wb3J0YW50XCIsXHJcbiAgXCJBbmdyeVwiLFxyXG4gIFwiRGlzdHVyYmVkXCIsXHJcbiAgXCJJbXBvc3NpYmxlXCIsXHJcbiAgXCJTY2FyeVwiLFxyXG4gIFwiQW5ub3llZFwiLFxyXG4gIFwiRGl6enlcIixcclxuICBcIkluZXhwZW5zaXZlXCIsXHJcbiAgXCJTZWxmaXNoXCIsXHJcbiAgXCJBbm5veWluZ1wiLFxyXG4gIFwiRG91YnRmdWxcIixcclxuICBcIklubm9jZW50XCIsXHJcbiAgXCJTaGlueVwiLFxyXG4gIFwiQW54aW91c1wiLFxyXG4gIFwiRHJhYlwiLFxyXG4gIFwiSW5xdWlzaXRpdmVcIixcclxuICBcIlNoeVwiLFxyXG4gIFwiQXJyb2dhbnRcIixcclxuICBcIkR1bGxcIixcclxuICBcIkl0Y2h5XCIsXHJcbiAgXCJTaWxseVwiLFxyXG4gIFwiQXNoYW1lZFwiLFxyXG4gIFwiU2xlZXB5XCIsXHJcbiAgXCJBdHRyYWN0aXZlXCIsXHJcbiAgXCJFYWdlclwiLFxyXG4gIFwiSmVhbG91c1wiLFxyXG4gIFwiU21pbGluZ1wiLFxyXG4gIFwiQXZlcmFnZVwiLFxyXG4gIFwiRWFzeVwiLFxyXG4gIFwiSml0dGVyeVwiLFxyXG4gIFwiU21vZ2d5XCIsXHJcbiAgXCJBd2Z1bFwiLFxyXG4gIFwiRWxhdGVkXCIsXHJcbiAgXCJKb2xseVwiLFxyXG4gIFwiU29yZVwiLFxyXG4gIFwiRWxlZ2FudFwiLFxyXG4gIFwiSm95b3VzXCIsXHJcbiAgXCJTcGFya2xpbmdcIixcclxuICBcIkJhZFwiLFxyXG4gIFwiRW1iYXJyYXNzZWRcIixcclxuICBcIlNwbGVuZGlkXCIsXHJcbiAgXCJCZWF1dGlmdWxcIixcclxuICBcIkVuY2hhbnRpbmdcIixcclxuICBcIktpbmRcIixcclxuICBcIlNwb3RsZXNzXCIsXHJcbiAgXCJCZXR0ZXJcIixcclxuICBcIkVuY291cmFnaW5nXCIsXHJcbiAgXCJTdG9ybXlcIixcclxuICBcIkJld2lsZGVyZWRcIixcclxuICBcIkVuZXJnZXRpY1wiLFxyXG4gIFwiTGF6eVwiLFxyXG4gIFwiU3RyYW5nZVwiLFxyXG4gIFwiQmxhY2tcIixcclxuICBcIkVudGh1c2lhc3RpY1wiLFxyXG4gIFwiTGlnaHRcIixcclxuICBcIlN0dXBpZFwiLFxyXG4gIFwiQmxvb2R5XCIsXHJcbiAgXCJFbnZpb3VzXCIsXHJcbiAgXCJMaXZlbHlcIixcclxuICBcIlN1Y2Nlc3NmdWxcIixcclxuICBcIkJsdWVcIixcclxuICBcIkV2aWxcIixcclxuICBcIkxvbmVseVwiLFxyXG4gIFwiU3VwZXJcIixcclxuICBcIkV4Y2l0ZWRcIixcclxuICBcIkxvbmdcIixcclxuICBcIkJsdXNoaW5nXCIsXHJcbiAgXCJFeHBlbnNpdmVcIixcclxuICBcIkxvdmVseVwiLFxyXG4gIFwiVGFsZW50ZWRcIixcclxuICBcIkJvcmVkXCIsXHJcbiAgXCJFeHViZXJhbnRcIixcclxuICBcIkx1Y2t5XCIsXHJcbiAgXCJUYW1lXCIsXHJcbiAgXCJCcmFpbnlcIixcclxuICBcIlRlbmRlclwiLFxyXG4gIFwiQnJhdmVcIixcclxuICBcIkZhaXJcIixcclxuICBcIk1hZ25pZmljZW50XCIsXHJcbiAgXCJUZW5zZVwiLFxyXG4gIFwiQnJlYWthYmxlXCIsXHJcbiAgXCJGYWl0aGZ1bFwiLFxyXG4gIFwiTWlzdHlcIixcclxuICBcIlRlcnJpYmxlXCIsXHJcbiAgXCJCcmlnaHRcIixcclxuICBcIkZhbW91c1wiLFxyXG4gIFwiTW9kZXJuXCIsXHJcbiAgXCJUYXN0eVwiLFxyXG4gIFwiQnVzeVwiLFxyXG4gIFwiRmFuY3lcIixcclxuICBcIk1vdGlvbmxlc3NcIixcclxuICBcIlRoYW5rZnVsXCIsXHJcbiAgXCJGYW50YXN0aWNcIixcclxuICBcIk11ZGR5XCIsXHJcbiAgXCJUaG91Z2h0ZnVsXCIsXHJcbiAgXCJDYWxtXCIsXHJcbiAgXCJGaWVyY2VcIixcclxuICBcIk11c2h5XCIsXHJcbiAgXCJUaG91Z2h0bGVzc1wiLFxyXG4gIFwiQ2FyZWZ1bFwiLFxyXG4gIFwiRmlsdGh5XCIsXHJcbiAgXCJNeXN0ZXJpb3VzXCIsXHJcbiAgXCJUaXJlZFwiLFxyXG4gIFwiQ2F1dGlvdXNcIixcclxuICBcIkZpbmVcIixcclxuICBcIlRvdWdoXCIsXHJcbiAgXCJDaGFybWluZ1wiLFxyXG4gIFwiRm9vbGlzaFwiLFxyXG4gIFwiTmFzdHlcIixcclxuICBcIlRyb3VibGVkXCIsXHJcbiAgXCJDaGVlcmZ1bFwiLFxyXG4gIFwiRnJhZ2lsZVwiLFxyXG4gIFwiTmF1Z2h0eVwiLFxyXG4gIFwiQ2xlYW5cIixcclxuICBcIkZyYWlsXCIsXHJcbiAgXCJOZXJ2b3VzXCIsXHJcbiAgXCJVZ2xpZXN0XCIsXHJcbiAgXCJDbGVhclwiLFxyXG4gIFwiRnJhbnRpY1wiLFxyXG4gIFwiTmljZVwiLFxyXG4gIFwiVWdseVwiLFxyXG4gIFwiQ2xldmVyXCIsXHJcbiAgXCJGcmllbmRseVwiLFxyXG4gIFwiTnV0dHlcIixcclxuICBcIlVuaW50ZXJlc3RlZFwiLFxyXG4gIFwiQ2xvdWR5XCIsXHJcbiAgXCJGcmlnaHRlbmVkXCIsXHJcbiAgXCJVbnNpZ2h0bHlcIixcclxuICBcIkNsdW1zeVwiLFxyXG4gIFwiRnVubnlcIixcclxuICBcIk9iZWRpZW50XCIsXHJcbiAgXCJVbnVzdWFsXCIsXHJcbiAgXCJDb2xvcmZ1bFwiLFxyXG4gIFwiT2Jub3hpb3VzXCIsXHJcbiAgXCJVcHNldFwiLFxyXG4gIFwiQ29tYmF0aXZlXCIsXHJcbiAgXCJHZW50bGVcIixcclxuICBcIk9kZFwiLFxyXG4gIFwiVXB0aWdodFwiLFxyXG4gIFwiQ29tZm9ydGFibGVcIixcclxuICBcIkdpZnRlZFwiLFxyXG4gIFwiQ29uY2VybmVkXCIsXHJcbiAgXCJHbGFtb3JvdXNcIixcclxuICBcIk9wZW5cIixcclxuICBcIlZhc3RcIixcclxuICBcIkNvbmRlbW5lZFwiLFxyXG4gIFwiR2xlYW1pbmdcIixcclxuICBcIk91dHJhZ2VvdXNcIixcclxuICBcIlZpY3RvcmlvdXNcIixcclxuICBcIkNvbmZ1c2VkXCIsXHJcbiAgXCJHbG9yaW91c1wiLFxyXG4gIFwiT3V0c3RhbmRpbmdcIixcclxuICBcIlZpdmFjaW91c1wiLFxyXG4gIFwiQ29vcGVyYXRpdmVcIixcclxuICBcIkdvb2RcIixcclxuICBcIkNvdXJhZ2VvdXNcIixcclxuICBcIkdvcmdlb3VzXCIsXHJcbiAgXCJQYW5pY2t5XCIsXHJcbiAgXCJXYW5kZXJpbmdcIixcclxuICBcIkNyYXp5XCIsXHJcbiAgXCJHcmFjZWZ1bFwiLFxyXG4gIFwiUGVyZmVjdFwiLFxyXG4gIFwiV2VhcnlcIixcclxuICBcIkNyZWVweVwiLFxyXG4gIFwiR3JpZXZpbmdcIixcclxuICBcIlBsYWluXCIsXHJcbiAgXCJXaWNrZWRcIixcclxuICBcIkNyb3dkZWRcIixcclxuICBcIkdyb3Rlc3F1ZVwiLFxyXG4gIFwiUGxlYXNhbnRcIixcclxuICBcIkNydWVsXCIsXHJcbiAgXCJHcnVtcHlcIixcclxuICBcIlBvaXNlZFwiLFxyXG4gIFwiV2lsZFwiLFxyXG4gIFwiQ3VyaW91c1wiLFxyXG4gIFwiUG9vclwiLFxyXG4gIFwiV2l0dHlcIixcclxuICBcIkN1dGVcIixcclxuICBcIkhhbmRzb21lXCIsXHJcbiAgXCJQb3dlcmZ1bFwiLFxyXG4gIFwiV29ycmlzb21lXCIsXHJcbiAgXCJIYXBweVwiLFxyXG4gIFwiUHJlY2lvdXNcIixcclxuICBcIldvcnJpZWRcIixcclxuICBcIkRhbmdlcm91c1wiLFxyXG4gIFwiSGVhbHRoeVwiLFxyXG4gIFwiUHJpY2tseVwiLFxyXG4gIFwiV3JvbmdcIixcclxuICBcIkRhcmtcIixcclxuICBcIkhlbHBmdWxcIixcclxuICBcIlByb3VkXCIsXHJcbiAgXCJEZWFkXCIsXHJcbiAgXCJIZWxwbGVzc1wiLFxyXG4gIFwiUHV0cmlkXCIsXHJcbiAgXCJaYW55XCIsXHJcbiAgXCJEZWZlYXRlZFwiLFxyXG4gIFwiSGlsYXJpb3VzXCIsXHJcbiAgXCJQdXp6bGVkXCIsXHJcbiAgXCJaZWFsb3VzXCIsXHJcbl1cclxuXHJcbmNvbnN0IE5PVU4gPSBbXHJcbiAgXCJZYWtcIixcclxuICBcIlNoZWVwXCIsXHJcbiAgXCJWb2ljZVwiLFxyXG4gIFwiUGxhbmVzXCIsXHJcbiAgXCJIYXJtb255XCIsXHJcbiAgXCJTdGF0aW9uXCIsXHJcbiAgXCJTdGF0ZW1lbnRcIixcclxuICBcIkJsb29kXCIsXHJcbiAgXCJTdGl0Y2hcIixcclxuICBcIldhclwiLFxyXG4gIFwiU29jaWV0eVwiLFxyXG4gIFwiQnViYmxlXCIsXHJcbiAgXCJSYXlcIixcclxuICBcIlNpbmtcIixcclxuICBcIlRlcnJpdG9yeVwiLFxyXG4gIFwiU2Npc3NvcnNcIixcclxuICBcIlJvb2ZcIixcclxuICBcIldhdGNoXCIsXHJcbiAgXCJNYXJrXCIsXHJcbiAgXCJSZXNwZWN0XCIsXHJcbiAgXCJBZnRlcm5vb25cIixcclxuICBcIkJlYXJcIixcclxuICBcIldlYWx0aFwiLFxyXG4gIFwiQ29sbGFyXCIsXHJcbiAgXCJTYW5kXCIsXHJcbiAgXCJJbXB1bHNlXCIsXHJcbiAgXCJEdXN0XCIsXHJcbiAgXCJSYWluc3Rvcm1cIixcclxuICBcIlNoYXBlXCIsXHJcbiAgXCJLbmlmZVwiLFxyXG4gIFwiUGlwZVwiLFxyXG4gIFwiQm9hdFwiLFxyXG4gIFwiQnVsYlwiLFxyXG4gIFwiU3BhY2VcIixcclxuICBcIkZpc2hcIixcclxuICBcIlF1aWV0XCIsXHJcbiAgXCJDaGlsZHJlblwiLFxyXG4gIFwiVGFzdGVcIixcclxuICBcIkZvcm1cIixcclxuICBcIkNhbGVuZGFyXCIsXHJcbiAgXCJQaW5cIixcclxuICBcIlBsYXN0aWNcIixcclxuICBcIkphclwiLFxyXG4gIFwiR2F0ZVwiLFxyXG4gIFwiU2hlZXRcIixcclxuICBcIlBhcmNlbFwiLFxyXG4gIFwiU3VnZ2VzdGlvblwiLFxyXG4gIFwiSGFpcmN1dFwiLFxyXG4gIFwiUGFuY2FrZVwiLFxyXG4gIFwiSGVhbHRoXCIsXHJcbiAgXCJWZWluXCIsXHJcbiAgXCJPaWxcIixcclxuICBcIkNoYWxrXCIsXHJcbiAgXCJSaW5nc1wiLFxyXG4gIFwiSGFyYm9yXCIsXHJcbiAgXCJQbGF5XCIsXHJcbiAgXCJCb3lcIixcclxuICBcIkRpc2N1c3Npb25cIixcclxuICBcIlZhc2VcIixcclxuICBcIkRpbWVcIixcclxuICBcIlRyZWVcIixcclxuICBcIlJvc2VcIixcclxuICBcIlNuYWtlc1wiLFxyXG4gIFwiT2ZmaWNlXCIsXHJcbiAgXCJEb2xsXCIsXHJcbiAgXCJBcmd1bWVudFwiLFxyXG4gIFwiRGVidFwiLFxyXG4gIFwiRXhwZXJpZW5jZVwiLFxyXG4gIFwiS2l0dHlcIixcclxuICBcIkhhaXJcIixcclxuICBcIkNyaW1lXCIsXHJcbiAgXCJTbGVlcFwiLFxyXG4gIFwiSW5kdXN0cnlcIixcclxuICBcIlJlc3RcIixcclxuICBcIlJpY2VcIixcclxuICBcIkhvdXNlXCIsXHJcbiAgXCJSZWxhdGlvblwiLFxyXG4gIFwiUXVlc3Rpb25cIixcclxuICBcIlRlc3RcIixcclxuICBcIkZpbmdlclwiLFxyXG4gIFwiTWFjaGluZVwiLFxyXG4gIFwiUGl6emFzXCIsXHJcbiAgXCJTdG9ja2luZ1wiLFxyXG4gIFwiU3RvcmVcIixcclxuICBcIkR1Y2tcIixcclxuICBcIlN0cnVjdHVyZVwiLFxyXG4gIFwiR2lyYWZmZVwiLFxyXG4gIFwiUXVhcnR6XCIsXHJcbiAgXCJBdHRyYWN0aW9uXCIsXHJcbiAgXCJTdGlja3NcIixcclxuICBcIkJpa2VzXCIsXHJcbiAgXCJOdW1iZXJcIixcclxuICBcIkZseVwiLFxyXG4gIFwiR3Jvd3RoXCIsXHJcbiAgXCJTZWxlY3Rpb25cIixcclxuICBcIldheVwiLFxyXG4gIFwiVmFsdWVcIixcclxuICBcIkhhbmRzXCIsXHJcbiAgXCJTaWduXCIsXHJcbiAgXCJMb2NrXCIsXHJcbl0iLCJleHBvcnQgY29uc3QgcmFuZCA9IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpID0+IHtcclxuICByZXR1cm4gbWluICsgKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJhbmRJbnQgPSAobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSA9PiB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IocmFuZChtaW4sIG1heCkpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwaWNrUmFuZG9tID0gKGFycjogYW55W10pID0+IHtcclxuICByZXR1cm4gYXJyW3JhbmRJbnQoMCwgYXJyLmxlbmd0aCldXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXVpZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=