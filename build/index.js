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
var app = express();
var _a = process.env.PORT, PORT = _a === void 0 ? 3000 : _a;
var http = http_1.createServer(app);
var io = socketio(http, {
    serveClient: false
});
var rooms = {}; // TODO: figure out room data storage (probably with DB stuff)
var subscribed = {};
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
                    rooms[options.roomID].connections.push({ id: client.id, displayName: ((_a = options.user) === null || _a === void 0 ? void 0 : _a.displayName) || name_gen_1.generateName(2) });
                    subscribed[client.id] = options.roomID;
                    client.emit('roomState', room);
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
        };
        client.emit('res', id);
    });
    client.on('disconnect', function (reason) {
        var roomID = subscribed[client.id];
        if (roomID) {
            var a = rooms[roomID].connections;
            a.splice(a.findIndex(function (v, i, o) { return v.id == roomID; }));
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kYWxzL0Vycm9ycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvdXRpbC9uYW1lLWdlbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3V0aWwvcmFuZG9tLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInV1aWRcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtR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Qzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxzQzs7Ozs7Ozs7Ozs7QUNBQSxpQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NlcnZlci9pbmRleC50c1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsImV4cG9ydCBlbnVtIENvbm5FcnJvciB7XHJcbiAgVU5LTk9XTiA9IDB4MDAsXHJcbiAgVU5BVVRIT1JJWkVEID0gMHg0MDEsXHJcbiAgUk9PTV9OT1RfRk9VTkQgPSAweDQwNDEsXHJcbiAgUk9PTV9NQVhfQ0FQQUNJVFkgPSAweDQwMzEsXHJcbn0iLCJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnXHJcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcydcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuaW1wb3J0IHsgY3JlYXRlU2VydmVyIH0gZnJvbSAnaHR0cCdcclxuaW1wb3J0ICogYXMgc29ja2V0aW8gZnJvbSAnc29ja2V0LmlvJ1xyXG5pbXBvcnQgeyBSb29tQ29ubmVjdGlvbk9wdGlvbnMgfSBmcm9tICcuLi9jbGllbnQvbW9kdWxlcy9Sb29tJ1xyXG5pbXBvcnQgeyBDb25uRXJyb3IgfSBmcm9tICcuLi9tb2RhbHMvRXJyb3JzJ1xyXG5pbXBvcnQgeyBJUm9vbSB9IGZyb20gJy4vbW9kYWxzL0lSb29tJ1xyXG5pbXBvcnQgeyBnZW5lcmF0ZU5hbWUgfSBmcm9tICcuL3V0aWwvbmFtZS1nZW4nXHJcbi8vVE9ETzogZml4IGNsaWVudCBzaWRlIHNvY2tldC5pbyBpbmNsdWRlXHJcblxyXG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCdcclxuXHJcbi8vIHZhciBodHRwID0gcmVxdWlyZSgnaHR0cCcpLmNyZWF0ZVNlcnZlcihhcHApO1xyXG4vLyB2YXIgaW8gPSByZXF1aXJlKCdzb2NrZXQuaW8nKShodHRwKTtcclxuXHJcblxyXG5cclxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xyXG5jb25zdCB7XHJcbiAgUE9SVCA9IDMwMDBcclxufSA9IHByb2Nlc3MuZW52O1xyXG5cclxuY29uc3QgaHR0cCA9IGNyZWF0ZVNlcnZlcihhcHApXHJcbmNvbnN0IGlvID0gc29ja2V0aW8oaHR0cCwge1xyXG4gIHNlcnZlQ2xpZW50OiBmYWxzZVxyXG59KVxyXG5cclxuY29uc3Qgcm9vbXM6IHsgW2lkOiBzdHJpbmddOiBJUm9vbSB9ID0ge307IC8vIFRPRE86IGZpZ3VyZSBvdXQgcm9vbSBkYXRhIHN0b3JhZ2UgKHByb2JhYmx5IHdpdGggREIgc3R1ZmYpXHJcbmNvbnN0IHN1YnNjcmliZWQ6IHsgW2Nvbm5JRDogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcclxuXHJcbmlvLm9uKCdjb25uZWN0aW9uJywgKGNsaWVudCkgPT4ge1xyXG4gIGNsaWVudC5vbignc3Vic2NyaWJlVG9Sb29tJywgKG9wdGlvbnM6IFJvb21Db25uZWN0aW9uT3B0aW9ucykgPT4ge1xyXG4gICAgY29uc29sZS5sb2coYGNsaWVudCB3aXNoZXMgdG8gc3Vic2NyaWJlIHRvIHJvb20gJHtvcHRpb25zLnJvb21JRH1gKTtcclxuICAgIGlmIChyb29tc1tvcHRpb25zLnJvb21JRF0pIHsgLy8gcm9vbSBleGlzdHNcclxuICAgICAgY29uc29sZS5sb2coYHJvb20gZm91bmRgKVxyXG4gICAgICBjb25zdCByb29tOiBJUm9vbSA9IHJvb21zW29wdGlvbnMucm9vbUlEXTtcclxuICAgICAgY29uc29sZS5sb2cocm9vbS5wYXNzd29yZCwgb3B0aW9ucy5wYXNzd29yZClcclxuICAgICAgaWYgKHJvb20ucGFzc3dvcmQgPT0gJycgfHwgcm9vbS5wYXNzd29yZCA9PSBvcHRpb25zLnBhc3N3b3JkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYHBhc3N3b3JkIGdvb2RgKVxyXG4gICAgICAgIGlmIChyb29tLmNvbm5lY3Rpb25zLmxlbmd0aCA8IHJvb20uY2FwYWNpdHkpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGBjbGllbnQgc3Vic2NyaWJlZCB0byByb29tICR7b3B0aW9ucy5yb29tSUR9YClcclxuICAgICAgICAgIHJvb21zW29wdGlvbnMucm9vbUlEXS5jb25uZWN0aW9ucy5wdXNoKHsgaWQ6IGNsaWVudC5pZCwgZGlzcGxheU5hbWU6IG9wdGlvbnMudXNlcj8uZGlzcGxheU5hbWUgfHwgZ2VuZXJhdGVOYW1lKDIpIH0pXHJcbiAgICAgICAgICBzdWJzY3JpYmVkW2NsaWVudC5pZF0gPSBvcHRpb25zLnJvb21JRFxyXG4gICAgICAgICAgY2xpZW50LmVtaXQoJ3Jvb21TdGF0ZScsIHJvb20pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdyb29tIGZ1bGwnKVxyXG4gICAgICAgICAgY2xpZW50LmVtaXQoJ2VycicsIENvbm5FcnJvci5ST09NX01BWF9DQVBBQ0lUWSlcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2JhZCBwYXNzd29yZCcpXHJcbiAgICAgICAgY2xpZW50LmVtaXQoJ2VycicsIENvbm5FcnJvci5VTkFVVEhPUklaRUQpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGByb29tIG5vdCBmb3VuZGApXHJcbiAgICAgIGNsaWVudC5lbWl0KCdlcnInLCBDb25uRXJyb3IuUk9PTV9OT1RfRk9VTkQpXHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGNsaWVudC5vbignY3JlYXRlUm9vbScsIChvcHRpb25zOiBJUm9vbSkgPT4ge1xyXG4gICAgY29uc3QgaWQgPSB1dWlkKCk7XHJcbiAgICByb29tc1tpZF0gPSB7XHJcbiAgICAgIGlkOiBpZCxcclxuICAgICAgY2FwYWNpdHk6IG9wdGlvbnMuY2FwYWNpdHksXHJcbiAgICAgIG5hbWU6IG9wdGlvbnMubmFtZSxcclxuICAgICAgcGFzc3dvcmQ6IG9wdGlvbnMucGFzc3dvcmQsXHJcbiAgICAgIGNvbm5lY3Rpb25zOiBbXSxcclxuICAgIH07XHJcbiAgICBjbGllbnQuZW1pdCgncmVzJywgaWQpXHJcbiAgfSlcclxuXHJcbiAgY2xpZW50Lm9uKCdkaXNjb25uZWN0JywgKHJlYXNvbikgPT4ge1xyXG4gICAgY29uc3Qgcm9vbUlEID0gc3Vic2NyaWJlZFtjbGllbnQuaWRdO1xyXG4gICAgaWYgKHJvb21JRCkge1xyXG4gICAgICBjb25zdCBhID0gcm9vbXNbcm9vbUlEXS5jb25uZWN0aW9ucztcclxuICAgICAgYS5zcGxpY2UoYS5maW5kSW5kZXgoKHYsIGksIG8pID0+IHsgcmV0dXJuIHYuaWQgPT0gcm9vbUlEIH0pKTtcclxuICAgIH1cclxuICB9KTtcclxufSk7XHJcblxyXG5cclxuLy8gYXBwLnNldCgndmlld3MnLCBfX2Rpcm5hbWUgKyAnL3ZpZXdzJyk7XHJcbi8vIGFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2pzeCcpO1xyXG4vLyBhcHAuZW5naW5lKCdqc3gnLCByZXF1aXJlKCdleHByZXNzLXJlYWN0LXZpZXdzJykuY3JlYXRlRW5naW5lKCkpO1xyXG5jb25zdCBwdWJsaWNQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJ3B1YmxpYycpXHJcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMocHVibGljUGF0aCkpXHJcblxyXG5hcHAuZ2V0KCcqY2xpZW50LmpzJywgKHJlcTogYW55LCByZXM6IGFueSkgPT4ge1xyXG4gIHJlcy5zZW5kRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lLCBcImNsaWVudC5qc1wiKSlcclxufSlcclxuXHJcbmFwcC5nZXQoJyonLCAocmVxOiBSZXF1ZXN0LCByZXM6IGFueSkgPT4ge1xyXG4gIHJlcy5zZW5kRmlsZShwdWJsaWNQYXRoICsgJy9pbmRleC5odG1sJylcclxufSk7XHJcblxyXG5pZiAocmVxdWlyZS5tYWluID09PSBtb2R1bGUpIHtcclxuICBodHRwLmxpc3RlbihQT1JULCAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnU2VydmVyIHN0YXJ0ZWQgYXQgaHR0cDovL2xvY2FsaG9zdDonICsgUE9SVCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwcDsiLCJpbXBvcnQgeyBwaWNrUmFuZG9tIH0gZnJvbSBcIi4vcmFuZG9tXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVOYW1lID0gKGxlbmd0aDogbnVtYmVyKSA9PiB7XHJcbiAgaWYgKGxlbmd0aCA8IDEpIHJldHVybiBcIlwiO1xyXG4gIGxldCBzdHJpbmcgPSBwaWNrUmFuZG9tKE5PVU4pO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICBzdHJpbmcgPSBwaWNrUmFuZG9tKEFESikgKyBzdHJpbmc7XHJcbiAgfVxyXG4gIHJldHVybiBzdHJpbmc7XHJcbn1cclxuXHJcbmNvbnN0IEFESiA9IFtcclxuICBcIkRlZmlhbnRcIixcclxuICBcIkhvbWVsZXNzXCIsXHJcbiAgXCJBZG9yYWJsZVwiLFxyXG4gIFwiRGVsaWdodGZ1bFwiLFxyXG4gIFwiSG9tZWx5XCIsXHJcbiAgXCJRdWFpbnRcIixcclxuICBcIkFkdmVudHVyb3VzXCIsXHJcbiAgXCJEZXByZXNzZWRcIixcclxuICBcIkhvcnJpYmxlXCIsXHJcbiAgXCJBZ2dyZXNzaXZlXCIsXHJcbiAgXCJEZXRlcm1pbmVkXCIsXHJcbiAgXCJIdW5ncnlcIixcclxuICBcIlJlYWxcIixcclxuICBcIkFncmVlYWJsZVwiLFxyXG4gIFwiRGlmZmVyZW50XCIsXHJcbiAgXCJIdXJ0XCIsXHJcbiAgXCJSZWxpZXZlZFwiLFxyXG4gIFwiQWxlcnRcIixcclxuICBcIkRpZmZpY3VsdFwiLFxyXG4gIFwiUmVwdWxzaXZlXCIsXHJcbiAgXCJBbGl2ZVwiLFxyXG4gIFwiRGlzZ3VzdGVkXCIsXHJcbiAgXCJJbGxcIixcclxuICBcIlJpY2hcIixcclxuICBcIkFtdXNlZFwiLFxyXG4gIFwiRGlzdGluY3RcIixcclxuICBcIkltcG9ydGFudFwiLFxyXG4gIFwiQW5ncnlcIixcclxuICBcIkRpc3R1cmJlZFwiLFxyXG4gIFwiSW1wb3NzaWJsZVwiLFxyXG4gIFwiU2NhcnlcIixcclxuICBcIkFubm95ZWRcIixcclxuICBcIkRpenp5XCIsXHJcbiAgXCJJbmV4cGVuc2l2ZVwiLFxyXG4gIFwiU2VsZmlzaFwiLFxyXG4gIFwiQW5ub3lpbmdcIixcclxuICBcIkRvdWJ0ZnVsXCIsXHJcbiAgXCJJbm5vY2VudFwiLFxyXG4gIFwiU2hpbnlcIixcclxuICBcIkFueGlvdXNcIixcclxuICBcIkRyYWJcIixcclxuICBcIklucXVpc2l0aXZlXCIsXHJcbiAgXCJTaHlcIixcclxuICBcIkFycm9nYW50XCIsXHJcbiAgXCJEdWxsXCIsXHJcbiAgXCJJdGNoeVwiLFxyXG4gIFwiU2lsbHlcIixcclxuICBcIkFzaGFtZWRcIixcclxuICBcIlNsZWVweVwiLFxyXG4gIFwiQXR0cmFjdGl2ZVwiLFxyXG4gIFwiRWFnZXJcIixcclxuICBcIkplYWxvdXNcIixcclxuICBcIlNtaWxpbmdcIixcclxuICBcIkF2ZXJhZ2VcIixcclxuICBcIkVhc3lcIixcclxuICBcIkppdHRlcnlcIixcclxuICBcIlNtb2dneVwiLFxyXG4gIFwiQXdmdWxcIixcclxuICBcIkVsYXRlZFwiLFxyXG4gIFwiSm9sbHlcIixcclxuICBcIlNvcmVcIixcclxuICBcIkVsZWdhbnRcIixcclxuICBcIkpveW91c1wiLFxyXG4gIFwiU3BhcmtsaW5nXCIsXHJcbiAgXCJCYWRcIixcclxuICBcIkVtYmFycmFzc2VkXCIsXHJcbiAgXCJTcGxlbmRpZFwiLFxyXG4gIFwiQmVhdXRpZnVsXCIsXHJcbiAgXCJFbmNoYW50aW5nXCIsXHJcbiAgXCJLaW5kXCIsXHJcbiAgXCJTcG90bGVzc1wiLFxyXG4gIFwiQmV0dGVyXCIsXHJcbiAgXCJFbmNvdXJhZ2luZ1wiLFxyXG4gIFwiU3Rvcm15XCIsXHJcbiAgXCJCZXdpbGRlcmVkXCIsXHJcbiAgXCJFbmVyZ2V0aWNcIixcclxuICBcIkxhenlcIixcclxuICBcIlN0cmFuZ2VcIixcclxuICBcIkJsYWNrXCIsXHJcbiAgXCJFbnRodXNpYXN0aWNcIixcclxuICBcIkxpZ2h0XCIsXHJcbiAgXCJTdHVwaWRcIixcclxuICBcIkJsb29keVwiLFxyXG4gIFwiRW52aW91c1wiLFxyXG4gIFwiTGl2ZWx5XCIsXHJcbiAgXCJTdWNjZXNzZnVsXCIsXHJcbiAgXCJCbHVlXCIsXHJcbiAgXCJFdmlsXCIsXHJcbiAgXCJMb25lbHlcIixcclxuICBcIlN1cGVyXCIsXHJcbiAgXCJFeGNpdGVkXCIsXHJcbiAgXCJMb25nXCIsXHJcbiAgXCJCbHVzaGluZ1wiLFxyXG4gIFwiRXhwZW5zaXZlXCIsXHJcbiAgXCJMb3ZlbHlcIixcclxuICBcIlRhbGVudGVkXCIsXHJcbiAgXCJCb3JlZFwiLFxyXG4gIFwiRXh1YmVyYW50XCIsXHJcbiAgXCJMdWNreVwiLFxyXG4gIFwiVGFtZVwiLFxyXG4gIFwiQnJhaW55XCIsXHJcbiAgXCJUZW5kZXJcIixcclxuICBcIkJyYXZlXCIsXHJcbiAgXCJGYWlyXCIsXHJcbiAgXCJNYWduaWZpY2VudFwiLFxyXG4gIFwiVGVuc2VcIixcclxuICBcIkJyZWFrYWJsZVwiLFxyXG4gIFwiRmFpdGhmdWxcIixcclxuICBcIk1pc3R5XCIsXHJcbiAgXCJUZXJyaWJsZVwiLFxyXG4gIFwiQnJpZ2h0XCIsXHJcbiAgXCJGYW1vdXNcIixcclxuICBcIk1vZGVyblwiLFxyXG4gIFwiVGFzdHlcIixcclxuICBcIkJ1c3lcIixcclxuICBcIkZhbmN5XCIsXHJcbiAgXCJNb3Rpb25sZXNzXCIsXHJcbiAgXCJUaGFua2Z1bFwiLFxyXG4gIFwiRmFudGFzdGljXCIsXHJcbiAgXCJNdWRkeVwiLFxyXG4gIFwiVGhvdWdodGZ1bFwiLFxyXG4gIFwiQ2FsbVwiLFxyXG4gIFwiRmllcmNlXCIsXHJcbiAgXCJNdXNoeVwiLFxyXG4gIFwiVGhvdWdodGxlc3NcIixcclxuICBcIkNhcmVmdWxcIixcclxuICBcIkZpbHRoeVwiLFxyXG4gIFwiTXlzdGVyaW91c1wiLFxyXG4gIFwiVGlyZWRcIixcclxuICBcIkNhdXRpb3VzXCIsXHJcbiAgXCJGaW5lXCIsXHJcbiAgXCJUb3VnaFwiLFxyXG4gIFwiQ2hhcm1pbmdcIixcclxuICBcIkZvb2xpc2hcIixcclxuICBcIk5hc3R5XCIsXHJcbiAgXCJUcm91YmxlZFwiLFxyXG4gIFwiQ2hlZXJmdWxcIixcclxuICBcIkZyYWdpbGVcIixcclxuICBcIk5hdWdodHlcIixcclxuICBcIkNsZWFuXCIsXHJcbiAgXCJGcmFpbFwiLFxyXG4gIFwiTmVydm91c1wiLFxyXG4gIFwiVWdsaWVzdFwiLFxyXG4gIFwiQ2xlYXJcIixcclxuICBcIkZyYW50aWNcIixcclxuICBcIk5pY2VcIixcclxuICBcIlVnbHlcIixcclxuICBcIkNsZXZlclwiLFxyXG4gIFwiRnJpZW5kbHlcIixcclxuICBcIk51dHR5XCIsXHJcbiAgXCJVbmludGVyZXN0ZWRcIixcclxuICBcIkNsb3VkeVwiLFxyXG4gIFwiRnJpZ2h0ZW5lZFwiLFxyXG4gIFwiVW5zaWdodGx5XCIsXHJcbiAgXCJDbHVtc3lcIixcclxuICBcIkZ1bm55XCIsXHJcbiAgXCJPYmVkaWVudFwiLFxyXG4gIFwiVW51c3VhbFwiLFxyXG4gIFwiQ29sb3JmdWxcIixcclxuICBcIk9ibm94aW91c1wiLFxyXG4gIFwiVXBzZXRcIixcclxuICBcIkNvbWJhdGl2ZVwiLFxyXG4gIFwiR2VudGxlXCIsXHJcbiAgXCJPZGRcIixcclxuICBcIlVwdGlnaHRcIixcclxuICBcIkNvbWZvcnRhYmxlXCIsXHJcbiAgXCJHaWZ0ZWRcIixcclxuICBcIkNvbmNlcm5lZFwiLFxyXG4gIFwiR2xhbW9yb3VzXCIsXHJcbiAgXCJPcGVuXCIsXHJcbiAgXCJWYXN0XCIsXHJcbiAgXCJDb25kZW1uZWRcIixcclxuICBcIkdsZWFtaW5nXCIsXHJcbiAgXCJPdXRyYWdlb3VzXCIsXHJcbiAgXCJWaWN0b3Jpb3VzXCIsXHJcbiAgXCJDb25mdXNlZFwiLFxyXG4gIFwiR2xvcmlvdXNcIixcclxuICBcIk91dHN0YW5kaW5nXCIsXHJcbiAgXCJWaXZhY2lvdXNcIixcclxuICBcIkNvb3BlcmF0aXZlXCIsXHJcbiAgXCJHb29kXCIsXHJcbiAgXCJDb3VyYWdlb3VzXCIsXHJcbiAgXCJHb3JnZW91c1wiLFxyXG4gIFwiUGFuaWNreVwiLFxyXG4gIFwiV2FuZGVyaW5nXCIsXHJcbiAgXCJDcmF6eVwiLFxyXG4gIFwiR3JhY2VmdWxcIixcclxuICBcIlBlcmZlY3RcIixcclxuICBcIldlYXJ5XCIsXHJcbiAgXCJDcmVlcHlcIixcclxuICBcIkdyaWV2aW5nXCIsXHJcbiAgXCJQbGFpblwiLFxyXG4gIFwiV2lja2VkXCIsXHJcbiAgXCJDcm93ZGVkXCIsXHJcbiAgXCJHcm90ZXNxdWVcIixcclxuICBcIlBsZWFzYW50XCIsXHJcbiAgXCJDcnVlbFwiLFxyXG4gIFwiR3J1bXB5XCIsXHJcbiAgXCJQb2lzZWRcIixcclxuICBcIldpbGRcIixcclxuICBcIkN1cmlvdXNcIixcclxuICBcIlBvb3JcIixcclxuICBcIldpdHR5XCIsXHJcbiAgXCJDdXRlXCIsXHJcbiAgXCJIYW5kc29tZVwiLFxyXG4gIFwiUG93ZXJmdWxcIixcclxuICBcIldvcnJpc29tZVwiLFxyXG4gIFwiSGFwcHlcIixcclxuICBcIlByZWNpb3VzXCIsXHJcbiAgXCJXb3JyaWVkXCIsXHJcbiAgXCJEYW5nZXJvdXNcIixcclxuICBcIkhlYWx0aHlcIixcclxuICBcIlByaWNrbHlcIixcclxuICBcIldyb25nXCIsXHJcbiAgXCJEYXJrXCIsXHJcbiAgXCJIZWxwZnVsXCIsXHJcbiAgXCJQcm91ZFwiLFxyXG4gIFwiRGVhZFwiLFxyXG4gIFwiSGVscGxlc3NcIixcclxuICBcIlB1dHJpZFwiLFxyXG4gIFwiWmFueVwiLFxyXG4gIFwiRGVmZWF0ZWRcIixcclxuICBcIkhpbGFyaW91c1wiLFxyXG4gIFwiUHV6emxlZFwiLFxyXG4gIFwiWmVhbG91c1wiLFxyXG5dXHJcblxyXG5jb25zdCBOT1VOID0gW1xyXG4gIFwiWWFrXCIsXHJcbiAgXCJTaGVlcFwiLFxyXG4gIFwiVm9pY2VcIixcclxuICBcIlBsYW5lc1wiLFxyXG4gIFwiSGFybW9ueVwiLFxyXG4gIFwiU3RhdGlvblwiLFxyXG4gIFwiU3RhdGVtZW50XCIsXHJcbiAgXCJCbG9vZFwiLFxyXG4gIFwiU3RpdGNoXCIsXHJcbiAgXCJXYXJcIixcclxuICBcIlNvY2lldHlcIixcclxuICBcIkJ1YmJsZVwiLFxyXG4gIFwiUmF5XCIsXHJcbiAgXCJTaW5rXCIsXHJcbiAgXCJUZXJyaXRvcnlcIixcclxuICBcIlNjaXNzb3JzXCIsXHJcbiAgXCJSb29mXCIsXHJcbiAgXCJXYXRjaFwiLFxyXG4gIFwiTWFya1wiLFxyXG4gIFwiUmVzcGVjdFwiLFxyXG4gIFwiQWZ0ZXJub29uXCIsXHJcbiAgXCJCZWFyXCIsXHJcbiAgXCJXZWFsdGhcIixcclxuICBcIkNvbGxhclwiLFxyXG4gIFwiU2FuZFwiLFxyXG4gIFwiSW1wdWxzZVwiLFxyXG4gIFwiRHVzdFwiLFxyXG4gIFwiUmFpbnN0b3JtXCIsXHJcbiAgXCJTaGFwZVwiLFxyXG4gIFwiS25pZmVcIixcclxuICBcIlBpcGVcIixcclxuICBcIkJvYXRcIixcclxuICBcIkJ1bGJcIixcclxuICBcIlNwYWNlXCIsXHJcbiAgXCJGaXNoXCIsXHJcbiAgXCJRdWlldFwiLFxyXG4gIFwiQ2hpbGRyZW5cIixcclxuICBcIlRhc3RlXCIsXHJcbiAgXCJGb3JtXCIsXHJcbiAgXCJDYWxlbmRhclwiLFxyXG4gIFwiUGluXCIsXHJcbiAgXCJQbGFzdGljXCIsXHJcbiAgXCJKYXJcIixcclxuICBcIkdhdGVcIixcclxuICBcIlNoZWV0XCIsXHJcbiAgXCJQYXJjZWxcIixcclxuICBcIlN1Z2dlc3Rpb25cIixcclxuICBcIkhhaXJjdXRcIixcclxuICBcIlBhbmNha2VcIixcclxuICBcIkhlYWx0aFwiLFxyXG4gIFwiVmVpblwiLFxyXG4gIFwiT2lsXCIsXHJcbiAgXCJDaGFsa1wiLFxyXG4gIFwiUmluZ3NcIixcclxuICBcIkhhcmJvclwiLFxyXG4gIFwiUGxheVwiLFxyXG4gIFwiQm95XCIsXHJcbiAgXCJEaXNjdXNzaW9uXCIsXHJcbiAgXCJWYXNlXCIsXHJcbiAgXCJEaW1lXCIsXHJcbiAgXCJUcmVlXCIsXHJcbiAgXCJSb3NlXCIsXHJcbiAgXCJTbmFrZXNcIixcclxuICBcIk9mZmljZVwiLFxyXG4gIFwiRG9sbFwiLFxyXG4gIFwiQXJndW1lbnRcIixcclxuICBcIkRlYnRcIixcclxuICBcIkV4cGVyaWVuY2VcIixcclxuICBcIktpdHR5XCIsXHJcbiAgXCJIYWlyXCIsXHJcbiAgXCJDcmltZVwiLFxyXG4gIFwiU2xlZXBcIixcclxuICBcIkluZHVzdHJ5XCIsXHJcbiAgXCJSZXN0XCIsXHJcbiAgXCJSaWNlXCIsXHJcbiAgXCJIb3VzZVwiLFxyXG4gIFwiUmVsYXRpb25cIixcclxuICBcIlF1ZXN0aW9uXCIsXHJcbiAgXCJUZXN0XCIsXHJcbiAgXCJGaW5nZXJcIixcclxuICBcIk1hY2hpbmVcIixcclxuICBcIlBpenphc1wiLFxyXG4gIFwiU3RvY2tpbmdcIixcclxuICBcIlN0b3JlXCIsXHJcbiAgXCJEdWNrXCIsXHJcbiAgXCJTdHJ1Y3R1cmVcIixcclxuICBcIkdpcmFmZmVcIixcclxuICBcIlF1YXJ0elwiLFxyXG4gIFwiQXR0cmFjdGlvblwiLFxyXG4gIFwiU3RpY2tzXCIsXHJcbiAgXCJCaWtlc1wiLFxyXG4gIFwiTnVtYmVyXCIsXHJcbiAgXCJGbHlcIixcclxuICBcIkdyb3d0aFwiLFxyXG4gIFwiU2VsZWN0aW9uXCIsXHJcbiAgXCJXYXlcIixcclxuICBcIlZhbHVlXCIsXHJcbiAgXCJIYW5kc1wiLFxyXG4gIFwiU2lnblwiLFxyXG4gIFwiTG9ja1wiLFxyXG5dIiwiZXhwb3J0IGNvbnN0IHJhbmQgPSAobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSA9PiB7XHJcbiAgcmV0dXJuIG1pbiArIChNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByYW5kSW50ID0gKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikgPT4ge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKHJhbmQobWluLCBtYXgpKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcGlja1JhbmRvbSA9IChhcnI6IGFueVtdKSA9PiB7XHJcbiAgcmV0dXJuIGFycltyYW5kSW50KDAsIGFyci5sZW5ndGgpXVxyXG59IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV1aWRcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==