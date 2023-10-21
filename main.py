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
from writer import Writer as W

def main() -> None:
    w = W()
    w.read_user_info()
    for d_id, token in zip(w.d_ids, w.keys):
        r = R(token)
        for cid in r.get_course_ids():
            r.get_upcoming_assignments(cid)
            r.get_past_assignments(cid, 14)

        w.write_info(r.courses, r.get_course_ids(), d_id)
    w.get_table_data()
    w.close_connection()

if __name__ == '__main__': main()
