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
        self.api = "https://byui.instructure.com/api/v1/"
        self.token = token

        self.courses = {}

        self.get_courses(self.token)

    def get_courses(self, user_token: str) -> None:
        data = requests.get(self.api + f'courses?access_token={user_token}&include=total_scores').text
        parsed = json.loads(data)
        for x in parsed:
            try:
                if 'name' not in x or x['grading_standard_id'] is None: continue
                self.courses[x['id']] = [
                    x['name'],
                    x['course_code'],
                    x['course_format'],
                    x['enrollments'][0]['computed_current_score'],
                    x['enrollments'][0]['computed_current_grade']
                ]
            except KeyError: pass

if __name__ == '__main__':
    token = input('Token: ')
    r = Reader(token)
    print(r.courses)
    # assert False, 'This is a class file. Please import into another file.'
