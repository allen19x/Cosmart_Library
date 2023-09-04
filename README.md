# Cosmart_Library

Installing
yarn install && cd ios && pod install

![Run Android](https://img.shields.io/badge/Android-run-success?logo=Android&style=flat-square)
Build Android
Build: 'yarn install && cd android && ./gradlew clean && ./gradlew assembleRelease'
Run: 'yarn react-native run-android'

![Run iOS](https://img.shields.io/badge/iOS-run-blue?logo=Apple&style=flat-square)
Run and Build via Xcode

Screen list:
- Mainhome : Welcome page to Cosmart Library App : Change Theme : Language : Navigate Book List : Navigate History (Ordered Book)
- Book List : List of book by subject : Subject on scroll horizontal : Pagination : Modalize onClick Books & Borrowing Request -> Save via MMKV Storage
- History : List of borrowed book from MMKV storage and detail ordered by Modalize

API Callers n State management by RTK
