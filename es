#!/bin/bash
set -o history

#-----------------------------------------------------------------------------#
#PURPOSE: enable use of explainshell direct from the commandline
#-----------------------------------------------------------------------------#

#-----------------------------------------------------------------------------#
#USAGE: 
#-----------------------------------------------------------------------------#
# $ es [CMDLINE]
# example: 
# $ es tar xzvf archive.tar.gz
#
# if run without args then selects last command in shell history
# $ es

# ensure place on your PATH (and provide u+x etc)

echo stuff: "${@}"

#-----------------------------------------------------------------------------#
# Get command to parse
#-----------------------------------------------------------------------------#

#without args last command in shell history or "$@"
if [[ "${#}" -eq 0 ]]
then
    commandLine=$(history 2 | sed 's/^ *[^ ]* *//')
    #commandLine=$(history 2 | sed 's/^ *[^ ]* *//' | cut -d$'\n' -f1)
    echo 1 "${#}"
else
    commandLine=( "${@}" )
    echo 2 "$#"
fi

#commandLine=( "${@}" )

commandLine2=( )

for word in "${commandLine[@]}"
do
    #test to see if string contains \s
    if [[ "${word}" =~ \ |\' ]]
    then
        #if so wrap with double quotes
        word=\"${word}\"
    fi
    commandLine2+=(${word})
    echo ${word}
done

function join_by { local IFS="$1"; shift; echo "$*"; }
sanitisedLine=$(join_by " " "${commandLine2[@]}")


#-----------------------------------------------------------------------------#
#Launch command in default browser 
# (TODO: check portability of x-www-browser, xdg-open backup)
#-----------------------------------------------------------------------------#
if [[ -n ${commandLine} ]]
then
    if [[ ! -z $(command -v x-www-browser) ]]
    then
        x-www-browser http://explainshell.com/explain?cmd="${sanitisedLine}"
    else
        xdg-open http://explainshell.com/explain?cmd="${sanitisedLine}" &> /dev/null
    fi
else
    echo "Your command expression:${commandLine} is empty";
fi
