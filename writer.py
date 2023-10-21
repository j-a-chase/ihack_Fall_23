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
from typing import Dict, List

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

        self.d_ids = []
        self.keys = []

    def read_user_info(self) -> None:
        self.cursor.execute(f'SELECT discord_id, apikey FROM bot_settings')
        response = self.cursor.fetchall()
        for row in response:
            self.d_ids.append(row[0])
            self.keys.append(row[1])

    def print_table_columns(self, table_name) -> None:
        self.cursor.execute(f"SHOW columns FROM {table_name}")
        print(self.cursor.fetchall())

    def write_info(self, courses: Dict, course_ids: List[str], discord_id: str) -> None:
        for cid in course_ids:
            course = courses[cid]
            u_assignments = ''
            p_assignments = ''
            for x in course[-1]['upcoming_assignments']:
                z = [str(y) for y in x]
                u_assignments += '_'.join(z)
                u_assignments += '\n'
            for x in course[-1]['past_assignments']:
                z = [str(y) for y in x]
                p_assignments += '_'.join(z)
                p_assignments += '\n'
            self.cursor.execute('SELECT course_id FROM api WHERE course_id=%s', (cid,))
            if len(self.cursor.fetchall()) == 0:
                string = "INSERT INTO api (course_id, course_name, course_code, course_format, course_score, course_letter_grade, upcoming_assignments, past_assignments, discord_id) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)"
                data = (cid, course[0], course[1], course[2], course[3], course[4], u_assignments, p_assignments, discord_id)
                self.cursor.execute(string, data)
                self.conn.commit()
            else:
                string = "UPDATE api SET upcoming_assignments=%s, past_assignments=%s WHERE course_id=%s"
                data = (u_assignments, p_assignments, cid)
                self.cursor.execute(string, data)
                self.conn.commit()

    def get_table_data(self) -> None:
        self.cursor.execute("SELECT * FROM api")
        result = self.cursor.fetchall()
        print(result)
        print(f'Length: {len(result)}')

    def truncate_table(self) -> None:
        self.cursor.execute("TRUNCATE api")
        self.conn.commit()

    def close_connection(self) -> None:
        print('Closing connection...')
        self.cursor.close()
        self.conn.close()
        print('Connection closed.')

if __name__ == '__main__': assert False, 'This is a class file. Please import into another file'
