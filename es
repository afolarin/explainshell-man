#!/bin/bash

#-----------------------------------------------------------------------------#
#PURPOSE: enable use of explainshell direct from the commandline
#-----------------------------------------------------------------------------#

#-----------------------------------------------------------------------------#
#USAGE: 
#-----------------------------------------------------------------------------#
# es [CMDLINE]
# example: es tar xzvf archive.tar.gz

# Ensure place on your PATH (and provide u+x etc)

#-----------------------------------------------------------------------------#
# Get command to parse
#-----------------------------------------------------------------------------#
commandLine="${*}"
#echo "Show in explainshell.com: ${commandLine}"

#-----------------------------------------------------------------------------#
#parse command spaces replace with %20
#-----------------------------------------------------------------------------#
sanitisedLine=$(echo ${commandLine} | sed -r 's/\s+/\%20/g')


#-----------------------------------------------------------------------------#
#Launch command in default browser (TODO: check portability of x-www-browser)
#-----------------------------------------------------------------------------#
if [[ -n ${commandLine} ]]
then
    if [[ ! -z $(command -v x-www-browser) ]]
    then
        x-www-browser http://explainshell.com/explain?cmd=${sanitisedLine};
    else
        xdg-open http://explainshell.com/explain?cmd=${sanitisedLine};
    fi
else
    echo "Your command expression:${commandLine} is empty";
fi
