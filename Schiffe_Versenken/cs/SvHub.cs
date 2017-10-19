using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Schiffe_Versenken
{
    /// ------------------------------------------------------------------------------------------------------------------------
    /// ============================================================================================================================
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

        /// <summary>
        /// Prüft ob Spieler vorhanden und fügt ihn ggf. ein.
        /// </summary>
        /// <param name="name">Name des Spielers</param>
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

        /// <summary>
        /// Erstellt ein neues Spielfeld
        /// </summary>
        /// <param name="size">Größe des Spielfelds</param>
        /// <param name="playerID">Die ID des Spielers</param>
        public void createField(int size, int playerID)
        {
            using (getDbkConnection())
                database.insertField(size, playerID);
        }

        /// <summary>
        /// löscht Spielfeld
        /// </summary>
        /// <param name="size">Größe des Spielfeldes</param>
        public void removeField(int size)
        {
            using (getDbkConnection())
                database.deleteField(size);
        }

        /// <summary>
        /// Erstellt Spielfeld
        /// </summary>
        /// <param name="difficulty">Eingestellte Schwierigkeitsstufe</param>
        /// <param name="playerID">ID des Spielers</param>
        /// <param name="size">Größe des Spielfeldes</param>
        public void createGame(string difficulty, int playerID, int size)
        {
            using (getDbkConnection())
            {
                int matchID = database.insertGame(playerID, difficulty, size);
                Clients.Caller.receive("y" + matchID);
            }
        }

        /// <summary>
        /// Überprüft die Exsistens eines Spieles
        /// </summary>
        /// <param name="matchID">ID des Spieles</param>
        /// <param name="playerID">ID des Spielers</param>
        /// <param name="difficulty">Schwierigkeitsstufe</param>
        /// <param name="size">Größe des Spielfeldes</param>
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

        /// <summary>
        /// Ändert den Zellenwert an der übergebenen Stelle auf 1 oder 3
        /// </summary>
        /// <param name="enemyName">Gegnerrischer Name</param>
        /// <param name="column">Spalte</param>
        /// <param name="row">Reihe</param>
        public void changeFieldValues(string enemyName, string column, int row)
        {
            using (getDbkConnection())
            {
                column = "c" + column;
                int enemyPlayerID = database.selectPlayer(enemyName);
                int statusField = database.selectCell(enemyPlayerID, column, row);

                if (statusField == 0)
                {
                    database.updateCell(enemyPlayerID, column, row, 1);
                    Clients.Others.receive("turn_t");
                    Clients.Others.receive("enemyFailed_column" + column.Substring(1));
                    Clients.Others.receive("enemyFailed_row" + row);
                    Clients.Caller.receive("turn_f");
                    Clients.Caller.receive("failed");
                } else if(statusField == 1|| statusField == 2)
                {
                    Clients.Others.receive("turn_f");
                    Clients.Caller.receive("turn_t");
                } else
                {
                    database.updateCell(enemyPlayerID, column, row, 2);
                    Clients.Others.receive("turn_f");
                    Clients.Others.receive("enemyHit_column" + column.Substring(1));
                    Clients.Others.receive("enemyHit_row" + row);
                    Clients.Caller.receive("turn_t");
                    Clients.Caller.receive("hit");
                    Clients.Caller.receive("sfld"+statusField);
                }

                if (database.checkShips(enemyPlayerID, statusField) == true)
                {
                    Clients.Caller.receive("ship_destroy_false");
                }
                else
                {
                    Clients.Caller.receive("ship_destroy_true_" + statusField);
                }
            }
        }
        /// <summary>
        /// Ändert den Zellenwert auf 2
        /// </summary>
        /// <param name="playerID">ID des Spielers</param>
        /// <param name="column">Spalte</param>
        /// <param name="row">Reihe</param>
        public void setFieldValues(int playerID, string column, int row, string checkFieldContent)
        {
            using (getDbkConnection())
            {
                if (checkFieldContent.Equals("battleship"))
                {
                    database.updateCell(playerID, column, row, 10);
                }
                else if (checkFieldContent.Equals("cruiser"))
                {
                    database.updateCell(playerID, column, row, 11);
                }
                else if (checkFieldContent.Equals("destroyer1"))
                {
                    database.updateCell(playerID, column, row, 12);
                }
                else if (checkFieldContent.Equals("destroyer2"))
                {
                    database.updateCell(playerID, column, row, 13);
                }
                else if (checkFieldContent.Equals("submarine1"))
                {
                    database.updateCell(playerID, column, row, 14);
                }
                else if (checkFieldContent.Equals("submarine2"))
                {
                    database.updateCell(playerID, column, row, 15);
                }
                else if (checkFieldContent.Equals("submarine3"))
                {
                    database.updateCell(playerID, column, row, 16);
                }
                else if (checkFieldContent.Equals("dinghy1"))
                {
                    database.updateCell(playerID, column, row, 17);
                }
                else if (checkFieldContent.Equals("dinghy2"))
                {
                    database.updateCell(playerID, column, row, 18);
                }
                else if (checkFieldContent.Equals("dinghy3"))
                {
                    database.updateCell(playerID, column, row, 19);
                }
                else if (checkFieldContent.Equals("dinghy4"))
                {
                    database.updateCell(playerID, column, row, 20);
                }
            }
        }

        /// <summary>
        /// Gibt den Wert einer Zelle zurück
        /// </summary>
        /// <param name="playerID">ID des Spielers</param>
        /// <param name="column">Spalte</param>
        /// <param name="row">Reihe</param>
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