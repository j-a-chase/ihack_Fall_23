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
    token = input("Token: ")
    r = R(token)
    print(r.courses)

if __name__ == '__main__':
    main()
