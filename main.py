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
    print()
    for k, v in r.courses.items(): print(f'{k}: {v}')
    print()

if __name__ == '__main__':
    main()
