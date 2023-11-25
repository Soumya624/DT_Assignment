# DT_Assignment

To get started with the application, do git clone `https://github.com/Soumya624/DT_Assignment.git`. Then do `npm install` and `npm start` after navigating to the project directory. An overview of the application is provided below.

- **State Management**
  The application utilizes the `useState` hook to manage crucial state variables. These include `comicText` for user input, `comicPanels` for storing generated comic panels, and `loading` to track the loading state.

- **Asynchronous Operations**
  Async/await and the `Promise.all` method are employed to handle asynchronous API calls. This is particularly useful for generating comic panels based on user input. The loading state is effectively used to manage the loading state during API requests, ensuring a smooth user experience.

- **UI Components**
  For a structured and responsive layout, the project incorporates UI components from the `reactstrap` library. These components include `Button`, `Form`, `FormGroup`, `Input` and `Row`.

- **Slider Component**
  To enhance the user interface, the application integrates the `react-slick` library for the slider component. This feature allows an interactive display of generated comic panels with customizable settings.

- **Error Handling**
  Error handling is implemented within the `queryAPI` function. This ensures the catching and logging of errors in the console. Additionally, the `alert` function is utilized to notify users in case of API request failures, providing a more user-friendly experience.

Working Demo: [Drive Link](https://drive.google.com/file/d/1ZuQbavXWOcMvUzgknZZyswBFvA3-KQRk/view?usp=sharing)
