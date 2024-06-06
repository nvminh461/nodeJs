## Install Project

This is a step-by-step g uide for installing the project.

### Step 1: Clone Repository

Use the following command to clone the repository to your machine and edit environment variables in the `.env` file.

```bash
git clone https://github.com/nvminh461/nodeJs.git
```

Edit environment variables in the `.env` file.

### Step 2: Install Dependencies

Firstly, you need to install the dependencies for the frontend application. To do this, navigate to the `nodeJs`
directory and run the following command:

```bash
cd nodeJs
npm install
```

### Step 3: Run the Application

```bash
npm start
```

After completing all the installation steps, you can run your application by accessing its URL in a web browser or using
the corresponding command line.

## For developers

This is a step-by-step guide for developers who want to contribute to the project.

### Step 1: Install Dependencies

Firstly, you need to install the dependencies for the frontend application. To do this, navigate to the `nodeJs`
directory and run the following command:

```bash
cd nodeJs
npm install
```

### Step 2: Run the Application

```bash
npm start
```

After completing all the installation steps, you can run your application by accessing its URL in a web browser or using
the corresponding command line.

### step 3: Run SCSS Watch Service

To automatically compile SCSS files when changes are made, run the following command:

```bash
npm run watch
```

### Step 4: Run migration database

Migration database

```bash
db-migrate up
```

## Note for developers

- The project uses the `MVC` pattern.
- The project uses the `nodeJs` for the backend and `hbs` for the frontend.
- The project uses the `db-migrate` for migration database. You can use command `db-migrate create <name>` to create a
  new migration file and `db-migrate up` to run migration database. Or you can use the
  command `db-migrate create <name> --sql-file` to create a new migration file with SQL file
  and `db-migrate up --sql-file` to run migration database with SQL file.
- You can setup menu in the `src/config/menu/menu.js` file.
- You can see helper functions on handlebars in the `src/app/helpers/handlebars-helpers.js` file.

## Contact

- If you have any questions, feel free to contact me at
  [facebook](https://www.facebook.com/profile.php?id=100039352392100)
  or
  [email](mailto:nvminh04@gmail.com)
