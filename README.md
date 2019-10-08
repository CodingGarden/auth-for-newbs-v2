## Auth For Newbs - Part 6+

This is a continuation of the [Auth For Newbs series on YouTube](https://www.youtube.com/playlist?list=PLM_i0obccy3tfAersmDaq7-WFqvooNOXf). In this continuation, we will work on the stretch goals and making the code more production ready.

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
* [x] Prevent inactive users from logging in
* [ ] Route to create a user
    * POST /api/v1/users
* [ ] Restrict POST /api/v1/users to only users with admin role
    * Create a user