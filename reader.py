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
from datetime import datetime, timezone

class Reader:
    def __init__(self, token: str=''):
        # base link to API
        self.api = "https://byui.instructure.com/api/v1/"

        # holds user token
        self.token = token

        # holds course information for the student
        self.courses = {}

        # will hold list of course ids
        self.ids = None

        # get course info
        self.get_courses()

        # add upcoming assignment info for each course
        for cid in self.ids: self.get_upcoming_assignments(cid)

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
                    x['enrollments'][0]['computed_current_grade'],
                    {
                        'upcoming_assignments': []
                    }
                ]
            # should be impossible at this point but just in case
            except KeyError as e: print(f'{e} ---\n')

        self.ids = list(self.courses.keys())

    def get_upcoming_assignments(self, course_id: str) -> None:
        data = requests.get(self.api + f'courses/{course_id}/assignments?include=submission&include=score_statistics&bucket=upcoming&order_by=due_at&access_token={self.token}').text
        parsed = json.loads(data)

        self.courses[course_id]
        for x in parsed:
            # convert due date to current timezone
            due_date = datetime.strptime(x['due_at'], f'%Y-%m-%dT%H:%M:%SZ').replace(tzinfo=timezone.utc).astimezone(tz=None)
            due_date = due_date.strftime(f'%m-%d-%Y %H:%M:%S %Z%z').split(' ')[:2]
            due_date = ' '.join(due_date)

            # append the assignment to the upcoming assignments dictionary inside the course
            self.courses[course_id][-1]['upcoming_assignments'].append([x['name'], due_date, x['html_url']])

if __name__ == '__main__': assert False, 'This is a class file. Please import into another file.'
