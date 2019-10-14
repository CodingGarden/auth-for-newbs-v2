## Backend Admin

* [x] Route to list all users
    * GET /api/v1/users
* [x] Route to update a user
    * PATCH /api/v1/users/:id
* [x] Add a role property to users when created 
    * Role will default 'user'
* [x] Add a active property to users when created 
    * Active will default true
* [x] Seed the DB with an admin user
    * Insert user with role 'admin'
* [x] Restrict GET /api/v1/users to only users with admin role
    * List all users
* [x] Restrict PATCH /api/v1/users/:id to only users with admin role
    * Update a user
* [ ] Restrict POST /api/v1/users to only users with admin role
    * Create a user
* [x] Prevent inactive users from logging in

## Backend Admin pt2

* [x] set up tests: mocha, chai, & super test
    * [x] create a test db
* [x] setup linter file
* [] MVC folder structure
    * [x] folder by feature
        * [x] controller file
        * [x] model file for validations and query logic
        * [x] routes file for basic descriptions for express routes
        * [x] test file inside each folder
* [x] refactor some of the routes in to middle wares
* [] deploy!
    * [] run the admin seed on deploy

stretch? 
* [] storing token in a cookie
* [] refresh tokens
* [] pre commit hook

mongo://username:password@cluster0-lpxdr.mongodb.net/test