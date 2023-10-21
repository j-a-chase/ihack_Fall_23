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
from typing import List

class Reader:
    def __init__(self, token: str=''):
        # base link to API
        self.api = "https://byui.instructure.com/api/v1/"

        # holds user token (user_id=622529)
        self.token = token

        # holds course information for the student
        self.courses = {}

        # will hold list of course ids
        self._ids = None

        # get course info
        self._get_courses()

    '''
    Getters
    '''
    def get_course_ids(self) -> List[str]:
        '''
        Returns course ids

        Parameters: None

        Returns:
            - a list containing the user's course ids as strings.
        '''
        return self._ids
    
    '''
    Class Methods
    '''

    def _get_courses(self) -> None:
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
                        'upcoming_assignments': [],
                        'past_assignments': []
                    }
                ]
            # should be impossible at this point but just in case
            except KeyError as e: print(f'{e} ---\n')

        # store course ids as a list
        self._ids = list(self.courses.keys())

    def get_upcoming_assignments(self, course_id: str) -> None:
        '''
        Grabs upcoming assignments for the specified course and stores them in the courses dictionary.

        Parameters:
            - course_id: a string containing a course id.

        Returns: None
        '''
        # send request and store requests.Request object
        data = requests.get(self.api + f'courses/{course_id}/assignments?&bucket=upcoming&order_by=due_at&access_token={self.token}').text
        
        # parse JSON data into list of dictionaries
        parsed = json.loads(data)

        # for each upcoming assignment
        for x in parsed:

            # convert due date to current timezone
            due_date = datetime.strptime(x['due_at'], f'%Y-%m-%dT%H:%M:%SZ').replace(tzinfo=timezone.utc).astimezone(tz=None)
            due_date = due_date.strftime(f'%m-%d-%Y %H:%M:%S %Z%z').split(' ')[:2]
            due_date = ' '.join(due_date)

            # append the assignment to the upcoming assignments dictionary inside the course
            self.courses[course_id][-1]['upcoming_assignments'].append([x['name'], due_date, x['html_url']])

    def get_past_assignments(self, course_id: str, days_back: int) -> None:
        '''
        Grab list of past assignments that were due 'x' amount of days prior to today.

        Parameters:
            - course_id: a string containing a course id.
            - days_back: an integer indicating how many days back you'd like to track your submitted assignments.

        Returns: None
        '''
        
        def leap_year(year: int) -> bool:
            '''
            Determines if given year is a leap year.

            Parameters:
                - year: an integer indicating the current year.

            Returns:
                - a boolean value indicating if the passed year is a leap year.
            '''
            return (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)
        
        def get_month_days(m: int, y: int) -> int:
            '''
            Determines how many days are in the given month

            Parameters:
                - m: an integer indicating the current month
                - y: an integer indicating the current year

            Returns:
                - an integer containing the days in the given month
            '''
            if m in {1,3,5,7,8,10,12}: return 31
            elif m == 2: return 29 if leap_year(y) else 28
            else: return 30

        # send request and store requests.Request object
        data = requests.get(self.api + f'courses/{course_id}/assignments?include[]=submission&include[]=score_statistics&bucket=past&per_page=100&order_by=due_at&access_token={self.token}').text
        
        # Parse JSON into list of dictionaries
        parsed = json.loads(data)

        # store current year, month, day
        this_year = datetime.now().year
        this_month = datetime.now().month
        this_day = datetime.now().day

        # if early in month, adjust values accordingly
        if this_day < days_back:
            this_month -= 1
            if this_month == 0: this_month = 12
            this_day += get_month_days(this_month, this_year)
            
        # for each assignment
        for x in parsed:
            due_date = datetime.strptime(x['due_at'], f'%Y-%m-%dT%H:%M:%SZ').replace(tzinfo=timezone.utc).astimezone(tz=None)
            d = due_date.day

            # if it's not in the same month, or outside of the given range of backtracking, skip
            if this_month != due_date.month or this_day - d > days_back: continue

            # if score_statistics is not enabled, simply append empty list
            try:
                self.courses[course_id][-1]['past_assignments'].append([x['name'],
                                                                        x['html_url'],
                                                                        x['submission']['score'],
                                                                        x['points_possible'],
                                                                        x['score_statistics']['mean']])
            except KeyError:
                self.courses[course_id][-1]['past_assignments'].append([x['name'],
                                                                        x['html_url'],
                                                                        x['submission']['score'],
                                                                        x['points_possible'],
                                                                        None])

if __name__ == '__main__': assert False, 'This is a class file. Please import into another file.'
