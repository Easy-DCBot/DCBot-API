# [DCBot-API] Documentation

The DCBot-API is builed for the Discord-Bot Template Easy-Discrod-Bot https://github.com/Easy-DCBot

# Get

**get('/')**
Send you The Name and the Version of the Bot .
**get('getbots')**
Send you the list of your Bots.

## Post
**post('/login')**
You must send your `username` and `password`	in the body. Then you will get your API-Token.

**post('/me')**
Is a Debug output, this will only work, if you are an `Admin`.

**post('getbotcommands')**
You must send your `Bot_id` in the body. Then you will get all Commands of your Bot with this ID as result. If everything is fine you get `status(200)` and the arry of `Commands` back.

**post('postBotCommand')**
You must send your`Bot_id` the bot `Command` and `Answer` you want. If the Command already exist you get an error. If everything worked you get `status(200) New Command Added!` back 