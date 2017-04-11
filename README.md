Park Moderation Tool
====================


##Install and Build

- Run `npm install`
- Install grunt and bower if you didn't before
  - `sudo npm install -g grunt`
  - `sudo npm install -g grunt-cli`
  - `sudo npm install -g bower`
  - Create a new file in `/src/` called `config.json` and add the following json
  ```json
    {
      "host" : "http://devrest.newapptest.com:8080",
      "webappHost": "http://devweb.newapptest.com/",
      "vhost" :"parkweb",
      "local": true
    }```

- Run `bower install` (every time you add a dependency on the bower.json)

- Run `grunt` ( this will run `bower install` automatically and deploy the app into `/public` )

Now, the application is fully compiled and deployed to `/public`. This folder (public) is versioned in github, because is the one
jenkins uses to make the deploy to the remote environments.

>
> IMPORTANT: Do not forget to run the `grunt` command before tagging a new git release. The changes you made
> are only updated by doing that.
>

##Watching for changes

Since the grunt task needs to be run in order to get the latest code on the public folder,
we need to compile the code every time we make a change.

To avoid that, we have a `grunt watch` task, which is going to listed to the files changes
and redeploy (only the changed files) to public on the fly.

- Just run `grunt watch` before start working.
