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
import mysql.connector as sql

class Writer():
    def __init__(self) -> None:
        print('Connecting...')

        config = {
            'host': 'system.bruh.uno',
            'user': 'canvasjs',
            'password': 'ihack2023',
            'database': 'canvas',
            "auth_plugin": "caching_sha2_password"
        }
        try:
            self.conn = sql.connect(**config)
            if self.conn.is_connected(): print('Connected.')
        except sql.Error as e:
            print(e)
            exit(1)

        self.cursor = self.conn.cursor()

    def print_table(self, table_name) -> None:
        self.cursor.execute(f"SHOW columns FROM {table_name}")
        print(self.cursor.fetchall())

    def close_connection(self) -> None:
        print('Closing connection...')
        self.conn.close()
        print('Connection closed.')

if __name__ == '__main__':
    w = Writer()
    w.print_table('')
    w.close_connection()
    # assert False, 'This is a class file. Please import into another file'
