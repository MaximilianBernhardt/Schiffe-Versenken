using System;
using System.Data;
using MySql.Data.MySqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Schiffe_Versenken
{
    public class dbk
    {
        public MySqlConnection myConnection= new MySqlConnection();
        public MySqlCommand com;

        //verbindet den Server mit der Datenbank
        public Boolean connectToDbk()
        {
            myConnection.ConnectionString = "SERVER=localhost;" +
                                            "DATABASE=schiffeversenken;" +
                                            "UID=root;" +
                                            "PASSWORD=;";
            try
            {
                myConnection.Open();
                com = myConnection.CreateCommand();
                return true;
            }
            catch(Exception e){
                Console.Write("Connection Error:" + e);
                return false;
            }

        }

        //erstellt Spieler
        public Boolean insertPlayer(string name)
        {
            if (checkPlayer(name)==false)
            {
                com.CommandText = "INSERT INTO player (name) VALUE (@text)";
                com.Prepare();
                com.Parameters.AddWithValue("@text", name);
                com.ExecuteNonQuery();
                return true;
            }
            else
            {
                return false;
            }

        }

        //überprüft die Existens eines Spielers
        public Boolean checkPlayer(string name)
        {
            string result ="Spieler nicht gefunden";
            com.CommandText = "SELECT name FROM player WHERE name = @text2";
            com.Prepare();
            com.Parameters.AddWithValue("@text2", name);
            com.ExecuteNonQuery();
            MySqlDataReader reader = com.ExecuteReader();
            while(reader.Read())
            {
                result = reader.GetString(0);
            }
            reader.Close();
            if(result == name)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        //gibt ID des Spielers zurück
        public int selectPlayer(string name)
        {
            int result = 0;
            com.CommandText = "SELECT ID FROM player WHERE name = '" + name + "'";
            com.ExecuteNonQuery();
            MySqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                result = reader.GetInt32(0);
            }
            reader.Close();
            return result;
        }

        public ArrayList selectPlayerFromMatch(int matchID)
        {
            ArrayList result = new ArrayList();
            result.Clear();
            com.CommandText = "SELECT name FROM player, game WHERE matchID = " + matchID + " AND game.playerID = player.ID;";
            com.ExecuteNonQuery();
            MySqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                result.Add(reader.GetString(0));
            }
            reader.Close();
            return result;
        }

        //erstellt neues Spielfeld
        public void insertField(int size, int id)
        {
            for (int i = 1; i <size; i++)
            {
                com.CommandText = "INSERT INTO field (ID,row) VALUE ('"+id+"','"+i+"')";
                com.ExecuteNonQuery();
            }
            try
            {
                for (int j = 1; j < size; j++)
                {
                    com.CommandText = "ALTER TABLE field ADD c" + j + " int NOT NULL DEFAULT 0";
                    com.ExecuteNonQuery();
                }
            }
            catch (Exception e)
            {
                Console.Write(e + " Bereits hinzugefügt");
            }
        }

        //löscht Spielfeld
        public void deleteField(int size)
        {
            com.CommandText = "DELETE FROM field";
            com.ExecuteNonQuery();

            for (int i = 1; i < size+1; i++)
            {
                com.CommandText = "ALTER TABLE field DROP COLUMN c"+i+"";
                com.ExecuteNonQuery();
            }
        }

        //gibt Wert einer Zelle des Spielfeldes zurück
        public int selectCell(int id, string column, int row)
        {
            int result = 0;
            com.CommandText = "SELECT " + column + " FROM field WHERE ID = " + id + " AND row = " + row;
            com.ExecuteNonQuery();
            MySqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                result = reader.GetInt32(0);
            }
            reader.Close();
            return result;
        }

        //ändert den Wert einer Zelle des Spielfeldes
        public void updateCell(int id, string column, int row, int newValue)
        {
            com.CommandText = "UPDATE field SET " + column + " = " + newValue + " WHERE ID = " + id + " AND row = " + row;
            com.ExecuteNonQuery();
        }

        //zählt die versenkten Schiffseinheien eines Spielers
        public int countDestroyedUnits(int id, int size)
        {
            int destroyedUnits=0;

            for (int i = 1; i < size + 1; i++)
            { 
                com.CommandText = "SELECT COUNT(c" + i + ") FROM field WHERE ID = " + id + " AND c"+ i +" = 3" ;
                com.ExecuteNonQuery();
                MySqlDataReader reader = com.ExecuteReader();
                while (reader.Read())
                {
                    destroyedUnits = destroyedUnits + Int32.Parse(reader.GetString(0));
                }
                reader.Close();
            }

            return destroyedUnits;
        }

        //erstellt neues Spiel und gibt "matchID" zurück
        public int insertGame(int playerID, string difficulty, int size)
        {
            Random rnd = new Random();
            int matchID = rnd.Next(100, 1000);
            if (checkMatchID(matchID) == false)
            {
                com.CommandText = "INSERT INTO game (matchID,playerID,size,difficulty) VALUE ('" + matchID + "','" + playerID + "','" + size + "','" + difficulty + "')";
                com.ExecuteNonQuery();

                return matchID;
        }
            else
            {
                return insertGame(playerID, difficulty, size);
    }

}

        //fügt Spieler einem Spiel hinzu
        public Boolean joinGame(int matchID, int playerID, string difficulty, int size)
        {
            if (countPlayer(matchID) == true)
            {
                if (checkMatchID(matchID) == true)
                {
                    com.CommandText = "INSERT INTO game (matchID,playerID,size,difficulty) VALUE ('" + matchID + "','" + playerID + "','" + size + "','" + difficulty + "')";
                    com.ExecuteNonQuery();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        //setzt den Gewinner eines Spiels
        public void updateGame(string WinPlayer, int matchID)
        {
            com.CommandText = "UPDATE game SET winner= '"+WinPlayer+"' WHERE matchID='"+matchID+"' ";
            com.ExecuteNonQuery();
        }

        //gibt den Spielernamen des Gewinners eines Spieles zurück
        public string selectWinner(int matchID)
        {
            string result = "Spiel wurde nicht gefunden";
            com.CommandText = "SELECT winner FROM game WHERE matchID = '" + matchID + "'";
            com.ExecuteNonQuery();
            MySqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                result = reader.GetString(0);
            }
            reader.Close();
            return result;
        }

        //überprüft, ob ein Spiel vorhanden ist
        public Boolean checkMatchID(int matchID)
        {
            string result ="false";
            com.CommandText = "SELECT matchID FROM game WHERE matchID = " + matchID + "";
            com.ExecuteNonQuery();
            MySqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                result = reader.GetString(0);
            }
            reader.Close();
            if (result == "false")
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public Boolean countPlayer(int matchID)
        {
            int result = 0;
            com.CommandText = "SELECT COUNT(playerID) FROM game WHERE matchID =" + matchID+"";
            com.ExecuteNonQuery();
            MySqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                result = reader.GetInt32(0);
            }
            reader.Close();
            if (result < 2)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}