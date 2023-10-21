######################################################################################################################################################
# Name: James A. Chase
# File: main.py
# Date: 20 October 2023
# Description:
#
# Main file for running the application
#
######################################################################################################################################################

# imports
from reader import Reader as R

def main() -> None:
    print()
    token = input("Token: ")
    r = R(token)
    for cid in r.get_course_ids():
        r.get_upcoming_assignments(cid)
        r.get_past_assignments(cid, 14)
    # print()
    # for k, v in r.courses.items():
    #     print(f'{k}: {v[:-1]}')
    #     print('Upcoming:')
    #     for a in v[-1]['upcoming_assignments']: print(f'\t{a}')
    #     print('Past Assignments:')
    #     for a in v[-1]['past_assignments']: print(f'\t{a}')
    #     print()
    print()

if __name__ == '__main__': main()
