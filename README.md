# Technical Test

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Launching to project

Before launching the project be sure to have `Docker` installed on your machine. 
-  Set the docker postgres container and the Prisma ORM with the command `npm run spin:db`
-  Then, use `npm run dev` to start dev mode
- Or use `npm run start:full` to set the db, build the app and start using production mode. 

This project uses `next.js` with `typescript`. All backend processes are handled via `next api routing` through `tRPC`. This allows sharing typescript types between server and client files.

Most of the server work is located at `server/api/routers`, `openings` being the most heavylifter of them. 

Styling is handled via `css.modules`, all files are available under `src/styles`. 


