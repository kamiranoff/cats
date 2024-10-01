# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Note

This project was created using Expo and using theCatApi.

Upload tab: You can upload a photo of your cat and it will be displayed in the gallery.
Home tab: You can see the list of the cats you uploaded. You can favourite and vote on your favourite cats.

Most of the code is under /features
The structure of the project:
 - /api - Contains the global API configuration
 - /app - Contains the core configuration and layout of the screens
 - /assets - Contains the static assets, mainly images and fonts
 - /components - Contains the reusable components
 - /features
   - /features/Cats - Contains the functionalities related to the cat list 
   - /features/Upload - Contains the functionalities related to the upload of the cat
 - /hooks - Contains the reusable hooks
## Get started

1. Install dependencies

   ```bash
   npm install
   ```


2. Create an api key at `https://thecatapi.com/signup`

3. Create a `.env` file in the root of the project and add the following:

   ```
    EXPO_PUBLIC_CAT_API_KEY=your_api_key
    ```

4. Start the app

   ```bash
    npx expo start
   ```

5. Open iOS simulator

   ```bash
   i
   ```

