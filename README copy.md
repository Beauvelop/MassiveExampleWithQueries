# [massive-js](https://massive-js.readthedocs.io/en/latest/)

## PRE-SETUP

Follow these steps using pgAdmin.

### Step A: Install Postgres and pgAdmin

#### Windows

[Postgres 6.1 & pgAdmin 4](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads#windows)

#### Mac

[Postgres.app](https://postgresapp.com/)
[pgAdmin 4](https://www.pgadmin.org/download/macos4.php)

### Step B: Create a database

Create a database called `massive_demo`: [View demo](https://www.youtube.com/watch?v=RT6VXSDj6Wg&feature=youtu.be). 

### Step C: Bootstrap and test your database
 
Copy the contents of [./schema.sql](https://github.com/statianzo/massive-demo/blob/master/schema.sql),
paste it into a script (using pgAdmin), and execute it:
[View demo](https://www.youtube.com/watch?v=q8QLp-ZHg_o&feature=youtu.be).

## Mini Project

### Step 1

Clone the repo (do not fork it).

### Step 2: Install the NPM modules

```
npm install
```

### Step 3: Install massive-js

```
npm install --save massive
```

### Step 4: Test it

Start your application by running:

```
node server.js
``` 

Open [http://localhost:3000](http://localhost:3000) to test.

### Step 5: Start Postgres

Start your Postgres server.

Windows - the server should always be running
Mac - Open Postgres.app and look for the Postgres icon in your menu bar.

### Step 6: Demo pgAdmin

Begin by launching pgAdmin.

* Create a database
* Examine the tables

### Step 7: Include the massive-js Dependency
 
In `server.js`, add to your list of dependencies:

```
var massive = require('massive')
```

### Step 8: Connect to Postgres via massive-js

In `server.js` [add code to connect](https://github.com/robconery/massive-js#express-example) to your database:

```javascript
var db = massive.connectSync({
  connectionString : 'postgres://localhost/massive_demo'
});
```

Use `console.log(db)` to test that you're properly connected to Postgres. Remove it
when you're confident it works.

### Step 9: Create a SQL Repository

massive-js works by converting your SQL queries, held in files, into JS functions.

For example, the following file, held in the `./db` directory of your project:

`db/get_all_injuries.sql`
```sql
SELECT * FROM injuries;
```

Yields the following function:

```js
db.get_all_injuries(function(err, injuries) {
  console.log(injuries) // injuries will contain an array of injuries
});
```

Create the `./db` directory, and add a file, `get_all_incidents.sql`
(_incidents_, not injuries).

### Step 10: Query Incidents

Now that you have a repository for SQL queries, add a query to your new file
that shows you retrieves the following pieces of information for every incident
in your database:

* `incidents.id`
* `incidents.us_state`
* `injuries.name`
* `affected_areas.name`
* `causes.name`

Your query will require more than one join in a single statement (whoa!). When
you're query is ready, test it in psql or pgAdmin:

```
psql massive_demo < db/get_all_incidents.sql
```

### Step 11: Upgrade the GET Endpoint

Now that you have a way to return basic information about incidents of
injuries, upgrade the GET endpoint such that an HTTP request can return the
information to a client (like Angular) in your response:

Hint:

```js
db.get_all_injuries(function(err, injuries) {
  console.log(injuries) // injuries will contain an array of injuries
});
```

Using a client like [Postman](https://www.getpostman.com/) can help when making
test requests.

### Step 12: Up the Ante

If you've made it this far, great work. Now, upgrade your endpoint again, this
time accepting two new query parameters, `by=cause` and `cause=Sneezing` (e.g.
any cause). When `by=cause` is submitted as part of the same GET request,
return the results of a _different_ query, `db/get_incidents_by_cause.sql`.

Your query should return the same information, but only results that match the
value in the `cause` query param.

Hint:

massive-js accepts arguments as part of your SQL using $1, $2, ...

```sql
select * from products
where in_stock = $1 and price < $2;
```

Your arguments can be submitted as an array as the first argument in the
function, before the callback.

```js
db.products_in_stock([true, 1000], function(err, products) {
  // products is a results array
});
```

### Step 13 (Optional): Up the Ante (Again)

Upgrade your GET request to accept not only `by=cause`, but `by=affected_area`,
without breaking your previous functionality.

### Step 14: Create a New Incident

Upgrade the POST request to give yourself the ability to create a new incident.
Here's a sample request body for Postman:

```json
{
  "us_state": "WV",
  "injury_id": 1,
  "cause_id": 5
}
```

### Step 15 (Optional): Consistent API

Let's keep our API consistent when reading and writing. After creating a new
incident, return the incident with the same fields as step 10:

* `incidents.id`
* `incidents.us_state`
* `injuries.name`
* `affected_areas.name`
* `causes.name`

Hint:

See the [PostgreSQL INSERT docs](https://www.postgresql.org/docs/9.6/static/sql-insert.html)
on the `RETURNING` keyword.

Add `RETURNING id` to your `INSERT` statement from #14.


### Step 16 (Optional): Make it pretty

Let's return some HTML. For the root route `/`, using the same query from step 10, render an HTML list
of all incidents. Here's some boilerplate HTML:

```html
<html>
<head>
  <title>Incidents</title>
</head>
<body>
  <h1>Incidents</h1>
  <table>
    <thead>
      <tr>
        <th>Id</th><th>State</th><th>Injury</th><th>Affected Area</th><th>Cause</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td><td>UT</td><td>Pulled Groin</td><td>Groin</td><td>Jumping jacks</td>
      </tr>
      <!-- one tr for each incident -->
    </tbody>
  </table>
</body>
</html>
```

Hint:

A templating library like [lodash.template](https://lodash.com/docs/4.17.1#template) can help.
Install it by running `npm install --save lodash` and adding `var _ = require('lodash')` to `server.js`.
