var log = [];

var SVHUB = $.connection.svHub;

var userName;
var playerID;

var fieldSet = false;
var size = 0;

var enemyName;
var matchID;

var correntLogNumber = 0;

var checkFieldContent;
var checkReadyBtn = false;

var checkEnemyReadyBtn = false;
var enemyConnection = false;

var playerStarted = false;

var myTurn = false;

var markedFieldPoint;

var countDestroyedShips = 0;

var isCellEmpty = true;

var shipSettings = [];

var col;
var row;
var counterHit = 0;

var battleship = 1;
var cruiser = 1;
var destroyer = 2;
var submarine = 3;
var dinghy = 4;

var isHorizontal = false;

var countBattleship = 0;
var countCruiser = 0;
var countDestroyer = 0;
var countSubmarine = 0;
var countDinghy = 0;

var shipSize;
var shipSelection = false;
var shipClass;