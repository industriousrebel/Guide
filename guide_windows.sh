#!/bin/bash


function menu() {
    echo -e "\nPlease supply an argument. Options are:\n"
    echo -e "\t-b  | --build           To build backend and frontend images"
    echo -e "\t-r  | --run             To run the containers based on the built images"
    echo -e "\t-s  | --stop            To stop the containers"
    echo -e "\t-lb | --logs_backend    Attach to Container and view Backend Logs"
    echo -e "\t-lf | --logs_frontend   Attach to Container and view Frontend Logs"
}


if [ $# -eq 0 ]
then
    menu
    exit 1
else
    PARAM="$1"
    case $PARAM in
        -h | --help )
            menu
            exit
            ;;
        -b | --build )
            echo "Building images..."
            docker build ./backend  -t guide_backend
            docker build ./frontend -t guide_frontend
            ;;
        -r | --run )
            echo "Forcefully stopping containers in case if they are running..."
            docker kill guide_backend
            docker kill guide_frontend
            docker container rm guide_backend
            docker container rm guide_frontend
            echo "Running containers..."
            docker run -i -d --rm -p 5000:5000 --name guide_backend -v /$(pwd)/backend:/app:consistent guide_backend
            docker run -i -d --rm -p 3000:3000 --name guide_frontend -v /$(pwd)/frontend:/app:consistent guide_frontend
            echo -e "\nContainers are running but it will take about 5-7 mins before you can start using them.\nGrab coffee and do some stretching - coding is coming :)
            \n \nBackend is going to run on port 5000 and frontend on port 3000.\nYou can type 'docker ps' to see how long and where containers have been running."
            ;;
        -lb | --logs_backend )
            echo "Attaching to Backend Docker Container"
            echo -e "To Close this terminal without Stopping using CTRL + C, instead use CTRL+Q for WINDOWS + LINUX or For MACs CMD + Q"
            docker attach $(docker ps -aqf "name=guide_backend")
            ;;
        -lf | --logs_frontend )
            echo "Attaching to Frontend Docker Container"
            echo -e "To Close this terminal without Stopping using CTRL + C, instead use CTRL+Q for WINDOWS + LINUX or For MACs CMD + Q"
            docker attach $(docker ps -aqf "name=guide_frontend")
            ;;
        -s | --stop )
            echo "Stopping containers..."
            docker stop guide_backend
            docker stop guide_frontend
            ;;
        * )
            echo "ERROR: unknown parameter \"$PARAM\""
            menu
            exit 1
            ;;
    esac
    shift
fi

