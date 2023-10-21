######################################################################################################################################################
# Name: James A. Chase
# File: reader.py
# Date: 20 October 2023
# Description:
#
# Class file for the Reader class.
#
######################################################################################################################################################

# imports
import requests
import json

class Reader:
    def __init__(self, token: str=''):
        # base link to API
        self.api = "https://byui.instructure.com/api/v1/"

        # holds user token
        self.token = token

        # holds course information for the student
        self.courses = {}

        # get course info
        self.get_courses()

    def get_courses(self) -> None:
        '''
        Sends a GET request to the API for the student's course information.

        Parameters: None

        Returns: None
        '''
        # send request and store requests.Response object
        data = requests.get(self.api + f'courses?access_token={self.token}&include=total_scores').text

        # parse JSON data into list of dictionaries
        parsed = json.loads(data)

        # for each dictionary (course)
        for x in parsed:
            try:
                # skip if it's not a graded class or if access to the course is not yet enabled
                if 'name' not in x or x['grading_standard_id'] is None: continue

                # grab course information and store in courses dictionary
                self.courses[x['id']] = [
                    x['name'],
                    x['course_code'],
                    x['course_format'],
                    x['enrollments'][0]['computed_current_score'],
                    x['enrollments'][0]['computed_current_grade']
                ]
            # should be impossible at this point but just in case
            except KeyError as e: print(f'{e} ---\n')

if __name__ == '__main__': assert False, 'This is a class file. Please import into another file.'
