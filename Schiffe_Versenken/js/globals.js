var log = [];

var SVHUB = $.connection.svHub;

var userName;
var playerId;

var fieldSet = false;
var size = 0;

var enemyName;
var matchID;

var currentLogNumber = 0;

var checkFieldContent;
var checkReadyBtn = false;

var checkEnemyReadyBtn = false;
var enemyConnection = false;

var playerStarted = false;

var myTurn = false;

var markedFieldPoint;

var countDestroyedShips = 0;

var shipSettings = [];

var col;
var row;
var counterHit = 0;

var shipSize;



var countBattleship = 0;
var countCruiser = 0;
var countDestroyer = 0;
var countSubmarine = 0;
var countDinghy = 0;

var shipSelection = false;
var shipClass;

var thisIsTurned = [false, false, false, false, false, false, false, false, false, false, false];
var isTurned = false;