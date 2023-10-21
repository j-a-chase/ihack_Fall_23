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
    '''
    Main Function

    Parameters: None

    Returns: None
    '''
    # create database writer object
    w = W()
    
    # read in discord ids and api tokens
    w.read_user_info()

    # for each id and token
    for d_id, token in zip(w.get_discord_ids(), w.get_keys()):
        
        # create an API reader object
        r = R(token)

        # for each course
        for cid in r.get_course_ids():
            
            # grab upcoming and past assignments
            r.get_upcoming_assignments(cid)
            r.get_past_assignments(cid, w.get_days_ago())

        # write / update assignment information
        w.write_info(r.get_courses_dict(), r.get_course_ids(), d_id)

    # close the connection
    w.close_connection()

# run program
if __name__ == '__main__': main()
