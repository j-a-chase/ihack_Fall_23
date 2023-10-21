######################################################################################################################################################
# Name: James A. Chase
# File: writer.py
# Date: 21 October 2023
# Description:
#
# Class file for the Writer class.
#
######################################################################################################################################################

# imports
import psycopg2
import sys

class Writer:
    def __init__(self) -> None:
        print('Connecting...')
        try:
            self.conn = psycopg2.connect(
                database="canvasjs",
                host="system.bruh.uno",
                user="canvaspy",
                password="pyhack2023",
                port=9852,
                connect_timeout=10
            )
            self.cursor = self.conn.cursor()
        except psycopg2.Error as e:
            print("Error connecting to the database:", e)
            sys.exit(1)
        print('Connected.')

    def _read_table_data(self) -> None:
        print('Querying...')
        try:
            self.cursor.execute('SELECT * FROM bot_settings')
            print(self.cursor.fetchall())
        except psycopg2.Error as e: print("Error executing query:", e)
        print('Queried.')

    def close_connection(self) -> None:
        print('Closing Connection...')
        if self.conn: self.conn.close()
        print('Connection Closed.')

if __name__ == '__main__':
    db = Writer()
    db._read_table_data()
    db.close_connection()

    # assert False, 'This is a class file. Please import into another file'
