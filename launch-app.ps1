# Specify the WSL command to execute
$wslCommand = "redis-server"

# Start the WSL process and execute the initial command
Start-Process wsl -ArgumentList $wslCommand

# Commands for navigating to the client folder and running "npm start"
$npmClientCommand = "cd client; npm start"
Start-Process powershell -ArgumentList $npmClientCommand

# Commands for navigating to the server folder and running "npm start"
$npmServerCommand = "cd server; npm start"
Start-Process powershell -ArgumentList $npmServerCommand

