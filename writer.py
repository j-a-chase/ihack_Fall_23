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
        '''
        Constructor

        Parameters: None

        Returns: None
        '''
        # initialize connection to the database
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

        # create necessary variables
        self.cursor = self.conn.cursor()
        self.d_ids = []
        self.keys = []

    def read_user_info(self) -> None:
        '''
        Read in discord ids and api access tokens into class variables.

        Parameters: None

        Returns: None
        '''
        self.cursor.execute(f'SELECT discord_id, apikey FROM bot_settings')
        response = self.cursor.fetchall()
        for row in response:
            self.d_ids.append(row[0])
            self.keys.append(row[1])

    def print_table_columns(self, table_name: str) -> None:
        '''
        Testing function to get table columns, will probably delete.

        Parameters:
            - table_name: a string containing the table name

        Returns: None
        '''
        self.cursor.execute(f"SHOW columns FROM {table_name}")
        print(self.cursor.fetchall())

    def write_info(self, courses: Dict, course_ids: List[str], discord_id: str) -> None:
        '''
        Write / Update database with new course information.

        Parameters:
            - courses: a dictionary containing all of the course information for a particular user
            - course_ids: a list containing all of the keys from the courses dictionary
            - discord_id: a string containing the user's discord id

        Returns: None
        '''
        # for each course
        for cid in course_ids:
            
            # shorten variable
            course = courses[cid]
            
            # prep upcoming and past assignments for addition into the database
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

            # check to see if course has been stored already for that user
            self.cursor.execute('SELECT course_id, discord_id FROM api WHERE course_id=%s AND discord_id=%s', (cid, discord_id))

            # if not, add course to database under that user's discord id
            if len(self.cursor.fetchall()) == 0:
                string = "INSERT INTO api (course_id, course_name, course_code, course_format, course_score, course_letter_grade, upcoming_assignments, past_assignments, discord_id) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)"
                data = (cid, course[0], course[1], course[2], course[3], course[4], u_assignments, p_assignments, discord_id)
                self.cursor.execute(string, data)
                self.conn.commit()
            # else, update the appropriate row
            else:
                string = "UPDATE api SET course_score=%s, course_letter_grade=%s, upcoming_assignments=%s, past_assignments=%s WHERE course_id=%s AND discord_id=%s"
                data = (course[3], course[4], u_assignments, p_assignments, cid, discord_id)
                self.cursor.execute(string, data)
                self.conn.commit()

    def get_table_data(self) -> None:
        '''
        Return api table data.

        Parameters: None

        Returns: None
        '''
        self.cursor.execute("SELECT * FROM api")
        result = self.cursor.fetchall()
        print(result)
        print(f'Length: {len(result)}')

    def truncate_table(self) -> None:
        '''
        Delete api table data.

        Parameters: None

        Returns: None
        '''
        self.cursor.execute("TRUNCATE api")
        self.conn.commit()

    def close_connection(self) -> None:
        '''
        Close database connection.

        Parameters: None

        Returns: None
        '''
        print('Closing connection...')
        self.cursor.close()
        self.conn.close()
        print('Connection closed.')

if __name__ == '__main__': assert False, 'This is a class file. Please import into another file'
