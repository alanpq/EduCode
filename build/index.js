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
var Errors_1 = __webpack_require__(/*! ../modals/Errors */ "./src/modals/Errors.ts");
var name_gen_1 = __webpack_require__(/*! ./util/name-gen */ "./src/server/util/name-gen.ts");
//TODO: fix client side socket.io include
var uuid_1 = __webpack_require__(/*! uuid */ "uuid");
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);
var winston = __webpack_require__(/*! winston */ "winston");
var logger = winston.createLogger({
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
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
var app = express();
var _a = process.env.PORT, PORT = _a === void 0 ? 3000 : _a;
var http = http_1.createServer(app);
var io = socketio(http, {
    serveClient: false
});
var rooms = {}; // TODO: figure out room data storage (probably with DB stuff)
var subscribed = {};
// FIXME: major security vuln with client id handling - STOP HANDING THEM OUT
io.on('connection', function (client) {
    client.on('subscribeToRoom', function (options) {
        var _a;
        console.log("client wishes to subscribe to room " + options.roomID);
        if (rooms[options.roomID]) { // room exists
            console.log("room found");
            var room = rooms[options.roomID];
            console.log(room.password, options.password);
            if (room.password == '' || room.password == options.password) {
                console.log("password good");
                if (room.connections.length < room.capacity) {
                    console.log("client subscribed to room " + options.roomID);
                    if (room.host == undefined)
                        rooms[options.roomID].host = client.id;
                    rooms[options.roomID].connections.push({ id: client.id, displayName: ((_a = options.user) === null || _a === void 0 ? void 0 : _a.displayName) || name_gen_1.generateName(2) });
                    subscribed[client.id] = options.roomID;
                    client.join(options.roomID);
                    io.to(options.roomID).emit('roomState', room);
                    // client.emit('roomState', room)
                }
                else {
                    console.log('room full');
                    client.emit('err', Errors_1.ConnError.ROOM_MAX_CAPACITY);
                }
            }
            else {
                console.log('bad password');
                client.emit('err', Errors_1.ConnError.UNAUTHORIZED);
            }
        }
        else {
            console.log("room not found");
            client.emit('err', Errors_1.ConnError.ROOM_NOT_FOUND);
        }
    });
    client.on('createRoom', function (options) {
        var id = uuid_1.v4();
        rooms[id] = {
            id: id,
            capacity: options.capacity,
            name: options.name,
            password: options.password,
            connections: [],
            host: undefined,
        };
        client.emit('res', id);
    });
    client.on('disconnect', function (reason) {
        var _a;
        var roomID = subscribed[client.id];
        if (rooms[roomID]) {
            console.log('disconnect from ' + roomID);
            var room = rooms[roomID];
            console.log('room found');
            var a = room.connections;
            a.splice(a.findIndex(function (v, i, o) { return v.id == roomID; }));
            if (room.host == client.id)
                room.host = (_a = a[0]) === null || _a === void 0 ? void 0 : _a.id;
            rooms[roomID] = room;
            if (a.length == 0) { // room is empty
                setTimeout(function () {
                    if (rooms[roomID].connections.length == 0)
                        delete rooms[roomID];
                }, 5000); // delete room after 5 seconds
            }
            else {
                io.to(roomID).emit('roomState', room);
                // }
            }
        }
    });
});
// app.set('views', __dirname + '/views');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());
var publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.get('*client.js', function (req, res) {
    res.sendFile(path.join(__dirname, "client.js"));
});
app.get('/api/rooms', function (req, res) {
    res.json(JSON.stringify(rooms));
});
app.get('*', function (req, res) {
    res.sendFile(publicPath + '/index.html');
});
if (__webpack_require__.c[__webpack_require__.s] === module) {
    http.listen(PORT, function () {
        console.log('Server started at http://localhost:' + PORT);
    });
}
exports["default"] = app;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kYWxzL0Vycm9ycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbC9uYW1lLWdlbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3V0aWwvcmFuZG9tLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInV1aWRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5zdG9uXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNB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QVM7SUFDVCxTQUFTO0lBQ1QsT0FBTztJQUNQLE1BQU07SUFDTixTQUFTO0lBQ1QsT0FBTztJQUNQLE1BQU07SUFDTixVQUFVO0lBQ1YsUUFBUTtJQUNSLE1BQU07SUFDTixVQUFVO0lBQ1YsV0FBVztJQUNYLFNBQVM7SUFDVCxTQUFTO0NBQ1Y7QUFFRCxJQUFNLElBQUksR0FBRztJQUNYLEtBQUs7SUFDTCxPQUFPO0lBQ1AsT0FBTztJQUNQLFFBQVE7SUFDUixTQUFTO0lBQ1QsU0FBUztJQUNULFdBQVc7SUFDWCxPQUFPO0lBQ1AsUUFBUTtJQUNSLEtBQUs7SUFDTCxTQUFTO0lBQ1QsUUFBUTtJQUNSLEtBQUs7SUFDTCxNQUFNO0lBQ04sV0FBVztJQUNYLFVBQVU7SUFDVixNQUFNO0lBQ04sT0FBTztJQUNQLE1BQU07SUFDTixTQUFTO0lBQ1QsV0FBVztJQUNYLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLE1BQU07SUFDTixTQUFTO0lBQ1QsTUFBTTtJQUNOLFdBQVc7SUFDWCxPQUFPO0lBQ1AsT0FBTztJQUNQLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE9BQU87SUFDUCxNQUFNO0lBQ04sT0FBTztJQUNQLFVBQVU7SUFDVixPQUFPO0lBQ1AsTUFBTTtJQUNOLFVBQVU7SUFDVixLQUFLO0lBQ0wsU0FBUztJQUNULEtBQUs7SUFDTCxNQUFNO0lBQ04sT0FBTztJQUNQLFFBQVE7SUFDUixZQUFZO0lBQ1osU0FBUztJQUNULFNBQVM7SUFDVCxRQUFRO0lBQ1IsTUFBTTtJQUNOLEtBQUs7SUFDTCxPQUFPO0lBQ1AsT0FBTztJQUNQLFFBQVE7SUFDUixNQUFNO0lBQ04sS0FBSztJQUNMLFlBQVk7SUFDWixNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sUUFBUTtJQUNSLFFBQVE7SUFDUixNQUFNO0lBQ04sVUFBVTtJQUNWLE1BQU07SUFDTixZQUFZO0lBQ1osT0FBTztJQUNQLE1BQU07SUFDTixPQUFPO0lBQ1AsT0FBTztJQUNQLFVBQVU7SUFDVixNQUFNO0lBQ04sTUFBTTtJQUNOLE9BQU87SUFDUCxVQUFVO0lBQ1YsVUFBVTtJQUNWLE1BQU07SUFDTixRQUFRO0lBQ1IsU0FBUztJQUNULFFBQVE7SUFDUixVQUFVO0lBQ1YsT0FBTztJQUNQLE1BQU07SUFDTixXQUFXO0lBQ1gsU0FBUztJQUNULFFBQVE7SUFDUixZQUFZO0lBQ1osUUFBUTtJQUNSLE9BQU87SUFDUCxRQUFRO0lBQ1IsS0FBSztJQUNMLFFBQVE7SUFDUixXQUFXO0lBQ1gsS0FBSztJQUNMLE9BQU87SUFDUCxPQUFPO0lBQ1AsTUFBTTtJQUNOLE1BQU07Q0FDUDs7Ozs7Ozs7Ozs7Ozs7O0FDcFZZLFlBQUksR0FBRyxVQUFDLEdBQVcsRUFBRSxHQUFXO0lBQzNDLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFFWSxlQUFPLEdBQUcsVUFBQyxHQUFXLEVBQUUsR0FBVztJQUM5QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRVksa0JBQVUsR0FBRyxVQUFDLEdBQVU7SUFDbkMsT0FBTyxHQUFHLENBQUMsZUFBTyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDVkQsb0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsc0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsb0MiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zZXJ2ZXIvaW5kZXgudHNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJleHBvcnQgZW51bSBDb25uRXJyb3Ige1xyXG4gIFVOS05PV04gPSAweDAwLFxyXG4gIFVOQVVUSE9SSVpFRCA9IDB4NDAxLFxyXG4gIFJPT01fTk9UX0ZPVU5EID0gMHg0MDQxLFxyXG4gIFJPT01fTUFYX0NBUEFDSVRZID0gMHg0MDMxLFxyXG59IiwiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xyXG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnXHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcclxuXHJcbmltcG9ydCB7IGNyZWF0ZVNlcnZlciB9IGZyb20gJ2h0dHAnXHJcbmltcG9ydCAqIGFzIHNvY2tldGlvIGZyb20gJ3NvY2tldC5pbydcclxuaW1wb3J0IHsgUm9vbUNvbm5lY3Rpb25PcHRpb25zIH0gZnJvbSAnLi4vY2xpZW50L21vZHVsZXMvUm9vbSdcclxuaW1wb3J0IHsgQ29ubkVycm9yIH0gZnJvbSAnLi4vbW9kYWxzL0Vycm9ycydcclxuaW1wb3J0IHsgSVJvb20gfSBmcm9tICcuL21vZGFscy9JUm9vbSdcclxuaW1wb3J0IHsgZ2VuZXJhdGVOYW1lIH0gZnJvbSAnLi91dGlsL25hbWUtZ2VuJ1xyXG4vL1RPRE86IGZpeCBjbGllbnQgc2lkZSBzb2NrZXQuaW8gaW5jbHVkZVxyXG5cclxuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnXHJcblxyXG4vLyB2YXIgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKS5jcmVhdGVTZXJ2ZXIoYXBwKTtcclxuLy8gdmFyIGlvID0gcmVxdWlyZSgnc29ja2V0LmlvJykoaHR0cCk7XHJcblxyXG5pbXBvcnQgKiBhcyB3aW5zdG9uIGZyb20gJ3dpbnN0b24nXHJcblxyXG5jb25zdCBsb2dnZXIgPSB3aW5zdG9uLmNyZWF0ZUxvZ2dlcih7XHJcbiAgbGV2ZWw6ICdpbmZvJyxcclxuICBmb3JtYXQ6IHdpbnN0b24uZm9ybWF0Lmpzb24oKSxcclxuICBkZWZhdWx0TWV0YTogeyBzZXJ2aWNlOiAndXNlci1zZXJ2aWNlJyB9LFxyXG4gIHRyYW5zcG9ydHM6IFtcclxuICAgIC8vXHJcbiAgICAvLyAtIFdyaXRlIHRvIGFsbCBsb2dzIHdpdGggbGV2ZWwgYGluZm9gIGFuZCBiZWxvdyB0byBgY29tYmluZWQubG9nYCBcclxuICAgIC8vIC0gV3JpdGUgYWxsIGxvZ3MgZXJyb3IgKGFuZCBiZWxvdykgdG8gYGVycm9yLmxvZ2AuXHJcbiAgICAvL1xyXG4gICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5GaWxlKHsgZmlsZW5hbWU6ICdlcnJvci5sb2cnLCBsZXZlbDogJ2Vycm9yJyB9KSxcclxuICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuRmlsZSh7IGZpbGVuYW1lOiAnY29tYmluZWQubG9nJyB9KVxyXG4gIF1cclxufSk7XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgeyAvLyBwcmludCBsb2cgdG8gY29uc29sZSBpZiBub3QgaW4gcHJvZFxyXG4gIGxvZ2dlci5hZGQobmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKHtcclxuICAgIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuc2ltcGxlKClcclxuICB9KSk7XHJcbn1cclxuXHJcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcclxuY29uc3Qge1xyXG4gIFBPUlQgPSAzMDAwXHJcbn0gPSBwcm9jZXNzLmVudjtcclxuXHJcbmNvbnN0IGh0dHAgPSBjcmVhdGVTZXJ2ZXIoYXBwKVxyXG5jb25zdCBpbyA9IHNvY2tldGlvKGh0dHAsIHtcclxuICBzZXJ2ZUNsaWVudDogZmFsc2VcclxufSlcclxuXHJcbmNvbnN0IHJvb21zOiB7IFtpZDogc3RyaW5nXTogSVJvb20gfSA9IHt9OyAvLyBUT0RPOiBmaWd1cmUgb3V0IHJvb20gZGF0YSBzdG9yYWdlIChwcm9iYWJseSB3aXRoIERCIHN0dWZmKVxyXG5jb25zdCBzdWJzY3JpYmVkOiB7IFtjb25uSUQ6IHN0cmluZ106IHN0cmluZyB9ID0ge307XHJcbi8vIEZJWE1FOiBtYWpvciBzZWN1cml0eSB2dWxuIHdpdGggY2xpZW50IGlkIGhhbmRsaW5nIC0gU1RPUCBIQU5ESU5HIFRIRU0gT1VUXHJcbmlvLm9uKCdjb25uZWN0aW9uJywgKGNsaWVudCkgPT4ge1xyXG4gIGNsaWVudC5vbignc3Vic2NyaWJlVG9Sb29tJywgKG9wdGlvbnM6IFJvb21Db25uZWN0aW9uT3B0aW9ucykgPT4ge1xyXG4gICAgY29uc29sZS5sb2coYGNsaWVudCB3aXNoZXMgdG8gc3Vic2NyaWJlIHRvIHJvb20gJHtvcHRpb25zLnJvb21JRH1gKTtcclxuICAgIGlmIChyb29tc1tvcHRpb25zLnJvb21JRF0pIHsgLy8gcm9vbSBleGlzdHNcclxuICAgICAgY29uc29sZS5sb2coYHJvb20gZm91bmRgKVxyXG4gICAgICBjb25zdCByb29tOiBJUm9vbSA9IHJvb21zW29wdGlvbnMucm9vbUlEXTtcclxuICAgICAgY29uc29sZS5sb2cocm9vbS5wYXNzd29yZCwgb3B0aW9ucy5wYXNzd29yZClcclxuICAgICAgaWYgKHJvb20ucGFzc3dvcmQgPT0gJycgfHwgcm9vbS5wYXNzd29yZCA9PSBvcHRpb25zLnBhc3N3b3JkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYHBhc3N3b3JkIGdvb2RgKVxyXG4gICAgICAgIGlmIChyb29tLmNvbm5lY3Rpb25zLmxlbmd0aCA8IHJvb20uY2FwYWNpdHkpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGBjbGllbnQgc3Vic2NyaWJlZCB0byByb29tICR7b3B0aW9ucy5yb29tSUR9YClcclxuICAgICAgICAgIGlmIChyb29tLmhvc3QgPT0gdW5kZWZpbmVkKSByb29tc1tvcHRpb25zLnJvb21JRF0uaG9zdCA9IGNsaWVudC5pZFxyXG4gICAgICAgICAgcm9vbXNbb3B0aW9ucy5yb29tSURdLmNvbm5lY3Rpb25zLnB1c2goeyBpZDogY2xpZW50LmlkLCBkaXNwbGF5TmFtZTogb3B0aW9ucy51c2VyPy5kaXNwbGF5TmFtZSB8fCBnZW5lcmF0ZU5hbWUoMikgfSlcclxuICAgICAgICAgIHN1YnNjcmliZWRbY2xpZW50LmlkXSA9IG9wdGlvbnMucm9vbUlEXHJcbiAgICAgICAgICBjbGllbnQuam9pbihvcHRpb25zLnJvb21JRClcclxuICAgICAgICAgIGlvLnRvKG9wdGlvbnMucm9vbUlEKS5lbWl0KCdyb29tU3RhdGUnLCByb29tKVxyXG4gICAgICAgICAgLy8gY2xpZW50LmVtaXQoJ3Jvb21TdGF0ZScsIHJvb20pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdyb29tIGZ1bGwnKVxyXG4gICAgICAgICAgY2xpZW50LmVtaXQoJ2VycicsIENvbm5FcnJvci5ST09NX01BWF9DQVBBQ0lUWSlcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2JhZCBwYXNzd29yZCcpXHJcbiAgICAgICAgY2xpZW50LmVtaXQoJ2VycicsIENvbm5FcnJvci5VTkFVVEhPUklaRUQpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGByb29tIG5vdCBmb3VuZGApXHJcbiAgICAgIGNsaWVudC5lbWl0KCdlcnInLCBDb25uRXJyb3IuUk9PTV9OT1RfRk9VTkQpXHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGNsaWVudC5vbignY3JlYXRlUm9vbScsIChvcHRpb25zOiBJUm9vbSkgPT4ge1xyXG4gICAgY29uc3QgaWQgPSB1dWlkKCk7XHJcbiAgICByb29tc1tpZF0gPSB7XHJcbiAgICAgIGlkOiBpZCxcclxuICAgICAgY2FwYWNpdHk6IG9wdGlvbnMuY2FwYWNpdHksXHJcbiAgICAgIG5hbWU6IG9wdGlvbnMubmFtZSxcclxuICAgICAgcGFzc3dvcmQ6IG9wdGlvbnMucGFzc3dvcmQsXHJcbiAgICAgIGNvbm5lY3Rpb25zOiBbXSxcclxuICAgICAgaG9zdDogdW5kZWZpbmVkLFxyXG4gICAgfTtcclxuICAgIGNsaWVudC5lbWl0KCdyZXMnLCBpZClcclxuXHJcbiAgfSlcclxuXHJcbiAgY2xpZW50Lm9uKCdkaXNjb25uZWN0JywgKHJlYXNvbikgPT4ge1xyXG4gICAgY29uc3Qgcm9vbUlEID0gc3Vic2NyaWJlZFtjbGllbnQuaWRdO1xyXG4gICAgaWYgKHJvb21zW3Jvb21JRF0pIHtcclxuICAgICAgY29uc29sZS5sb2coJ2Rpc2Nvbm5lY3QgZnJvbSAnICsgcm9vbUlEKVxyXG4gICAgICBjb25zdCByb29tID0gcm9vbXNbcm9vbUlEXTtcclxuICAgICAgY29uc29sZS5sb2coJ3Jvb20gZm91bmQnKVxyXG4gICAgICBjb25zdCBhID0gcm9vbS5jb25uZWN0aW9ucztcclxuICAgICAgYS5zcGxpY2UoYS5maW5kSW5kZXgoKHYsIGksIG8pID0+IHsgcmV0dXJuIHYuaWQgPT0gcm9vbUlEIH0pKTtcclxuICAgICAgaWYgKHJvb20uaG9zdCA9PSBjbGllbnQuaWQpIHJvb20uaG9zdCA9IGFbMF0/LmlkO1xyXG4gICAgICByb29tc1tyb29tSURdID0gcm9vbVxyXG4gICAgICBpZiAoYS5sZW5ndGggPT0gMCkgeyAvLyByb29tIGlzIGVtcHR5XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBpZiAocm9vbXNbcm9vbUlEXS5jb25uZWN0aW9ucy5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgZGVsZXRlIHJvb21zW3Jvb21JRF07XHJcbiAgICAgICAgfSwgNTAwMCk7IC8vIGRlbGV0ZSByb29tIGFmdGVyIDUgc2Vjb25kc1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlvLnRvKHJvb21JRCkuZW1pdCgncm9vbVN0YXRlJywgcm9vbSlcclxuICAgICAgICAvLyB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG4vLyBhcHAuc2V0KCd2aWV3cycsIF9fZGlybmFtZSArICcvdmlld3MnKTtcclxuLy8gYXBwLnNldCgndmlldyBlbmdpbmUnLCAnanN4Jyk7XHJcbi8vIGFwcC5lbmdpbmUoJ2pzeCcsIHJlcXVpcmUoJ2V4cHJlc3MtcmVhY3Qtdmlld3MnKS5jcmVhdGVFbmdpbmUoKSk7XHJcbmNvbnN0IHB1YmxpY1BhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAncHVibGljJylcclxuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwdWJsaWNQYXRoKSlcclxuXHJcbmFwcC5nZXQoJypjbGllbnQuanMnLCAocmVxOiBhbnksIHJlczogYW55KSA9PiB7XHJcbiAgcmVzLnNlbmRGaWxlKHBhdGguam9pbihfX2Rpcm5hbWUsIFwiY2xpZW50LmpzXCIpKVxyXG59KVxyXG5cclxuYXBwLmdldCgnL2FwaS9yb29tcycsIChyZXE6IGFueSwgcmVzOiBhbnkpID0+IHtcclxuICByZXMuanNvbihKU09OLnN0cmluZ2lmeShyb29tcykpO1xyXG59KVxyXG5cclxuYXBwLmdldCgnKicsIChyZXE6IFJlcXVlc3QsIHJlczogYW55KSA9PiB7XHJcbiAgcmVzLnNlbmRGaWxlKHB1YmxpY1BhdGggKyAnL2luZGV4Lmh0bWwnKVxyXG59KTtcclxuXHJcbmlmIChyZXF1aXJlLm1haW4gPT09IG1vZHVsZSkge1xyXG4gIGh0dHAubGlzdGVuKFBPUlQsICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdTZXJ2ZXIgc3RhcnRlZCBhdCBodHRwOi8vbG9jYWxob3N0OicgKyBQT1JUKTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBwOyIsImltcG9ydCB7IHBpY2tSYW5kb20gfSBmcm9tIFwiLi9yYW5kb21cIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnZW5lcmF0ZU5hbWUgPSAobGVuZ3RoOiBudW1iZXIpID0+IHtcclxuICBpZiAobGVuZ3RoIDwgMSkgcmV0dXJuIFwiXCI7XHJcbiAgbGV0IHN0cmluZyA9IHBpY2tSYW5kb20oTk9VTik7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcclxuICAgIHN0cmluZyA9IHBpY2tSYW5kb20oQURKKSArIHN0cmluZztcclxuICB9XHJcbiAgcmV0dXJuIHN0cmluZztcclxufVxyXG5cclxuY29uc3QgQURKID0gW1xyXG4gIFwiRGVmaWFudFwiLFxyXG4gIFwiSG9tZWxlc3NcIixcclxuICBcIkFkb3JhYmxlXCIsXHJcbiAgXCJEZWxpZ2h0ZnVsXCIsXHJcbiAgXCJIb21lbHlcIixcclxuICBcIlF1YWludFwiLFxyXG4gIFwiQWR2ZW50dXJvdXNcIixcclxuICBcIkRlcHJlc3NlZFwiLFxyXG4gIFwiSG9ycmlibGVcIixcclxuICBcIkFnZ3Jlc3NpdmVcIixcclxuICBcIkRldGVybWluZWRcIixcclxuICBcIkh1bmdyeVwiLFxyXG4gIFwiUmVhbFwiLFxyXG4gIFwiQWdyZWVhYmxlXCIsXHJcbiAgXCJEaWZmZXJlbnRcIixcclxuICBcIkh1cnRcIixcclxuICBcIlJlbGlldmVkXCIsXHJcbiAgXCJBbGVydFwiLFxyXG4gIFwiRGlmZmljdWx0XCIsXHJcbiAgXCJSZXB1bHNpdmVcIixcclxuICBcIkFsaXZlXCIsXHJcbiAgXCJEaXNndXN0ZWRcIixcclxuICBcIklsbFwiLFxyXG4gIFwiUmljaFwiLFxyXG4gIFwiQW11c2VkXCIsXHJcbiAgXCJEaXN0aW5jdFwiLFxyXG4gIFwiSW1wb3J0YW50XCIsXHJcbiAgXCJBbmdyeVwiLFxyXG4gIFwiRGlzdHVyYmVkXCIsXHJcbiAgXCJJbXBvc3NpYmxlXCIsXHJcbiAgXCJTY2FyeVwiLFxyXG4gIFwiQW5ub3llZFwiLFxyXG4gIFwiRGl6enlcIixcclxuICBcIkluZXhwZW5zaXZlXCIsXHJcbiAgXCJTZWxmaXNoXCIsXHJcbiAgXCJBbm5veWluZ1wiLFxyXG4gIFwiRG91YnRmdWxcIixcclxuICBcIklubm9jZW50XCIsXHJcbiAgXCJTaGlueVwiLFxyXG4gIFwiQW54aW91c1wiLFxyXG4gIFwiRHJhYlwiLFxyXG4gIFwiSW5xdWlzaXRpdmVcIixcclxuICBcIlNoeVwiLFxyXG4gIFwiQXJyb2dhbnRcIixcclxuICBcIkR1bGxcIixcclxuICBcIkl0Y2h5XCIsXHJcbiAgXCJTaWxseVwiLFxyXG4gIFwiQXNoYW1lZFwiLFxyXG4gIFwiU2xlZXB5XCIsXHJcbiAgXCJBdHRyYWN0aXZlXCIsXHJcbiAgXCJFYWdlclwiLFxyXG4gIFwiSmVhbG91c1wiLFxyXG4gIFwiU21pbGluZ1wiLFxyXG4gIFwiQXZlcmFnZVwiLFxyXG4gIFwiRWFzeVwiLFxyXG4gIFwiSml0dGVyeVwiLFxyXG4gIFwiU21vZ2d5XCIsXHJcbiAgXCJBd2Z1bFwiLFxyXG4gIFwiRWxhdGVkXCIsXHJcbiAgXCJKb2xseVwiLFxyXG4gIFwiU29yZVwiLFxyXG4gIFwiRWxlZ2FudFwiLFxyXG4gIFwiSm95b3VzXCIsXHJcbiAgXCJTcGFya2xpbmdcIixcclxuICBcIkJhZFwiLFxyXG4gIFwiRW1iYXJyYXNzZWRcIixcclxuICBcIlNwbGVuZGlkXCIsXHJcbiAgXCJCZWF1dGlmdWxcIixcclxuICBcIkVuY2hhbnRpbmdcIixcclxuICBcIktpbmRcIixcclxuICBcIlNwb3RsZXNzXCIsXHJcbiAgXCJCZXR0ZXJcIixcclxuICBcIkVuY291cmFnaW5nXCIsXHJcbiAgXCJTdG9ybXlcIixcclxuICBcIkJld2lsZGVyZWRcIixcclxuICBcIkVuZXJnZXRpY1wiLFxyXG4gIFwiTGF6eVwiLFxyXG4gIFwiU3RyYW5nZVwiLFxyXG4gIFwiQmxhY2tcIixcclxuICBcIkVudGh1c2lhc3RpY1wiLFxyXG4gIFwiTGlnaHRcIixcclxuICBcIlN0dXBpZFwiLFxyXG4gIFwiQmxvb2R5XCIsXHJcbiAgXCJFbnZpb3VzXCIsXHJcbiAgXCJMaXZlbHlcIixcclxuICBcIlN1Y2Nlc3NmdWxcIixcclxuICBcIkJsdWVcIixcclxuICBcIkV2aWxcIixcclxuICBcIkxvbmVseVwiLFxyXG4gIFwiU3VwZXJcIixcclxuICBcIkV4Y2l0ZWRcIixcclxuICBcIkxvbmdcIixcclxuICBcIkJsdXNoaW5nXCIsXHJcbiAgXCJFeHBlbnNpdmVcIixcclxuICBcIkxvdmVseVwiLFxyXG4gIFwiVGFsZW50ZWRcIixcclxuICBcIkJvcmVkXCIsXHJcbiAgXCJFeHViZXJhbnRcIixcclxuICBcIkx1Y2t5XCIsXHJcbiAgXCJUYW1lXCIsXHJcbiAgXCJCcmFpbnlcIixcclxuICBcIlRlbmRlclwiLFxyXG4gIFwiQnJhdmVcIixcclxuICBcIkZhaXJcIixcclxuICBcIk1hZ25pZmljZW50XCIsXHJcbiAgXCJUZW5zZVwiLFxyXG4gIFwiQnJlYWthYmxlXCIsXHJcbiAgXCJGYWl0aGZ1bFwiLFxyXG4gIFwiTWlzdHlcIixcclxuICBcIlRlcnJpYmxlXCIsXHJcbiAgXCJCcmlnaHRcIixcclxuICBcIkZhbW91c1wiLFxyXG4gIFwiTW9kZXJuXCIsXHJcbiAgXCJUYXN0eVwiLFxyXG4gIFwiQnVzeVwiLFxyXG4gIFwiRmFuY3lcIixcclxuICBcIk1vdGlvbmxlc3NcIixcclxuICBcIlRoYW5rZnVsXCIsXHJcbiAgXCJGYW50YXN0aWNcIixcclxuICBcIk11ZGR5XCIsXHJcbiAgXCJUaG91Z2h0ZnVsXCIsXHJcbiAgXCJDYWxtXCIsXHJcbiAgXCJGaWVyY2VcIixcclxuICBcIk11c2h5XCIsXHJcbiAgXCJUaG91Z2h0bGVzc1wiLFxyXG4gIFwiQ2FyZWZ1bFwiLFxyXG4gIFwiRmlsdGh5XCIsXHJcbiAgXCJNeXN0ZXJpb3VzXCIsXHJcbiAgXCJUaXJlZFwiLFxyXG4gIFwiQ2F1dGlvdXNcIixcclxuICBcIkZpbmVcIixcclxuICBcIlRvdWdoXCIsXHJcbiAgXCJDaGFybWluZ1wiLFxyXG4gIFwiRm9vbGlzaFwiLFxyXG4gIFwiTmFzdHlcIixcclxuICBcIlRyb3VibGVkXCIsXHJcbiAgXCJDaGVlcmZ1bFwiLFxyXG4gIFwiRnJhZ2lsZVwiLFxyXG4gIFwiTmF1Z2h0eVwiLFxyXG4gIFwiQ2xlYW5cIixcclxuICBcIkZyYWlsXCIsXHJcbiAgXCJOZXJ2b3VzXCIsXHJcbiAgXCJVZ2xpZXN0XCIsXHJcbiAgXCJDbGVhclwiLFxyXG4gIFwiRnJhbnRpY1wiLFxyXG4gIFwiTmljZVwiLFxyXG4gIFwiVWdseVwiLFxyXG4gIFwiQ2xldmVyXCIsXHJcbiAgXCJGcmllbmRseVwiLFxyXG4gIFwiTnV0dHlcIixcclxuICBcIlVuaW50ZXJlc3RlZFwiLFxyXG4gIFwiQ2xvdWR5XCIsXHJcbiAgXCJGcmlnaHRlbmVkXCIsXHJcbiAgXCJVbnNpZ2h0bHlcIixcclxuICBcIkNsdW1zeVwiLFxyXG4gIFwiRnVubnlcIixcclxuICBcIk9iZWRpZW50XCIsXHJcbiAgXCJVbnVzdWFsXCIsXHJcbiAgXCJDb2xvcmZ1bFwiLFxyXG4gIFwiT2Jub3hpb3VzXCIsXHJcbiAgXCJVcHNldFwiLFxyXG4gIFwiQ29tYmF0aXZlXCIsXHJcbiAgXCJHZW50bGVcIixcclxuICBcIk9kZFwiLFxyXG4gIFwiVXB0aWdodFwiLFxyXG4gIFwiQ29tZm9ydGFibGVcIixcclxuICBcIkdpZnRlZFwiLFxyXG4gIFwiQ29uY2VybmVkXCIsXHJcbiAgXCJHbGFtb3JvdXNcIixcclxuICBcIk9wZW5cIixcclxuICBcIlZhc3RcIixcclxuICBcIkNvbmRlbW5lZFwiLFxyXG4gIFwiR2xlYW1pbmdcIixcclxuICBcIk91dHJhZ2VvdXNcIixcclxuICBcIlZpY3RvcmlvdXNcIixcclxuICBcIkNvbmZ1c2VkXCIsXHJcbiAgXCJHbG9yaW91c1wiLFxyXG4gIFwiT3V0c3RhbmRpbmdcIixcclxuICBcIlZpdmFjaW91c1wiLFxyXG4gIFwiQ29vcGVyYXRpdmVcIixcclxuICBcIkdvb2RcIixcclxuICBcIkNvdXJhZ2VvdXNcIixcclxuICBcIkdvcmdlb3VzXCIsXHJcbiAgXCJQYW5pY2t5XCIsXHJcbiAgXCJXYW5kZXJpbmdcIixcclxuICBcIkNyYXp5XCIsXHJcbiAgXCJHcmFjZWZ1bFwiLFxyXG4gIFwiUGVyZmVjdFwiLFxyXG4gIFwiV2VhcnlcIixcclxuICBcIkNyZWVweVwiLFxyXG4gIFwiR3JpZXZpbmdcIixcclxuICBcIlBsYWluXCIsXHJcbiAgXCJXaWNrZWRcIixcclxuICBcIkNyb3dkZWRcIixcclxuICBcIkdyb3Rlc3F1ZVwiLFxyXG4gIFwiUGxlYXNhbnRcIixcclxuICBcIkNydWVsXCIsXHJcbiAgXCJHcnVtcHlcIixcclxuICBcIlBvaXNlZFwiLFxyXG4gIFwiV2lsZFwiLFxyXG4gIFwiQ3VyaW91c1wiLFxyXG4gIFwiUG9vclwiLFxyXG4gIFwiV2l0dHlcIixcclxuICBcIkN1dGVcIixcclxuICBcIkhhbmRzb21lXCIsXHJcbiAgXCJQb3dlcmZ1bFwiLFxyXG4gIFwiV29ycmlzb21lXCIsXHJcbiAgXCJIYXBweVwiLFxyXG4gIFwiUHJlY2lvdXNcIixcclxuICBcIldvcnJpZWRcIixcclxuICBcIkRhbmdlcm91c1wiLFxyXG4gIFwiSGVhbHRoeVwiLFxyXG4gIFwiUHJpY2tseVwiLFxyXG4gIFwiV3JvbmdcIixcclxuICBcIkRhcmtcIixcclxuICBcIkhlbHBmdWxcIixcclxuICBcIlByb3VkXCIsXHJcbiAgXCJEZWFkXCIsXHJcbiAgXCJIZWxwbGVzc1wiLFxyXG4gIFwiUHV0cmlkXCIsXHJcbiAgXCJaYW55XCIsXHJcbiAgXCJEZWZlYXRlZFwiLFxyXG4gIFwiSGlsYXJpb3VzXCIsXHJcbiAgXCJQdXp6bGVkXCIsXHJcbiAgXCJaZWFsb3VzXCIsXHJcbl1cclxuXHJcbmNvbnN0IE5PVU4gPSBbXHJcbiAgXCJZYWtcIixcclxuICBcIlNoZWVwXCIsXHJcbiAgXCJWb2ljZVwiLFxyXG4gIFwiUGxhbmVzXCIsXHJcbiAgXCJIYXJtb255XCIsXHJcbiAgXCJTdGF0aW9uXCIsXHJcbiAgXCJTdGF0ZW1lbnRcIixcclxuICBcIkJsb29kXCIsXHJcbiAgXCJTdGl0Y2hcIixcclxuICBcIldhclwiLFxyXG4gIFwiU29jaWV0eVwiLFxyXG4gIFwiQnViYmxlXCIsXHJcbiAgXCJSYXlcIixcclxuICBcIlNpbmtcIixcclxuICBcIlRlcnJpdG9yeVwiLFxyXG4gIFwiU2Npc3NvcnNcIixcclxuICBcIlJvb2ZcIixcclxuICBcIldhdGNoXCIsXHJcbiAgXCJNYXJrXCIsXHJcbiAgXCJSZXNwZWN0XCIsXHJcbiAgXCJBZnRlcm5vb25cIixcclxuICBcIkJlYXJcIixcclxuICBcIldlYWx0aFwiLFxyXG4gIFwiQ29sbGFyXCIsXHJcbiAgXCJTYW5kXCIsXHJcbiAgXCJJbXB1bHNlXCIsXHJcbiAgXCJEdXN0XCIsXHJcbiAgXCJSYWluc3Rvcm1cIixcclxuICBcIlNoYXBlXCIsXHJcbiAgXCJLbmlmZVwiLFxyXG4gIFwiUGlwZVwiLFxyXG4gIFwiQm9hdFwiLFxyXG4gIFwiQnVsYlwiLFxyXG4gIFwiU3BhY2VcIixcclxuICBcIkZpc2hcIixcclxuICBcIlF1aWV0XCIsXHJcbiAgXCJDaGlsZHJlblwiLFxyXG4gIFwiVGFzdGVcIixcclxuICBcIkZvcm1cIixcclxuICBcIkNhbGVuZGFyXCIsXHJcbiAgXCJQaW5cIixcclxuICBcIlBsYXN0aWNcIixcclxuICBcIkphclwiLFxyXG4gIFwiR2F0ZVwiLFxyXG4gIFwiU2hlZXRcIixcclxuICBcIlBhcmNlbFwiLFxyXG4gIFwiU3VnZ2VzdGlvblwiLFxyXG4gIFwiSGFpcmN1dFwiLFxyXG4gIFwiUGFuY2FrZVwiLFxyXG4gIFwiSGVhbHRoXCIsXHJcbiAgXCJWZWluXCIsXHJcbiAgXCJPaWxcIixcclxuICBcIkNoYWxrXCIsXHJcbiAgXCJSaW5nc1wiLFxyXG4gIFwiSGFyYm9yXCIsXHJcbiAgXCJQbGF5XCIsXHJcbiAgXCJCb3lcIixcclxuICBcIkRpc2N1c3Npb25cIixcclxuICBcIlZhc2VcIixcclxuICBcIkRpbWVcIixcclxuICBcIlRyZWVcIixcclxuICBcIlJvc2VcIixcclxuICBcIlNuYWtlc1wiLFxyXG4gIFwiT2ZmaWNlXCIsXHJcbiAgXCJEb2xsXCIsXHJcbiAgXCJBcmd1bWVudFwiLFxyXG4gIFwiRGVidFwiLFxyXG4gIFwiRXhwZXJpZW5jZVwiLFxyXG4gIFwiS2l0dHlcIixcclxuICBcIkhhaXJcIixcclxuICBcIkNyaW1lXCIsXHJcbiAgXCJTbGVlcFwiLFxyXG4gIFwiSW5kdXN0cnlcIixcclxuICBcIlJlc3RcIixcclxuICBcIlJpY2VcIixcclxuICBcIkhvdXNlXCIsXHJcbiAgXCJSZWxhdGlvblwiLFxyXG4gIFwiUXVlc3Rpb25cIixcclxuICBcIlRlc3RcIixcclxuICBcIkZpbmdlclwiLFxyXG4gIFwiTWFjaGluZVwiLFxyXG4gIFwiUGl6emFzXCIsXHJcbiAgXCJTdG9ja2luZ1wiLFxyXG4gIFwiU3RvcmVcIixcclxuICBcIkR1Y2tcIixcclxuICBcIlN0cnVjdHVyZVwiLFxyXG4gIFwiR2lyYWZmZVwiLFxyXG4gIFwiUXVhcnR6XCIsXHJcbiAgXCJBdHRyYWN0aW9uXCIsXHJcbiAgXCJTdGlja3NcIixcclxuICBcIkJpa2VzXCIsXHJcbiAgXCJOdW1iZXJcIixcclxuICBcIkZseVwiLFxyXG4gIFwiR3Jvd3RoXCIsXHJcbiAgXCJTZWxlY3Rpb25cIixcclxuICBcIldheVwiLFxyXG4gIFwiVmFsdWVcIixcclxuICBcIkhhbmRzXCIsXHJcbiAgXCJTaWduXCIsXHJcbiAgXCJMb2NrXCIsXHJcbl0iLCJleHBvcnQgY29uc3QgcmFuZCA9IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpID0+IHtcclxuICByZXR1cm4gbWluICsgKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJhbmRJbnQgPSAobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSA9PiB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IocmFuZChtaW4sIG1heCkpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwaWNrUmFuZG9tID0gKGFycjogYW55W10pID0+IHtcclxuICByZXR1cm4gYXJyW3JhbmRJbnQoMCwgYXJyLmxlbmd0aCldXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXVpZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=