# Event Locator Application

## Project Description

Develop a multi-user event locator application allowing users to discover events based on location and preferences. The application includes the following features:

### User Management
- **Secure user registration and login** with password hashing (e.g., bcrypt).
- Users can set their **location** and **preferred event categories**.

### Event Management
- Users (or administrators) can **create, read, update, and delete events**.
- Event details include **location (latitude/longitude)**, **date/time**, and **categories**.

### Location-Based Search
- Implement a **search functionality** that allows users to find events within a specified radius of their location.

### Category Filtering
- Enable users to filter events based on **categories**.

### Multilingual Support (i18n)
- Enable users to select their preferred **language** for the user interface.

### Notification System (Queuing) _(Optional)_
- Utilize a **message queue** (e.g., Redis Pub/Sub, RabbitMQ) to send notifications to users about upcoming events that match their preferences.
- Optional: **Include a delay** to send notifications closer to the event.

### Unit Testing
- **Unit tests** for core functionalities were written and tested using **Postman**, including:
  - User authentication
  - Event management
  - Location-based search
  - Notification system

---

## Additional Features

- **Event ratings and reviews**: Allow users to rate and review events.
- **Mapping Integration**: Integrate with a **mapping service** (e.g., Google Maps API) to display event locations on a map.
- **Favorite Events**: Enable users to save their favorite events for quick access.
- **Real-Time Updates**: Implement real-time updates for event changes.

---

## Technical Considerations

### Databases
- Choose a **relational database** (e.g., PostgreSQL with PostGIS) to store user data, event data, and location information.

### Queuing System
- Use **Redis Pub/Sub** or **RabbitMQ** to manage asynchronous notifications.

### Node.js Framework
- Utilize **Express.js** or a similar framework to structure your application.

### Authentication
- Implement secure **password hashing** (e.g., bcrypt).
- Consider using **Passport.js** for user authentication.

### i18n Libraries
- Choose an **i18n library** (e.g., i18next) for internationalization.

### Testing Framework
- **Postman** was used for unit testing.

### Geospatial Libraries
- If using **Node.js** with **PostgreSQL** and **PostGIS**, utilize built-in **geospatial functions**.

---

## Important Links

- Link to the video:


---

## Author
Mugisha Gasheja
Email: m.gasheja@alustudent.com
