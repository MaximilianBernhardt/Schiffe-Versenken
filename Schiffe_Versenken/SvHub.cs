using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Schiffe_Versenken
{

    public class SvHub : Hub
    {
        dbk database = new dbk();
        int playerID;

        //verbindet den Client mit dem Server
        public IDisposable getDbkConnection()
        {
            database.connectToDbk();
           
            return database.myConnection;
        }

        //spieler meldet sich auf dem Server an
        public void login(string name)
        {
            //Clients.Caller.receive("connecting");
            using (getDbkConnection())
            {
                if (name != "")
                {
                    if (database.insertPlayer(name) == true)
                    {
                        playerID = database.selectPlayer(name);
                        Clients.Caller.receive("newPlayer");
                        Clients.Caller.receive(playerID);
                        Clients.Caller.receive(name);
                    }
                    else
                    {
                        playerID = database.selectPlayer(name);
                        Clients.Caller.receive("oldPlayer");
                        Clients.Caller.receive(playerID);
                        Clients.Caller.receive(name);
                    }
                }
                else
                {
                    Clients.Caller.receive("false");
                }
            }
        }

        //erstellt neues Spielfeld
        public void createField(int size, int playerID)
        {
            using (getDbkConnection())
                database.insertField(size, playerID);
        }

        //löscht Spielfeld
        public void removeField(int size)
        {
            using (getDbkConnection())
                database.deleteField(size);
        }

        //erstellt Spiel
        public void createGame(string difficulty, int playerID, int size)
        {
            using (getDbkConnection())
            {
                int matchID = database.insertGame(playerID, difficulty, size);
                Clients.Caller.receive("y" + matchID);
            }
        }

        //überprüft die Existens eines Spieles
        public void getGame(int matchID, int playerID, string difficulty, int size)
        {
            using (getDbkConnection())
            {
                if (database.joinGame(matchID, playerID, difficulty, size) == true)
                {
                    Clients.Caller.receive("matchID_true");
                }
                else
                {
                    Clients.Caller.receive("matchID_false");
                }
            }
        }

        //ändert den Wert eines Spielfeldes
        public void changeFieldValues(string enemyName, string column, int row)
        {
            using (getDbkConnection())
            {
                column = "c" + column;
                int enemyPlayerID = database.selectPlayer(enemyName);
                int statusField = database.selectCell(enemyPlayerID, column, row);
                switch (statusField)
                {
                    case 0:
                        database.updateCell(enemyPlayerID, column, row, 1);
                        Clients.Others.receive("turn_t");
                        Clients.Others.receive("enemyFailed_column" + column.Substring(1));
                        Clients.Others.receive("enemyFailed_row" + row);
                        Clients.Caller.receive("turn_f");
                        Clients.Caller.receive("failed");
                        break;

                    case 2:
                        database.updateCell(enemyPlayerID, column, row, 3);
                        Clients.Others.receive("turn_f");
                        Clients.Others.receive("enemyHit_column" + column.Substring(1));
                        Clients.Others.receive("enemyHit_row" + row);
                        Clients.Caller.receive("turn_t");
                        Clients.Caller.receive("hit");
                        break;
                }
            }
        }

        //setzt den Wet einer Zelle
        public void setFieldValues(int playerID, string column, int row)
        {
            using (getDbkConnection())
            {
                database.updateCell(playerID, column, row, 2);
            }
        }

        //Gibt den Weret einer Zelle zurück
        public void getFieldValue(int playerID, string column, int row)
        {
            using (getDbkConnection())
            {
               var thisCellValue=database.selectCell(playerID, column, row);
                if (thisCellValue == 2)
                {
                    Clients.Caller.receive("ship_inside");
                }
            }
        }

        //gibt die Anzahl versenkter Schiffseinheiten aus
        public void destroyUnit(int playerID, int size)
        {
            getDbkConnection();
            Clients.Caller.receive("<li>Erledigte Schiffseinheiten: "+ database.countDestroyedUnits(playerID, size) + "/4</li>");
        }

        //setzt Schiffe ins Spielfeld
        public void setShips(int playerID, string column, int row)
        {
            using (getDbkConnection())
            {
                if (database.selectCell(playerID, column, row) == 0)
                {
                    database.updateCell(playerID, column, row, 2);
                }
                else { Clients.Caller.receive("Ungültige Aktion"); }
            }
        }

        //löscht Schiff aus Spielfeld
        public void removeShips(int playerID, string column, int row)
        {
            using (getDbkConnection())
            {
                if (database.selectCell(playerID, column, row) == 2)
                {
                    database.updateCell(playerID, column, row, 0);
                }
                else { Clients.Caller.receive("Ungültige Aktion"); }
            }
        }

        //setzt den Gewinner des Spiels
        public void setWinner(int matchID, string WinPlayer)
        {
            using (getDbkConnection())
            {
                database.updateGame(WinPlayer, matchID);
                Clients.All.receive("winner" + WinPlayer);
            }
        }

        //gibt den Gewinner aus
        public void getWinner(int matchID)
        {
            using (getDbkConnection())
            {
                Clients.All.receive(database.selectWinner(matchID));
            }
        }

        public void getPlayerNameFromMatch(int matchID)
        {
            using (getDbkConnection())
            {
                try
                {
                    ArrayList name = database.selectPlayerFromMatch(matchID);
                    Clients.All.receive("x" + name[0]);
                    Clients.All.receive("x" + name[1]);
                    name.Clear();
                }
                catch (Exception e)
                { 
                    Console.Write("MatchID Error:" + e);
                    Clients.Caller.receive("matchID_DontExist");
                }
            }
        }
        public void playerStarted()
        {
            Clients.Others.receive("enemyReady");
        }
        public void startGame()
        {
            Clients.Others.receive("startGame");
        }
    }
}