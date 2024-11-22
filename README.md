# book_shop

# Structure

1. Book-store - stands for Java backend using Spring boot. It is located on localhost port 8080
2. frontend - frontend of the application. Located on port 3000

How to run

API.
1. Verify that you have installed java > 17
2. Working mvn
3. Install postgres for db. Create basic database called bookstore
4. Change default password in `application.properties` to your postgres password
4. Then navigate to `cd book-store\book-store`
5. `mvn clean install`
6. Then API is ready to run, you can run it in IntelijIdea by running BookStoreApplication.java or using command `mvn spring-boot:run`

Frontend

1. Install Node.js https://nodejs.org/en
2. To run frontend navigate to folder frontend/src and run in terminal `npm start`