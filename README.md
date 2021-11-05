# Quarter Backend

The backend of the Quarter for the Assignment in COMP90018.

A production server has been hosted on http://chatapp.shuangqiu.blog/

## Backend Architecture

![a (2)](https://user-images.githubusercontent.com/48676973/140436997-9fa158c5-e692-49d5-99ba-9b13b94745b5.png)


## Running the server in local environment

Download the [MongoDB 5.0.3](https://www.mongodb.com/try/download/community). Start the MongoDB Server. Check the development configuration file in .env.development.

Download [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and configure any AWS user credentials. For example, see [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html).

To start the app, firstly run ```npm install```, then ```npm run dev```

## Running the server in production

Configure .env.production to set up the environment in production. Alternatively, create the configuration file when using Docker Build for better security.

A [Dockerfile](https://github.com/shuangqiu123/chatapp-backend/blob/main/Dockerfile) has been provided to start the docker container of the application.

